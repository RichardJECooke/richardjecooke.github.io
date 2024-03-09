import * as gaTypes from './geneticAlgorithmTypes';
import * as helper from './helper.js';

const _crossoverRate: number = 0.7;
const _percentPopulationToMutate: number = 0.3;
const _percentOrganismToMutate = 0.01;
const _maxMutationRate: number = 0.5;

export function getSettings<T>( // T is a population
    fitnessFunction: gaTypes.TFitnessFunction<T>,
    crossoverFunction: gaTypes.TCrossoverFunction<T>,
    mutateFunction: gaTypes.TMutateFunction<T>,
    populationDiversityFunction: gaTypes.TPopulationDiversityFunction<T>,
    populationSize: number = 100,
    elitismCount: number = 2,
    crossoverRate: number = _crossoverRate,
    percentPopulationToMutate: number = _percentPopulationToMutate,
    percentOrganismToMutate: number = _percentOrganismToMutate,
    minimumDiversityRateBeforeIncreasedMutation: number = 0.1,
    maximumDiversityRateBeforeResetMutation: number = 0.6,
    numberCpuCores: number = 1,
): gaTypes.TSettings<T> {
    return {
        populationSize,
        elitismCount,
        crossoverRate,
        'percentPopulationToMutate': percentPopulationToMutate,
        'percentOrganismToMutate': percentOrganismToMutate,
        'minimumDiversityRateBeforeIncreasedMutation': minimumDiversityRateBeforeIncreasedMutation,
        'maximumDiversityRateBeforeResetMutation': maximumDiversityRateBeforeResetMutation,
        numberCpuCores,
        fitnessFunction,
        crossoverFunction,
        mutateFunction,
        populationDiversityFunction
    };
}

export function getPercentOrganismToMutate() {
    return _percentOrganismToMutate;
}

export function getNextGenerationAndAdjustSettings<T>(  // T is a population
    lastGen: gaTypes.TOrganisms<T>, settings: gaTypes.TSettings<T>): gaTypes.TOrganisms<T> {
    let nextGen: gaTypes.TOrganisms<T> = [];

    // adjust settings if population diversity is too low
    helper.startTimer();
    const diversityRate = settings.populationDiversityFunction(lastGen);
    console.log(`Diversity: ${diversityRate}`);
    console.log(`Percent population to mutate: ${settings.percentPopulationToMutate}`);
    console.log(`Percent organism to mutate: ${settings.percentOrganismToMutate}`);
    if (diversityRate < settings.minimumDiversityRateBeforeIncreasedMutation) {
        // settings.crossoverRate *= 1.1; crossover is high enough. no point in changing it
        if (settings.percentOrganismToMutate < _maxMutationRate)
            settings.percentOrganismToMutate *= 1.1;
    }
    else {
        // settings.crossoverRate = _crossoverRate;
        if (diversityRate > settings.maximumDiversityRateBeforeResetMutation)
            settings.percentOrganismToMutate = _percentOrganismToMutate;
    }
    helper.stopTimer("getDiversity");

    // get pairs of breeders
    helper.startTimer();
    let breeders: gaTypes.TOrganisms<T>[] = [];
    Array.from({ length: settings.populationSize/2 }, () => {
        let competitors: gaTypes.TOrganisms<T> = [];
        let escapeCounter = 0;
        while (competitors.length < 3) {
            escapeCounter++;
            const competitor = getRandomItemFromList(lastGen);
            if (!competitors.includes(competitor) || escapeCounter > 30)
                competitors.push(competitor);
        }
        competitors.sort((a, b) => b.score - a.score);
        breeders.push([competitors[0], competitors[1]]);
    });
    helper.stopTimer("getPairsOfBreeders");

    //breed
    helper.startTimer();
    for (const pair of breeders) {
        if (Math.random() > settings.crossoverRate)
            nextGen.push(...pair);
        else
            nextGen.push(settings.crossoverFunction(pair[0], pair[1]),
                         settings.crossoverFunction(pair[0], pair[1]));
    }
    helper.stopTimer("breed");

    //mutate
    helper.startTimer();
    const mutatedNextGen: gaTypes.TOrganisms<T> = []
    for (const organism of nextGen) {
        if (Math.random() > settings.percentPopulationToMutate)
            mutatedNextGen.push(organism);
        else
            mutatedNextGen.push(settings.mutateFunction(organism));
    }
    nextGen = mutatedNextGen;
    helper.stopTimer("mutate");

    // todo - threads per core - background worker. settings.numberCpuCores
    helper.startTimer();
    nextGen.map(organism => {organism.score = settings.fitnessFunction(organism);})
    helper.stopTimer("getFitness");

    //carry over elites unchanged
    helper.startTimer();
    nextGen.sort((a, b) => b.score - a.score);
    for (const elite of lastGen.slice(0, settings.elitismCount)) {
        if (nextGen.includes(elite))
            continue;
        if (nextGen.slice(0, settings.elitismCount).some(organism => organism.score < elite.score))
            nextGen.push(elite);
    }
    nextGen.sort((a, b) => b.score - a.score);
    nextGen.splice(settings.populationSize);
    helper.stopTimer("carryElites");
    console.log(`Score: ${nextGen[0].score}`);
    return nextGen;
}

function getRandomItemFromList<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
}
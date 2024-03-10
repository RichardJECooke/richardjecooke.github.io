import * as gaTypes from './geneticAlgorithmTypes';
import * as helper from './helper.js';

const _crossoverFraction: number = 0.7;
const _fractionPopulationToMutate: number = 0.3;
const _fractionOrganismToMutate = 0.01;
const _maxFractionOrganismToMutate: number = 0.1;
const _maxFractionPopulationToMutate: number = 0.8;

export function getSettings<T>( // T is a population
    fitnessFunction: gaTypes.TFitnessFunction<T>,
    crossoverFunction: gaTypes.TCrossoverFunction<T>,
    mutateFunction: gaTypes.TMutateFunction<T>,
    populationDiversityFunction: gaTypes.TPopulationDiversityFunction<T>,
    populationSize: number = 500,
    elitismCount: number = 2,
    crossoverRate: number = _crossoverFraction,
    fractionPopulationToMutate: number = _fractionPopulationToMutate,
    fractionOrganismToMutate: number = _fractionOrganismToMutate,
    minimumDiversityFractionBeforeIncreasedMutation: number = 0.1,
    maximumDiversityFractionBeforeResetMutation: number = 0.6,
    numberCpuCores: number = 1,
): gaTypes.TSettings<T> {
    if (populationSize < 15)
        throw new Error(`Population size must be at least 15`);
    return {
        populationSize,
        elitismCount,
        crossoverRate,
        'fractionPopulationToMutate': fractionPopulationToMutate,
        'fractionOrganismToMutate': fractionOrganismToMutate,
        'minimumDiversityFractionBeforeIncreasedMutation': minimumDiversityFractionBeforeIncreasedMutation,
        'maximumDiversityFractionBeforeResetMutation': maximumDiversityFractionBeforeResetMutation,
        numberCpuCores,
        fitnessFunction,
        crossoverFunction,
        mutateFunction,
        populationDiversityFunction
    };
}

export function getNextGenerationAndAdjustSettings<T>(  // T is a population
    lastGen: gaTypes.TOrganisms<T>, settings: gaTypes.TSettings<T>): gaTypes.TOrganisms<T> {
    let nextGen: gaTypes.TOrganisms<T> = [];

    // adjust settings if population diversity is too low
    helper.startTimer();
    const diversityRate = settings.populationDiversityFunction(lastGen);
    console.log(`Diversity: ${diversityRate}`);
    console.log(`Fraction population to mutate: ${settings.fractionPopulationToMutate}`);
    console.log(`Fraction organism to mutate: ${settings.fractionOrganismToMutate}`);
    if (diversityRate < settings.minimumDiversityFractionBeforeIncreasedMutation) {
        // settings.crossoverRate *= 1.1; crossover is high enough. no point in changing it
        if (settings.fractionOrganismToMutate < _maxFractionOrganismToMutate)
            settings.fractionOrganismToMutate *= 1.1;
        if (settings.fractionPopulationToMutate < _maxFractionPopulationToMutate)
            settings.fractionPopulationToMutate *= 1.1;
    }
    else {
        // settings.crossoverRate = _crossoverRate;
        if (diversityRate > settings.maximumDiversityFractionBeforeResetMutation) {
            settings.fractionOrganismToMutate = _fractionOrganismToMutate;
            settings.fractionPopulationToMutate = _fractionPopulationToMutate;
        }
    }
    if (settings.fractionOrganismToMutate > _maxFractionOrganismToMutate)
        settings.fractionOrganismToMutate = _maxFractionOrganismToMutate;
    if (settings.fractionPopulationToMutate > _maxFractionPopulationToMutate)
        settings.fractionPopulationToMutate = _maxFractionPopulationToMutate;
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
        if (Math.random() > settings.fractionPopulationToMutate)
            mutatedNextGen.push(organism);
        else
            mutatedNextGen.push(settings.mutateFunction(organism, _fractionOrganismToMutate));
    }
    nextGen = mutatedNextGen;
    helper.stopTimer("mutate");

    // todo - threads per core - background worker. settings.numberCpuCores
    helper.startTimer();
    nextGen.map(organism => {organism.score = settings.fitnessFunction(organism);})
    helper.stopTimer("getFitness");

    // carry over elites unchanged
    helper.startTimer();
    nextGen.sort((a, b) => b.score - a.score);
    for (const elite of lastGen.slice(0, settings.elitismCount)) {
        if (nextGen.includes(elite))
            continue;
        const worseOrganism = nextGen.slice(0, settings.elitismCount).find(organism => organism.score < elite.score);
        if (!worseOrganism)
            continue;
        worseOrganism.data = elite.data;
        worseOrganism.score = elite.score
    }
    nextGen.sort((a, b) => b.score - a.score);
    helper.stopTimer("carryElites");
    const meanScore = nextGen.reduce((acc, current) => acc + current.score, 0) / nextGen.length;
    console.log(`Score: ${nextGen[0].score}`);
    console.log(`Mean score: ${meanScore}`);
    return nextGen;
}

function getRandomItemFromList<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
}
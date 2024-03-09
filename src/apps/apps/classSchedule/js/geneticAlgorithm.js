import * as helper from './helper.js';
const _crossoverRate = 0.7;
const _percentPopulationToMutate = 0.3;
const _percentOrganismToMutate = 0.01;
const _maxPercentOrganismToMutate = 0.1;
const _maxPercentPopulationToMutate = 0.8;
export function getSettings(// T is a population
fitnessFunction, crossoverFunction, mutateFunction, populationDiversityFunction, populationSize = 100, elitismCount = 2, crossoverRate = _crossoverRate, percentPopulationToMutate = _percentPopulationToMutate, percentOrganismToMutate = _percentOrganismToMutate, minimumDiversityRateBeforeIncreasedMutation = 0.1, maximumDiversityRateBeforeResetMutation = 0.6, numberCpuCores = 1) {
    if (populationSize < 15)
        throw new Error(`Population size must be at least 15`);
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
export function getNextGenerationAndAdjustSettings(// T is a population
lastGen, settings) {
    let nextGen = [];
    // adjust settings if population diversity is too low
    helper.startTimer();
    const diversityRate = settings.populationDiversityFunction(lastGen);
    console.log(`Diversity: ${diversityRate}`);
    console.log(`Percent population to mutate: ${settings.percentPopulationToMutate}`);
    console.log(`Percent organism to mutate: ${settings.percentOrganismToMutate}`);
    if (diversityRate < settings.minimumDiversityRateBeforeIncreasedMutation) {
        // settings.crossoverRate *= 1.1; crossover is high enough. no point in changing it
        if (settings.percentOrganismToMutate < _maxPercentOrganismToMutate)
            settings.percentOrganismToMutate *= 1.1;
        if (settings.percentPopulationToMutate < _maxPercentPopulationToMutate)
            settings.percentPopulationToMutate *= 1.1;
    }
    else {
        // settings.crossoverRate = _crossoverRate;
        if (diversityRate > settings.maximumDiversityRateBeforeResetMutation) {
            settings.percentOrganismToMutate = _percentOrganismToMutate;
            settings.percentPopulationToMutate = _percentPopulationToMutate;
        }
    }
    if (settings.percentOrganismToMutate > _maxPercentOrganismToMutate)
        settings.percentOrganismToMutate = _maxPercentOrganismToMutate;
    if (settings.percentPopulationToMutate > _maxPercentPopulationToMutate)
        settings.percentPopulationToMutate = _maxPercentPopulationToMutate;
    helper.stopTimer("getDiversity");
    // get pairs of breeders
    helper.startTimer();
    let breeders = [];
    Array.from({ length: settings.populationSize / 2 }, () => {
        let competitors = [];
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
            nextGen.push(settings.crossoverFunction(pair[0], pair[1]), settings.crossoverFunction(pair[0], pair[1]));
    }
    helper.stopTimer("breed");
    //mutate
    helper.startTimer();
    const mutatedNextGen = [];
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
    nextGen.map(organism => { organism.score = settings.fitnessFunction(organism); });
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
        worseOrganism.score = elite.score;
    }
    nextGen.sort((a, b) => b.score - a.score);
    helper.stopTimer("carryElites");
    const meanScore = nextGen.reduce((acc, current) => acc + current.score, 0) / nextGen.length;
    console.log(`Score: ${nextGen[0].score}`);
    console.log(`Mean score: ${meanScore}`);
    return nextGen;
}
function getRandomItemFromList(list) {
    return list[Math.floor(Math.random() * list.length)];
}

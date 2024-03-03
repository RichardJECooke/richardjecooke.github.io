const _crossoverRate = 0.7;
const _mutationRate = 0.01;
export function getSettings(// T is a population
fitnessFunction, crossoverFunction, mutateFunction, populationDiversityFunction, populationSize = 100, elitismCount = 2, crossoverRate = _crossoverRate, mutationRate = _mutationRate, diversityRateThreshold = 0.1, numberCpuCores = 1) {
    return {
        populationSize,
        elitismCount,
        crossoverRate,
        mutationRate,
        diversityRateThreshold,
        numberCpuCores,
        fitnessFunction,
        crossoverFunction,
        mutateFunction,
        populationDiversityFunction
    };
}
export function getNextGenerationAndAdjustSettings(// T is a population
population, settings) {
    let nextGen = [];
    // adjust settings if population diversity is too low
    const diversityRate = settings.populationDiversityFunction(population);
    if (diversityRate < settings.diversityRateThreshold) {
        settings.crossoverRate *= 1.1;
        settings.mutationRate *= 1.1;
    }
    else {
        settings.crossoverRate = _crossoverRate;
        settings.mutationRate = _mutationRate;
    }
    // get pairs of breeders
    let breeders = [];
    Array.from({ length: settings.populationSize / 2 }, () => {
        let competitors = [];
        let escapeCounter = 0;
        while (competitors.length < 3) {
            escapeCounter++;
            const competitor = getRandomItemFromList(population);
            if (!competitors.includes(competitor) || escapeCounter > 30)
                competitors.push(competitor);
        }
        competitors.sort((a, b) => b.score - a.score);
        breeders.push([competitors[0], competitors[1]]);
    });
    //breed
    for (const pair of breeders) {
        if (Math.random() > settings.crossoverRate)
            nextGen.push(...pair);
        else
            nextGen.push(settings.crossoverFunction(pair[0], pair[1]), settings.crossoverFunction(pair[0], pair[1]));
    }
    //mutate
    const mutatedNextGen = [];
    for (const organism of nextGen) {
        if (Math.random() > settings.mutationRate)
            mutatedNextGen.push(organism);
        else
            mutatedNextGen.push(settings.mutateFunction(organism));
    }
    nextGen = mutatedNextGen;
    // todo - threads per core - background worker. settings.numberCpuCores
    nextGen.map(organism => { organism.score = settings.fitnessFunction(organism); });
    //carry over elites unchanged
    nextGen.sort((a, b) => b.score - a.score);
    for (const elite of population.slice(0, settings.elitismCount)) {
        if (nextGen.includes(elite))
            continue;
        if (nextGen.slice(0, settings.elitismCount).some(organism => organism.score < elite.score))
            nextGen.push(elite);
    }
    nextGen.sort((a, b) => b.score - a.score);
    nextGen.splice(nextGen.length - settings.populationSize);
    return nextGen;
}
function getRandomItemFromList(list) {
    return list[Math.floor(Math.random() * list.length)];
}

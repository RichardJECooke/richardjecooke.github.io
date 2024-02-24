import * as gaTypes from './geneticAlgorithmTypes';

export function getSettings<T>(
    fitnessFunction: gaTypes.TFitnessFunction<T>,
    crossoverFunction: gaTypes.TCrossoverFunction<T>,
    mutateFunction: gaTypes.TMutateFunction<T>,
    populationDiversityFunction: gaTypes.TPopulationDiversityFunction<T>,
    populationSize: number = 100,
    elitismCount: number = 2,
    crossoverRate: number = 0.7,
    mutationRate: number = 0.01,
    diversityRateThreshold: number = 0.1,
    numberCpuCores: 1,
): gaTypes.TSettings<T> {
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

export function getNextGenerationAndAdjustSettings<T>(population: gaTypes.TOrganisms<T>, settings: gaTypes.TSettings<T>): gaTypes.TOrganisms<T> {
    let nextGen: gaTypes.TOrganisms<T> = [];

    // adjust settings if population diversity is too low
    const diversityRate = settings.populationDiversityFunction(population);
    if (diversityRate < settings.diversityRateThreshold) {
        settings.crossoverRate *= 1.1;
        settings.mutationRate *= 1.1;
    }

    // get pairs of breeders
    let breeders: gaTypes.TOrganisms<T>[] = [];
    Array.from({ length: settings.populationSize/2 }, () => {
        let competitors: gaTypes.TOrganisms<T> = [];
        while (competitors.length < 3){ // todo handle endless loop possibility
            const competitor = getRandomItemFromList(population);
            if (!competitors.includes(competitor))
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
            nextGen.push(settings.crossoverFunction(pair[0], pair[1]),
                         settings.crossoverFunction(pair[0], pair[1]));
    }

    //mutate
    const mutatedNextGen: gaTypes.TOrganisms<T> = []
    for (const organism of nextGen) {
        if (Math.random() > settings.mutationRate)
            mutatedNextGen.push(organism);
        else
            mutatedNextGen.push(settings.mutateFunction(organism));
    }
    nextGen = mutatedNextGen;

    // todo - threads per core - background worker. settings.numberCpuCores
    nextGen.map(organism => {organism.score = settings.fitnessFunction(organism);})

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

function getRandomItemFromList<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
}
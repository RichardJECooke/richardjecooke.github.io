export type TOrganism = {
    score: number;
};
export type TOrganisms = TOrganism[];
export type TFitnessFunction = (organism: TOrganism) => number;
export type TCrossoverFunction = (organism1: TOrganism, organism2: TOrganism) => TOrganism;
export type TMutateFunction = (organism: TOrganism) => TOrganism;
export type TPopulationDiversityFunction = (population: TOrganisms) => number;

export type TSettings = {
    populationSize: number,
    elitismCount: number,
    crossoverRate: number,
    mutationRate: number,
    diversityRateThreshold: number,
    numberCpuCores: number,

    fitnessFunction: TFitnessFunction,
    crossoverFunction: TCrossoverFunction,
    mutateFunction: TMutateFunction,
    populationDiversityFunction: TPopulationDiversityFunction
}

export function getSettings(
    fitnessFunction: TFitnessFunction,
    crossoverFunction: TCrossoverFunction,
    mutateFunction: TMutateFunction,
    populationDiversityFunction: TPopulationDiversityFunction,
    populationSize: number = 100,
    elitismCount: number = 2,
    crossoverRate: number = 0.7,
    mutationRate: number = 0.01,
    diversityRateThreshold: number = 0.1,
    numberCpuCores: 1,
): TSettings {
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

export function getNextGeneration(population: TOrganisms, settings: TSettings): TOrganisms {
    // return population;

//     a. Selection:
//         - Use tournament selection with a tournament size of 3 to select 50 pairs of parents
//     b. Crossover:
//         - Perform uniform crossover on selected pairs with a crossover rate of 0.7
//         - Generate 100 offspring
//     c. Mutation:
//         - Apply mutation with a rate of 0.01 to each offspring
//     d. Evaluate fitness of offspringer
//     e. Selection for next generation:
//         - Combine current population and offspring
//         - Use rank-based selection to select the top N=100 individuals for the next generation

//     e. Adaptation step:
//         - If diversity < DiversityThreshold, adjust CrossoverRate and MutationRate to increase diversity
//             - E.g., decrease CrossoverRate, increase MutationRate
//         - If improvement in best fitness stagnates, adjust parameters to explore more:
//             - E.g., slightly increase MutationRate or change ElitismCount

//     f. Selection for next generation:
//         - Include ElitismCount best individuals from the current generation unchanged
//         - Fill the rest of the next generation with the best offspring

//     g. Calculate diversity of the population (optional step for adaptive strategy)

// 5. Return the individual with the highest fitness from the final generation

// Note: The adaptation step (e) requires methods to measure diversity and to detect stagnation in
// fitness improvement. Diversity can be measured in various ways, such as the spread of fitness values,
// genetic variance, or using a specific diversity index. The adjustment of parameters should be done
// carefully to maintain a balance between exploration and exploitation.
    // add score to each organism
};

export

export type TSettings = {
    populationSize: number,
    fitnessFunction: TFitnessFunction
    // 2. Evaluate fitness of each individual

// 3. While termination condition not met (e.g., 100 generations):
//     a. Selection:
//         - Use tournament selection with a tournament size of 3 to select 50 pairs of parents
//     b. Crossover:
//         - Perform uniform crossover on selected pairs with a crossover rate of 0.7
//         - Generate 100 offspring
//     c. Mutation:
//         - Apply mutation with a rate of 0.01 to each offspring
//     d. Evaluate fitness of offspring
//     e. Selection for next generation:
//         - Combine current population and offspring
//         - Use rank-based selection to select the top N=100 individuals for the next generation

// 4. Return the individual with the highest fitness from the final generation

// ---

// 1. Initialize population with N=100 individuals
// 2. Evaluate fitness of each individual

// 3. Initialize parameters:
//     - ElitismCount = 2 (start with preserving 2 elite individuals)
//     - CrossoverRate = 0.7
//     - MutationRate = 0.01
//     - DiversityThreshold = some predefined value to maintain diversity

// 4. While termination condition not met (e.g., 100 generations):
//     a. Selection:
//         - Use tournament selection to select parents for breeding

//     b. Crossover:
//         - Perform uniform crossover on selected parents based on CrossoverRate

//     c. Mutation:
//         - Apply mutation to offspring based on MutationRate

//     d. Evaluate fitness of offspring

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

// Note: The adaptation step (e) requires methods to measure diversity and to detect stagnation in fitness improvement. Diversity can be measured in various ways, such as the spread of fitness values, genetic variance, or using a specific diversity index. The adjustment of parameters should be done carefully to maintain a balance between exploration and exploitation.

};

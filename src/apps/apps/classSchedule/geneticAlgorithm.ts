import * as types from './types';
import * as geneticAlgorithmTypes from './geneticAlgorithmTypes';

function getInitialSettings(): geneticAlgorithmTypes.TSettings {
    return {
    };
}

async function evolve(previousGeneration: types.Tschedules, input: types.Tinput) {
    const children: types.Tschedules = [];
    for (let organismIndex = 0; organismIndex < previousGeneration.length; organismIndex++) {
        const schedule = previousGeneration[organismIndex];
        const breedingChance = (input.settings.populationSize - organismIndex) / input.settings.populationSize;
        if (Math.random() + breedingChance < 1)
            continue;
        for (let childCounter = 0; childCounter < input.settings.numberOfChildrenPerBreeder*input.settings.populationSize; childCounter++) {
            const partner = getRandomItemFromList(previousGeneration);
            const child: types.Tschedule = {lessons: [], score: 0};
            for (let gene = 0; gene < schedule.lessons.length; gene++) {
                if (Math.random() > 0.5)
                    child.lessons.push(schedule.lessons[gene]);
                else
                    child.lessons.push(partner.lessons[gene]);
            }
            child.score = scoreSchedule(child, input);
            children.push(child);
        }
    };
    const previousGenerationAndChildren = [...previousGeneration, ...children];
    console.log(previousGenerationAndChildren.length);
    previousGenerationAndChildren.sort((a,b) => b.score - a.score);
    const newGeneration = previousGenerationAndChildren.slice(0, (1-input.settings.numberRandomsInNewGeneration)*input.settings.populationSize);
    // TODO update to TS 5.2
    // const newGeneration = [...previousGeneration, ...children]
    //     .toSorted((a,b) => b.score - a.score)
    //     .slice(0, (1-input.settings.numberRandomsInNewGeneration)*input.settings.populationSize);
    if (newGeneration[0].score > previousGeneration[0].score)
        showSchedule(newGeneration[0], input);
    for (let i = 0; i < input.settings.populationSize * input.settings.numberRandomsInNewGeneration; i++)
        newGeneration.push(getRandomScheduleWithScore(input));
    newGeneration.sort((a,b) => b.score - a.score);
    globalThis.setTimeout(() => evolve(newGeneration, input), 500);
}

function getRandomItemFromList<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
}


// 1. Initialize population with N=100 individuals
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

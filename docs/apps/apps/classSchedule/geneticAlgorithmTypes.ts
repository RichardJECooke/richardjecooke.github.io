export type TSettings<T> = {
    populationSize: number,
    elitismCount: number,
    crossoverRate: number,
    mutationRate: number,
    diversityRateThreshold: number,
    numberCpuCores: number,

    fitnessFunction: TFitnessFunction<T>,
    crossoverFunction: TCrossoverFunction<T>,
    mutateFunction: TMutateFunction<T>,
    populationDiversityFunction: TPopulationDiversityFunction<T>
}
export type TOrganism<T> = {
    data: T,
    score: number
};
export type TOrganisms<T> = TOrganism<T>[];
export type TFitnessFunction<T> = (organism: TOrganism<T>) => number;
export type TCrossoverFunction<T> = (organism1: TOrganism<T>, organism2: TOrganism<T>) => TOrganism<T>;
export type TMutateFunction<T> = (organism: TOrganism<T>) => TOrganism<T>;
export type TPopulationDiversityFunction<T> = (population: TOrganisms<T>) => number;
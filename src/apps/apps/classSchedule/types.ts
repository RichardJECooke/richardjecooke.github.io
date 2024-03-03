import * as gaTypes from 'geneticAlgorithmTypes';

export type Tinput = {
    courses: Tcourses,
    rooms: Trooms,
    settings: {
        minDay: number,
        maxDay: number,
        minPeriod: number,
        maxPeriod: number
    },
    rules: Trules
};
export type Troom = {name: string, numStudents: number};
export type Trooms = Troom[];
export type Tcourse = {code: string, teacher: string, numClasses: number, numStudents: number};
export type Tcourses = Tcourse[];
export type Tlesson = {id: number, course: Tcourse, day: number, period: number, room: string};
export type Tlessons = Tlesson[];
export type Tschedule = {data: Tlessons, score: number} & gaTypes.TOrganism<Tlessons>;
export type Tschedules = Tschedule[] & gaTypes.TOrganisms<Tlessons>;
export type Trule = {description: string, rule: string, score: number};
export type Trules = Trule[];
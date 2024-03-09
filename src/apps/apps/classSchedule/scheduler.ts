import * as types from './types';

export function getRandomScheduleWithScore(input: types.Tinput): types.Tschedule {
    const schedule = getRandomSchedule(input);
    schedule.score = scoreSchedule(schedule, input);
    return schedule;
}

export function getCodesAtTime(schedule: types.Tschedule, day: number, period: number): string {
    const result = schedule.data
        .filter(c => c.day == day && c.period == period)
        .map(c => c.course.code)
        .join(' ');
    return (!result) ? '_' : result;
}

export function getScoreScheduleFunction(input: types.Tinput): (schedule: types.Tschedule) => number {
    return function(schedule: types.Tschedule): number {
        return scoreSchedule(schedule, input);
    };
}

function scoreSchedule(schedule: types.Tschedule, input: types.Tinput): number {
    const score = schedule.data
        .map(l => schedule.data.filter(l2 =>
            l2.id !== l.id &&
            l2.period === l.period &&
            l2.day === l.day &&
            l2.room === l.room).length)
        .reduce((acc, curr) => acc + curr, 0);
    return score * -1000;
}

export function crossoverSchedules(scheduleA: types.Tschedule, scheduleB: types.Tschedule): types.Tschedule {
    const newSchedule: types.Tschedule = {score: -1, data: []}
    for (let idCounter = 0; idCounter < scheduleA.data.length; idCounter++) {
        if (Math.random() < 0.5)
            newSchedule.data.push(scheduleA.data.find((lesson) => lesson.id == idCounter) as types.Tlesson)
        else
            newSchedule.data.push(scheduleB.data.find((lesson) => lesson.id == idCounter) as types.Tlesson)
    }
    return newSchedule;
}

export function getSchedulesDiversity(schedules: types.Tschedules): number {
    // x * (x-1) permutations of pairs from x elements
    const maximum = 3 * schedules[0].data.length * schedules.length * (schedules.length-1); // day, period, room different for every lesson for every schedule
    let difference = 0;
    for (let scheduleA of schedules) {
        for (let scheduleB of schedules) {
            if (scheduleA == scheduleB)
                continue;
            for (let lessonA of scheduleA.data) {
                const lessonB = scheduleB.data.find(l => l.id == lessonA.id)
                if (!lessonB) throw new Error("Lesson not found");
                if (lessonA.day != lessonB.day) difference++;
                if (lessonA.period != lessonB.period) difference++;
                if (lessonA.room != lessonB.room) difference++;
            }
        }
    };
    return difference / maximum;
}

export function getMutateScheduleFunction(input: types.Tinput, getPercentOrganismToMutate: () => number): (schedule: types.Tschedule) => types.Tschedule {
    return function(schedule: types.Tschedule): types.Tschedule {
        return mutateSchedule(schedule, input, getPercentOrganismToMutate);
    };
}

function mutateSchedule(schedule: types.Tschedule, input: types.Tinput, getPercentOrganismToMutate: () => number): types.Tschedule {
    const percentOrganismToMutate = getPercentOrganismToMutate();
    const newSchedule: types.Tschedule = {score: -1, data: []};
    const mutatedSchedule: types.Tschedule = {score: -1, data: []};
    while (mutatedSchedule.data.length / schedule.data.length < percentOrganismToMutate) {
        const lessonToMutate = getRandomItemFromList<types.Tlesson>(schedule.data);
        if (mutatedSchedule.data.find(l => lessonToMutate.id == l.id))
            continue;
        mutatedSchedule.data.push({...lessonToMutate});
    }
    for (let mutatedLesson of mutatedSchedule.data) {
        const whatToChange = Math.random();
        if (whatToChange < 0.143)
            mutatedLesson.day = getRandomDay(input);
        else if (whatToChange < 0.286)
            mutatedLesson.period = getRandomPeriod(input);
        else if (whatToChange < 0.429)
            mutatedLesson.room = getRandomRoomThatIsBigEnough(mutatedLesson.course, input.rooms).name;
        else if (whatToChange < 0.571) {
            mutatedLesson.day = getRandomDay(input);
            mutatedLesson.period = getRandomPeriod(input);
        }
        else if (whatToChange < 0.714) {
            mutatedLesson.day = getRandomDay(input);
            mutatedLesson.room = getRandomRoomThatIsBigEnough(mutatedLesson.course, input.rooms).name;
        }
        else if (whatToChange < 0.857) {
            mutatedLesson.period = getRandomPeriod(input);
            mutatedLesson.room = getRandomRoomThatIsBigEnough(mutatedLesson.course, input.rooms).name;
        }
        else {
            mutatedLesson.day = getRandomDay(input);
            mutatedLesson.period = getRandomPeriod(input);
            mutatedLesson.room = getRandomRoomThatIsBigEnough(mutatedLesson.course, input.rooms).name;
        }
    }
    schedule.data.map(lesson => {
        const mutatedLesson = mutatedSchedule.data.find(l => l.id == lesson.id);
        if (mutatedLesson)
            newSchedule.data.push(mutatedLesson)
        else
            newSchedule.data.push(lesson);
    });
    return newSchedule;
}


function getRandomSchedule(input: types.Tinput): types.Tschedule {
    const lessonList = getListOfWeeklyLessons(input.courses);
    const schedule: types.Tschedule = {data: [], score: 0};
    for (const [index, lesson] of lessonList.entries()) {
        schedule.data.push({
            id: index,
            course: lesson,
            day: getRandomDay(input),
            period: getRandomPeriod(input),
            room: getRandomRoomThatIsBigEnough(lesson, input.rooms).name});
    }
    return schedule;
}

function getListOfWeeklyLessons(courses: types.Tcourses): types.Tcourses {
    return courses.flatMap(c => Array.from({ length: c.numClasses }, () => c));
}

function getRandomRoomThatIsBigEnough(course: types.Tcourse, rooms: types.Trooms): types.Troom {
    return getRandomItemFromList(rooms.filter(r => r.numStudents >= course.numStudents));
}

function getRandomItemFromList<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
}

function getRandomDay(input: types.Tinput): number {
    return Math.ceil(Math.random() * input.settings.maxDay + 1) - input.settings.minDay;
}

function getRandomPeriod(input: types.Tinput): number {
    return Math.ceil(Math.random() * input.settings.maxPeriod + 1) - input.settings.minPeriod;
}

export function getData(): types.Tinput {
    return {
        courses: [
            {code: 'MUZ439', teacher: 'Thomas', numClasses: 3, numStudents: 26},
            {code: 'MUZ480', teacher: 'Thomas', numClasses: 5, numStudents: 18},
            {code: 'MUZ436', teacher: 'Moore', numClasses: 4, numStudents: 24},
            {code: 'MUZ275', teacher: 'Clark', numClasses: 1, numStudents: 11},
            {code: 'MUZ408', teacher: 'Brown', numClasses: 1, numStudents: 30},
            {code: 'MUZ114', teacher: 'White', numClasses: 2, numStudents: 8},
            {code: 'MUZ241', teacher: 'Lopez', numClasses: 1, numStudents: 22},
            {code: 'MUZ414', teacher: 'Jones', numClasses: 5, numStudents: 16},
            {code: 'MUZ213', teacher: 'Rodriguez', numClasses: 3, numStudents: 7},
            {code: 'MUZ334', teacher: 'Williams', numClasses: 4, numStudents: 20},
            {code: 'MUZ322', teacher: 'Smith', numClasses: 2, numStudents: 29},
            {code: 'MUZ143', teacher: 'Martinez', numClasses: 1, numStudents: 3},
            {code: 'MUZ312', teacher: 'Gonzalez', numClasses: 5, numStudents: 15},
            {code: 'MUZ230', teacher: 'Hernandez', numClasses: 2, numStudents: 30},
            {code: 'MUZ401', teacher: 'Miller', numClasses: 1, numStudents: 12},
            {code: 'MUZ149', teacher: 'Wilson', numClasses: 3, numStudents: 6},
            {code: 'MUZ362', teacher: 'Anderson', numClasses: 5, numStudents: 23},
            {code: 'MUZ324', teacher: 'Taylor', numClasses: 4, numStudents: 10},
            {code: 'MUZ286', teacher: 'Moore', numClasses: 1, numStudents: 5},
            {code: 'MUZ172', teacher: 'Jackson', numClasses: 2, numStudents: 19},
            {code: 'MUZ435', teacher: 'Martin', numClasses: 3, numStudents: 14},
            {code: 'MUZ221', teacher: 'Lee', numClasses: 4, numStudents: 21},
            {code: 'MUZ318', teacher: 'Perez', numClasses: 5, numStudents: 13},
            {code: 'MUZ302', teacher: 'Thompson', numClasses: 1, numStudents: 9},
            {code: 'MUZ287', teacher: 'White', numClasses: 2, numStudents: 27},
            {code: 'MUZ183', teacher: 'Harris', numClasses: 3, numStudents: 17},
            {code: 'MUZ490', teacher: 'Sanchez', numClasses: 4, numStudents: 4},
            {code: 'MUZ352', teacher: 'Clark', numClasses: 5, numStudents: 26},
            {code: 'MUZ167', teacher: 'Ramirez', numClasses: 1, numStudents: 8},
            {code: 'MUZ284', teacher: 'Lewis', numClasses: 2, numStudents: 22},
            {code: 'MUZ313', teacher: 'Robinson', numClasses: 3, numStudents: 15},
            {code: 'MUZ402', teacher: 'Smith', numClasses: 4, numStudents: 7},
            {code: 'MUZ198', teacher: 'Johnson', numClasses: 5, numStudents: 20},
            {code: 'MUZ376', teacher: 'Brown', numClasses: 1, numStudents: 11},
            {code: 'MUZ253', teacher: 'Garcia', numClasses: 2, numStudents: 29},
            {code: 'MUZ428', teacher: 'Miller', numClasses: 3, numStudents: 6},
            {code: 'MUZ117', teacher: 'Davis', numClasses: 4, numStudents: 24},
            {code: 'MUZ396', teacher: 'Rodriguez', numClasses: 5, numStudents: 12},
            {code: 'MUZ248', teacher: 'Martinez', numClasses: 1, numStudents: 18},
            {code: 'MUZ307', teacher: 'Hernandez', numClasses: 2, numStudents: 10},
            {code: 'MUZ226', teacher: 'Lopez', numClasses: 3, numStudents: 23},
            {code: 'MUZ145', teacher: 'Gonzalez', numClasses: 4, numStudents: 5},
            {code: 'MUZ374', teacher: 'Wilson', numClasses: 5, numStudents: 19},
            {code: 'MUZ280', teacher: 'Anderson', numClasses: 1, numStudents: 14},
            {code: 'MUZ119', teacher: 'Thomas', numClasses: 2, numStudents: 28},
            {code: 'MUZ348', teacher: 'Taylor', numClasses: 3, numStudents: 9},
            {code: 'MUZ239', teacher: 'Moore', numClasses: 4, numStudents: 30},
            {code: 'MUZ111', teacher: 'Jackson', numClasses: 5, numStudents: 16},
            {code: 'MUZ396', teacher: 'Martin', numClasses: 1, numStudents: 27},
            {code: 'MUZ247', teacher: 'Lee', numClasses: 2, numStudents: 13},
            {code: 'MUZ358', teacher: 'Perez', numClasses: 3, numStudents: 21},
            {code: 'MUZ302', teacher: 'Thompson', numClasses: 4, numStudents: 17},
            {code: 'MUZ195', teacher: 'White', numClasses: 5, numStudents: 8},
            {code: 'MUZ385', teacher: 'Harris', numClasses: 1, numStudents: 25},
            {code: 'MUZ146', teacher: 'Sanchez', numClasses: 2, numStudents: 29},
            {code: 'MUZ439', teacher: 'Clark', numClasses: 3, numStudents: 4},
            {code: 'MUZ312', teacher: 'Ramirez', numClasses: 4, numStudents: 22},
            {code: 'MUZ273', teacher: 'Lewis', numClasses: 5, numStudents: 11},
            {code: 'MUZ414', teacher: 'Robinson', numClasses: 1, numStudents: 20},
            {code: 'MUZ254', teacher: 'Smith', numClasses: 2, numStudents: 15},
            {code: 'MUZ389', teacher: 'Johnson', numClasses: 3, numStudents: 7},
            {code: 'MUZ310', teacher: 'Brown', numClasses: 4, numStudents: 26},
            {code: 'MUZ179', teacher: 'Garcia', numClasses: 5, numStudents: 12}
        ],
        rooms: [
            {name: 'U2', numStudents: 23},
            {name: 'E4', numStudents: 14},
            {name: 'P7', numStudents: 30},
            {name: 'M8', numStudents: 13},
            {name: 'H1', numStudents: 39},
            {name: 'X3', numStudents: 7},
            {name: 'C5', numStudents: 35},
            {name: 'G9', numStudents: 18},
            {name: 'B6', numStudents: 26},
            {name: 'A3', numStudents: 21},
            {name: 'J2', numStudents: 40},
            {name: 'F7', numStudents: 12},
            {name: 'D4', numStudents: 28},
            {name: 'K8', numStudents: 5},
            {name: 'L1', numStudents: 33}
        ],
        settings: {
            minDay: 1,
            maxDay: 5,
            minPeriod: 1,
            maxPeriod: 8,
        },
        rules: [
            {description: "Room clash", rule: "schedule.lessons.", score: -1000}
        ]
    };
}
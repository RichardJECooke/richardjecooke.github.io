import * as types from './types';
import * as geneticAlgorithmTypes from './geneticAlgorithmTypes';

export function getRandomScheduleWithScore(input: types.Tinput): types.Tschedule {
    const schedule = getRandomSchedule(input);
    schedule.score = scoreSchedule(schedule, input);
    return schedule;
}

export function getCodesAtTime(schedule: types.Tschedule, day: number, period: number): string {
    const result = schedule.data
        .filter(c => c.day == day && c.period == period)
        .map(c => c.code)
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

export function getCrossoverScheduleFunction(input: types.Tinput): (scheduleA: types.Tschedule, scheduleB: types.Tschedule) => types.Tschedule {
    return function(scheduleA: types.Tschedule, scheduleB: types.Tschedule): types.Tschedule {
        return crossoverSchedules(scheduleA, scheduleB, input);
    };
}

function crossoverSchedules(scheduleA: types.Tschedule, scheduleB: types.Tschedule, input: types.Tinput): types.Tschedule {
    const newSchedule: types.Tschedule = {score: -1, data: []}
    for (let idCounter = 0; idCounter < scheduleA.data.length; idCounter++) {
        if (Math.random() < 0.5)
            newSchedule.data.push(scheduleA.data.find((lesson) => lesson.id == idCounter) as types.Tlesson)
        else
            newSchedule.data.push(scheduleB.data.find((lesson) => lesson.id == idCounter) as types.Tlesson)
    }
    return newSchedule;
}

function getRandomSchedule(input: types.Tinput): types.Tschedule {
    const lessonList = getListOfWeeklyLessons(input.courses);
    const schedule: types.Tschedule = {data: [], score: 0};
    for (const [index, lesson] of lessonList.entries()) {
        schedule.data.push({
            id: index,
            code: lesson.code,
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
            {code: 'MUZ439', teacher: 'Thomas', numClasses: 3, numStudents: 26, room: ''},
            {code: 'MUZ480', teacher: 'Thomas', numClasses: 5, numStudents: 18, room: ''},
            {code: 'MUZ436', teacher: 'Moore', numClasses: 4, numStudents: 24, room: ''},
            {code: 'MUZ275', teacher: 'Clark', numClasses: 1, numStudents: 11, room: ''},
            {code: 'MUZ408', teacher: 'Brown', numClasses: 1, numStudents: 30, room: ''},
            {code: 'MUZ114', teacher: 'White', numClasses: 2, numStudents: 8, room: ''},
            {code: 'MUZ241', teacher: 'Lopez', numClasses: 1, numStudents: 22, room: ''},
            {code: 'MUZ414', teacher: 'Jones', numClasses: 5, numStudents: 16, room: ''},
            {code: 'MUZ213', teacher: 'Rodriguez', numClasses: 3, numStudents: 7, room: ''},
            {code: 'MUZ334', teacher: 'Williams', numClasses: 4, numStudents: 20, room: ''},
            {code: 'MUZ322', teacher: 'Smith', numClasses: 2, numStudents: 29, room: ''},
            {code: 'MUZ143', teacher: 'Martinez', numClasses: 1, numStudents: 3, room: ''},
            {code: 'MUZ312', teacher: 'Gonzalez', numClasses: 5, numStudents: 15, room: ''},
            {code: 'MUZ230', teacher: 'Hernandez', numClasses: 2, numStudents: 30, room: ''},
            {code: 'MUZ401', teacher: 'Miller', numClasses: 1, numStudents: 12, room: ''},
            {code: 'MUZ149', teacher: 'Wilson', numClasses: 3, numStudents: 6, room: ''},
            {code: 'MUZ362', teacher: 'Anderson', numClasses: 5, numStudents: 23, room: ''},
            {code: 'MUZ324', teacher: 'Taylor', numClasses: 4, numStudents: 10, room: ''},
            {code: 'MUZ286', teacher: 'Moore', numClasses: 1, numStudents: 5, room: ''},
            {code: 'MUZ172', teacher: 'Jackson', numClasses: 2, numStudents: 19, room: ''},
            {code: 'MUZ435', teacher: 'Martin', numClasses: 3, numStudents: 14, room: ''},
            {code: 'MUZ221', teacher: 'Lee', numClasses: 4, numStudents: 21, room: ''},
            {code: 'MUZ318', teacher: 'Perez', numClasses: 5, numStudents: 13, room: ''},
            {code: 'MUZ302', teacher: 'Thompson', numClasses: 1, numStudents: 9, room: ''},
            {code: 'MUZ287', teacher: 'White', numClasses: 2, numStudents: 27, room: ''},
            {code: 'MUZ183', teacher: 'Harris', numClasses: 3, numStudents: 17, room: ''},
            {code: 'MUZ490', teacher: 'Sanchez', numClasses: 4, numStudents: 4, room: ''},
            {code: 'MUZ352', teacher: 'Clark', numClasses: 5, numStudents: 26, room: ''},
            {code: 'MUZ167', teacher: 'Ramirez', numClasses: 1, numStudents: 8, room: ''},
            {code: 'MUZ284', teacher: 'Lewis', numClasses: 2, numStudents: 22, room: ''},
            {code: 'MUZ313', teacher: 'Robinson', numClasses: 3, numStudents: 15, room: ''},
            {code: 'MUZ402', teacher: 'Smith', numClasses: 4, numStudents: 7, room: ''},
            {code: 'MUZ198', teacher: 'Johnson', numClasses: 5, numStudents: 20, room: ''},
            {code: 'MUZ376', teacher: 'Brown', numClasses: 1, numStudents: 11, room: ''},
            {code: 'MUZ253', teacher: 'Garcia', numClasses: 2, numStudents: 29, room: ''},
            {code: 'MUZ428', teacher: 'Miller', numClasses: 3, numStudents: 6, room: ''},
            {code: 'MUZ117', teacher: 'Davis', numClasses: 4, numStudents: 24, room: ''},
            {code: 'MUZ396', teacher: 'Rodriguez', numClasses: 5, numStudents: 12, room: ''},
            {code: 'MUZ248', teacher: 'Martinez', numClasses: 1, numStudents: 18, room: ''},
            {code: 'MUZ307', teacher: 'Hernandez', numClasses: 2, numStudents: 10, room: ''},
            {code: 'MUZ226', teacher: 'Lopez', numClasses: 3, numStudents: 23, room: ''},
            {code: 'MUZ145', teacher: 'Gonzalez', numClasses: 4, numStudents: 5, room: ''},
            {code: 'MUZ374', teacher: 'Wilson', numClasses: 5, numStudents: 19, room: ''},
            {code: 'MUZ280', teacher: 'Anderson', numClasses: 1, numStudents: 14, room: ''},
            {code: 'MUZ119', teacher: 'Thomas', numClasses: 2, numStudents: 28, room: ''},
            {code: 'MUZ348', teacher: 'Taylor', numClasses: 3, numStudents: 9, room: ''},
            {code: 'MUZ239', teacher: 'Moore', numClasses: 4, numStudents: 30, room: ''},
            {code: 'MUZ111', teacher: 'Jackson', numClasses: 5, numStudents: 16, room: ''},
            {code: 'MUZ396', teacher: 'Martin', numClasses: 1, numStudents: 27, room: ''},
            {code: 'MUZ247', teacher: 'Lee', numClasses: 2, numStudents: 13, room: ''},
            {code: 'MUZ358', teacher: 'Perez', numClasses: 3, numStudents: 21, room: ''},
            {code: 'MUZ302', teacher: 'Thompson', numClasses: 4, numStudents: 17, room: ''},
            {code: 'MUZ195', teacher: 'White', numClasses: 5, numStudents: 8, room: ''},
            {code: 'MUZ385', teacher: 'Harris', numClasses: 1, numStudents: 25, room: ''},
            {code: 'MUZ146', teacher: 'Sanchez', numClasses: 2, numStudents: 29, room: ''},
            {code: 'MUZ439', teacher: 'Clark', numClasses: 3, numStudents: 4, room: ''},
            {code: 'MUZ312', teacher: 'Ramirez', numClasses: 4, numStudents: 22, room: ''},
            {code: 'MUZ273', teacher: 'Lewis', numClasses: 5, numStudents: 11, room: ''},
            {code: 'MUZ414', teacher: 'Robinson', numClasses: 1, numStudents: 20, room: ''},
            {code: 'MUZ254', teacher: 'Smith', numClasses: 2, numStudents: 15, room: ''},
            {code: 'MUZ389', teacher: 'Johnson', numClasses: 3, numStudents: 7, room: ''},
            {code: 'MUZ310', teacher: 'Brown', numClasses: 4, numStudents: 26, room: ''},
            {code: 'MUZ179', teacher: 'Garcia', numClasses: 5, numStudents: 12, room: ''}
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
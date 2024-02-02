// cd richardjecooke.github.io/src/apps/apps/classSchedule; npx tsc;

document.addEventListener('DOMContentLoaded', function() {
    const input = getData();
    const generation: Tschedules = [];
    for (let i = 1; i < input.settings.populationSize; i++)
        generation.push(getRandomScheduleWithScore(input));
    generation.sort((a,b) => b.score - a.score);
    showSchedule(generation[0], input);
    globalThis.setTimeout(() => evolve(generation, input), 10);
});

type Tinput = {
    courses: Tcourses,
    rooms: Trooms,
    settings: {
        minDay: number,
        maxDay: number,
        minPeriod: number,
        maxPeriod: number
        populationSize: number,
        numberOfChildrenPerBreeder: number,
        numberRandomsInNewGeneration: number
    },
    rules: Trules
};
type Troom = {name: string, numStudents: number};
type Trooms = Troom[];
type Tcourse = {code: string, teacher: string, numClasses: number, numStudents: number, room: string};
type Tcourses = Tcourse[];
type Tlesson = {id: number, code: string, day: number, period: number, room: string};
type Tschedule = {lessons: Array<Tlesson>, score: number};
type Tschedules = Tschedule[];
type Trule = {description: string, rule: string, score: number};
type Trules = Trule[];

async function evolve(previousGeneration: Tschedules, input: Tinput) {
    const children: Tschedules = [];
    for (let organismIndex = 0; organismIndex < previousGeneration.length; organismIndex++) {
        const schedule = previousGeneration[organismIndex];
        const breedingChance = (input.settings.populationSize - organismIndex) / input.settings.populationSize;
        if (Math.random() + breedingChance < 1)
            continue;
        for (let childCounter = 0; childCounter < input.settings.numberOfChildrenPerBreeder*input.settings.populationSize; childCounter++) {
            const partner = getRandomItemFromList(previousGeneration);
            const child: Tschedule = {lessons: [], score: 0};
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
    previousGeneration.map((s) => children.push(s));
    children.sort((a,b) => b.score - a.score);
    if (children[0].score > previousGeneration[0].score)
        showSchedule(children[0], input);
    const newGeneration = children.slice(0, (1-input.settings.numberRandomsInNewGeneration)*input.settings.populationSize);
    for (let i = 0; i < input.settings.populationSize * input.settings.numberRandomsInNewGeneration; i++)
        newGeneration.push(getRandomScheduleWithScore(input));
    newGeneration.sort((a,b) => b.score - a.score);
    globalThis.setTimeout(() => evolve(newGeneration, input), 10);
}

function  getRandomScheduleWithScore(input: Tinput): Tschedule {
    const schedule = getRandomSchedule(input);
    schedule.score = scoreSchedule(schedule, input);
    return schedule;
}

function scoreSchedule(schedule: Tschedule, input: Tinput): number {
    const score = schedule.lessons
        .map(l => schedule.lessons.filter(l2 =>
            l2.id !== l.id &&
            l2.period === l.period &&
            l2.day === l.day &&
            l2.room === l.room).length)
        .reduce((acc, curr) => acc + curr, 0);
    return score * -1000;
}

function showSchedule(schedule: Tschedule, input: Tinput) {
    if (document.querySelector('#score') != null)
        document.querySelector('#score')!.innerHTML = schedule.score.toString();
    const tbody = document.querySelector('tbody');
    if (!tbody) return;
    tbody.innerHTML = "";
    for (let period = input.settings.minPeriod; period <= input.settings.maxPeriod; period++) {
        const tr = document.createElement('tr');
        for (let day = input.settings.minDay; day <= input.settings.maxDay; day++) {
            const td = document.createElement('td');
            const div = document.createElement('div');
            div.className = "bg-slate-800 m-1 p-1"; // opacity-0 transition-opacity duration-500
            div.textContent = getCodesAtTime(schedule, day, period);
            td.appendChild(div);
            tr.appendChild(td);   // setTimeout(() => { div.classList.remove('opacity-0'); }, 2000 * Math.random());
        }
        tbody.appendChild(tr);
    }
}

function getCodesAtTime(schedule: Tschedule, day: number, period: number): string {
    const result = schedule.lessons
        .filter(c => c.day == day && c.period == period)
        .map(c => c.code)
        .join(' ');
    return (!result) ? '_' : result;
}

function getRandomSchedule(input: Tinput): Tschedule {
    const lessonList = getListOfWeeklyLessons(input.courses);
    const schedule: Tschedule = {lessons: [], score: 0};
    for (const [index, lesson] of lessonList.entries()) {
        schedule.lessons.push({
            id: index,
            code: lesson.code,
            day: getRandomDay(input),
            period: getRandomPeriod(input),
            room: getRandomRoomThatIsBigEnough(lesson, input.rooms).name});
    }
    return schedule;
}

function getListOfWeeklyLessons(courses: Tcourses): Tcourses {
    return courses.flatMap(c => Array.from({ length: c.numClasses }, () => c));
}

function getRandomRoomThatIsBigEnough(course: Tcourse, rooms: Trooms): Troom {
    return getRandomItemFromList(rooms.filter(r => r.numStudents >= course.numStudents));
}

function getRandomItemFromList<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
}

function getRandomDay(input: Tinput): number {
    return Math.ceil(Math.random() * input.settings.maxDay + 1) - input.settings.minDay;
}

function getRandomPeriod(input: Tinput): number {
    return Math.ceil(Math.random() * input.settings.maxPeriod + 1) - input.settings.minPeriod;
}

function getData(): Tinput {
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
            populationSize: 100,
            numberOfChildrenPerBreeder: 0.02,
            numberRandomsInNewGeneration: 0.2
        },
        rules: [
            {description: "Room clash", rule: "schedule.lessons.", score: -1000}
        ]
    };
}
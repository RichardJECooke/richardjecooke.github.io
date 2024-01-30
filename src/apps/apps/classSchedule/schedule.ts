// npm install typescript; npx tsc --outDir src/apps/apps/classSchedule/js src/apps/apps/classSchedule/*.ts;

generateTableRows();
setInterval(swapCell, 2000);

function generateTableRows() {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;
    for (let row = 1; row <= 8; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 5; col++) {
            const td = document.createElement('td');
            const div = document.createElement('div');
            div.className = "bg-slate-800 m-1 p-1 opacity-0 transition-opacity duration-500";
            div.textContent = Math.floor(Math.random()*10000000000).toString();
            td.appendChild(div);
            tr.appendChild(td);
            setTimeout(() => { div.classList.remove('opacity-0'); }, 2000 * Math.random());
        }
        tbody.appendChild(tr);
    }
}

function swapCell() {
    const cells: NodeListOf<HTMLTableCellElement> = document.querySelectorAll('tbody td');
    let index1 = Math.floor(Math.random() * cells.length);
    let index2;
    do {
        index2 = Math.floor(Math.random() * cells.length);
    } while (index1 === index2);
    const cell1 = cells[index1];
    const cell2 = cells[index2];
    const rect1 = cell1.getBoundingClientRect();
    const rect2 = cell2.getBoundingClientRect();
    const translateX1 = rect2.left - rect1.left;
    const translateY1 = rect2.top - rect1.top;
    const translateX2 = rect1.left - rect2.left;
    const translateY2 = rect1.top - rect2.top;
    cell1.style.transition = 'transform 1000ms';
    cell2.style.transition = 'transform 1000ms';
    cell1.style.transform = `translate(${translateX1}px, ${translateY1}px)`;
    cell2.style.transform = `translate(${translateX2}px, ${translateY2}px)`;
    setTimeout(() => { // swap the cells after animation has finished and remove the transform
        cell1.style.transition = '';
        cell2.style.transition = '';
        cell1.style.transform = '';
        cell2.style.transform = '';
        const cell1Clone = cell1.cloneNode(true);
        const cell2Clone = cell2.cloneNode(true);
        cell1.parentNode?.insertBefore(cell2Clone, cell1);
        cell2.parentNode?.insertBefore(cell1Clone, cell2);
        cell1.parentNode?.removeChild(cell1);
        cell2.parentNode?.removeChild(cell2);
    }, 1000);
}

function getData() {
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
        ]
    };
}

function getRandomRoomThatIsBigEnough(course, rooms) {
    return getRandom(rooms.filter(r => r.numStudents >= course.numStudents));
}

function getRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function getRandomSchedule(courses, rooms) {
    const lessonList = getListOfWeeklyLessons(courses);

}

function getListOfWeeklyLessons(courses) {
    // const result = [];
    // courses.map(c => {for (i = 1; i <= c.numClasses; i++) {result.push[c.code]}});
    return courses.flatMap(c => Array.from({ length: c.numClasses }, () => c.code));
    // return result;
}
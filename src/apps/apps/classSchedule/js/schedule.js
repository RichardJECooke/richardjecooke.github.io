// npm install typescript; npx tsc --outDir src/apps/apps/classSchedule/js src/apps/apps/classSchedule/*.ts;
document.addEventListener('DOMContentLoaded', function () {
    // generateTableRows();
    // setInterval(swapCell, 2000);
    var input = getData();
    // setInterval(() => {showSchedule(getRandomSchedule(input), input)}, 1000);
    var schedule = getRandomSchedule(input);
    showSchedule(schedule, input);
    // console.dir(schedule);
});
function showSchedule(schedule, input) {
    var tbody = document.querySelector('tbody');
    if (!tbody)
        return;
    tbody.innerHTML = "";
    for (var period = input.settings.minPeriod; period <= input.settings.maxPeriod; period++) {
        var tr = document.createElement('tr');
        for (var day = input.settings.minDay; day <= input.settings.maxDay; day++) {
            var td = document.createElement('td');
            var div = document.createElement('div');
            div.className = "bg-slate-800 m-1 p-1"; // opacity-0 transition-opacity duration-500
            div.textContent = getCodesAtTime(schedule, day, period);
            td.appendChild(div);
            tr.appendChild(td);
            // setTimeout(() => { div.classList.remove('opacity-0'); }, 2000 * Math.random());
        }
        tbody.appendChild(tr);
    }
}
function getCodesAtTime(schedule, day, period) {
    var result = schedule
        .filter(function (c) { return c.day == day && c.period == period; })
        .map(function (c) { return c.code; })
        .join(' ');
    return (!result) ? '_' : result;
}
function generateTableRows() {
    var tbody = document.querySelector('tbody');
    if (!tbody)
        return;
    for (var row = 1; row <= 8; row++) {
        var tr = document.createElement('tr');
        var _loop_1 = function (col) {
            var td = document.createElement('td');
            var div = document.createElement('div');
            div.className = "bg-slate-800 m-1 p-1 opacity-0 transition-opacity duration-500";
            div.textContent = Math.floor(Math.random() * 10000000000).toString();
            td.appendChild(div);
            tr.appendChild(td);
            setTimeout(function () { div.classList.remove('opacity-0'); }, 2000 * Math.random());
        };
        for (var col = 0; col < 5; col++) {
            _loop_1(col);
        }
        tbody.appendChild(tr);
    }
}
function swapCell() {
    var cells = document.querySelectorAll('tbody td');
    var index1 = Math.floor(Math.random() * cells.length);
    var index2;
    do {
        index2 = Math.floor(Math.random() * cells.length);
    } while (index1 === index2);
    var cell1 = cells[index1];
    var cell2 = cells[index2];
    var rect1 = cell1.getBoundingClientRect();
    var rect2 = cell2.getBoundingClientRect();
    var translateX1 = rect2.left - rect1.left;
    var translateY1 = rect2.top - rect1.top;
    var translateX2 = rect1.left - rect2.left;
    var translateY2 = rect1.top - rect2.top;
    cell1.style.transition = 'transform 1000ms';
    cell2.style.transition = 'transform 1000ms';
    cell1.style.transform = "translate(".concat(translateX1, "px, ").concat(translateY1, "px)");
    cell2.style.transform = "translate(".concat(translateX2, "px, ").concat(translateY2, "px)");
    setTimeout(function () {
        var _a, _b, _c, _d;
        cell1.style.transition = '';
        cell2.style.transition = '';
        cell1.style.transform = '';
        cell2.style.transform = '';
        var cell1Clone = cell1.cloneNode(true);
        var cell2Clone = cell2.cloneNode(true);
        (_a = cell1.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(cell2Clone, cell1);
        (_b = cell2.parentNode) === null || _b === void 0 ? void 0 : _b.insertBefore(cell1Clone, cell2);
        (_c = cell1.parentNode) === null || _c === void 0 ? void 0 : _c.removeChild(cell1);
        (_d = cell2.parentNode) === null || _d === void 0 ? void 0 : _d.removeChild(cell2);
    }, 1000);
}
function getRandomSchedule(input) {
    var lessonList = getListOfWeeklyLessons(input.courses);
    var schedule = [];
    for (var _i = 0, lessonList_1 = lessonList; _i < lessonList_1.length; _i++) {
        var lesson = lessonList_1[_i];
        schedule.push({
            code: lesson.code,
            day: getRandomDay(input),
            period: getRandomPeriod(input),
            room: getRandomRoomThatIsBigEnough(lesson, input.rooms).name
        });
    }
    return schedule;
}
function getListOfWeeklyLessons(courses) {
    return courses.flatMap(function (c) { return Array.from({ length: c.numClasses }, function () { return c; }); });
}
function getRandomRoomThatIsBigEnough(course, rooms) {
    return getRandomItemFromList(rooms.filter(function (r) { return r.numStudents >= course.numStudents; }));
}
function getRandomItemFromList(list) {
    return list[Math.floor(Math.random() * list.length)];
}
function getRandomDay(input) {
    return Math.ceil(Math.random() * input.settings.maxDay + 1) - input.settings.minDay;
}
function getRandomPeriod(input) {
    return Math.ceil(Math.random() * input.settings.maxPeriod + 1) - input.settings.minPeriod;
}
function getData() {
    return {
        courses: [
            { code: 'MUZ439', teacher: 'Thomas', numClasses: 3, numStudents: 26, room: '' },
            { code: 'MUZ480', teacher: 'Thomas', numClasses: 5, numStudents: 18, room: '' },
            { code: 'MUZ436', teacher: 'Moore', numClasses: 4, numStudents: 24, room: '' },
            { code: 'MUZ275', teacher: 'Clark', numClasses: 1, numStudents: 11, room: '' },
            { code: 'MUZ408', teacher: 'Brown', numClasses: 1, numStudents: 30, room: '' },
            { code: 'MUZ114', teacher: 'White', numClasses: 2, numStudents: 8, room: '' },
            { code: 'MUZ241', teacher: 'Lopez', numClasses: 1, numStudents: 22, room: '' },
            { code: 'MUZ414', teacher: 'Jones', numClasses: 5, numStudents: 16, room: '' },
            { code: 'MUZ213', teacher: 'Rodriguez', numClasses: 3, numStudents: 7, room: '' },
            { code: 'MUZ334', teacher: 'Williams', numClasses: 4, numStudents: 20, room: '' },
            { code: 'MUZ322', teacher: 'Smith', numClasses: 2, numStudents: 29, room: '' },
            { code: 'MUZ143', teacher: 'Martinez', numClasses: 1, numStudents: 3, room: '' },
            { code: 'MUZ312', teacher: 'Gonzalez', numClasses: 5, numStudents: 15, room: '' },
            { code: 'MUZ230', teacher: 'Hernandez', numClasses: 2, numStudents: 30, room: '' },
            { code: 'MUZ401', teacher: 'Miller', numClasses: 1, numStudents: 12, room: '' },
            { code: 'MUZ149', teacher: 'Wilson', numClasses: 3, numStudents: 6, room: '' },
            { code: 'MUZ362', teacher: 'Anderson', numClasses: 5, numStudents: 23, room: '' },
            { code: 'MUZ324', teacher: 'Taylor', numClasses: 4, numStudents: 10, room: '' },
            { code: 'MUZ286', teacher: 'Moore', numClasses: 1, numStudents: 5, room: '' },
            { code: 'MUZ172', teacher: 'Jackson', numClasses: 2, numStudents: 19, room: '' },
            { code: 'MUZ435', teacher: 'Martin', numClasses: 3, numStudents: 14, room: '' },
            { code: 'MUZ221', teacher: 'Lee', numClasses: 4, numStudents: 21, room: '' },
            { code: 'MUZ318', teacher: 'Perez', numClasses: 5, numStudents: 13, room: '' },
            { code: 'MUZ302', teacher: 'Thompson', numClasses: 1, numStudents: 9, room: '' },
            { code: 'MUZ287', teacher: 'White', numClasses: 2, numStudents: 27, room: '' },
            { code: 'MUZ183', teacher: 'Harris', numClasses: 3, numStudents: 17, room: '' },
            { code: 'MUZ490', teacher: 'Sanchez', numClasses: 4, numStudents: 4, room: '' },
            { code: 'MUZ352', teacher: 'Clark', numClasses: 5, numStudents: 26, room: '' },
            { code: 'MUZ167', teacher: 'Ramirez', numClasses: 1, numStudents: 8, room: '' },
            { code: 'MUZ284', teacher: 'Lewis', numClasses: 2, numStudents: 22, room: '' },
            { code: 'MUZ313', teacher: 'Robinson', numClasses: 3, numStudents: 15, room: '' },
            { code: 'MUZ402', teacher: 'Smith', numClasses: 4, numStudents: 7, room: '' },
            { code: 'MUZ198', teacher: 'Johnson', numClasses: 5, numStudents: 20, room: '' },
            { code: 'MUZ376', teacher: 'Brown', numClasses: 1, numStudents: 11, room: '' },
            { code: 'MUZ253', teacher: 'Garcia', numClasses: 2, numStudents: 29, room: '' },
            { code: 'MUZ428', teacher: 'Miller', numClasses: 3, numStudents: 6, room: '' },
            { code: 'MUZ117', teacher: 'Davis', numClasses: 4, numStudents: 24, room: '' },
            { code: 'MUZ396', teacher: 'Rodriguez', numClasses: 5, numStudents: 12, room: '' },
            { code: 'MUZ248', teacher: 'Martinez', numClasses: 1, numStudents: 18, room: '' },
            { code: 'MUZ307', teacher: 'Hernandez', numClasses: 2, numStudents: 10, room: '' },
            { code: 'MUZ226', teacher: 'Lopez', numClasses: 3, numStudents: 23, room: '' },
            { code: 'MUZ145', teacher: 'Gonzalez', numClasses: 4, numStudents: 5, room: '' },
            { code: 'MUZ374', teacher: 'Wilson', numClasses: 5, numStudents: 19, room: '' },
            { code: 'MUZ280', teacher: 'Anderson', numClasses: 1, numStudents: 14, room: '' },
            { code: 'MUZ119', teacher: 'Thomas', numClasses: 2, numStudents: 28, room: '' },
            { code: 'MUZ348', teacher: 'Taylor', numClasses: 3, numStudents: 9, room: '' },
            { code: 'MUZ239', teacher: 'Moore', numClasses: 4, numStudents: 30, room: '' },
            { code: 'MUZ111', teacher: 'Jackson', numClasses: 5, numStudents: 16, room: '' },
            { code: 'MUZ396', teacher: 'Martin', numClasses: 1, numStudents: 27, room: '' },
            { code: 'MUZ247', teacher: 'Lee', numClasses: 2, numStudents: 13, room: '' },
            { code: 'MUZ358', teacher: 'Perez', numClasses: 3, numStudents: 21, room: '' },
            { code: 'MUZ302', teacher: 'Thompson', numClasses: 4, numStudents: 17, room: '' },
            { code: 'MUZ195', teacher: 'White', numClasses: 5, numStudents: 8, room: '' },
            { code: 'MUZ385', teacher: 'Harris', numClasses: 1, numStudents: 25, room: '' },
            { code: 'MUZ146', teacher: 'Sanchez', numClasses: 2, numStudents: 29, room: '' },
            { code: 'MUZ439', teacher: 'Clark', numClasses: 3, numStudents: 4, room: '' },
            { code: 'MUZ312', teacher: 'Ramirez', numClasses: 4, numStudents: 22, room: '' },
            { code: 'MUZ273', teacher: 'Lewis', numClasses: 5, numStudents: 11, room: '' },
            { code: 'MUZ414', teacher: 'Robinson', numClasses: 1, numStudents: 20, room: '' },
            { code: 'MUZ254', teacher: 'Smith', numClasses: 2, numStudents: 15, room: '' },
            { code: 'MUZ389', teacher: 'Johnson', numClasses: 3, numStudents: 7, room: '' },
            { code: 'MUZ310', teacher: 'Brown', numClasses: 4, numStudents: 26, room: '' },
            { code: 'MUZ179', teacher: 'Garcia', numClasses: 5, numStudents: 12, room: '' }
        ],
        rooms: [
            { name: 'U2', numStudents: 23 },
            { name: 'E4', numStudents: 14 },
            { name: 'P7', numStudents: 30 },
            { name: 'M8', numStudents: 13 },
            { name: 'H1', numStudents: 39 },
            { name: 'X3', numStudents: 7 },
            { name: 'C5', numStudents: 35 },
            { name: 'G9', numStudents: 18 },
            { name: 'B6', numStudents: 26 },
            { name: 'A3', numStudents: 21 },
            { name: 'J2', numStudents: 40 },
            { name: 'F7', numStudents: 12 },
            { name: 'D4', numStudents: 28 },
            { name: 'K8', numStudents: 5 },
            { name: 'L1', numStudents: 33 }
        ],
        settings: {
            minDay: 1,
            maxDay: 5,
            minPeriod: 1,
            maxPeriod: 8
        }
    };
}

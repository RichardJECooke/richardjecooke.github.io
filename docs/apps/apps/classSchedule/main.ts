import * as types from './types.js';
import * as scheduler from './scheduler.js';
import * as geneticAlgorithm from './geneticAlgorithm.js';

document.addEventListener('DOMContentLoaded', function() {
    const input = scheduler.getData();
    const settings = geneticAlgorithm.getSettings<types.Tlessons>(
        scheduler.getScoreScheduleFunction(input),
        scheduler.crossoverSchedules,
        scheduler.getMutateScheduleFunction(input),
        scheduler.getScheduleDifference,
    );
    let generation: types.Tschedules = [];
    for (let i = 1; i < settings.populationSize; i++)
        generation.push(scheduler.getRandomScheduleWithScore(input));
    generation.sort((a,b) => b.score - a.score);
    showSchedule(generation[0], input);
    Array.from({ length: 500 }, () => {
        generation = geneticAlgorithm.getNextGenerationAndAdjustSettings(generation, settings);
        showSchedule(generation[0], input);
    });
});

function showSchedule(schedule: types.Tschedule, input: types.Tinput) {
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
            div.textContent = scheduler.getCodesAtTime(schedule, day, period);
            td.appendChild(div);
            tr.appendChild(td);   // setTimeout(() => { div.classList.remove('opacity-0'); }, 2000 * Math.random());
        }
        tbody.appendChild(tr);
    }
}
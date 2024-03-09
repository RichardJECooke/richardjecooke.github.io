let _time;
export function startTimer() {
    _time = Date.now();
}
export function stopTimer(name) {
    const elapsedTime = Date.now() - _time;
    console.log(`Time elapsed in ${name}: ${elapsedTime} ms`);
}

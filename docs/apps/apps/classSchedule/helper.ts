let _time: number;

export function startTimer() {
    _time = Date.now();
}

export function stopTimer(name: string) {
    const elapsedTime = Date.now() - _time;
    console.log(`Time elapsed in ${name}: ${elapsedTime} ms`);
}
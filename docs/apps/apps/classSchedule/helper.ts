let _time: number;

export function startTimer() {
    _time = Date.now();
}

export function stopTimer(name: string) {
    const elapsedTime = Date.now() - _time;
    console.log(`Time elapsed in ${name}: ${elapsedTime} ms`);
}

export async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

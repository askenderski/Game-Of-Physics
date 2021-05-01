import sleep from "./sleep";

function advanceTimersAndWaitForPromisesToResolve(time) {
    jest.advanceTimersByTime(time);
    return Promise.resolve();
}

const setup = {};

beforeEach(() => {
    setup.spy = jest.fn();
    jest.useFakeTimers();
});

function runTestsWithTime(expectedTimeForSleepToRun, timeToPassToSleep) {
    test("Sleep is not resolved when not enough time has passed", async () => {
        const notEnoughTimeForSleepToResolve = expectedTimeForSleepToRun - 1;
        sleep(timeToPassToSleep).then(setup.spy);

        await advanceTimersAndWaitForPromisesToResolve(notEnoughTimeForSleepToResolve);

        expect(setup.spy).not.toHaveBeenCalled();
    });

    test("Sleep is resolved once enough time has passed", async () => {
        const enoughTimeForSleepToResolve = expectedTimeForSleepToRun + 1;
        sleep(timeToPassToSleep).then(setup.spy);

        await advanceTimersAndWaitForPromisesToResolve(enoughTimeForSleepToResolve);

        expect(setup.spy).toHaveBeenCalled();
    });

    test("Sleep cancels correctly", async () => {
        const successSleep = jest.fn(), rejectSleep = jest.fn(), finallySleep = jest.fn();

        const enoughTimeForSleepToResolve = expectedTimeForSleepToRun + 1;
        const promise = sleep(timeToPassToSleep).then(successSleep).catch(rejectSleep).finally(finallySleep);

        await promise.cancel();

        await advanceTimersAndWaitForPromisesToResolve(enoughTimeForSleepToResolve);

        expect(successSleep).not.toHaveBeenCalled();
        //When cancelling, it is expected that catch won't be called, too.
        expect(rejectSleep).not.toHaveBeenCalled();
        //When cancelling, it is expected that finally will be called.
        expect(finallySleep).toHaveBeenCalled();
    });
}

describe("Sleep works correctly when given specific time", () => {
    runTestsWithTime(2000, 2000);
});

describe("Sleep works as if given time of 1000ms when not given time", () => {
    runTestsWithTime(1000, undefined);
});
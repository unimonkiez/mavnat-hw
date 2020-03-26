import { promises as fsPromises } from 'fs';

export const createArrayAtSize = (n: number): undefined[] => {
    return Array.from({ length: n });
};

export const flatArray = <T>(arr: T[][]) => {
    return ([] as T[]).concat(...arr);
};

export const createNums = ({ from, to }: { from: number; to: number }) =>
    createArrayAtSize(to - from + 1).map((_, i) => i + from);

export const getRandomNumber = ({ min, max }: { min: number; max: number }) => {
    return Math.floor(Math.random() * max) + min;
};

export const getRandomNumberByMax = (max: number) => getRandomNumber({ min: 1, max });

export const getVector1To = (n: number) => {
    return createArrayAtSize(n).map((_, i) => i + 1);
};

export const getVectorRandom = (n: number) => {
    return createArrayAtSize(n).map(() => getRandomNumberByMax(n));
};

export const getBinaryVectorRandom = (n: number) => {
    return createArrayAtSize(n).map(() => getRandomNumberByMax(1));
};

const getTimeInMicroSeconds = () => {
    const hrTime = process.hrtime();
    return hrTime[0] * 1000000 + hrTime[1] / 1000;
};

const kickstartTimeInMicrosecondsGathering = () => {
    getTimeInMicroSeconds();
};

export const getRuntime = (fn: Function) => {
    const startTime = getTimeInMicroSeconds();
    fn();
    const endTime = getTimeInMicroSeconds();
    const time = endTime - startTime;

    return {
        time,
        startTime,
        endTime,
    };
};

export const addToIndex = <T>(arr: T[], value: T, index: number) => {
    return [...arr.slice(0, index), value, ...arr.slice(index, arr.length)];
};

export const createFile = async (path: string, content: string) => {
    await fsPromises.writeFile(path, content);
};

kickstartTimeInMicrosecondsGathering();

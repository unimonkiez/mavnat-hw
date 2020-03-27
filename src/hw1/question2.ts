import * as path from 'path';
// eslint-disable-next-line no-unused-vars
import { plot, Plot } from 'nodeplotlib';
import { createFile, createNums, getRuntime, getBinaryVectorRandom, createArrayAtSize } from '../utils';

const getHyperCubePoints = (n: number): number[][] => {
    if (n === 1) {
        return [[0], [1]];
    }

    const subHyperCubePoints = getHyperCubePoints(n - 1);
    const hyperCubePoints = [
        ...subHyperCubePoints.map((coordinate) => [0, ...coordinate]),
        ...subHyperCubePoints.map((coordinate) => [1, ...coordinate]),
    ];

    return hyperCubePoints;
};

const createHyperCubePointsFile = async (n: number) => {
    const hyperCubePoints = getHyperCubePoints(n);
    const content = JSON.stringify(hyperCubePoints, null, 2);
    await createFile(path.resolve(__dirname, 'H.txt'), content);
};

const getHammingDistance = (v1: number[], v2: number[]): number => {
    const v1Length = v1.length;
    const v2Length = v2.length;

    if (v1Length !== v2Length) {
        throw new Error('Vectors do not have equal length.');
    }

    const hammingDistance = v1.reduce((distance, num1, index) => {
        const num2 = v2[index];

        const isEqual = num1 === num2;
        const newDistance = isEqual ? distance : distance + 1;

        return newDistance;
    }, 0);

    return hammingDistance;
};

export const hw1question21 = () => {
    createHyperCubePointsFile(3);

    const nums = createNums({ from: 1, to: 10 });
    const times = nums.map((num) => {
        const { time } = getRuntime(() => {
            getHyperCubePoints(num);
        });

        return time;
    });

    const data: Plot[] = [
        {
            x: nums,
            y: times,
            type: 'scatter',
        },
    ];

    plot(data, {
        xaxis: {
            title: 'n',
        },
        yaxis: {
            title: 'Runtime [μs]',
        },
    });
};
export const hw1question22 = () => {
    console.log(getHammingDistance([0, 0, 1], [1, 1, 1]));
};

export const hw1question23 = () => {
    const nums = createNums({ from: 1, to: 10 });
    const times = nums.map((num) => {
        const v1 = getBinaryVectorRandom(num);
        const v2 = getBinaryVectorRandom(num);

        const timesThisRun = createArrayAtSize(5).map(() => {
            const { time } = getRuntime(() => {
                getHammingDistance(v1, v2);
            });
            return time;
        });

        const minimumTime = timesThisRun.reduce((min, time) => (min < time ? min : time), Infinity);

        return minimumTime;
    });

    const data: Plot[] = [
        {
            x: nums,
            y: times,
            type: 'scatter',
        },
    ];

    plot(data, {
        xaxis: {
            title: 'n',
        },
        yaxis: {
            title: 'Runtime [μs]',
        },
    });
};
export const hw1question24 = () => {
    console.log(getHyperCubePoints(2));
};

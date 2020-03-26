import * as path from 'path';
// eslint-disable-next-line no-unused-vars
import { plot, Plot } from 'nodeplotlib';
import { createFile, createNums, getRuntime } from '../utils';

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

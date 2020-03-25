import * as path from 'path';
// eslint-disable-next-line no-unused-vars
import { plot, Plot } from 'nodeplotlib';
import {
    createNums,
    getVectorRandom,
    getRuntime,
    createArrayAtSize,
    addToIndex,
    createFile,
    flatArray,
} from '../utils';

const isPremutation = (vector: number[]): boolean => {
    const n = vector.length;
    const isEmpty = n === 0;
    if (isEmpty) {
        return true;
    }

    const vectorWithoutMax = vector.filter((num) => num !== n);
    const newN = vectorWithoutMax.length;
    const isOneNumLess = n === newN + 1;

    if (isOneNumLess) {
        return isPremutation(vectorWithoutMax);
    }

    return false;
};

const printIsPremutation = (vector: number[]) => {
    if (isPremutation(vector)) {
        console.log('YES');
    } else {
        console.log('NO');
    }
};

export const hw1question11 = () => {
    printIsPremutation([1, 1, 2]);
    printIsPremutation([1, 3, 2]);

    // Plot
    const powers = createNums({ from: 2, to: 6 });
    const nums = powers.map((power) => 10 ** power);
    const vectors = nums.map((n) => getVectorRandom(n));
    const times = vectors.map((vector) => {
        const { time } = getRuntime(() => {
            isPremutation(vector);
        });

        return time;
    });

    const data: Plot[] = [
        {
            x: powers,
            y: times,
            type: 'scatter',
        },
    ];

    plot(data, {
        xaxis: {
            title: '10^ [vector size]',
        },
        yaxis: {
            title: 'Runtime [ms]',
        },
    });
};

const getAllPremutations = (n: number): number[][] => {
    if (n === 1) {
        return [[1]];
    }

    const allSubPremutations = getAllPremutations(n - 1);

    const allPremutationsPerIndexInsert = createArrayAtSize(n).map((_, index) => {
        return allSubPremutations.map((subPremutation) => {
            return addToIndex(subPremutation, n, index);
        });
    });

    const allPremutations = flatArray(allPremutationsPerIndexInsert);

    return allPremutations;
};

const createAllPremutationsFile = async (n: number) => {
    const allPremutations = getAllPremutations(n);
    const content = JSON.stringify(allPremutations, null, 2);
    await createFile(path.resolve(__dirname, 'per.txt'), content);
};

export const hw1question12 = () => {
    createAllPremutationsFile(4);

    const nums = createNums({ from: 1, to: 7 });
    const times = nums.map((num) => {
        const { time } = getRuntime(() => {
            getAllPremutations(num);
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
            title: 'Runtime [ms]',
        },
    });
};

import { expect } from '../utils';

interface IPoint {
    x: number;
    y: number;
}

const getRadius = (point: IPoint) => {
    return (point.x ** 2 + point.y ** 2) ** 0.5;
};

const bubbleSort = (arr: IPoint[]) => {
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < arr.length; i += 1) {
            const radius = getRadius(arr[i]);
            const compareRadius = arr[i + 1] ? getRadius(arr[i + 1]) : undefined;
            if (compareRadius !== undefined && radius > compareRadius) {
                const tmp = arr[i];
                // eslint-disable-next-line no-param-reassign
                arr[i] = arr[i + 1];
                // eslint-disable-next-line no-param-reassign
                arr[i + 1] = tmp;
                swapped = true;
            }
        }
    } while (swapped);
    return arr;
};

export const sortPointsByRadius = (points: IPoint[]): IPoint[] => {
    const pointsLength = points.length;
    const buckets: IPoint[][] = Array.from({ length: pointsLength }).map(() => []);

    points.forEach((point) => {
        const radius = getRadius(point);
        buckets[Math.floor(pointsLength * radius)].push(point);
    });

    buckets.forEach(bubbleSort);

    const mergedBucket = buckets.reduce((agg, bucket) => [...agg, ...bucket], []);

    return mergedBucket;
};

export const hw3question5 = () => {
    const points = [
        {
            x: 0.7,
            y: 0.7,
        },
        {
            x: 0.1,
            y: 0.1,
        },
        {
            x: 0.5,
            y: 0.5,
        },
    ];
    const sortedPointsByRadius = sortPointsByRadius(points);

    expect(sortedPointsByRadius).toBe([points[1], points[2], points[0]]);
};

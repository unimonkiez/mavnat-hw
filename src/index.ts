// const getRandomNumber = ({ min, max }: { min: number; max: number }) => {
//     return Math.random() * max + min;
// };

// const getRandomNumberByMax = (max: number) => getRandomNumber({ min: 1, max });

// const getVector1To = (n: number) => {
//     return Array.from({ length: n }).map((_, i) => i + 1);
// };

// const getVectorRandom = (n: number) => {
//     return Array.from({ length: n }).map(() => getRandomNumberByMax(n));
// };

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

const question11 = () => {
    printIsPremutation([1, 1, 2]);
};

question11();

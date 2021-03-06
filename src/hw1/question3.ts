const getMinimumChange = (sum: number): number[] => {
    if (sum <= 0) {
        throw new Error(`Can't do that, you silly`);
    }
    if (sum === 1) {
        return [1];
    }

    const allowedCoins = [10, 5, 2];

    const maxCoinInSum = allowedCoins.find((allowedCoin) => allowedCoin <= sum) ?? 1;

    return [maxCoinInSum, ...getMinimumChange(sum - maxCoinInSum)];
};

export const hw1question31 = () => {
    console.log(getMinimumChange(28));
};

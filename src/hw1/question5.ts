import { createArrayAtSize } from '../utils';

class Node {
    public value: string;

    public nextNode?: Node;

    constructor({ value, nextNode }: { value: string; nextNode?: Node }) {
        this.value = value;
        this.nextNode = nextNode;
    }

    getString(): string {
        return `${this.value}${this.nextNode ? `->${this.nextNode.getString()}` : ''}`;
    }
}

// Brent
const getPartiallyCircularNodeDetails = (node: Node): { circleStartIndex: number; startToCircleEnd: number } => {
    let power = 1;
    let lam = 1;

    let tortoise = node;
    let hare = node.nextNode as Node;

    while (tortoise !== hare) {
        if (power === lam) {
            tortoise = hare;
            power *= 2;
            lam = 0;
        }

        hare = hare.nextNode as Node;
        lam += 1;
    }

    tortoise = node;
    hare = node;
    createArrayAtSize(lam).forEach((_, i) => {
        hare = hare.nextNode as Node;
    });

    let mu = 0;
    while (tortoise !== hare) {
        tortoise = tortoise.nextNode as Node;
        hare = hare.nextNode as Node;
        mu += 1;
    }

    return {
        circleStartIndex: mu,
        startToCircleEnd: lam + mu,
    };
};

export const hw1question5 = () => {
    const lastNode = new Node({
        value: '5',
    });
    const nodes = new Node({
        value: '1',
        nextNode: new Node({
            value: '2',
            nextNode: new Node({
                value: '3',
                nextNode: new Node({
                    value: '4',
                    nextNode: lastNode,
                }),
            }),
        }),
    });

    lastNode.nextNode = nodes.nextNode;

    console.log(getPartiallyCircularNodeDetails(nodes));
};

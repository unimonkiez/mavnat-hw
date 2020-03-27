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

const getPartiallyCircularNodeDetails = (node: Node): { circleStartIndex: number; startToCircleEnd: number } => {
    const histogramNodeToIndex = new Map<Node, number>();
    let index = 0;
    let startToCircleEnd = 0;
    let currentNode = node;
    let foundCircle = false;
    let circleStartIndex = -1;
    while (!foundCircle) {
        const prevIndex = histogramNodeToIndex.get(currentNode);
        foundCircle = prevIndex !== undefined;
        if (foundCircle) {
            circleStartIndex = prevIndex as number;
            startToCircleEnd = index;
        } else {
            histogramNodeToIndex.set(currentNode, index);
            const { nextNode } = currentNode;
            if (!nextNode) {
                throw new Error('Not circular!');
            }
            currentNode = nextNode;
            index += 1;
        }
    }

    return {
        circleStartIndex,
        startToCircleEnd,
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

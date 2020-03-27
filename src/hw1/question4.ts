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

const combineLinkedNodes = (n1: Node, n2: Node, m: number): Node | undefined => {
    if (m <= 0) {
        return undefined;
    }

    let currentN1: Node | undefined = n1;
    let currentN2: Node | undefined = n2;

    let outputNode: Node | undefined;
    let secondNodes: Node | undefined;
    let lastOf1Nodes: Node | undefined;
    let lastOf2Nodes: Node | undefined;

    for (let i = 0; i < m; i += 1) {
        if (currentN1) {
            const add1Node = new Node({
                value: currentN1.value,
            });
            if (!outputNode) {
                outputNode = add1Node;
            }
            if (lastOf1Nodes) {
                lastOf1Nodes.nextNode = add1Node;
            }
            lastOf1Nodes = add1Node;
            currentN1 = currentN1?.nextNode;
        }

        if (currentN2) {
            const add2Node = new Node({
                value: currentN2.value,
            });

            if (!secondNodes) {
                secondNodes = add2Node;
            }
            if (lastOf2Nodes) {
                lastOf2Nodes.nextNode = add2Node;
            }
            lastOf2Nodes = add2Node;
            currentN2 = currentN2?.nextNode;
        }
    }

    if (lastOf1Nodes) {
        lastOf1Nodes.nextNode = secondNodes;
    } else {
        outputNode = secondNodes;
    }

    if (currentN1 && currentN2) {
        if (lastOf2Nodes) {
            lastOf2Nodes.nextNode = combineLinkedNodes(currentN1, currentN2, m);
        } else if (lastOf1Nodes) {
            lastOf1Nodes.nextNode = combineLinkedNodes(currentN1, currentN2, m);
        }
    }

    return outputNode;
};

export const hw1question41 = () => {
    const n1 = new Node({
        value: 'a',
        nextNode: new Node({
            value: 'b',
            nextNode: new Node({
                value: 'c',
                nextNode: new Node({
                    value: 'd',
                    nextNode: new Node({
                        value: 'e',
                        nextNode: new Node({
                            value: 'f',
                            nextNode: new Node({
                                value: 'g',
                                nextNode: new Node({
                                    value: 'h',
                                }),
                            }),
                        }),
                    }),
                }),
            }),
        }),
    });
    const n2 = new Node({
        value: '1',
        nextNode: new Node({
            value: '2',
            nextNode: new Node({
                value: '3',
                nextNode: new Node({
                    value: '4',
                    nextNode: new Node({
                        value: '5',
                    }),
                }),
            }),
        }),
    });

    const combinedN = combineLinkedNodes(n1, n2, 2);
    console.log(combinedN?.getString());
};

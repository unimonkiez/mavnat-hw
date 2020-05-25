import { expect } from '../utils';

interface INode {
    value: number;
    edges: INode[];
}

interface IGraph {
    nodes: INode[];
    isDirected: boolean;
}

const bfs = (graph: IGraph, startingNode: INode) => {
    const nodesData = graph.nodes.map((x) => ({
        node: x,
        parent: undefined as INode | undefined,
        distance: -1,
        visited: false,
    }));

    const nodeQueue = [startingNode];
    nodesData[graph.nodes.indexOf(startingNode)].distance = 0;
    while (nodeQueue.length !== 0) {
        const currentNode = nodeQueue.pop()!;
        const currentNodeData = nodesData[graph.nodes.indexOf(currentNode)];
        currentNodeData.visited = true;
        for (const nextNode of currentNode.edges) {
            const nextNodeData = nodesData[graph.nodes.indexOf(nextNode)];
            if (!nextNodeData.visited && nodeQueue.indexOf(nextNode) === -1) {
                nextNodeData.distance = currentNodeData.distance + 1;
                nextNodeData.parent = currentNode;

                nodeQueue.push(nextNode);
            }
        }
    }

    return nodesData;
};

const getDirectedGraph = () => {
    const nodes: INode[] = [
        {
            value: 0,
            edges: [],
        },
        {
            value: 1,
            edges: [],
        },
        {
            value: 2,
            edges: [],
        },
        {
            value: 3,
            edges: [],
        },
        {
            value: 4,
            edges: [],
        },
        {
            value: 5,
            edges: [],
        },
    ];

    nodes[0].edges.push(nodes[3]);
    nodes[3].edges.push(nodes[2]);
    nodes[2].edges.push(nodes[0]);
    nodes[0].edges.push(nodes[1]);
    nodes[1].edges.push(nodes[3]);
    nodes[3].edges.push(nodes[4]);
    nodes[4].edges.push(nodes[5]);

    const directedGraph: IGraph = {
        isDirected: true,
        nodes,
    };

    return directedGraph;
};

const getPathIncremenetedBy = (
    graph: IGraph,
    startinNode: INode,
    increment: number,
    i: number,
): INode[] | undefined => {
    return undefined;
};

const getShortedPathDevidedBy3 = (graph: IGraph, startingNode: INode) => {
    const bfsResult = bfs(graph, startingNode);

    const paths: INode[][] = [];
    for (const currentNodeData of bfsResult) {
        if (currentNodeData.parent !== undefined) {
            if (currentNodeData.distance % 3 === 0) {
                let newPath: INode[] = [];
                let nextNode:
                    | {
                          node: INode;
                          parent: INode | undefined;
                          distance: number;
                          visited: boolean;
                      }
                    | undefined = currentNodeData;
                while (nextNode !== undefined) {
                    newPath = [nextNode.node, ...newPath];
                    // eslint-disable-next-line no-loop-func
                    const parentNodeData = bfsResult.find((x) => x.node === nextNode?.parent);
                    nextNode = parentNodeData;
                }
                paths.push(newPath);
            } else {
                const newPath = getPathIncremenetedBy(graph, startingNode.edges[0], 1, 0);
                if (newPath) {
                    paths.push(newPath);
                }
            }
        }
    }

    return paths[0].map((node) => node.value);
};

export const hw3question2 = () => {
    const directedGraph = getDirectedGraph();

    expect(getShortedPathDevidedBy3(directedGraph, directedGraph.nodes[2])).toBe([2, 0, 3, 4]);
};

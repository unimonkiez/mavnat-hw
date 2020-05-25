import { expect } from '../utils';

interface INode {
    value: number;
    edges: INode[];
}

interface IGraph {
    nodes: INode[];
    isDirected: boolean;
}

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
    ];

    nodes[0].edges.push(nodes[3]);
    nodes[3].edges.push(nodes[2]);
    nodes[2].edges.push(nodes[0]);
    nodes[0].edges.push(nodes[1]);
    nodes[1].edges.push(nodes[3]);
    nodes[3].edges.push(nodes[4]);

    const directedGraph: IGraph = {
        isDirected: true,
        nodes,
    };

    return directedGraph;
};

const getUndirectedGraph = () => {
    const directedGraph = getDirectedGraph();

    directedGraph.nodes.forEach((node) => {
        node.edges.forEach((edgeNode) => {
            if (edgeNode.edges.indexOf(node) === -1) {
                edgeNode.edges.push(node);
            }
        });
    });

    directedGraph.isDirected = false;

    return directedGraph;
};

const isNodeInCircleUndirectedGraphUsingBFS = (graph: IGraph, nodeIndex: number): boolean => {
    const nodesData = graph.nodes.map(() => ({
        parent: -1,
        visited: false,
    }));

    nodesData[nodeIndex].visited = true;
    const nodeQueue = [graph.nodes[nodeIndex]];

    while (nodeQueue.length !== 0) {
        const currentNode = nodeQueue.pop()!;
        const currentNodeIndex = graph.nodes.indexOf(currentNode);
        const currentNodeData = nodesData[currentNodeIndex];

        for (const nextNode of currentNode.edges) {
            const nextNodeIndex = graph.nodes.indexOf(nextNode);
            const nextNodeData = nodesData[nextNodeIndex];

            if (!nextNodeData.visited) {
                nextNodeData.visited = true;
                nextNodeData.parent = currentNodeIndex;

                nodeQueue.push(nextNode);
            } else if (currentNodeData.parent !== nextNodeIndex) {
                // Traverse up the 2 different paths and see if the node in question on both paths
                let isNodeIsAPath = false;
                let isNodeIsBPath = false;

                const APathToSource = [];
                let nextParentIndex = currentNodeIndex;
                while (nextParentIndex !== -1) {
                    APathToSource.push(nextParentIndex);
                    if (nextParentIndex === nodeIndex) {
                        isNodeIsAPath = true;
                        break;
                    }
                    nextParentIndex = nodesData[nextParentIndex].parent;
                }

                nextParentIndex = nextNodeIndex;
                while (nextParentIndex !== -1) {
                    if (nextParentIndex === nodeIndex) {
                        isNodeIsBPath = true;
                        break;
                    }
                    if (APathToSource.indexOf(nextParentIndex) !== -1) {
                        break;
                    }
                    nextParentIndex = nodesData[nextParentIndex].parent;
                }

                return isNodeIsAPath && isNodeIsBPath;
            }
        }
    }

    return false;
};
const getCyclesNodeIndexesDirectedGraph = (
    graph: IGraph,
    nodeIndex: number,
    nodesData: { visited: boolean; isInStack: boolean }[],
): number[][] => {
    const node = graph.nodes[nodeIndex];
    const nodeData = nodesData[nodeIndex];

    nodeData.visited = true;
    nodeData.isInStack = true;

    let cycles: number[][] = [];
    for (const nextNode of node.edges) {
        const nextNodeIndex = graph.nodes.indexOf(nextNode);
        const nextNodeData = nodesData[nextNodeIndex];

        if (!nextNodeData.visited) {
            const recCycles = getCyclesNodeIndexesDirectedGraph(graph, nextNodeIndex, nodesData);
            if (recCycles.length !== 0) {
                cycles = [
                    ...cycles,
                    ...recCycles.map((cycle) => {
                        if (cycle[0] !== nextNodeIndex) {
                            return [...cycle, nextNodeIndex];
                        }
                        return cycle;
                    }),
                ];
            }
        } else if (nextNodeData.isInStack) {
            cycles = [...cycles, [nextNodeIndex]];
        }
    }
    nodeData.isInStack = false;

    return cycles;
};
const isNodeInCircleDirectedGraphUsingDFS = (graph: IGraph): boolean => {
    const nodesData = graph.nodes.map(() => ({
        visited: false,
        isInStack: false,
    }));

    const cycles = getCyclesNodeIndexesDirectedGraph(graph, 0, nodesData);

    return cycles.length !== 0;
};

export const hw3question1exercise1 = () => {
    const undirectedGraph = getUndirectedGraph();

    expect(isNodeInCircleUndirectedGraphUsingBFS(undirectedGraph, 0)).toBe(true);
    expect(isNodeInCircleUndirectedGraphUsingBFS(undirectedGraph, 4)).toBe(false);
};
export const hw3question1exercise2 = () => {
    const directedGraph = getDirectedGraph();

    expect(isNodeInCircleDirectedGraphUsingDFS(directedGraph)).toBe(true);

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
    ];

    nodes[0].edges.push(nodes[1]);
    nodes[0].edges.push(nodes[2]);
    nodes[2].edges.push(nodes[3]);

    const directedGraphWithoutCycle: IGraph = {
        isDirected: true,
        nodes,
    };

    expect(isNodeInCircleDirectedGraphUsingDFS(directedGraphWithoutCycle)).toBe(false);
};

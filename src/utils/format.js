function neo4jDataToD3Data(data) {
    const graph = {
        nodes: [],
        relationships: []
    };

    data.results.forEach((result) => {
        result.data.forEach((data) => {
            data.graph.nodes.forEach((node) => {
                if (!contains(graph.nodes, node.id))
                    graph.nodes.push(node);

            });

            data.graph.relationships.forEach((relationship) => {
                relationship.source = relationship.startNode;
                relationship.target = relationship.endNode;
                graph.relationships.push(relationship);
            });

            data.graph.relationships.sort((a, b) => {
                if (a.source > b.source)
                    return 1;
                else if (a.source < b.source)
                    return -1;
                else {
                    if (a.target > b.target)
                        return 1;
                    if (a.target < b.target)
                        return -1;
                    else
                        return 0;
                }
            });

            for (let i = 0; i < data.graph.relationships.length; i++) {
                if (i !== 0 && data.graph.relationships[i].source === data.graph.relationships[i - 1].source && data.graph.relationships[i].target === data.graph.relationships[i - 1].target) {
                    data.graph.relationships[i].linknum = data.graph.relationships[i - 1].linknum + 1;
                } else
                    data.graph.relationships[i].linknum = 1;

            }
        });
    });

    return graph;
}

let deWeightThree = (arr3) => {
    let map = new Map();
    for (let item of arr3) {
        if (!map.has(item.id)) {
            map.set(item.id, item);
        }
    }
    return [...map.values()];
}
const neo4jDataToD3Data2 = (data) => {
    const graph = {
        nodes: [],
        relationships: []
    };

    data.forEach((result) => {
        result.nodes.forEach((node) => {
            //if (!contains(graph.nodes, node.id))
            node.id = node.identity;
            node.name = node.identity;
            graph.nodes.push(node);
        });

        result.relationships.forEach((relationship) => {
            relationship.id = relationship.identity;
            relationship.source = relationship.start;
            relationship.target = relationship.end;
            graph.relationships.push(relationship);
        });

    });
    graph.nodes = deWeightThree(graph.nodes);
    graph.relationships = deWeightThree(graph.relationships);
    console.log(JSON.stringify(graph))
    return graph;
}


const neo4jDataToD3Data3 = (data) => {
    const graph = {
        nodes: [],
        relationships: []
    };

    data.data.nodes.forEach((node) => {
        node.properties = {
            img: node.image,
            summary: node.info,
            name: node.label
        }
        node.labels=node.categories
        graph.nodes.push(node);
    });

    data.data.edges.forEach((relationship) => {
        relationship.type = relationship.label;
        relationship.source = relationship.from;
        relationship.target = relationship.to;
        graph.relationships.push(relationship);
    });


    graph.nodes = deWeightThree(graph.nodes);
    graph.relationships = deWeightThree(graph.relationships);
    console.log(JSON.stringify(graph))
    return graph;
}

export {neo4jDataToD3Data2, neo4jDataToD3Data3}
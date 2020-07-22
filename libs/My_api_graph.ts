/* Fonctions pour la gestion du graphe : OK*/

import {NOGraph} from "../objets/NOGraph";
import {Edge} from "../objets/Edge";
import {Vertex} from "../objets/Vertex";

const fs = require('fs');

/* Fonction qui crée un un objet NOGraph avec les données du fichier de config */
export function generateGraphFromData(config: string): NOGraph {

        let file_content: string = fs.readFileSync(config, 'utf8');

        let graphFetched: NOGraph = new NOGraph();

        let vertexValue: string[];
        vertexValue = this.getArrayValue("Edges", file_content);
        let EdgeValue: string[];
        EdgeValue = this.getArrayValue("Vertex", file_content);

        graphFetched = this.getVertexData(graphFetched, vertexValue);
        graphFetched = this.getEdgesData(graphFetched, EdgeValue);
        
        return graphFetched;
}
/* Fonction nous renvoyant les valeurs du fichier de config */
export function getArrayValue(key: string, file_content: string): string[] {
    if (key === "Edges") {
        let sarray = ((file_content.split("\n", 1))[0].split(";"))[0].split(' ');
        sarray[0] = sarray[0].replace("Edges=", "");
        return sarray;
    } else if (key === "Vertex") {
        return (file_content.split("\n", 2)[1].replace("Edge=", "")).split(",");
    }
}
/* Fonction permettant de récupérer et d'assigner les valeurs des Edge */
export function getVertexData(graph: NOGraph, arrayValue: string[]) {
    let vertex_tab: Array<Vertex> = new Array<Vertex>();

    for (let vertex_value of arrayValue) {
        let vertex: Vertex = new Vertex();
        vertex.setName(vertex_value);
        vertex_tab.push(vertex);
    }

    graph.setGraphVertexTab(vertex_tab);

    return graph;
}
/* Fonction permettant de récupérer et d'assigner les valeurs des Edges */
export function getEdgesData(graph: NOGraph, arrayValue: string[]) {
    let edge_tab: Array<Edge> = new Array<Edge>();

    for (let edge_value of arrayValue) {

        let vertex_name_a: string = edge_value.charAt(0);
        let vertex_name_2: string = edge_value.charAt(2);

        let edge_ok: Edge = new Edge();
        let nb_vertex = 0;

        for (let vertex of graph.getGraphVertexTab()) {
            if (vertex.getName() === vertex_name_a) {
                edge_ok.setVertexA(vertex);
                nb_vertex++;
            } else if (vertex.getName() === vertex_name_2) {
                edge_ok.setVertexB(vertex);
                nb_vertex++;
            }
        }

        if (nb_vertex == 2) {
            edge_tab.push(edge_ok);
        }
    }
    graph.setGraphEdgeTab(edge_tab);
    return graph;
}
/* Fonction permettant d'initialiser les voisins de chaque sommet */
export function setVertexNeighbors(graph: NOGraph, edge: Vertex) {
    let neighbor_tab: Array<Vertex> = new Array<Vertex>();

    for (let edge_it of graph.getGraphEdgeTab()) {
        if (edge_it.isEdgeBroken()) {
            continue;
        }
        if (edge_it.getVertexA() === edge) {
            neighbor_tab.push(edge_it.getVertexB());
        }
        else if (edge_it.getVertexB() === edge) {
            neighbor_tab.push(edge_it.getVertexA());
        }
    }
    edge.setNeighborsTab(neighbor_tab);
    return graph;
}




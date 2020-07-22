/* Objet NOGraph = Graphe non orienté : OK*/

import {Vertex} from "./Vertex";
import {Edge} from "./Edge";
import {setVertexNeighbors} from "../libs/My_api_graph";

export class NOGraph {

    //fields
    private _graphVertexTab : Array<Vertex> = new Array<Vertex>(); // Les sommets du graphe
    private _graphVertexEdge : Array<Edge> = new Array<Edge>(); // Les arêtes du graphe
    private _nbVertex : number; // Nombre de sommets

    //constructor
    constructor() {
    }

    // Getters & Setters
    getGraphVertexTab(): Array<Vertex> {
        return this._graphVertexTab;
    }
    setGraphVertexTab(value: Array<Vertex>) {
        this._graphVertexTab = value;
    }
    getGraphEdgeTab(): Array<Edge> {
        return this._graphVertexEdge;
    }
    setGraphEdgeTab(value: Array<Edge>) {
        this._graphVertexEdge = value;
    }
    getNbVertex(): number {
        return this._nbVertex;
    }
    setNbVertex(value: number) {
        this._nbVertex = value;
    }

    //functions
    launch_Tajibnapis_algorithm(graph) {
        this._nbVertex = this._graphVertexTab.length;

        for (let i = 0; i < this._graphVertexTab.length; i++) {
            this._graphVertexTab[i].setIntTab(new Array<number>(this._nbVertex));
            this._graphVertexTab[i].setVertexTab(new Array<Vertex>(this._nbVertex));
            this._graphVertexTab[i].setNdis(new Array<Array<number>>());

            let grapht = setVertexNeighbors(graph, this._graphVertexTab[i]);
            this._graphVertexTab[i].setGraph(grapht);

            this._graphVertexTab[i].setVertexIndi(i);
        }

        for (let vertex of this._graphVertexTab) {
            vertex.initVertex(this._nbVertex+1);
        }

        for (let vertex of this._graphVertexTab) {
            vertex.sendDiscMsg();
        }
    }
    somToString() {
        let str ="";
        for(let vertex of this._graphVertexTab) {
            str+=vertex.toString()+"\n";
        }
        return str;
    }
    braToString() {
        let str ="";
        for(let edge of this._graphVertexEdge) {
            str+=edge.toString()+"\n";
        }
        return str;
    }
    toString() {
        return"\n## _vertex= "+this.somToString() +
            "\n## _edge= "+this.braToString()+
            "\n## _vertexNB= "+JSON.stringify(this._nbVertex);
    }
}

/* Objet Edge = paire de sommet : OK */

import {Vertex} from "./Vertex";

export class Edge {

    //fields
    private _Vertex1: Vertex; // Vertex1 extrémité(sommet) de l’arête
    private _Vertex2: Vertex; // Vertex2 autre extrémité(sommet) de l’arête
    private _IsEdgeBroken: boolean; // indique si l'arrête est casséé ou non

    //constructor
    constructor() {
        this._IsEdgeBroken = false;
    }

    // Getters & Setters
    getVertexA(): Vertex {
        return this._Vertex1;
    }
    setVertexA(value: Vertex) {
        this._Vertex1 = value;
    }
    getVertexB(): Vertex {
        return this._Vertex2;
    }
    setVertexB(value: Vertex) {
        this._Vertex2 = value;
    }
    isEdgeBroken(): boolean {
        return this._IsEdgeBroken;
    }
    setEdgeBroken(value: boolean) {
        this._IsEdgeBroken = value;
    }

    //functions
    toString() {
        return "\nVertexA= "+this._Vertex1.toString()+
            "\nVertexB= "+this._Vertex2.toString()+
            "\n_isVertexBroken= "+JSON.stringify(this._IsEdgeBroken);
    }
}

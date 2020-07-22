/* Objet Vertex = Sommets : OK*/

import {NOGraph} from "./NOGraph";

export class Vertex {

    // fields
    private _name:string; // Nom du sommet
    private _intTab: Array<number> = new Array<number>(); // Tableau d'entiers pour l'algorithme
    private _vertexTab: Array<Vertex> = new Array<Vertex>(); // Tableau de sommets pour l'algorithme
    private _ndis = []; // Tableau d’entier à double dimension pour l'algorithme
    private _neighborsTab: Array<Vertex> = new Array<Vertex>(); // Les sommets voisins
    private _graph:NOGraph = new NOGraph(); // Graphe du sommet courant
    private _vertexIndi:number; // Index du sommet

    // constructor
    constructor() {
    }

    // functions
    /* initialise les variables du sommets*/
    initVertex(vertex_number) {
        // initialization du bidimensional array
        for (let i = 0; i < vertex_number; i++) {
            this._ndis[i]  = new Array<number>();
        }

        for (let a = 0; a < this._neighborsTab.length; a++) {
            for (let b = 0; b < this._graph.getGraphVertexTab().length; b++) {
                this._ndis[a][b] = this._graph.getNbVertex();
            }
        }

        for (let a = 0; a < this._graph.getGraphVertexTab().length; a++) {
            this._intTab[a] = this._graph.getNbVertex();
            this._vertexTab[a] = null;
        }

        this._intTab[this._vertexIndi] = 0;
        this._vertexTab[this._vertexIndi] = this;
    }
    /* Envoie un message discover aux voisins */
    sendDiscMsg() {
        for (let vertex of this._neighborsTab) {
            vertex.receiveDiscMsg(this._vertexIndi, 0, this._vertexIndi);
        }
    }
    /* Reçoit le message discover, cf ndis array */
    receiveDiscMsg(num:number , numm:number, nummm:number) {
        this._ndis[nummm][num] = numm;
        this.rebuilt(num);
    }
    /* Rebuilt */
    rebuilt(num:number) {
        let d_v_save = this._intTab[num];

        if (num == this._vertexIndi) {
            this._intTab[num] = 0;
            this._vertexTab[num] = this;
        } else {
            let w = null; // Edge
            let d = null; // Number

            for (let w_index = 0; w_index < this._neighborsTab.length; w_index++) {
                if (d == null) {
                    d = this._ndis[w_index][num];
                    w = this._neighborsTab[w_index];
                } else if (this._ndis[w_index][num] < d) {
                    d = this._ndis[w_index][num];
                    w = this._neighborsTab[w_index];
                }
            }

            d++;

            if (d < this._graph.getNbVertex()) {
                this._intTab[num] = d;
                this._vertexTab[num] = w;
            } else {
                this._intTab[num] = this._graph.getNbVertex();
                this._vertexTab[num] = null;
            }
        }

        if (d_v_save != this._intTab[num]) {
            for (let neighbor of this._neighborsTab) {
                neighbor.receiveDiscMsg(num, this._intTab[num], this._vertexIndi);
            }
        }
    }

    /* Réparation d'un canal */
    fix_channel(vertex:Vertex) {
        this._neighborsTab.push(vertex);
        for (let v = 0; v < this._graph.getGraphVertexTab().length; v++) {
            this._ndis[vertex.getVertexIndi()][v] = this._graph.getNbVertex();
            this._graph.getGraphVertexTab()[v].receiveDiscMsg(v, this._intTab[v], this._vertexIndi);
        }
    }

    /* Rutpure d'un canal */
    break_channel(vertex:Vertex) {
        this._neighborsTab = this._neighborsTab.filter(obj => obj !== vertex);
        for (let v = 0; v < this._vertexTab.length; v++) {
            this.rebuilt(v);
        }
    }

    /* Affichage des données de l'agorithme*/
    display_algo_data() {
        console.log("\n_Name= "+this._name);
        console.log("\t_vertexIndi= \t"+this._vertexIndi);
        console.log("\t_intTab : \t"+this.intTabtoString());
        console.log("\t_ndis : \t"+this.ndistoString());
        //console.log("_neighborsTab :"+JSON.stringify(this._neighborsTab));
        //console.log("_vertexTab : "+this.vertexTabtoString());
    }

    intTabtoString() {
        let str = "";
        for(let i=0;i<this._intTab.length;i++) {
            str+= "_intTab["+i+"] = "+this._intTab[i]+"\t\t";
        }
        return str;
    }
    vertexTabtoString() {
        let str = "";
        for(let i=0;i<this._vertexTab.length;i++) {
            str+= "_vertexTab["+i+"] = "+this._vertexTab[i]+"\t";
        }
        return str;
    }
    ndistoString() {
        let str = "";
        for(let i=0;i<this._ndis.length;i++) {
            let val = (this._ndis[i].length==0)?"[N,N,N,N]":JSON.stringify(this._ndis[i]);
            str+= "ndis["+i+"] = "+val+"\t";
        }
        return str;
    }
    toString() {
        return "\nlabel= "+this._name +
            "_D= "+ JSON.stringify(this._intTab)+
            "_Nb= "+ JSON.stringify(this._vertexTab)+
            "_ndis= "+ this.ndistoString()+
            "\n_neighbors= "+ JSON.stringify(this._neighborsTab)+
            "\n_graph= "+ this._graph.toString()+
            "\n_i= "+this._vertexIndi;
    }

    // Getters & Setters
    getName(): string {
        return this._name;
    }
    setName(value: string) {
        this._name = value;
    }
    getIntTab(): number[] {
        return this._intTab;
    }
    setIntTab(value: number[]) {
        this._intTab = value;
    }
    getVertexTab(): Vertex[] {
        return this._vertexTab;
    }
    setVertexTab(value: Vertex[]) {
        this._vertexTab = value;
    }
    getNdis(): number[][] {
        return this._ndis;
    }
    setNdis(value: number[][]) {
        this._ndis = value;
    }
    getNeighborsTab(): Vertex[] {
        return this._neighborsTab;
    }
    setNeighborsTab(value: Vertex[]) {
        this._neighborsTab = value;
    }
    getGraph(): NOGraph {
        return this._graph;
    }
    setGraph(value: NOGraph) {
        this._graph = value;
    }
    getVertexIndi(): number {
        return this._vertexIndi;
    }
    setVertexIndi(value: number) {
        this._vertexIndi = value;
    }



}

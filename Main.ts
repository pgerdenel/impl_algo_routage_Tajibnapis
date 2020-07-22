/* Main
*  fix  affichera  toutes les  arêtes  rompues  et vous proposera d’ensélectionner une  afin  de  la réparer.
*  break même principe si vous entrez fail sur votre terminal, cependant le programme vous affichera toutes les arêtes qui ne sont pas rompues et vous proposera donc d’en sélectionnerune afin de la rompre
*  display : affiche les données du graphe
*  exit : quitte le programme
* */

import {NOGraph} from "./objets/NOGraph";
import {getFilePath} from "./libs/My_api_file";
import {generateGraphFromData, setVertexNeighbors} from "./libs/My_api_graph";

const readline = require('readline');

class Main {

    static graph: NOGraph = new NOGraph();

    static exec_Tajibnapis(graph : NOGraph) {

        graph.launch_Tajibnapis_algorithm(graph);

        const resp = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let user_continue: boolean = false;
        console.log("###########################################################");
        console.log("#                  Tajibnapis ran success                 #");
        console.log("###########################################################");
        want_continue();

        function want_continue() {
            try {
                resp.question('Do you want to continue ? y/n : ', (answer) => {
                    switch (answer.toLowerCase()) {
                        case 'y':
                            console.log("usage : 'display' | 'break' (fail) | 'fix' (repare) | 'exit'");
                            display_pgr_cmd();
                            break;
                        case 'n':
                            console.log('la simulation est terminée');
                            resp.close();
                            process.exit(0);
                            break;
                        default:
                            console.log('Incorrect usage');
                            want_continue();
                            break;
                    }
                });
            }
            catch(e) {
                console.log("erreur want_continue = "+JSON.stringify(e));
            }
        }
        function display_pgr_cmd() {
            try {
                resp.question('Enter command name : ', async (answer) => {
                    switch (answer.toLowerCase()) {
                        case 'fix':
                            console.log('fix starting soon ... ');
                            let canBeFix: boolean = false;
                            console.log("following edge can be fixed : ");
                            for (let i = 0; i < graph.getGraphEdgeTab().length; i++) {
                                if (graph.getGraphEdgeTab()[i].isEdgeBroken()) {
                                    canBeFix = true;
                                    console.log(
                                        "index = " + i + " \n" +
                                        "\tgraph vertex 1A name = " + graph.getGraphEdgeTab()[i].getVertexA().getName() + "\n" +
                                        "\tgraph vertex 2B name = " + graph.getGraphEdgeTab()[i].getVertexB().getName()
                                    );
                                }
                            }

                            if (!canBeFix) {
                                console.log("No edge to fix");
                                /*resp.close();
                                process.exit(0);*/
                                want_continue();
                                break;
                            }
                            await ask_edge_fix();

                            /*resp.close();
                            process.exit(0);*/
                            want_continue();
                            break;
                        case 'break':
                            console.log('break starting soon ...');
                            let canBreak: boolean = false;
                            console.log("following edge can be breaked : ");
                            for (let i = 0; i < graph.getGraphEdgeTab().length; i++) {
                                if (!graph.getGraphEdgeTab()[i].isEdgeBroken()) {
                                    canBreak = true;
                                    console.log(
                                        "index = " + i + "\n" +
                                        "\tgraph vertex 1A name = " + graph.getGraphEdgeTab()[i].getVertexA().getName() + "\n" +
                                        "\tgraph vertex 2B name = " + graph.getGraphEdgeTab()[i].getVertexB().getName()
                                    );
                                }
                            }
                            if (!canBreak) {
                                console.log("No edge to break");
                                want_continue();
                            }
                            else {
                                await ask_edge_break();
                            }
                            //want_continue();
                            break;
                        case 'display':
                            console.log('Displaying data soon ...');
                            for (let vertex of graph.getGraphVertexTab()) {
                                vertex.display_algo_data();
                            }
                            want_continue();
                            break;
                        case 'exit':
                            console.log('Exit soon');
                            resp.close();
                            process.exit(0);
                            break;
                        default:
                            console.log('Incorrect usage');
                            want_continue();
                            break;
                    }
                });
            }
            catch (e) {
                console.log("erreur display_pgr_cmd= "+JSON.stringify(e));
            }

        }

        async function ask_edge_break() {
            try {
                resp.question('What is the edge index you want to break ? ', async (user_input) => {
                user_input = parseInt(user_input);
                try {
                    if ((!user_input && user_input != 0) || user_input < 0 || user_input >= graph.getGraphEdgeTab().length) {
                        console.log("this edge does not exist ...  edge index '"+user_input+"' is invalid");
                        await want_continue();
                    }
                    else {
                        if (!graph.getGraphEdgeTab()[user_input].isEdgeBroken()) {
                            graph.getGraphEdgeTab()[user_input].setEdgeBroken(true);

                            setVertexNeighbors(graph, graph.getGraphEdgeTab()[user_input].getVertexA());
                            setVertexNeighbors(graph, graph.getGraphEdgeTab()[user_input].getVertexB());

                            graph.getGraphEdgeTab()[user_input].getVertexA().break_channel(graph.getGraphEdgeTab()[user_input].getVertexB());
                            graph.getGraphEdgeTab()[user_input].getVertexB().break_channel(graph.getGraphEdgeTab()[user_input].getVertexA());

                            console.log("Edge broken");
                            await want_continue();
                        } else {
                            console.log("Edge is already broken");
                            await want_continue();
                        }
                    }
                }
                catch(e) {
                    console.log("erreur internal ask_edge_break "+e);
                }

            });
            }
            catch (e) {
                console.log("erreur ask_edge_break= "+JSON.stringify(e));
            }
        }
        async function ask_edge_fix() {
            try {
            resp.question('What is the edge index you want to fix ? ', async (user_input) => {
                user_input = parseInt(user_input);

                if ((!user_input && user_input != 0) || user_input < 0 || user_input >= graph.getGraphEdgeTab().length) {
                    console.log("this edge does not exist ...  edge index '"+user_input+"' is invalid");
                    await want_continue();
                }
                else {
                    if (graph.getGraphEdgeTab()[user_input].isEdgeBroken()) {
                        graph.getGraphEdgeTab()[user_input].setEdgeBroken(false);

                        setVertexNeighbors(graph, graph.getGraphEdgeTab()[user_input].getVertexA());
                        setVertexNeighbors(graph, graph.getGraphEdgeTab()[user_input].getVertexB());

                        graph.getGraphEdgeTab()[user_input].getVertexA().fix_channel(graph.getGraphEdgeTab()[user_input].getVertexB());
                        graph.getGraphEdgeTab()[user_input].getVertexB().fix_channel(graph.getGraphEdgeTab()[user_input].getVertexA());

                        console.log("Edge fixed");
                        await want_continue();
                    }
                    else {
                        console.log("Edge is not broken");
                        /*resp.close();
                        process.exit(0);*/
                        await want_continue();
                    }
                }

            });
            }
            catch (e) {
                console.log("erreur ask_edge_fix= "+JSON.stringify(e));
            }
        }
    }

}

try {
    Main.graph = generateGraphFromData(getFilePath() + "\\graph_data");
    Main.exec_Tajibnapis(Main.graph);
}
catch (error) {
    console.log("Erreur lors de l'exécution de l'algorithme"+error);
}

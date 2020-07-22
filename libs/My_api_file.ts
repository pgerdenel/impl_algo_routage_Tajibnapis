/* Fonctions pour la gestion des fichiers : OK */

export function getFilePath() {
    return require('path').dirname(require.main.filename);
}

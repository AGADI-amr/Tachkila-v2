import * as Joueur from './joueurs.js';
import * as Stockage from './stockage.js';
let data = Stockage.LireStockageJ()
const BarDeRecherche = document.querySelector("searchBar");
const joueursList = document.querySelector("#joueurs-grid");
for (let j of data) {
Joueur.affJoueursCard(joueursList,j,data);
}
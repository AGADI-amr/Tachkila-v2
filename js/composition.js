import * as Terrain from './terrain.js'
import * as stockage from './stockage.js';

const field = document.querySelector("section");
Terrain.Generer_Terrain(field);
console.log(field)
let data = stockage.LireStockageJ();

const asideContainer = document.querySelector("aside");
const playerCounter = document.querySelector("#player-count");
 const AllPositionsInField = document.querySelectorAll(".border-dashed");
Terrain.affJoueursSurAside(asideContainer,playerCounter,data);
Terrain.restaurerPositionDesJoueursSurLeTerrain(AllPositionsInField,data)
Terrain.affecterPosteJoueur(asideContainer,data);
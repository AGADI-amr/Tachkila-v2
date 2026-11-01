import { joueurs as JoueursInitials } from "./data_initials.js";
let cle = "stckJoueurs"
if (localStorage.getItem(cle) === null) {
localStorage.setItem(cle, JSON.stringify(JoueursInitials));
}
export function LireStockageJ() {
return JSON.parse(localStorage.getItem(cle)) || [];
}
export function EnregistrerDansStockageJ(joueurs) {
localStorage.setItem(cle, JSON.stringify(joueurs));
}
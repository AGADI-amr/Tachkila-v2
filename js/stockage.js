import { joueurs as JoueursInitials } from "./data_initials.js";
let cle = "stckJoueurs"
if (localStorage.getItem(cle) === null) {
localStorage.setItem(cle, JSON.stringify(JoueursInitials));
}
export function LireStockageJ() {
  try {
    return JSON.parse(localStorage.getItem(cle)) || [];
  } catch {
    localStorage.setItem(cle, JSON.stringify(JoueursInitials));
    return JoueursInitials;
  }
}
export function EnregistrerDansStockageJ(joueurs) {
localStorage.setItem(cle, JSON.stringify(joueurs));
}
export function affMessageSucces(message) {
successMsg.textContent = message;
successMsg.classList.remove("hidden");
setTimeout(() => successMsg.classList.add("hidden"), 3000); 
}

export function affMessageErreur(message) {
ErreurMsg.textContent = message;
ErreurMsg.classList.remove("hidden");
setTimeout(() => ErreurMsg.classList.add("hidden"), 3000); 
}

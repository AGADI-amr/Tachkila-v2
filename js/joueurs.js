function AjouterJoueur() { 
if (!valid) return;
if (modIndex === null) {
data.push({
   name: PlayerName.value.trim(),
   Post: postIsChecked.value,
   numero: PlayerNumber.value.trim(),
   position: "sur le banc"
}); 
showSuccess("Joueur ajouté avec succès")
}
else {
const player = data[modIndex];
  if (player.Post !== postIsChecked.value) {
      if (player.position !== "sur le banc") {
         const PositionInField = document.querySelector("." + player.position.toLowerCase());
         PositionInField.querySelector(".text-sm").textContent = "libre";
      }
   player.position = "sur le banc"; 
   }
   player.name = PlayerName.value.trim();
   player.Post = postIsChecked.value;
   player.numero = PlayerNumber.value.trim();

   editIndex = null;
   showSuccess("Joueur modifié avec succès");
}
localStorage.setItem("playersData", JSON.stringify(data));
form.reset()
showPlayers()

closeBtn.addEventListener('click', () => {
   myModal.classList.add("hidden");
   editIndex = null;
   form.reset();
});  }

function ModifierJoueur() {
 asideContainer.addEventListener("click", function (event) {
   if (!event.target.classList.contains("mod-btn")) return;
   const card = event.target.closest(".player-card");
   modIndex = Number(card.dataset.index)
   const player = data[modIndex];
   document.querySelector("#name").value = player.name;
   document.querySelector("#numero").value = player.numero;
   document.querySelector(`input[name='poste'][value='${player.Post}']`).checked = true;
   myModal.classList.remove("hidden");

}) 
}

function SupprimerJoueur() {
 asideContainer.addEventListener("click", function (event) {
   if (!event.target.classList.contains("sup-btn")) return;
   const card = event.target.closest(".player-card");
   const index = Number(card.dataset.index);
   const player = data[index];
   if (!confirm(`Voulez-vous vraiment supprimer ${player.name} ?`)) return;
   if (player.position !== "sur le banc") {
      const slot = document.querySelector("." + player.position.toLowerCase());
      slot.querySelector(".text-sm").textContent = "libre";
   }
   data.splice(index, 1);
   localStorage.setItem("playersData", JSON.stringify(data));
   showPlayers();
   showSuccess("Joueur supprimé");
});
}

function FiltrerLesJoueurs(joueurs) {
      return joueurs.filter ((j) =>j.name.toLowerCase().includes(etat.recherche.toLowerCase()) &&
      (etat.categorie === "Toutes" || j.post === etat.categorie),
  );

}
const parPage = 8;
const etat = { recherche: "", categorie: "Toutes", page: 1 };
// const JoueursContainer = document.querySelector();
// const btnPrec ;
// const btnSuiv ;
// const currentPage ;
export function affJoueurAvecPagination() {
  const joueursFiltres = FiltrerLesJoueurs(joueurs);
  const totalPages = Math.ceil(joueursFiltres.length / parPage);
  const debut = (etat.page - 1) * parPage;
  const joueursAffiches = joueursFiltres.slice(debut, debut + parPage);
  JoueursContainer.innerHTML = "";
   joueursAffiches.forEach((j) => {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = `${j.name} - ${j.post} DH`;
   JoueursContainer.appendChild(card);
  });
  if (joueursAffiches.length === 0) {
    JoueursContainer.textContent = "Aucun Joueurs ne correspond.";
  }

  currentPage.textContent = `Page ${etat.page} / ${totalPages}`;
  btnPrec.disabled = etat.page <= 1;
  btnSuiv.disabled = etat.page >= totalPages;
}

// btnPrec.addEventListener("click", () => {
//   etat.page--;
//   affJoueurAvecPagination();
// });

// btnSuiv.addEventListener("click", () => {
//   etat.page++;
//   affJoueurAvecPagination();
// });

// document.getElementById("recherche").addEventListener("input", (e) => {
//   etat.recherche = e.target.value;
//   etat.page = 1;
//   affJoueurAvecPagination();
// });

// document.getElementById("categorie").addEventListener("change", (e) => {
//   etat.categorie = e.target.value;
//   etat.page = 1;
//   affJoueurAvecPagination();
// });
function Capitane() {
  return;
}
export function affJoueursCard(sectionContainer,Joueur,Joueurs) {
  const carteJoueur = document.createElement("div");
  carteJoueur.dataset.index = Joueurs.indexOf(Joueur) ; 
  carteJoueur.classList.add("flex-col","w-[278x]","h-[172px]","bg-slate-800","rounded-2xl","border-l-8")
  const JoueurInfoDiv = document.createElement("div");
  JoueurInfoDiv.classList.add("flex","mt-4","gap-2");
  const ageTextDiv = document.createElement("div");
  ageTextDiv.classList.add("text-sm","text-gray-400","ml-6","mt-3");
  ageTextDiv.textContent=`Age : ${Joueur.age} ans`;
  const piedDecarteJ = document.createElement("div");
  piedDecarteJ.classList.add("flex","justify-between","mt-4","mx-2");
  const numero_cercle = document.createElement("div");
   numero_cercle.classList.add("flex" ,"items-center" ,"justify-center",
      "w-10","h-10","border-2","rounded-full","font-semibold","my-2","ml-2");
   numero_cercle.textContent=Joueur.numero ;
   const NomPosition = document.createElement("div");
   NomPosition.classList.add("flex-col");
   const Nomtxt = document.createElement("p")
   Nomtxt.classList.add("text-white","font-semibold")
   Nomtxt.textContent=Joueur.name;
   const post = document.createElement("p"); 
   post.classList.add("py-1","px-1","text-sm","font-semibold","border-2","text-center","rounded-lg","w-12")
   NomPosition.appendChild(Nomtxt);
   NomPosition.appendChild(post); 
   JoueurInfoDiv.appendChild(numero_cercle)
   JoueurInfoDiv.appendChild(NomPosition)
   carteJoueur.appendChild(JoueurInfoDiv)
   carteJoueur.appendChild(ageTextDiv)
  
   switch (Joueur.post) {
  case "gardien":
    carteJoueur.classList.add("border-yellow-500")
    numero_cercle.classList.add("border-yellow-500","text-yellow-300")
    post.classList.add("text-yellow-900","border-yellow-900","bg-yellow-400")
    post.textContent="GB";
    break;
  case "defenseur":
    carteJoueur.classList.add("border-blue-500")
    numero_cercle.classList.add("border-blue-500","text-blue-300")
    post.classList.add("text-blue-900","border-blue-900","bg-blue-400")
    post.textContent="DEF";
    break;
  case "milieu":
    carteJoueur.classList.add("border-green-500")
    numero_cercle.classList.add("border-green-500","text-green-300")
    post.classList.add("text-green-900","border-green-900","bg-green-400")
    post.textContent="MIL";
    break;
  case "attaquant":
    carteJoueur.classList.add("border-red-500")
    numero_cercle.classList.add("border-red-500","text-red-300")
    post.classList.add("text-red-900","border-red-900","bg-red-400")
    post.textContent="ATT";
    break;
  default:
    break;
}
let statusJ = Joueur.statut;
const statusDiv = document.createElement("div");
statusDiv.classList.add("p-1","text-sm","font-semibold","rounded-lg","ml-3")
statusDiv.textContent=`${statusJ}`;
if (statusJ === "enforme") {
   statusDiv.classList.add("text-green-200","bg-green-700")
}
else if (statusJ ==="blesse") {
   statusDiv.classList.add("text-red-200","bg-red-700")
}

const iconContainer = document.createElement("div");
iconContainer.classList.add("icon-container","flex");
const iconCapitaine = document.createElement("i");
iconCapitaine.classList.add("fa-regular", "fa-copyright");

const editIcon = document.createElement("i");
editIcon.classList.add("fa-regular", "fa-pen-to-square");

const DeleteIcon = document.createElement("i");
DeleteIcon.classList.add("fa-solid", "fa-trash-can");
iconContainer.append(iconCapitaine,editIcon,DeleteIcon)
piedDecarteJ.appendChild(statusDiv)
piedDecarteJ.appendChild(iconContainer)

carteJoueur.appendChild(piedDecarteJ)
sectionContainer.appendChild(carteJoueur);
 }
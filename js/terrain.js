import * as stockage from "./stockage.js";

export function Generer_Terrain(field) {

 for (let i = 0 ; i < 82 ; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("grid-square") ;
    field.appendChild(newDiv);
 }
}
export function affJoueursSurAside(asideContainer,playerCounter,data) {
   asideContainer.querySelectorAll(".player-card").forEach(card => card.remove());

   for (let i = 0; i < data.length; i++) {

   const playerCard = document.createElement("div")
   const playerCardWselection = document.createElement("div");
   playerCardWselection.classList.add("PlayerCard")
   playerCardWselection.dataset.index = i; 
   playerCard.classList.add("player-card","rounded-lg","flex",
      "justify-between", "m-[10px]" ,"items-center", "border-2","border-l-8")
   const info_div = document.createElement("div")
   const P_name = document.createElement("p");
   P_name.classList.add("text-white","text-lg","text-center","font-semibold");
   P_name.textContent=`${data[i].name}`;

   const numero_cercle = document.createElement("div");
   numero_cercle.classList.add("flex" ,"items-center" ,"justify-center",
      "w-10","h-10","border-2","rounded-full","font-semibold","my-2","ml-2")
   numero_cercle.textContent=data[i].numero;

   const post_div = document.createElement("div");
   post_div.classList.add("border","rounded-lg","font-semibold","p-2","mr-2")

const select = document.createElement("select");
select.classList.add("position-select", "bg-slate-900", "text-white",
   "text-sm", "rounded-lg", "border", 
   "border-gray-500", "mt-1","w-[264px]","h-10","m-[10px]");

const options = {
   gardien:   ["sur le banc", "GB"],
   defenseur: ["sur le banc", "DG", "DC1", "DC2", "DD"],
   milieu:    ["sur le banc", "MG", "MC1", "MC2", "MD"],
   attaquant: ["sur le banc", "BU1", "BU2"]
};

options[data[i].post].forEach(opt => {
   const option = document.createElement("option");
   option.value = opt;
   option.textContent = opt;
   select.appendChild(option);
});

if (data[i].position === null) {
   select.value = "sur le banc";
}
else {
select.value = data[i].position;
}

// change Player card color based on position color;
   switch (data[i].post) {
      case "gardien": 
        playerCard.classList.add("border-yellow-500")
        numero_cercle.classList.add("border-yellow-500","text-yellow-500") 
        post_div.classList.add("text-yellow-500","border-yellow-500")
        post_div.textContent="GB";
        info_div.classList.add("text-yellow-500")
         break;
      case "defenseur": 
        playerCard.classList.add("border-blue-500")
        numero_cercle.classList.add("border-blue-500","text-blue-500") 
        post_div.classList.add("text-blue-500","border-blue-500")
        post_div.textContent="DEF";
        info_div.classList.add("text-blue-500")
         break;
      case "milieu": 
        playerCard.classList.add("border-green-500")
        numero_cercle.classList.add("border-green-500","text-green-500") 
        post_div.classList.add("text-green-500","border-green-500")
        post_div.textContent="MIL";
        info_div.classList.add("text-green-500")
         break;
      case "attaquant": 
        playerCard.classList.add("border-red-500")
        numero_cercle.classList.add("border-red-500","text-red-500") 
        post_div.classList.add("text-red-500","border-red-500")
        post_div.textContent="ATT";
        info_div.classList.add("text-red-500")
         break;
      default:
         break;
   }
   info_div.appendChild(P_name);
   playerCard.appendChild(numero_cercle);
   playerCard.appendChild(info_div);
   playerCard.appendChild(post_div);
   playerCardWselection.appendChild(playerCard);
   playerCardWselection.appendChild(select);
   asideContainer.appendChild(playerCardWselection)
}
   playerCounter.textContent = data.length;
}

export function affecterPosteJoueur (asideContainer,data) {
asideContainer.addEventListener("change", function (event) {

   if (!event.target.classList.contains("position-select")) return;
   let opt = event.target.value;
   if (opt != "sur le banc") {
   const card = event.target.closest(".PlayerCard");
   const index = Number(card.dataset.index);
   const player = data[index].name;
   const PositionInFieldClass = "."+opt.toLowerCase();
   const PositionInField = document.querySelector(PositionInFieldClass);
   const target_P = PositionInField.querySelector(".text-sm")
   const AllPositionsInField = document.querySelectorAll(".border-dashed") 
   for (let i of AllPositionsInField) {
      const target = i.querySelector(".text-sm");
      if (target.textContent.trim() === player) {
        return;
      }
   }
   if (target_P.textContent === "libre") {
   data[index].position = opt;
   target_P.textContent=player;
   target_P.classList.add("text-white")
   stockage.EnregistrerDansStockageJ(data)
   }
   else { 
      // selection_err.textContent="cette position est deja occupee"
      // setTimeout(() => selection_err.textContent = "", 3000);
   }
}
   else {
   const card = event.target.closest(".PlayerCard");  
   const index = Number(card.dataset.index);
   const oldPosition = data[index].position;
   data[index].position = null;
   stockage.EnregistrerDansStockageJ(data)
   if (oldPosition !== null) {
   const PositionInFieldClass = "."+oldPosition.toLowerCase();
   const PositionInField = document.querySelector(PositionInFieldClass);
   const target_P = PositionInField.querySelector(".text-sm")
      target_P.textContent="libre"; 
      target_P.classList.remove("text-white")
   }
   }
});
}

export function restaurerPositionDesJoueursSurLeTerrain(AllPositionsInField,data)
{

 for (let i of AllPositionsInField ){
   const target = i.querySelector(".text-sm")
   for (let j of data) {
   if (j.position != null)  {
      if (i.classList.contains(j.position.toLowerCase()))
      {target.textContent=j.name;
      target.classList.add("text-white")
      }
         } 
      }
   } 
}

//récupère les données depuis le fichier JSON
const reponse = await fetch("pieces-autos.json"); 
const pieces = await reponse.json();


for(let i =0 ; i<pieces.length ; i++){
    const article = pieces[i]

    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches")

    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article")

    //On rattache piecesElement à sectionFiches
    sectionFiches.appendChild(pieceElement)

    // Création des balises 
    const nomElement = document.createElement("h2")
    const prixElement = document.createElement("p")
    const categorieElement = document.createElement("p")
    const imageElement = document.createElement("img")
    const descriptionElement = document.createElement("p")
    const stockElement = document.createElement("p")

    //remplissage des balises
    nomElement.innerText = article.nom
    prixElement.innerText = `Prix : ${article.prix} € (${article.prix < 35 ? "*" :"**" })`
    categorieElement.innerText = `${article.categorie ?? "aucune categorie"}`
    imageElement.src = article.image 
    descriptionElement.innerText = `${article.description ?? "aucune description"}`
    stockElement.innerText = `${article.disponibilite ? "En stock" : "Rupture de Stock"}`

    //On rattache tout à pieceElement
    //attention l'ordre est important dans l'affichage des éléments
    pieceElement.appendChild(imageElement)
    pieceElement.appendChild(nomElement)
    pieceElement.appendChild(prixElement)
    pieceElement.appendChild(categorieElement)
    pieceElement.appendChild(descriptionElement)
    pieceElement.appendChild(stockElement)
}


const boutonTrier = document.querySelector(".btn-trier")
boutonTrier.addEventListener("click", function(){
    const piecesOrdonnees = Array.from(pieces)
    piecesOrdonnees.sort(function(a,b){
        return a.prix - b.prix
    })
    console.log(piecesOrdonnees)
})

const boutonFiltrer = document.querySelector(".btn-filtrer")
boutonFiltrer.addEventListener("click",function(){
    const pieceFiltre = pieces.filter(function(piece){
        return piece.prix <= 35
    })
})

const boutonFiltrerDescription = document.querySelector(".btn-filtrer-description")
boutonFiltrerDescription.addEventListener("click",function(){
    const pieceFiltreDescription = pieces.filter(function(piece){
        return piece.description
    })
    console.log(pieceFiltreDescription)
})

const boutonTrierDecroissant = document.querySelector(".btn-trier-ordre-decroissant")
boutonTrierDecroissant.addEventListener("click",function(){
    const pieceTrierDecroissant = Array.from(pieces)
    pieceTrierDecroissant.sort(function(a,b){
        return b.prix - a.prix
    })
    console.log(pieceTrierDecroissant)
})


const noms = pieces.map(pieces => pieces.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1)
   }
}

//Création de la liste
const abordablesElements = document.createElement('ul');

//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms[i];
   abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordable').appendChild(abordablesElements)



const piecesDispo = pieces.map(pieces => pieces.nom)
const piecesPrix = pieces.map(pieces => pieces.prix)
for(let i = pieces.length-1;i>=0;i--){
    if(pieces[i].disponibilité != true){
        piecesDispo.splice(i,1)
        piecesPrix.splice(i,1)
    }
}

const dispoElement = document.createElement('ul')

document.querySelector('.disponible').appendChild(dispoElement)

for(let i=0;i<piecesDispo.length;i++){
    const element = document.createElement('li')
    element.innerText = `${piecesDispo[i]} - ${piecesPrix[i]} €`
    dispoElement.appendChild(element)
}

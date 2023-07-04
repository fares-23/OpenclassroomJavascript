const reponse = await fetch("pieces-autos.json")
const pieces = await reponse.json()


function afficherPieces(){
    
    for(let i = 0;i<pieces.length;i++){

        const article = document.createElement('article')
        document.querySelector('.fiches').appendChild(article)

        const titreElement = document.createElement("h3")
        titreElement.innerHTML = pieces[i].nom
        article.appendChild(titreElement)

        const imageElement = document.createElement("img")
        imageElement.src = pieces[i].image
        article.appendChild(imageElement)

        const prixElement = document.createElement("p")
        prixElement.innerHTML = `Prix : ${pieces[i].prix} € (${pieces[i].prix < 35 ? "*" : "***"})`
        article.appendChild(prixElement)

        
    }
   
}


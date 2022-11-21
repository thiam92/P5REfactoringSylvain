//On initialise l'adresse url que l'on va utiliser
let urlBasic ="";
let searchParams= new URLSearchParams(urlBasic);

//on demande au serveur la liste de produits
fetch ("http://localhost:3000/api/products")
    //on vérifie si la réponse est valide
    .then(function(response) {
        if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
        }
        return response.json();
    })
    .then (function(jsonListOfKanap){
       let url="";
       //on ajoute la liste de produit dans le localStorage pour plus tard
       uploadCartItem('products',JSON.stringify(jsonListOfKanap))
       //on créer une fiche produit sur index.html pour chaque élément dans la liste
       for (let jsonKanap in jsonListOfKanap){
            k=jsonListOfKanap[jsonKanap];
            let kanap = new Kanap(k);
            url=addId(kanap);
            let newDom="";
            newDom += '<a href="./product.html?'+url+'"><article><img src="'+kanap.imageUrl+'" alt="'+kanap.altTxt+'"><h3 class="productName"> '+kanap.name+' </h3><p class="productDescription">'+ kanap.description+' </p></article></a>'; 
            url=removeId();
        }
        document.getElementById('items').innerHTML=newDom;
       
    })
    .catch (function(err) {
        alert("une erreur s'est produite");
    });


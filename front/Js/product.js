let currentURL= new URLSearchParams(location.search);
// console.log(localStorage)
if (currentURL.has("_id")) { 
   var productURL = "http://localhost:3000/api/products/" + currentURL.get("_id"); 
}
//on récupère l'id dans l'URL afin de recupérer la fiche produit liée
fetch(productURL)
   .then(function(response) {
      if (!response.ok) {
      throw new Error("HTTP error, status = " + response.status);
      }
      return response.json();
   })
   .then(function(product){
      //on remplit la page produit avec les informations produit
      document.getElementById('title').innerHTML = ''+product.name+'';
      document.getElementById('price').innerHTML = ''+product.price+'';
      document.getElementById('description').innerHTML = ''+product.description+'';
      document.getElementsByClassName('item__img')[0].innerHTML = '<img src="'+product.imageUrl+'" alt="'+product.altTxt+'">';
      //on récupère chaque valeur de couleur disponible que l'on ajout comme valeur possible
      let palette = product.colors;
      for (let colors in palette){
         let color= palette[colors];
         document.getElementById('colors').innerHTML += '<option value="'+color+'">'+color+'</option>'; 
      }
      document
      .getElementById('addToCart')
      .addEventListener('click', function(e){
         e.preventDefault();
         e.stopPropagation();
         cart = JSON.parse(localStorage.getItem('cart'))
         // console.log(cart)
         //création de la variable locale de la sélection
         let cartArticle={
            id : "",
            color : "",
            quantity:  0,
         };
         cartArticle.id = currentURL.get('_id');
         cartArticle.color = document.getElementById('colors').value;
         //on utilise le + afin de transformer le string en number
         cartArticle.quantity = + document.getElementById('quantity').value;
         if (cart == null){
            cart= [];
            console.log('You choose your first article')
            cart.push(cartArticle);
         }
         else {
            let identicalId = cart.filter(article => article.id == cartArticle.id);
            let identicalColor = identicalId.filter(article => article.color == cartArticle.color);
            // console.log(identicalId)
            // console.log(identicalColor)
         //On vérifie si l'article n'est pas déjà dans le panier!
            if (identicalId.length ==0 || identicalColor.length == 0) {
            console.log('this is a new article in the cart')
            cart.push(cartArticle);
            // console.log(cart)
            }
         //Si l'article y est déjà ,on récupère le produit et on n'ajoute que la quantité.
            else {
               console.log('this article is already in the cart')
               let checkQuantity = identicalColor[0]; 
               checkQuantity.quantity += +cartArticle.quantity
            } 
         }
       
      //   console.log(cart)
      //on met à jour le panier
        uploadCartItem('cart',cart);
      //   console.log(localStorage.getItem('cart'));
    });

   })
   .catch (function(err) {
      alert("une erreur s'est produite");
   });

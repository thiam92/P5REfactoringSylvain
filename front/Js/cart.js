cart = JSON.parse(localStorage.getItem('cart'))
console.log(cart)
let products =JSON.parse(localStorage.getItem('products'))
let product ="";
//On crée les fiches produits des articles du panier.
for (articleNumber in cart){
    let article =cart[articleNumber];
    product = products.filter(product => product._id ===article.id )[0];
    document.getElementById('cart__items').innerHTML += '<article class="cart__item" data-id="'+article.id+'"><div class="cart__item__img"><img src="'+product.imageUrl+'" alt="Photographie d&prime;un canapé"></div><div class="cart__item__content"><div class="cart__item__content__titlePrice"><h2>'+product.name+'</h2><p>'+product.price+' €</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__color"><p>Couleur :<span class="Couleur">'+article.color+'</span></p></div><div class="cart__item__content__settings__quantity"><p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="'+article.quantity+'"></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div></article>';
}

// on regarde la valeur de la quantité choisie et on l'applique au panier
let selectedQuantity = document.querySelectorAll('.itemQuantity');

selectedQuantity.forEach(function(quantity){
    quantity.addEventListener('change',function(){
        let articles = quantity.closest("article");
        console.log(articles)
        let articleContent = quantity.closest(".cart__item__content__settings");
        let articleCouleur = articleContent.querySelector('.Couleur');
        console.log(articleCouleur)
        let id=cart.filter (articleId => articleId.id == articles.dataset.id);
        let idColor = id.filter (articleId => articleId.color == articleCouleur.innerText);
        //on tri l'article ayant la même couleur par ceux ayant le même ID
        console.log(idColor)
        idColor[0].quantity = + quantity.value;
        uploadCartItem('cart',cart)
        //on recharge la page pour mettre à jour le panier
        location.reload();
        console.log(cart)
    });
});

console.log(products)
//on supprime l'article lors de l'utilisation du bouton supprimer
deleteCartItem()

//on récupère le nombre d'articles et on calcule le prix total
let totalPrice=0;
let sumQuantity=0;
let quantityOfArticles = document.querySelectorAll('.itemQuantity');
quantityOfArticles.forEach(function(quantity){
    let selectedArticle = quantity.closest('article');
    getProduct(selectedArticle.dataset)
    sumQuantity+= +quantity.value
    totalPrice+= quantity.value * product.price
})

 
document.getElementById('totalQuantity').innerText = sumQuantity;
document.getElementById('totalPrice').innerText = totalPrice;

//on vérifier les inputs
let firstName = document.getElementById('firstName');
let firstNameError = document.getElementById('firstNameErrorMsg');
verificationName('firstName','firstNameErrorMsg');

let lastName = document.getElementById('lastName');
let lastNameError = document.getElementById('lastNameErrorMsg');
verificationName('lastName','lastNameErrorMsg');

let city = document.getElementById('city');
let cityError = document.getElementById('cityErrorMsg');
verificationName('city','cityErrorMsg');

let address = document.getElementById('address');
let addressError = document.getElementById('addressErrorMsg');
verificationAdress('address','addressErrorMsg');

let email = document.getElementById('email');
let emailError = document.getElementById('emailErrorMsg');
verificationEmail('email','emailErrorMsg');

//on attend la submission afin de créer la fiche client
document
    .getElementById('order')
    .addEventListener('click',function(e){
        e.preventDefault();
        if (firstName.value==''|| lastName.value ==''|| city.value ==''|| address.value ==''|| email.value ==undefined|| firstNameError.innerHTML !== '' || lastNameError.innerHTML !== '' || cityError.innerHTML !== '' || addressError.innerHTML !== '' || emailError.innerHTML !== ''){
          console.log(firstNameError.innerHTML);
          alert('Vos information ne sont pas correct\nVeuillez vérifier que tous les champs soient remplis');
        }
        else{
          console.log('ok')
          let productOrder =[];
          let cart = JSON.parse(localStorage.getItem('cart'));
          for (let i in cart){
              productOrder.push(cart[i].id)
          }
          const order = {
            contact: {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    city:document.getElementById('city').value,
                    address:document.getElementById('address').value,
                    email:document.getElementById('email').value,
            },
            products: productOrder,
          };
          console.log(order);

          // requete post

          const options = {
            method: "POST",
            // mode: "no-cors",
            body: JSON.stringify(order),
            headers: { "Content-Type": "application/json" },
          };
          console.log(JSON.stringify(order));
          console.log(options);

          fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
              document.location.href = 'confirmation.html?id='+data.orderId+''
            })
            .catch((err) => {
              alert("Il y a eu une erreur : " + err);
              console.log(err);
            });
        }
    });
 



//on crée un class pour les objet kanap
class Kanap{
    constructor(k){
        Object.assign(this, k);
    }
}
function addId(value){
    searchParams.append("_id",value._id);
    return searchParams.toString();
}
function removeId(){
    searchParams.delete("_id");
    return searchParams.toString();
}
//on récupére l'article ayant un id identique à celui du paramètre
function getProduct(item){
    product = products.filter(product => product._id ===item.id )[0]; 
}
//fonction de mise à jour du panier

function uploadCartItem(object,item){
    localStorage.setItem(''+object+'',JSON.stringify(item))
}

function deleteCartItem(){
    let supprimer = document.querySelectorAll('.deleteItem');
    supprimer.forEach(function(btn){
        btn.addEventListener('click', function(){
            console.log(cart)
            console.log('you choose to remove this element')
            let removeArticle = btn.closest('article');
            console.log(removeArticle.dataset.id)
            let articleContent = btn.closest(".cart__item__content__settings");
            let articleCouleur = articleContent.querySelector('.Couleur');
            let id = cart.filter(articleId => articleId.id == removeArticle.dataset.id);
            console.log(id)
            let idColor = id.filter(articleId => articleId.color == articleCouleur.innerText);
            console.log(idColor)
            for (element in cart){
                let elementObject= cart[element]
                if(elementObject.color == idColor[0].color){
                    cart.splice(element,1);
                }
            }
            uploadCartItem(cart)
            removeArticle.remove();
            location.reload();
            console.log(cart)
        });
    });

}

//function Regex

function isNameValid(id,errorId){
    console.log(id.target.value)
    if(/^[a-z ,.'-]+$/i.test(id.target.value) || id.target.value ==''){
        document.getElementById(''+errorId+'').innerHTML = ''
    }
    else{
        document.getElementById(''+errorId+'').innerHTML = 'il y a une erreur veuillez réesayer'
    }
}
function isAdressValid(id,errorId){
    if (/^[\w ,.'-]+$/.test(id.target.value) || id.target.value ==''){
        document.getElementById(''+errorId+'').innerHTML = ''
    }
    else{
        document.getElementById(''+errorId+'').innerHTML = 'il y a une erreur veuillez réessayer'
    }
}
function isEmailValid(id,errorId){
    if (/^[\w .@]+$/.test(id.target.value) || id.target.value ==''){
        document.getElementById(''+errorId+'').innerHTML = ''
    }
    else{
        document.getElementById(''+errorId+'').innerHTML = 'il y a une erreur veuillez réessayer'
    }
}


function verificationName(id,errorId){
 document
    .getElementById(''+id+'')
    .addEventListener('input',function(e){
    isNameValid(e,''+errorId+'')
    });

}
function verificationAdress(id,errorId){
 document
    .getElementById(''+id+'')
    .addEventListener('input',function(e){
    isAdressValid(e,''+errorId+'')
    });
}
function verificationEmail(id,errorId){
    document
    .getElementById(''+id+'')
    .addEventListener('input',function(e){
    isEmailValid(e,''+errorId+'')
    });
}

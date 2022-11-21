let order = new URLSearchParams(window.location.search);
let orderId = order.get('id');
console.log(orderId)
//on récupère l'id dans l'URL que l'on affiche sur la page
document.getElementById('orderId').innerHTML = ''+orderId+'';
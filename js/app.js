// Récupère le container des produits
let coursesList = document.querySelector("#courses-list");
let header = document.querySelector("#header");
let coursesTable = [];
let cart = document.getElementById("in-cart-items-num");
let Subtotal = document.getElementById("Subtotal");
let stock = document.getElementsByClassName("stock");
let redirection = document.getElementById('confirm-command');
let alert_notification = document.querySelector('.notification-container')
stock.innerHTML = 50 ;

refreshCart();
removeCartItem();
clearCart();


// Se place dans le container
coursesList.addEventListener('click', (e) => {
    //Se place dans la carte dcu produit
    if (e.target.className == 'add-to-cart') {

        //Récupère le chiffre de data-id de l'élément
        let dataId = e.target.getAttribute("data-id");
        let courseName = COURSES[dataId].title;

        addToLS(COURSES[dataId]);

        refreshCart();

        notification("Vous avez ajouter un " + courseName + " dans le panier", '#198754', '#FFF')

    }
})

function removeCartItem(){
    header.addEventListener('click', (e) =>{
        if (e.target.className == 'cart-item'){
            e.target.parentNode.parentNode.remove();
            refreshCart();

            let index = e.target.parentNode.parentNode.querySelector(".index").innerHTML;
            // cart.innerHTML --;
            // Subtotal.innerHTML -= parseInt(9.99);

            removeFromLS(index);

        }
    })
}

//récupère le stock et l'affiche dans le HTML
// function getStock(){

//     let lsList = JSON.parse(localStorage.getItem("panier"));
//     if (lsList == null){
//         return;
//     }

//     let AllStocks = document.querySelectorAll(".stock");

//     let ux_ui = lsList.filter(function(item) {
//         return item.id == 1;
//     });
//     let php_8 = lsList.filter(function(item) {
//         return item.id == 2;
//     });
//     let react_js = lsList.filter(function(item) {
//         return item.id == 3;
//     });
//     let node_js = lsList.filter(function(item) {
//         return item.id == 4;
//     });
//     let my_sql = lsList.filter(function(item) {
//         return item.id == 5;
//     });

//     AllStocks[0].innerHTML = ux_ui[ux_ui.length-1].stock;
//     AllStocks[1].innerHTML = php_8[php_8.length-1].stock;
//     AllStocks[2].innerHTML = react_js[react_js.length-1].stock;
//     AllStocks[3].innerHTML = node_js[node_js.length-1].stock;
//     AllStocks[4].innerHTML = my_sql[my_sql.length-1].stock;

// }

function refreshCart(){

    let lsList = JSON.parse(localStorage.getItem("panier"));

    let button = "<button class='cart-item'>Supprimer</button>";
    let td = "";

    for(o in lsList){
        td += `<tr class="table-row"><td class="index" style="display: none">${o}</td>
    <td></td><td>${lsList[o].title}</td><td>${lsList[o].price}</td><td>1</td><td>${button}</td></tr>`;
    }

    let refTable = document.getElementById("cart-table");
    refTable.tBodies[0].innerHTML = td;
}


function clearCart(){
    header.addEventListener('click', (e) =>{
        if (e.target.className == 'button u-full-width'){
            localStorage.clear();
            e.target.parentNode.querySelector(".tbody").innerHTML = "";
            notification('Vous avez vidé le panier', '#0dcaf0', '#000');
            cart.innerHTML == 0;
            Subtotal.innerHTML == parseFloat(0);
        }
    })
}

function addToLS(data){

    let a = [];
    a = localStorage.getItem('panier');

    if (a != null){
        a = JSON.parse(a);
        // cart.innerHTML ++;
        // Subtotal.innerHTML += parseInt(9.99);
    }  else {
        a = [];
    }


    // if (data.stock > 1){
    //     data.stock--;
    // }
    // else{
    //     alert('Article Indisponible');
    //     return;
    // }

    a.push(data);
    localStorage.setItem('panier', JSON.stringify(a));

}

function removeFromLS(data){

    let lsList = JSON.parse(localStorage.getItem("panier"));

//    let lastObjectId = lsList[data].id;

    //Enlever l'objet en question de l'array
    lsList = lsList.filter(item => item !== lsList[data]);

    // for (o in lsList){
    //     if (lsList[o].id = lastObjectId){
    //         lsList[o].stock++;
    //     }
    // }

    localStorage.setItem('panier', JSON.stringify(lsList));
    notification('Vous avez supprimer un article', '#dc3545', '#FFF')

}

// Redirection
redirection.addEventListener('click', function () {
    window.location = 'form.html'
})

/*
supprime l'element passe en parametre
 */
function hide(element) {
    element.remove()
}

/*

 */
const notificationMessage = (message, backgroundColor, color) =>
    `
    <div class="alert" style="background: ${backgroundColor}; color: ${color}">
      <span class="message">${message}</span>
    </div>
    `

function notification (message, backgroundColor, color) {

    let div = document.createElement('div')
    div.classList.add('alert-messages')
    div.innerHTML = notificationMessage(message, backgroundColor, color)
    let alert_box = alert_notification.appendChild(div)

    // après 3 secondes
    setTimeout(function () {
        hide(alert_box)
    }, 3000)
}
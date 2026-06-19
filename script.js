function init() {
    renderMeals();
    updateShoppingCartCounter();
}

function renderMeals() {
    for (let index = 0; index < myMeals.length; index++) {
        switch (myMeals[index].category) {
            case 'burger':
                renderOneMeal('burgers-container', index);
                break;
            case 'pizza':
                renderOneMeal('pizzas-container', index);
                break;
            case 'salad':
                renderOneMeal('salads-container', index);
                break;
            default:
                break;
        }
    }
}

function renderOneMeal(container_id, index) {
    document.getElementById(container_id).innerHTML += getMealTemplate(myMeals[index].name,
        myMeals[index].description,
        myMeals[index].price,
        index
    );
    document.getElementById(`meal-media-${index}`).style.backgroundImage = `url(${myMeals[index].img_src})`;
    if (myMeals[index].amount == 0) {
        ableAddBtn(index);
    } else {
        disableAddBtn(index);
    }
}   

function disableAddBtn(index) {
    const addBtnRef = document.getElementById(`add-btn-${index}`);
    addBtnRef.style.color = 'rgba(231, 108, 31, 1)';
    addBtnRef.innerHTML = `Added 1`;
    addBtnRef.disabled = true;
}

function ableAddBtn(index) {
    const addBtnRef = document.getElementById(`add-btn-${index}`);
    addBtnRef.style.color = 'black';
    addBtnRef.innerHTML = `Add to basket`;
    addBtnRef.disabled = false;  
}

function showBasket() {
    const basketRef = document.getElementById('basket');
    basketRef.showModal();
    for (let index = 0; index < myMeals.length; index++) {
        if (myMeals[index].amount > 0) {
            basketRef.innerHTML = getFullBasketTemplate();
            renderBasketMeals();
            renderBasketSummary();
            return;
        }
    }
    basketRef.innerHTML = getEmptyBasketTemplate();
}

function addAmount(index) {
    myMeals[index].amount += 1;
    updateShoppingCartCounter();
    disableAddBtn(index);
}

function subtractAmount(index) {
    myMeals[index].amount -= 1;
    updateShoppingCartCounter();
    if (myMeals[index].amount == 0) {
        ableAddBtn(index);
    }
}

function renderBasketMeals() {
    for (let index = 0; index < myMeals.length; index++) {
        if (myMeals[index].amount > 0) {
            document.getElementById('basket-items-container').innerHTML += getBasketMealTemplate(myMeals[index].name, 
            myMeals[index].price,
            index); 
        }
    }   
}

function renderBasketSummary() {
    let subtotal = 0.00;
    let deliveryFee = 4.99;
    let total = 0.00;
    for (let index = 0; index < myMeals.length; index++) {
        if (myMeals[index].amount > 0) { 
            subtotal += myMeals[index].price * myMeals[index].amount;
        }
    }
    total = subtotal + deliveryFee;
    document.getElementById('basket-summary').innerHTML = getBasketSummaryTemplate(subtotal.toFixed(2), deliveryFee, total.toFixed(2));   
}

function updateShoppingCartCounter(){
    let counter = 0;
    const counterRef = document.getElementById('shopping-cart-counter');
    for (let index = 0; index < myMeals.length; index++) {
        counter += myMeals[index].amount;
    }
    if (counter > 0) {
        counterRef.style.display = 'flex';
        counterRef.innerHTML = counter; 
        document.getElementById('counter-path').style.fill = 'rgba(231, 108, 31, 1)';
    } else {
        counterRef.style.display = 'none';
        document.getElementById('counter-path').style.fill = 'white';
    }
}

function addAmountBasketItem(index) {
    const quantityRef = document.getElementById(`quantity-of-${index}`);
    addAmount(index);
    renderBasketSummary();
    quantityRef.innerHTML = parseInt(quantityRef.innerHTML) + 1;
}

function subtractAmountBasketItem(index) {
    const quantityRef = document.getElementById(`quantity-of-${index}`);
    subtractAmount(index);
    renderBasketSummary();
    quantityRef.innerHTML = parseInt(quantityRef.innerHTML) - 1;
    if (quantityRef.innerHTML == 0) {
        showBasket();
    }
}

function closeBasket() {
    document.getElementById('basket').close();
}

function showOrderConfirmedDialog() {
    closeBasket();
    updateAddBtn();
    emptyAmountsFromItems();
    updateShoppingCartCounter();
    document.getElementById('order-confirmed-dialog').showModal();
}

function updateAddBtn() {
    for (let index = 0; index < myMeals.length; index++) {
        if (myMeals[index].amount > 0) {
            document.getElementById(`add-btn-${index}`).style.color = 'black';
            document.getElementById(`add-btn-${index}`).innerHTML = `Add to basket`;
        }
    }
}

function emptyAmountsFromItems() {
    for (let index = 0; index < myMeals.length; index++) {
        if (myMeals[index].amount > 0) { 
            myMeals[index].amount = 0;
        }         
    }
}

function closeConfirmedOrderDialog() {
    document.getElementById('order-confirmed-dialog').close();
}

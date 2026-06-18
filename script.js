function init() {
    renderMeals();
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

function renderBasketMeals() {
    for (let index = 0; index < myMeals.length; index++) {
        if (myMeals[index].amount > 0) {
            document.getElementById('basket-items-container').innerHTML += getBasketMealTemplate(myMeals[index].name, 
            myMeals[index].price); 
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

function closeBasket() {
    document.getElementById('basket').close();
}

function showOrderConfirmedDialog() {
    closeBasket();
    emptyAmountsFromItems();
    document.getElementById('order-confirmed-dialog').showModal();
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
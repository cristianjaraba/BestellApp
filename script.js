let subtotal = 0.00;
let deliveryFee = 4.99;
let total = 0.00;

function init() {
    renderMeals();
    updateShoppingCartCounter();
}

function renderMeals() {
    for (let index = 0; index < myMeals.length; index++) {
        renderOneMeal(myMeals[index].category + '-container', index);
    }
}

function renderOneMeal(container_id, index) {
    const currentMeal = myMeals[index];
    document.getElementById(container_id).innerHTML += getMealTemplate(currentMeal.name, currentMeal.description, currentMeal.price, index);
    document.getElementById(`meal-media-${index}`).style.backgroundImage = `url(${currentMeal.img_src})`;
    if (currentMeal.amount == 0) {
        ableAddBtn(index);
    } else {
        disableAddBtn(index);
    }
}

function disableAddBtn(index) {
    const addBtnRef = document.getElementById(`add-btn-${index}`);
    addBtnRef.style.color = 'rgba(231, 108, 31, 1)';
    addBtnRef.innerHTML = `Added ${myMeals[index].amount}`;
    addBtnRef.disabled = true;
}

function ableAddBtn(index) {
    const addBtnRef = document.getElementById(`add-btn-${index}`);
    addBtnRef.style.color = 'black';
    addBtnRef.innerHTML = `Add to basket`;
    addBtnRef.disabled = false;
}

function showBasket() {
    for (let index = 0; index < myMeals.length; index++) {
        if (myMeals[index].amount > 0) {
            document.getElementById('basket').innerHTML = getFullBasketTemplate();
            renderBasketsAndSummaries();
            if (isDesktopBasketNotDisplayed()) {
                document.getElementById('basket').showModal();
            }
            return;
        }
    }
    getEmtpyBasketsTemplates();
    if (isDesktopBasketNotDisplayed()) {
        document.getElementById('basket').showModal();
    }
}

function renderBasketsAndSummaries() {
    renderBasketMeals();
    renderBasketSummary();
    renderBasketMealsDesktop();
    renderBasketSummaryDesktop();
}

function getEmtpyBasketsTemplates() {
    document.getElementById('basket').innerHTML = getEmptyBasketTemplate();
    document.getElementById('aside').innerHTML = getEmptyDesktopBasketTemplate();
}

function isDesktopBasketNotDisplayed() {
    //https://www.w3schools.com/jsref/jsref_getcomputedstyle.asp
    return getComputedStyle(document.getElementById('aside')).display === 'none';
}

function renderBasketMealsDesktop() {
    const asideRef = document.getElementById('aside');
    asideRef.innerHTML = getFullDesktopBasketTemplate();
    for (let index = 0; index < myMeals.length; index++) {
        if (myMeals[index].amount > 0) {
            document.getElementById('basket-items-container-desktop').innerHTML += getDesktopBasketMealTemplate(myMeals[index].name,
                myMeals[index].price,
                index);
        }
    }
}

function renderBasketSummaryDesktop() {
    subtotal = 0.00;
    total = 0.00;
    for (let index = 0; index < myMeals.length; index++) {
        if (myMeals[index].amount > 0) {
            subtotal += myMeals[index].price * myMeals[index].amount;
        }
    }
    total = subtotal + deliveryFee;
    document.getElementById('basket-summary-desktop').innerHTML = getDesktopBasketSummaryTemplate(subtotal.toFixed(2), deliveryFee, total.toFixed(2));
    if (deliveryFee == 0) {
        document.getElementById('pick-up-desktop').checked = true;
    }
    else {
        document.getElementById('pick-up-desktop').checked = false;
    }
}

function addAmount(index) {
    myMeals[index].amount += 1;
    renderBasketMealsDesktop();
    renderBasketSummaryDesktop();
    updateShoppingCartCounter();
    disableAddBtn(index);

}

function subtractAmount(index) {
    const currentMeal = myMeals[index];
    currentMeal.amount -= 1;
    updateShoppingCartCounter();
    if (currentMeal.amount == 0) {
        ableAddBtn(index);
    }
    if (currentMeal.amount > 0) {
        document.getElementById(`add-btn-${index}`).innerHTML = `Added ${currentMeal.amount}`;
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

function updateDeliveryFee() {
    if (deliveryFee == 0) {
        deliveryFee = 4.99;
    }
    else {
        deliveryFee = 0;
    }
    renderBasketSummary();
    renderBasketSummaryDesktop();
}

function renderBasketSummary() {
    if (document.getElementById('basket-summary') == null) {
        return;
    }
    subtotal = 0.00;
    total = 0.00;
    for (let index = 0; index < myMeals.length; index++) {
        if (myMeals[index].amount > 0) {
            subtotal += myMeals[index].price * myMeals[index].amount;
        }
    }
    total = subtotal + deliveryFee;
    document.getElementById('basket-summary').innerHTML = getBasketSummaryTemplate(subtotal.toFixed(2), deliveryFee, total.toFixed(2));
    if (deliveryFee == 0) {
        document.getElementById('pick-up').checked = true;
    }
    else {
        document.getElementById('pick-up').checked = false;
    }
}

function updateShoppingCartCounter() {
    let counter = 0;
    if (document.getElementById('shopping-cart-counter') == null) {
        return;
    }
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
    if (document.getElementById(`quantity-of-${index}-desktop`) != null) {
        const quantityRefDesktop = document.getElementById(`quantity-of-${index}-desktop`);
        quantityRefDesktop.innerHTML = parseInt(quantityRefDesktop.innerHTML) + 1;
    }
    if (document.getElementById(`quantity-of-${index}`) != null) {
        const quantityRef = document.getElementById(`quantity-of-${index}`);
        quantityRef.innerHTML = parseInt(quantityRef.innerHTML) + 1;
    }
    addAmount(index);
    renderBasketSummary();
}

function subtractAmountBasketItem(index) {
    subtractAmount(index);
    renderBasketSummary();
    renderBasketSummaryDesktop()
    if (document.getElementById(`quantity-of-${index}-desktop`) != null) {
        const quantityRefDesktop = document.getElementById(`quantity-of-${index}-desktop`);
        quantityRefDesktop.innerHTML = parseInt(quantityRefDesktop.innerHTML) - 1;
        if (quantityRefDesktop.innerHTML == 0) {
            showBasket();
        }
    }
    if (document.getElementById(`quantity-of-${index}`) != null) {
        const quantityRef = document.getElementById(`quantity-of-${index}`);
        quantityRef.innerHTML = parseInt(quantityRef.innerHTML) - 1;
        if (quantityRef.innerHTML == 0) {
            showBasket();
        }
    }
}

function closeBasket() {
    document.getElementById('basket').close();
}

function emptyDesktopBasket() {
    const asideRef = document.getElementById('aside');
    asideRef.innerHTML = getEmptyDesktopBasketTemplate();
}

function showOrderConfirmedDialog() {
    closeBasket();
    updateAddBtn();
    emptyAmountsFromItems();
    updateShoppingCartCounter();
    emptyDesktopBasket();
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
    for (let index = 0; index < myMeals.length; index++) {
        ableAddBtn(index);
    }
}

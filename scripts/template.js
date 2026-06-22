function getMealTemplate(meal_name, description, price, index) {
    return `
<article class="meal">

    <div id="meal-media-${index}" class="meal-media"></div>
        <div class="meal-text">
            <h4>${meal_name}</h4>
            <h5>${description}</h5>
        </div>

    <div class="meal-preis-and-btn">
        <p>${price}€</p>
        <button id="add-btn-${index}" class="add-btn" onclick="addAmount(${index})">Add to basket</button>
    </div>

</article>
    `;
}

function getFullBasketTemplate() {
    return `
 <button onclick="closeBasket()" class="close-btn-basket-dialog">
    <img class="close-btn-img" src="./assets/images/close.png" alt="Schließen">
</button>
<span>Your Basket</span>
<div id="basket-items-container" class="basket-items-container">
    
</div>
<div id="basket-summary" class="basket-summary">
    
</div>`;
}

function getBasketMealTemplate(meal_name, price, index) {
    return`
<div class="basket-item">
    <span>1 x ${meal_name}</span>
    <div class="item-summary">
        <div class="add-delete-item">
            <button onclick="subtractAmountBasketItem(${index})">
                <img src="./assets/icons/-.svg" alt="- Icon">
            </button>
            <span class="test" id="quantity-of-${index}">${myMeals[index].amount}</span>
            <button onclick="addAmountBasketItem(${index})">
                <img src="./assets/icons/+.svg" alt="+ Icon">
            </button>
        </div>
        <span>${price}€</span>
    </div>
</div>`;
}

function getDesktopBasketMealTemplate(meal_name, price, index) {
    return`
<div class="basket-item">
    <span>1 x ${meal_name}</span>
    <div class="item-summary">
        <div class="add-delete-item">
            <button onclick="subtractAmountBasketItem(${index})">
                <img src="./assets/icons/-.svg" alt="- Icon">
            </button>
            <span class="test" id="quantity-of-${index}-desktop">${myMeals[index].amount}</span>
            <button onclick="addAmountBasketItem(${index})">
                <img src="./assets/icons/+.svg" alt="+ Icon">
            </button>
        </div>
        <span>${price}€</span>
    </div>
</div>`;
}

function getBasketSummaryTemplate(subtotal, deliverdeliveryFee, total) {
    return `
<div>Subtotal <span>${subtotal}€</span></div>
<div>Delivery fee <span>${deliverdeliveryFee}€</span></div>
<div class="pick-up-container">
    <label for="pick-up">I pick it up</label>
    <input onclick="updateDeliveryFee()" type="checkbox" name="pick-up" id="pick-up" value="pick-up">
</div>
<div class="total">Total <span>${total}€</span></div>
<button onclick="showOrderConfirmedDialog()" class="buy-now-btn">Buy now (${total}€)</button>    
`;
}

function getDesktopBasketSummaryTemplate(subtotal, deliverdeliveryFee, total) {
    return `
<div>Subtotal <span>${subtotal}€</span></div>
<div>Delivery fee <span>${deliverdeliveryFee}€</span></div>
<div class="pick-up-container">
    <label for="pick-up">I pick it up</label>
    <input onclick="updateDeliveryFee()" type="checkbox" name="pick-up" id="pick-up-desktop" value="pick-up">
</div>
<div class="total">Total <span>${total}€</span></div>
<button onclick="showOrderConfirmedDialog()" class="buy-now-btn">Buy now (${total}€)</button>    
`;
}

function getEmptyBasketTemplate() {
    return `
 <button onclick="closeBasket()" class="close-btn-basket-dialog">
    <img class="close-btn-img" src="./assets/images/close.png" alt="Schließen">
</button>
<span>Your Basket</span>
<div class="empty-basket-content">
    <div>
        <p>Nothing here yet.</p>
        <p>Go ahead and choose something delicious!</p>
    </div>
    <svg class="empty-shopping-car" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7.20666 24C6.54605 24 5.98053 23.765 5.51009 23.295C5.03966 22.825 4.80444 22.26 4.80444 21.6C4.80444 20.94 5.03966 20.375 5.51009 19.905C5.98053 19.435 6.54605 19.2 7.20666 19.2C7.86727 19.2 8.43279 19.435 8.90323 19.905C9.37366 20.375 9.60888 20.94 9.60888 21.6C9.60888 22.26 9.37366 22.825 8.90323 23.295C8.43279 23.765 7.86727 24 7.20666 24ZM19.2178 24C18.5571 24 17.9916 23.765 17.5212 23.295C17.0508 22.825 16.8155 22.26 16.8155 21.6C16.8155 20.94 17.0508 20.375 17.5212 19.905C17.9916 19.435 18.5571 19.2 19.2178 19.2C19.8784 19.2 20.4439 19.435 20.9143 19.905C21.3848 20.375 21.62 20.94 21.62 21.6C21.62 22.26 21.3848 22.825 20.9143 23.295C20.4439 23.765 19.8784 24 19.2178 24ZM6.18572 4.8L9.06838 10.8H17.4761L20.7792 4.8H6.18572ZM5.04466 2.4H22.761C23.2215 2.4 23.5718 2.605 23.812 3.015C24.0522 3.425 24.0622 3.84 23.842 4.26L19.5781 11.94C19.3579 12.34 19.0626 12.65 18.6923 12.87C18.3219 13.09 17.9166 13.2 17.4761 13.2H8.52788L7.20666 15.6H20.4189C20.7592 15.6 21.0444 15.715 21.2747 15.945C21.5049 16.175 21.62 16.46 21.62 16.8C21.62 17.14 21.5049 17.425 21.2747 17.655C21.0444 17.885 20.7592 18 20.4189 18H7.20666C6.30583 18 5.6252 17.605 5.16477 16.815C4.70435 16.025 4.68433 15.24 5.10472 14.46L6.72621 11.52L2.40222 2.4H1.20111C0.860795 2.4 0.575532 2.285 0.345319 2.055C0.115106 1.825 0 1.54 0 1.2C0 0.86 0.115106 0.575 0.345319 0.345C0.575532 0.115 0.860795 0 1.20111 0H3.15291C3.37312 0 3.58331 0.06 3.7835 0.18C3.98368 0.3 4.13382 0.47 4.23391 0.69L5.04466 2.4Z"
            fill="rgba(253, 234, 220, 1)" />
    </svg>
</div>
    `;
}

function getFullDesktopBasketTemplate() {
    return `
<div class="basket-dialog">
    <span>Your Basket</span>
    <div id="basket-items-container-desktop" class="basket-items-container">
                    
    </div>
    <div id="basket-summary-desktop" class="basket-summary">

    </div>
 </div>`;
}

function getEmptyDesktopBasketTemplate() {
    return `
<div class="basket-dialog">
    <span>Your Basket</span>
    <div class="empty-basket-content">
        <div>
            <p>Nothing here yet.</p>
            <p>Go ahead and choose something delicious!</p>
        </div>
        <svg class="empty-shopping-car" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.20666 24C6.54605 24 5.98053 23.765 5.51009 23.295C5.03966 22.825 4.80444 22.26 4.80444 21.6C4.80444 20.94 5.03966 20.375 5.51009 19.905C5.98053 19.435 6.54605 19.2 7.20666 19.2C7.86727 19.2 8.43279 19.435 8.90323 19.905C9.37366 20.375 9.60888 20.94 9.60888 21.6C9.60888 22.26 9.37366 22.825 8.90323 23.295C8.43279 23.765 7.86727 24 7.20666 24ZM19.2178 24C18.5571 24 17.9916 23.765 17.5212 23.295C17.0508 22.825 16.8155 22.26 16.8155 21.6C16.8155 20.94 17.0508 20.375 17.5212 19.905C17.9916 19.435 18.5571 19.2 19.2178 19.2C19.8784 19.2 20.4439 19.435 20.9143 19.905C21.3848 20.375 21.62 20.94 21.62 21.6C21.62 22.26 21.3848 22.825 20.9143 23.295C20.4439 23.765 19.8784 24 19.2178 24ZM6.18572 4.8L9.06838 10.8H17.4761L20.7792 4.8H6.18572ZM5.04466 2.4H22.761C23.2215 2.4 23.5718 2.605 23.812 3.015C24.0522 3.425 24.0622 3.84 23.842 4.26L19.5781 11.94C19.3579 12.34 19.0626 12.65 18.6923 12.87C18.3219 13.09 17.9166 13.2 17.4761 13.2H8.52788L7.20666 15.6H20.4189C20.7592 15.6 21.0444 15.715 21.2747 15.945C21.5049 16.175 21.62 16.46 21.62 16.8C21.62 17.14 21.5049 17.425 21.2747 17.655C21.0444 17.885 20.7592 18 20.4189 18H7.20666C6.30583 18 5.6252 17.605 5.16477 16.815C4.70435 16.025 4.68433 15.24 5.10472 14.46L6.72621 11.52L2.40222 2.4H1.20111C0.860795 2.4 0.575532 2.285 0.345319 2.055C0.115106 1.825 0 1.54 0 1.2C0 0.86 0.115106 0.575 0.345319 0.345C0.575532 0.115 0.860795 0 1.20111 0H3.15291C3.37312 0 3.58331 0.06 3.7835 0.18C3.98368 0.3 4.13382 0.47 4.23391 0.69L5.04466 2.4Z"
                fill="rgba(253, 234, 220, 1)" />
        </svg>
    </div>
</div>`;
}
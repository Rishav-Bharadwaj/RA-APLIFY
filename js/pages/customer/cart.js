// ========================== //
// Customer - Cart Page        //
// ========================== //

function renderCart(container) {
    const cart = DataStore.getCart();
    const cartTotal = DataStore.getCartTotal();

    if (cart.length === 0) {
        container.innerHTML = `
            ${UI.renderHeader('My Cart', { showBack: true })}
            <div class="page-content">
                ${UI.renderEmpty(
                    Icons.cart,
                    'Your cart is empty',
                    'Browse stores and add items to your cart',
                    `<button class="btn btn-primary" onclick="Router.navigate('store-list')" id="browse-stores-btn">Browse Stores</button>`
                )}
            </div>
            ${UI.renderCustomerNav('cart')}
        `;
        return;
    }

    const store = DataStore.getStore(cart[0].store_id);

    container.innerHTML = `
        ${UI.renderHeader('My Cart', { showBack: true })}

        <div class="page-content" style="padding-bottom:200px">
            <!-- Store Info -->
            <div style="padding:var(--space-4);display:flex;align-items:center;gap:var(--space-3);border-bottom:1px solid var(--neutral-100)">
                <div style="width:44px;height:44px;border-radius:var(--radius-md);background:var(--gradient-primary-soft);display:flex;align-items:center;justify-content:center;font-size:22px">
                    ${store?.emoji || '🏪'}
                </div>
                <div>
                    <div class="font-semibold text-dark">${store?.name || 'Store'}</div>
                    <div class="text-xs text-muted">${cart.length} item${cart.length !== 1 ? 's' : ''}</div>
                </div>
            </div>

            <!-- Cart Items -->
            ${cart.map(item => `
                <div class="cart-item" id="cart-item-${item.product_id}">
                    <div style="width:48px;height:48px;border-radius:var(--radius-md);background:var(--gradient-primary-soft);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">
                        ${item.emoji}
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${Utils.formatPrice(item.price)} × ${item.quantity} = ${Utils.formatPrice(item.price * item.quantity)}</div>
                    </div>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateCartItem('${item.product_id}', ${item.quantity - 1})">−</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartItem('${item.product_id}', ${item.quantity + 1})">+</button>
                    </div>
                </div>
            `).join('')}

            <!-- Add more items -->
            <div style="padding:var(--space-3) var(--space-4)">
                <button class="btn btn-ghost btn-sm w-full" onclick="Router.navigate('store-page', {storeId:'${cart[0].store_id}'})" id="add-more-btn">
                    ${Icons.plus} Add more items
                </button>
            </div>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
            <div class="cart-summary-row">
                <span>Subtotal</span>
                <span>${Utils.formatPrice(cartTotal)}</span>
            </div>
            <div class="cart-summary-row">
                <span>Delivery Fee</span>
                <span class="text-success font-semibold">FREE</span>
            </div>
            <div class="divider" style="margin:var(--space-2) 0"></div>
            <div class="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>${Utils.formatPrice(cartTotal)}</span>
            </div>
            <button class="btn btn-primary btn-block btn-lg mt-3" onclick="Router.navigate('checkout')" id="proceed-checkout-btn">
                Proceed to Checkout
            </button>
        </div>

        ${UI.renderCustomerNav('cart')}
    `;
}

function updateCartItem(productId, qty) {
    DataStore.updateCartItemQty(productId, qty);
    renderCart(document.getElementById('app-content'));
}

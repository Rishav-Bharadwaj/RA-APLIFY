// ========================== //
// Customer - Checkout Page    //
// ========================== //

let _selectedDeliveryType = '';

function renderCheckout(container) {
    const cart = DataStore.getCart();
    const user = DataStore.getCurrentUser();
    const cartTotal = DataStore.getCartTotal();

    if (cart.length === 0) {
        Router.navigate('cart');
        return;
    }

    const store = DataStore.getStore(cart[0].store_id);
    const canHomeDeliver = store?.home_delivery_enabled || false;
    _selectedDeliveryType = '';

    container.innerHTML = `
        ${UI.renderHeader('Checkout', { showBack: true })}

        <div class="page-content" style="padding-bottom:160px">
            <!-- Delivery Type Selection (MANDATORY) -->
            <div class="checkout-section">
                <h3 class="checkout-section-title">Select Delivery Type *</h3>

                <div class="delivery-option ${canHomeDeliver ? '' : 'disabled'}" id="delivery-home" onclick="${canHomeDeliver ? 'selectDeliveryType(\'home\')' : ''}">
                    <div class="delivery-radio"></div>
                    <div class="delivery-option-info">
                        <h4>${Icons.truck} Home Delivery</h4>
                        ${canHomeDeliver
                            ? `<p>Available within ${store.delivery_radius_km} km radius</p>`
                            : `<p style="color:var(--error-500)">Home delivery not available for this shop</p>`
                        }
                    </div>
                </div>

                ${!canHomeDeliver ? `
                    <div class="delivery-warning">
                        ⚠️ Home delivery not available for this shop. Please select Shop Pickup.
                    </div>` : ''}

                <div class="delivery-option" id="delivery-pickup" onclick="selectDeliveryType('pickup')">
                    <div class="delivery-radio"></div>
                    <div class="delivery-option-info">
                        <h4>${Icons.store} Shop Pickup</h4>
                        <p>Pick up your order from ${store?.name}</p>
                    </div>
                </div>
            </div>

            <!-- Delivery Address (shown if home delivery selected) -->
            <div class="checkout-section" id="address-section" style="display:none">
                <h3 class="checkout-section-title">Delivery Address</h3>
                <div class="input-group">
                    <textarea class="input-field" id="delivery-address" rows="3" placeholder="Enter your full delivery address...">${user?.address || ''}</textarea>
                </div>
            </div>

            <!-- Order Summary -->
            <div class="checkout-section">
                <h3 class="checkout-section-title">Order Summary</h3>
                <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-3)">
                    <span style="font-size:24px">${store?.emoji || '🏪'}</span>
                    <div>
                        <div class="font-semibold text-dark">${store?.name}</div>
                        <div class="text-xs text-muted">${cart.length} item${cart.length !== 1 ? 's' : ''}</div>
                    </div>
                </div>
                ${cart.map(item => `
                    <div class="flex justify-between items-center py-2" style="border-bottom:1px solid var(--neutral-50)">
                        <div class="flex items-center gap-2">
                            <span>${item.emoji}</span>
                            <span class="text-sm">${item.name} × ${item.quantity}</span>
                        </div>
                        <span class="text-sm font-semibold">${Utils.formatPrice(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
            </div>

            <!-- Payment Method -->
            <div class="checkout-section">
                <h3 class="checkout-section-title">Payment Method</h3>
                <div class="delivery-option selected" style="cursor:default">
                    <div class="delivery-radio"></div>
                    <div class="delivery-option-info">
                        <h4>💵 Cash on Delivery (COD)</h4>
                        <p>Pay when your order is delivered or picked up</p>
                    </div>
                </div>
                <div class="delivery-option disabled" style="margin-top:var(--space-2)">
                    <div class="delivery-radio"></div>
                    <div class="delivery-option-info">
                        <h4>💳 UPI / Cards</h4>
                        <p style="color:var(--neutral-400)">Coming soon</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Place Order -->
        <div class="cart-summary">
            <div class="cart-summary-row cart-summary-total">
                <span>Total Amount</span>
                <span>${Utils.formatPrice(cartTotal)}</span>
            </div>
            <button class="btn btn-primary btn-block btn-lg mt-3" onclick="placeOrder()" id="place-order-btn">
                Place Order • ${Utils.formatPrice(cartTotal)}
            </button>
        </div>
    `;
}

function selectDeliveryType(type) {
    _selectedDeliveryType = type;

    // Update UI
    document.querySelectorAll('.delivery-option').forEach(el => el.classList.remove('selected'));
    const selected = document.getElementById(`delivery-${type}`);
    if (selected) selected.classList.add('selected');

    // Show/hide address section
    const addressSection = document.getElementById('address-section');
    if (addressSection) {
        addressSection.style.display = type === 'home' ? 'block' : 'none';
    }
}

function placeOrder() {
    const user = DataStore.getCurrentUser();
    const cart = DataStore.getCart();

    if (!_selectedDeliveryType) {
        UI.showToast('Please select a delivery type', 'error');
        return;
    }

    let address = '';
    if (_selectedDeliveryType === 'home') {
        address = document.getElementById('delivery-address')?.value?.trim();
        if (!address) {
            UI.showToast('Please enter your delivery address', 'error');
            return;
        }
    }

    const order = DataStore.createOrder({
        customer_id: user.id,
        store_id: cart[0].store_id,
        total_price: DataStore.getCartTotal(),
        delivery_type: _selectedDeliveryType,
        address,
        items: cart.map(c => ({
            product_id: c.product_id,
            name: c.name,
            price: c.price,
            quantity: c.quantity
        }))
    });

    // Show success
    const container = document.getElementById('app-content');
    container.innerHTML = `
        <div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:var(--space-8);text-align:center;background:white">
            <div style="width:100px;height:100px;border-radius:50%;background:var(--success-50);display:flex;align-items:center;justify-content:center;margin-bottom:var(--space-6);animation:scaleIn 0.5s ease">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--success-500)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
            <h2 style="font-size:var(--font-2xl);font-weight:800;color:var(--neutral-800);margin-bottom:var(--space-2)">Order Placed! 🎉</h2>
            <p style="color:var(--neutral-400);margin-bottom:var(--space-2)">Order #${order.id}</p>
            <p style="color:var(--neutral-500);font-size:var(--font-sm);margin-bottom:var(--space-8)">
                ${_selectedDeliveryType === 'home' ? 'Your order will be delivered to your address' : 'Pick up your order from the store'}
            </p>
            <button class="btn btn-primary btn-lg" onclick="Router.navigate('order-detail', {orderId:'${order.id}'})" id="view-order-btn">
                View Order
            </button>
            <button class="btn btn-ghost mt-3" onclick="Router.navigate('customer-home')" id="go-home-btn">
                Continue Shopping
            </button>
        </div>
    `;
}

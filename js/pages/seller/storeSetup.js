// ========================== //
// Seller - Store Setup        //
// ========================== //

function renderSellerStoreSetup(container, params = {}) {
    const user = DataStore.getCurrentUser();
    const stores = DataStore.getStoresByOwner(user?.id || '');
    const store = stores[0];
    const isNew = params.isNew || !store;

    const categories = DataStore.getCategories();

    const s = store || {
        name: '', category: 'Kirana', location: '', emoji: '🏪',
        home_delivery_enabled: false, delivery_radius_km: 3,
        open_time: '9:00 AM', close_time: '9:00 PM',
        description: '', image_color: '#6C3CE1'
    };

    container.innerHTML = `
        ${UI.renderHeader(isNew ? 'Setup Your Store' : 'Store Settings', {
            showBack: !isNew,
            actions: !isNew ? '' : ''
        })}

        <div class="page-content">
            ${isNew ? `
                <div style="text-align:center;padding:var(--space-6) var(--space-4) var(--space-2)">
                    <div style="font-size:48px;margin-bottom:var(--space-3)">🏪</div>
                    <h2 style="font-size:var(--font-xl);font-weight:800;color:var(--neutral-800);margin-bottom:var(--space-1)">Welcome to RA APLIFY!</h2>
                    <p class="text-sm text-muted">Let's set up your store in just a few steps</p>
                </div>
            ` : ''}

            <div style="padding:var(--space-4)">
                <!-- Store Name -->
                <div class="input-group mb-4">
                    <label class="input-label">Store Name *</label>
                    <input type="text" class="input-field" id="store-name" value="${Utils.escapeHtml(s.name)}" placeholder="e.g., Amit General Store">
                </div>

                <!-- Category -->
                <div class="input-group mb-4">
                    <label class="input-label">Store Category *</label>
                    <select class="input-field" id="store-category" style="appearance:auto">
                        ${categories.map(c => `<option value="${c.name}" ${s.category === c.name ? 'selected' : ''}>${c.emoji} ${c.name}</option>`).join('')}
                    </select>
                </div>

                <!-- Store Emoji -->
                <div class="input-group mb-4">
                    <label class="input-label">Store Icon (Emoji)</label>
                    <input type="text" class="input-field" id="store-emoji" value="${s.emoji}" placeholder="🏪">
                </div>

                <!-- Location -->
                <div class="input-group mb-4">
                    <label class="input-label">Store Location *</label>
                    <input type="text" class="input-field" id="store-location" value="${Utils.escapeHtml(s.location)}" placeholder="e.g., Indiranagar, Bengaluru">
                </div>

                <!-- Description -->
                <div class="input-group mb-4">
                    <label class="input-label">Description</label>
                    <textarea class="input-field" id="store-description" rows="3" placeholder="Tell customers about your store...">${Utils.escapeHtml(s.description || '')}</textarea>
                </div>

                <!-- Timings -->
                <div class="flex gap-3 mb-4">
                    <div class="input-group flex-1">
                        <label class="input-label">Open Time</label>
                        <input type="text" class="input-field" id="store-open" value="${s.open_time}" placeholder="9:00 AM">
                    </div>
                    <div class="input-group flex-1">
                        <label class="input-label">Close Time</label>
                        <input type="text" class="input-field" id="store-close" value="${s.close_time}" placeholder="9:00 PM">
                    </div>
                </div>

                <div class="divider"></div>

                <!-- DELIVERY CONFIGURATION -->
                <h3 style="font-size:var(--font-md);font-weight:700;color:var(--neutral-800);margin-bottom:var(--space-4)">
                    🚚 Delivery Configuration
                </h3>

                <div style="background:var(--primary-50);padding:var(--space-4);border-radius:var(--radius-lg);margin-bottom:var(--space-4)">
                    <div class="flex items-center justify-between mb-3">
                        <div>
                            <h4 class="font-semibold">Home Delivery Available</h4>
                            <p class="text-xs text-muted">Allow customers to order home delivery</p>
                        </div>
                        <label class="toggle-switch">
                            <input type="checkbox" id="store-delivery-toggle" ${s.home_delivery_enabled ? 'checked' : ''} onchange="toggleDeliverySection(this.checked)">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>

                    <div id="delivery-radius-section" style="display:${s.home_delivery_enabled ? 'block' : 'none'}">
                        <label class="input-label mb-2">Delivery Radius (km) *</label>
                        <div class="flex gap-2 mb-3">
                            <button class="chip ${s.delivery_radius_km === 3 ? 'active' : ''}" onclick="setRadius(3, this)" id="radius-3">3 km</button>
                            <button class="chip ${s.delivery_radius_km === 5 ? 'active' : ''}" onclick="setRadius(5, this)" id="radius-5">5 km</button>
                            <button class="chip ${s.delivery_radius_km === 7 ? 'active' : ''}" onclick="setRadius(7, this)" id="radius-7">7 km</button>
                            <button class="chip ${![3,5,7].includes(s.delivery_radius_km) ? 'active' : ''}" onclick="setRadius(0, this)" id="radius-custom">Custom</button>
                        </div>
                        <div id="custom-radius-input" style="display:${![3,5,7].includes(s.delivery_radius_km) && s.delivery_radius_km > 0 ? 'block' : 'none'}">
                            <input type="number" class="input-field" id="store-radius-custom" value="${s.delivery_radius_km}" placeholder="Enter radius in km">
                        </div>
                        <input type="hidden" id="store-delivery-radius" value="${s.delivery_radius_km}">
                    </div>

                    <div id="delivery-off-message" style="display:${s.home_delivery_enabled ? 'none' : 'block'}">
                        <p class="text-sm text-muted" style="padding:var(--space-2) 0">
                            ℹ️ Your store will be marked as <strong>"Pickup Only"</strong>. Customers can only pick up orders from your store.
                        </p>
                    </div>
                </div>

                <!-- Theme Color -->
                <div class="input-group mb-6">
                    <label class="input-label">Store Theme Color</label>
                    <div class="flex gap-2 mt-2">
                        ${['#6C3CE1', '#E14BC3', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#059669', '#DC2626'].map(color => `
                            <button style="width:36px;height:36px;border-radius:50%;background:${color};border:3px solid ${s.image_color === color ? 'var(--neutral-800)' : 'transparent'};cursor:pointer;transition:var(--transition-fast)"
                                onclick="selectStoreColor('${color}', this)" class="color-btn" data-color="${color}"></button>
                        `).join('')}
                    </div>
                    <input type="hidden" id="store-color" value="${s.image_color}">
                </div>

                <!-- Save Button -->
                <button class="btn btn-primary btn-block btn-lg" onclick="saveStore(${isNew ? 'true' : 'false'}, '${store?.id || ''}')" id="btn-save-store">
                    ${isNew ? 'Create Store' : 'Save Changes'}
                </button>

                ${!isNew ? `
                    <div class="divider" style="margin:var(--space-8) 0 var(--space-4)"></div>
                    <div class="profile-menu-item danger" onclick="handleSellerLogout()" id="seller-logout">
                        <div class="menu-icon">${Icons.logout}</div>
                        <span class="menu-label">Logout</span>
                        <span class="menu-arrow">${Icons.chevronRight}</span>
                    </div>
                ` : ''}
            </div>
        </div>

        ${isNew ? '' : UI.renderSellerNav('settings')}
    `;
}

function toggleDeliverySection(enabled) {
    const section = document.getElementById('delivery-radius-section');
    const offMsg = document.getElementById('delivery-off-message');
    if (section) section.style.display = enabled ? 'block' : 'none';
    if (offMsg) offMsg.style.display = enabled ? 'none' : 'block';
}

let _selectedRadius = 3;
function setRadius(km, btn) {
    document.querySelectorAll('#delivery-radius-section .chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');

    const customInput = document.getElementById('custom-radius-input');
    const hiddenInput = document.getElementById('store-delivery-radius');

    if (km === 0) {
        if (customInput) customInput.style.display = 'block';
    } else {
        if (customInput) customInput.style.display = 'none';
        if (hiddenInput) hiddenInput.value = km;
        _selectedRadius = km;
    }
}

function selectStoreColor(color, btn) {
    document.querySelectorAll('.color-btn').forEach(b => b.style.borderColor = 'transparent');
    btn.style.borderColor = 'var(--neutral-800)';
    document.getElementById('store-color').value = color;
}

function saveStore(isNew, storeId) {
    const name = document.getElementById('store-name')?.value?.trim();
    const category = document.getElementById('store-category')?.value;
    const emoji = document.getElementById('store-emoji')?.value?.trim() || '🏪';
    const location = document.getElementById('store-location')?.value?.trim();
    const description = document.getElementById('store-description')?.value?.trim();
    const open_time = document.getElementById('store-open')?.value?.trim();
    const close_time = document.getElementById('store-close')?.value?.trim();
    const home_delivery_enabled = document.getElementById('store-delivery-toggle')?.checked;

    let delivery_radius_km = parseInt(document.getElementById('store-delivery-radius')?.value) || 0;
    const customRadius = document.getElementById('store-radius-custom')?.value;
    if (customRadius && document.getElementById('custom-radius-input')?.style.display !== 'none') {
        delivery_radius_km = parseInt(customRadius) || 3;
    }

    const image_color = document.getElementById('store-color')?.value || '#6C3CE1';

    if (!name || !location) {
        UI.showToast('Store name and location are required', 'error');
        return;
    }

    if (home_delivery_enabled && !delivery_radius_km) {
        UI.showToast('Please set a delivery radius', 'error');
        return;
    }

    const user = DataStore.getCurrentUser();
    const storeData = {
        owner_id: user.id,
        name, category, emoji, location, description,
        open_time, close_time,
        home_delivery_enabled,
        delivery_radius_km: home_delivery_enabled ? delivery_radius_km : 0,
        image_color,
        lat: user.lat || 12.9716,
        lng: user.lng || 77.5946
    };

    if (isNew) {
        DataStore.createStore(storeData);
        UI.showToast('Store created successfully! 🎉', 'success');
        Router.navigate('seller-dashboard');
    } else {
        DataStore.updateStore(storeId, storeData);
        UI.showToast('Store settings updated!', 'success');
    }
}

function handleSellerLogout() {
    UI.confirm('Logout', 'Are you sure you want to logout?', () => {
        DataStore.logout();
        Router.clearHistory();
        Router.navigate('role-select');
        UI.showToast('Logged out successfully', 'success');
    });
}

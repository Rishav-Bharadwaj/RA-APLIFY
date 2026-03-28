// ========================== //
// Customer - Home Page        //
// ========================== //

function renderCustomerHome(container) {
    const user = DataStore.getCurrentUser();
    const categories = DataStore.getCategories();
    const stores = DataStore.getStores();

    // Get top rated stores
    const topStores = [...stores].sort((a, b) => b.rating - a.rating).slice(0, 4);
    // Get popular stores
    const popularStores = [...stores].sort((a, b) => b.order_count - a.order_count).slice(0, 4);

    container.innerHTML = `
        ${UI.renderHeader('RA APLIFY', {
            brand: true,
            actions: `
                <button class="header-icon-btn" onclick="Router.navigate('cart')" id="home-cart-btn">
                    ${Icons.cart}
                    ${DataStore.getCartCount() > 0 ? `<span class="badge">${DataStore.getCartCount()}</span>` : ''}
                </button>
            `
        })}

        <div class="page-content">
            <!-- Hero Section -->
            <div class="home-hero">
                <p class="home-greeting">Hello, <strong>${user?.name || 'Guest'}</strong> 👋</p>
                <div class="home-location">
                    ${Icons.mapPin}
                    <span>${user?.address || 'Bengaluru, Karnataka'}</span>
                </div>
                <div class="home-search">
                    <span class="search-icon">${Icons.search}</span>
                    <input type="text" placeholder="Search stores, products..." id="home-search-input" onkeydown="if(event.key==='Enter')homeSearch()">
                </div>
            </div>

            <!-- Categories -->
            <div class="section-title">Browse Categories</div>
            <div class="categories-grid">
                ${categories.map((cat, i) => `
                    <div class="category-item animate-fadeInUp stagger-${i + 1}" onclick="Router.navigate('store-list', {category:'${cat.name}'})" id="cat-${cat.id}">
                        <div class="category-icon" style="background:linear-gradient(135deg, ${cat.color}15, ${cat.color}25)">
                            ${cat.emoji}
                        </div>
                        <span class="category-name">${cat.name}</span>
                    </div>
                `).join('')}
            </div>

            <div class="divider-thick"></div>

            <!-- Top Rated Stores -->
            <div class="section-title">Top Rated Stores ⭐</div>
            <div style="padding:0 var(--space-4);display:flex;gap:var(--space-3);overflow-x:auto;scrollbar-width:none;padding-bottom:var(--space-4)">
                ${topStores.map((store, i) => renderStoreCardHorizontal(store, i)).join('')}
            </div>

            <div class="divider-thick"></div>

            <!-- Popular Near You -->
            <div class="flex items-center justify-between px-4">
                <h3 class="section-title" style="padding-left:0">Popular Near You 🔥</h3>
                <button class="btn btn-ghost btn-sm" onclick="Router.navigate('store-list')" id="see-all-btn">See All</button>
            </div>
            <div style="padding:0 var(--space-4) var(--space-4)">
                ${popularStores.map((store, i) => renderStoreCardVertical(store, i)).join('')}
            </div>
        </div>

        ${UI.renderCustomerNav('home')}
    `;
}

function homeSearch() {
    const query = document.getElementById('home-search-input')?.value?.trim();
    if (query) {
        Router.navigate('store-list', { query });
    }
}

function renderStoreCardHorizontal(store, index) {
    const deliveryBadge = store.home_delivery_enabled
        ? `<span class="badge badge-delivery">${Icons.truck} Delivery</span>`
        : `<span class="badge badge-pickup">${Icons.store} Pickup Only</span>`;

    return `
        <div class="store-card animate-fadeInUp stagger-${index + 1}" onclick="Router.navigate('store-page', {storeId:'${store.id}'})" style="min-width:220px;flex-shrink:0" id="store-card-${store.id}">
            <div class="store-card-image" style="background:linear-gradient(135deg, ${store.image_color}20, ${store.image_color}40)">
                <span class="store-emoji">${store.emoji}</span>
                <div class="delivery-badge">${deliveryBadge}</div>
            </div>
            <div class="store-card-body">
                <div class="store-card-name truncate">${store.name}</div>
                <div class="store-card-category">${store.category} • ${store.location.split(',')[0]}</div>
                <div class="store-card-meta">
                    <div class="store-card-rating">
                        ${Icons.star} ${store.rating}
                    </div>
                    <span class="store-card-distance">${store.review_count} reviews</span>
                </div>
            </div>
        </div>
    `;
}

function renderStoreCardVertical(store, index) {
    const deliveryBadge = store.home_delivery_enabled
        ? `<span class="badge badge-delivery" style="font-size:10px">${Icons.truck} Home Delivery</span>`
        : `<span class="badge badge-pickup" style="font-size:10px">${Icons.store} Pickup Only</span>`;

    return `
        <div class="card mb-3 animate-fadeInUp stagger-${index + 1}" onclick="Router.navigate('store-page', {storeId:'${store.id}'})" style="cursor:pointer" id="popular-${store.id}">
            <div class="card-body flex items-center gap-3">
                <div style="width:60px;height:60px;border-radius:var(--radius-lg);background:linear-gradient(135deg, ${store.image_color}20, ${store.image_color}40);display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0">
                    ${store.emoji}
                </div>
                <div style="flex:1;min-width:0">
                    <div class="font-semibold text-dark truncate">${store.name}</div>
                    <div class="text-xs text-muted mb-1">${store.category} • ${store.order_count} orders</div>
                    <div class="flex items-center gap-2">
                        <span class="store-card-rating" style="font-size:12px">${Icons.star} ${store.rating}</span>
                        ${deliveryBadge}
                    </div>
                </div>
                <span style="color:var(--neutral-300)">${Icons.chevronRight}</span>
            </div>
        </div>
    `;
}

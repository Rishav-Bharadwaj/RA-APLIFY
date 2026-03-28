// ========================== //
// Customer - Store List       //
// ========================== //

let _storeListFilters = { delivery: 'all', sort: 'rating', category: '' };

function renderStoreList(container, params = {}) {
    if (params.category) _storeListFilters.category = params.category;
    if (params.query) _storeListFilters.query = params.query;

    const filters = { ..._storeListFilters };
    if (filters.delivery === 'all') delete filters.delivery;

    const stores = DataStore.searchStores(params.query || '', filters);
    const categories = DataStore.getCategories();

    container.innerHTML = `
        ${UI.renderHeader(params.query ? `"${params.query}"` : (params.category || 'All Stores'), {
            showBack: true,
            actions: `<button class="header-icon-btn" onclick="Router.navigate('cart')">${Icons.cart}${DataStore.getCartCount() > 0 ? `<span class="badge">${DataStore.getCartCount()}</span>` : ''}</button>`
        })}

        <div class="page-content">
            <!-- Search -->
            <div style="padding:var(--space-3) var(--space-4)">
                <div class="search-bar">
                    <span class="search-icon">${Icons.search}</span>
                    <input type="text" placeholder="Search stores..." id="store-search-input" value="${params.query || ''}" onkeydown="if(event.key==='Enter')searchStores()">
                </div>
            </div>

            <!-- Delivery Filter -->
            <div class="filter-bar">
                <button class="chip ${_storeListFilters.delivery === 'all' ? 'active' : ''}" onclick="setDeliveryFilter('all')" id="filter-all">All Stores</button>
                <button class="chip ${_storeListFilters.delivery === 'home' ? 'active' : ''}" onclick="setDeliveryFilter('home')" id="filter-delivery">${Icons.truck} Home Delivery</button>
                <button class="chip ${_storeListFilters.delivery === 'pickup' ? 'active' : ''}" onclick="setDeliveryFilter('pickup')" id="filter-pickup">${Icons.store} Pickup Only</button>
            </div>

            <!-- Sort -->
            <div class="sort-bar">
                <span>${stores.length} store${stores.length !== 1 ? 's' : ''} found</span>
                <div class="sort-select" onclick="showSortOptions()" id="sort-trigger">
                    ${Icons.filter}
                    <span>${_storeListFilters.sort === 'rating' ? 'Rating' : _storeListFilters.sort === 'popularity' ? 'Popularity' : 'Distance'}</span>
                </div>
            </div>

            <!-- Store List -->
            <div style="padding:0 var(--space-4) var(--space-4)">
                ${stores.length === 0 ? UI.renderEmpty(Icons.search, 'No stores found', 'Try adjusting your filters or search terms') : ''}
                ${stores.map((store, i) => renderStoreListItem(store, i)).join('')}
            </div>
        </div>

        ${UI.renderCustomerNav('search')}
    `;
}

function renderStoreListItem(store, index) {
    const deliveryBadge = store.home_delivery_enabled
        ? `<span class="badge badge-delivery" style="font-size:10px">${Icons.truck} Home Delivery Available</span>`
        : `<span class="badge badge-pickup" style="font-size:10px">${Icons.store} Pickup Only</span>`;

    return `
        <div class="card mb-3 animate-fadeInUp stagger-${Math.min(index + 1, 8)}" onclick="Router.navigate('store-page', {storeId:'${store.id}'})" style="cursor:pointer" id="slist-${store.id}">
            <div class="store-card-image" style="height:120px;background:linear-gradient(135deg, ${store.image_color}15, ${store.image_color}35)">
                <span class="store-emoji" style="font-size:40px">${store.emoji}</span>
            </div>
            <div class="card-body">
                <div class="flex justify-between items-start mb-1">
                    <div>
                        <div class="font-bold text-dark">${store.name}</div>
                        <div class="text-xs text-muted">${store.category} • ${store.location.split(',')[0]}</div>
                    </div>
                    <div class="store-card-rating">
                        ${Icons.star} ${store.rating}
                    </div>
                </div>
                <p class="text-xs text-secondary mb-2" style="line-height:1.4">${store.description}</p>
                <div class="flex items-center gap-2 flex-wrap">
                    ${deliveryBadge}
                    ${store.home_delivery_enabled ? `<span class="text-xs text-muted">Within ${store.delivery_radius_km} km</span>` : ''}
                    <span class="text-xs text-muted">• ${store.review_count} reviews</span>
                </div>
            </div>
        </div>
    `;
}

function setDeliveryFilter(filter) {
    _storeListFilters.delivery = filter;
    const route = Router.getCurrentRoute();
    Router.navigate('store-list', route?.params || {});
}

function searchStores() {
    const query = document.getElementById('store-search-input')?.value?.trim();
    Router.navigate('store-list', { query });
}

function showSortOptions() {
    const content = `
        <div style="display:flex;flex-direction:column;gap:var(--space-2)">
            <button class="btn ${_storeListFilters.sort === 'rating' ? 'btn-primary' : 'btn-outline'} btn-block" onclick="setSortOption('rating')" id="sort-rating">
                ⭐ Rating (Highest First)
            </button>
            <button class="btn ${_storeListFilters.sort === 'popularity' ? 'btn-primary' : 'btn-outline'} btn-block" onclick="setSortOption('popularity')" id="sort-popularity">
                🔥 Popularity
            </button>
            <button class="btn ${_storeListFilters.sort === 'distance' ? 'btn-primary' : 'btn-outline'} btn-block" onclick="setSortOption('distance')" id="sort-distance">
                📍 Distance
            </button>
        </div>
    `;
    UI.showModal(content, { title: 'Sort By' });
}

function setSortOption(sort) {
    _storeListFilters.sort = sort;
    UI.closeModal();
    const route = Router.getCurrentRoute();
    Router.navigate('store-list', route?.params || {});
}

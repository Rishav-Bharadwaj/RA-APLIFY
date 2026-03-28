// ========================== //
// RA APLIFY - Data Store      //
// ========================== //

const DataStore = {
    _prefix: 'ra_aplify_',

    init() {
        if (!localStorage.getItem(this._prefix + 'initialized')) {
            this._seedAll();
            localStorage.setItem(this._prefix + 'initialized', 'true');
        }
    },

    reset() {
        const keys = Object.keys(localStorage).filter(k => k.startsWith(this._prefix));
        keys.forEach(k => localStorage.removeItem(k));
        this._seedAll();
    },

    _seedAll() {
        this._set('users', SEED_DATA.users);
        this._set('stores', SEED_DATA.stores);
        this._set('products', SEED_DATA.products);
        this._set('orders', SEED_DATA.orders);
        this._set('reviews', SEED_DATA.reviews);
        this._set('chats', SEED_DATA.chats);
        this._set('categories', SEED_DATA.categories);
        this._set('cart', []);
        this._set('current_user', null);
        this._set('current_role', null);
    },

    _get(key) {
        try {
            return JSON.parse(localStorage.getItem(this._prefix + key));
        } catch { return null; }
    },

    _set(key, value) {
        localStorage.setItem(this._prefix + key, JSON.stringify(value));
    },

    // Auth
    getCurrentUser() { return this._get('current_user'); },
    getCurrentRole() { return this._get('current_role'); },

    setCurrentUser(user) { this._set('current_user', user); },
    setCurrentRole(role) { this._set('current_role', role); },

    login(phone, role) {
        const users = this._get('users');
        let user = users.find(u => u.phone === phone && u.role === role);
        if (!user) {
            user = {
                id: 'u' + Date.now(),
                name: 'User ' + phone.slice(-4),
                phone,
                role,
                email: '',
                address: '',
                lat: 12.9716,
                lng: 77.5946
            };
            users.push(user);
            this._set('users', users);
        }
        this.setCurrentUser(user);
        this.setCurrentRole(role);
        return user;
    },

    logout() {
        this.setCurrentUser(null);
        this.setCurrentRole(null);
        this._set('cart', []);
    },

    updateUser(updatedUser) {
        const users = this._get('users');
        const idx = users.findIndex(u => u.id === updatedUser.id);
        if (idx !== -1) {
            users[idx] = { ...users[idx], ...updatedUser };
            this._set('users', users);
            this.setCurrentUser(users[idx]);
        }
    },

    // Stores
    getStores() { return this._get('stores') || []; },
    getStore(id) { return this.getStores().find(s => s.id === id); },

    getStoresByOwner(ownerId) {
        return this.getStores().filter(s => s.owner_id === ownerId);
    },

    createStore(store) {
        const stores = this.getStores();
        store.id = 's' + Date.now();
        store.rating = 0;
        store.review_count = 0;
        store.order_count = 0;
        store.is_open = true;
        stores.push(store);
        this._set('stores', stores);
        return store;
    },

    updateStore(id, updates) {
        const stores = this.getStores();
        const idx = stores.findIndex(s => s.id === id);
        if (idx !== -1) {
            stores[idx] = { ...stores[idx], ...updates };
            this._set('stores', stores);
            return stores[idx];
        }
        return null;
    },

    // Products
    getProducts() { return this._get('products') || []; },
    getProduct(id) { return this.getProducts().find(p => p.id === id); },

    getProductsByStore(storeId) {
        return this.getProducts().filter(p => p.store_id === storeId);
    },

    createProduct(product) {
        const products = this.getProducts();
        product.id = 'p' + Date.now();
        products.push(product);
        this._set('products', products);
        return product;
    },

    updateProduct(id, updates) {
        const products = this.getProducts();
        const idx = products.findIndex(p => p.id === id);
        if (idx !== -1) {
            products[idx] = { ...products[idx], ...updates };
            this._set('products', products);
            return products[idx];
        }
        return null;
    },

    deleteProduct(id) {
        const products = this.getProducts().filter(p => p.id !== id);
        this._set('products', products);
    },

    // Cart
    getCart() { return this._get('cart') || []; },

    addToCart(product, storeId) {
        const cart = this.getCart();
        // Check if cart has items from different store
        if (cart.length > 0 && cart[0].store_id !== storeId) {
            return { error: 'Cart contains items from a different store. Clear cart first.' };
        }
        const existing = cart.find(c => c.product_id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                product_id: product.id,
                store_id: storeId,
                name: product.name,
                price: product.price,
                emoji: product.emoji,
                quantity: 1
            });
        }
        this._set('cart', cart);
        return { success: true };
    },

    updateCartItemQty(productId, qty) {
        let cart = this.getCart();
        if (qty <= 0) {
            cart = cart.filter(c => c.product_id !== productId);
        } else {
            const item = cart.find(c => c.product_id === productId);
            if (item) item.quantity = qty;
        }
        this._set('cart', cart);
    },

    clearCart() { this._set('cart', []); },

    getCartTotal() {
        return this.getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    getCartCount() {
        return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
    },

    // Orders
    getOrders() { return this._get('orders') || []; },
    getOrder(id) { return this.getOrders().find(o => o.id === id); },

    getOrdersByCustomer(customerId) {
        return this.getOrders().filter(o => o.customer_id === customerId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },

    getOrdersByStore(storeId) {
        return this.getOrders().filter(o => o.store_id === storeId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },

    createOrder(orderData) {
        const orders = this.getOrders();
        const order = {
            id: 'o' + Date.now(),
            ...orderData,
            status: 'pending',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        orders.push(order);
        this._set('orders', orders);

        // Update store order count
        const store = this.getStore(order.store_id);
        if (store) {
            this.updateStore(store.id, { order_count: (store.order_count || 0) + 1 });
        }

        // Create chat for order
        const chats = this._get('chats') || [];
        chats.push({ id: 'c' + Date.now(), order_id: order.id, messages: [] });
        this._set('chats', chats);

        this.clearCart();
        return order;
    },

    updateOrderStatus(orderId, status) {
        const orders = this.getOrders();
        const idx = orders.findIndex(o => o.id === orderId);
        if (idx !== -1) {
            orders[idx].status = status;
            orders[idx].updated_at = new Date().toISOString();
            this._set('orders', orders);
            return orders[idx];
        }
        return null;
    },

    // Reviews
    getReviews() { return this._get('reviews') || []; },

    getReviewsByStore(storeId) {
        return this.getReviews().filter(r => r.store_id === storeId).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },

    addReview(review) {
        const reviews = this.getReviews();
        review.id = 'r' + Date.now();
        review.created_at = new Date().toISOString();
        reviews.push(review);
        this._set('reviews', reviews);

        // Update store rating
        const storeReviews = reviews.filter(r => r.store_id === review.store_id);
        const avgRating = storeReviews.reduce((sum, r) => sum + r.rating, 0) / storeReviews.length;
        this.updateStore(review.store_id, {
            rating: Math.round(avgRating * 10) / 10,
            review_count: storeReviews.length
        });

        return review;
    },

    // Chat
    getChat(orderId) {
        const chats = this._get('chats') || [];
        return chats.find(c => c.order_id === orderId);
    },

    sendMessage(orderId, senderId, text) {
        const chats = this._get('chats') || [];
        const chat = chats.find(c => c.order_id === orderId);
        if (chat) {
            chat.messages.push({
                sender: senderId,
                text,
                time: new Date().toISOString()
            });
            this._set('chats', chats);
            return chat;
        }
        return null;
    },

    // Categories
    getCategories() { return this._get('categories') || []; },

    // Users
    getUsers() { return this._get('users') || []; },
    getUser(id) { return this.getUsers().find(u => u.id === id); },

    // Analytics
    getStoreAnalytics(storeId) {
        const orders = this.getOrdersByStore(storeId);
        const products = this.getProductsByStore(storeId);
        const reviews = this.getReviewsByStore(storeId);

        const totalRevenue = orders.reduce((sum, o) => sum + o.total_price, 0);
        const completedOrders = orders.filter(o => ['delivered', 'completed'].includes(o.status));
        const pendingOrders = orders.filter(o => o.status === 'pending');

        // Daily sales (last 7 days)
        const dailySales = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayOrders = orders.filter(o => {
                const od = new Date(o.created_at);
                return od.toDateString() === date.toDateString();
            });
            dailySales.push({
                day: days[date.getDay()],
                revenue: dayOrders.reduce((s, o) => s + o.total_price, 0),
                orders: dayOrders.length
            });
        }

        // Popular products
        const productCounts = {};
        orders.forEach(o => {
            (o.items || []).forEach(item => {
                productCounts[item.name] = (productCounts[item.name] || 0) + item.quantity;
            });
        });
        const popularProducts = Object.entries(productCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        return {
            totalRevenue,
            totalOrders: orders.length,
            completedOrders: completedOrders.length,
            pendingOrders: pendingOrders.length,
            totalProducts: products.length,
            avgRating: reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0',
            dailySales,
            popularProducts,
            totalReviews: reviews.length
        };
    },

    // Search
    searchStores(query, filters = {}) {
        let stores = this.getStores();

        if (query) {
            const q = query.toLowerCase();
            stores = stores.filter(s =>
                s.name.toLowerCase().includes(q) ||
                s.category.toLowerCase().includes(q) ||
                s.location.toLowerCase().includes(q)
            );
        }

        if (filters.delivery === 'home') {
            stores = stores.filter(s => s.home_delivery_enabled);
        } else if (filters.delivery === 'pickup') {
            stores = stores.filter(s => !s.home_delivery_enabled);
        }

        if (filters.category) {
            stores = stores.filter(s => s.category === filters.category);
        }

        // Sorting
        if (filters.sort === 'rating') {
            stores.sort((a, b) => b.rating - a.rating);
        } else if (filters.sort === 'popularity') {
            stores.sort((a, b) => b.order_count - a.order_count);
        } else if (filters.sort === 'distance') {
            // Simulate distance sort
            stores.sort((a, b) => a.lat - b.lat);
        }

        return stores;
    }
};

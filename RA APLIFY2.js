// ========================== //
// RA APLIFY - Seed Data       //
// ========================== //

const SEED_DATA = {
    users: [
        { id: 'u1', name: 'Rahul Sharma', phone: '9876543210', role: 'customer', email: 'rahul@example.com', address: '12, MG Road, Bengaluru', lat: 12.9716, lng: 77.5946 },
        { id: 'u2', name: 'Priya Patel', phone: '9876543211', role: 'customer', email: 'priya@example.com', address: '45, Jayanagar, Bengaluru', lat: 12.9250, lng: 77.5938 },
        { id: 'u3', name: 'Amit Kumar', phone: '9876543212', role: 'seller', email: 'amit@example.com', address: '78, Indiranagar, Bengaluru', lat: 12.9784, lng: 77.6408 },
        { id: 'u4', name: 'Sunita Devi', phone: '9876543213', role: 'seller', email: 'sunita@example.com', address: '23, Koramangala, Bengaluru', lat: 12.9352, lng: 77.6245 },
        { id: 'u5', name: 'Vikram Singh', phone: '9876543214', role: 'seller', email: 'vikram@example.com', address: '56, HSR Layout, Bengaluru', lat: 12.9121, lng: 77.6446 },
        { id: 'u6', name: 'Meena Kumari', phone: '9876543215', role: 'seller', email: 'meena@example.com', address: '89, Whitefield, Bengaluru', lat: 12.9698, lng: 77.7500 },
        { id: 'u7', name: 'Deepak Verma', phone: '9876543216', role: 'seller', email: 'deepak@example.com', address: '34, BTM Layout, Bengaluru', lat: 12.9166, lng: 77.6101 },
        { id: 'u8', name: 'Kavitha R', phone: '9876543217', role: 'customer', email: 'kavitha@example.com', address: '67, JP Nagar, Bengaluru', lat: 12.9063, lng: 77.5857 },
    ],

    stores: [
        {
            id: 's1', owner_id: 'u3', name: 'Amit General Store', category: 'Kirana',
            description: 'Your trusted neighborhood kirana store with daily essentials and groceries.',
            emoji: '🏪', location: 'Indiranagar, Bengaluru', lat: 12.9784, lng: 77.6408,
            rating: 4.5, review_count: 128, order_count: 856,
            home_delivery_enabled: true, delivery_radius_km: 5,
            image_color: '#6C3CE1', open_time: '7:00 AM', close_time: '10:00 PM', is_open: true
        },
        {
            id: 's2', owner_id: 'u4', name: 'Sunita\'s Bakery & Cakes', category: 'Bakery',
            description: 'Fresh breads, cakes, pastries and cookies baked daily with love.',
            emoji: '🧁', location: 'Koramangala, Bengaluru', lat: 12.9352, lng: 77.6245,
            rating: 4.8, review_count: 234, order_count: 1243,
            home_delivery_enabled: true, delivery_radius_km: 3,
            image_color: '#E14BC3', open_time: '6:00 AM', close_time: '9:00 PM', is_open: true
        },
        {
            id: 's3', owner_id: 'u5', name: 'Vikram Electronics', category: 'Electronics',
            description: 'Mobile accessories, chargers, earphones and electronic gadgets.',
            emoji: '📱', location: 'HSR Layout, Bengaluru', lat: 12.9121, lng: 77.6446,
            rating: 4.2, review_count: 89, order_count: 432,
            home_delivery_enabled: false, delivery_radius_km: 0,
            image_color: '#10B981', open_time: '10:00 AM', close_time: '8:00 PM', is_open: true
        },
        {
            id: 's4', owner_id: 'u6', name: 'Meena Fashion House', category: 'Clothing',
            description: 'Trendy clothing, sarees, and accessories for the whole family.',
            emoji: '👗', location: 'Whitefield, Bengaluru', lat: 12.9698, lng: 77.7500,
            rating: 4.6, review_count: 167, order_count: 678,
            home_delivery_enabled: true, delivery_radius_km: 7,
            image_color: '#F59E0B', open_time: '10:00 AM', close_time: '9:00 PM', is_open: true
        },
        {
            id: 's5', owner_id: 'u7', name: 'Fresh & Green Vegetables', category: 'Vegetables',
            description: 'Farm-fresh vegetables and fruits delivered to your doorstep daily.',
            emoji: '🥬', location: 'BTM Layout, Bengaluru', lat: 12.9166, lng: 77.6101,
            rating: 4.3, review_count: 201, order_count: 1567,
            home_delivery_enabled: true, delivery_radius_km: 4,
            image_color: '#059669', open_time: '5:00 AM', close_time: '8:00 PM', is_open: true
        },
        {
            id: 's6', owner_id: 'u3', name: 'Amit Medical Store', category: 'Pharmacy',
            description: 'All medicines, health supplements and personal care products available.',
            emoji: '💊', location: 'Indiranagar, Bengaluru', lat: 12.9790, lng: 77.6415,
            rating: 4.7, review_count: 312, order_count: 2134,
            home_delivery_enabled: true, delivery_radius_km: 6,
            image_color: '#EF4444', open_time: '8:00 AM', close_time: '11:00 PM', is_open: true
        },
        {
            id: 's7', owner_id: 'u4', name: 'Daily Dairy Products', category: 'Dairy',
            description: 'Pure milk, curd, paneer, ghee and fresh dairy products.',
            emoji: '🥛', location: 'Koramangala, Bengaluru', lat: 12.9355, lng: 77.6250,
            rating: 4.4, review_count: 156, order_count: 987,
            home_delivery_enabled: true, delivery_radius_km: 3,
            image_color: '#3B82F6', open_time: '5:30 AM', close_time: '7:00 PM', is_open: true
        },
        {
            id: 's8', owner_id: 'u5', name: 'Spice Corner', category: 'Kirana',
            description: 'Premium spices, dry fruits, oils and traditional grocery items.',
            emoji: '🌶️', location: 'HSR Layout, Bengaluru', lat: 12.9125, lng: 77.6450,
            rating: 4.1, review_count: 78, order_count: 345,
            home_delivery_enabled: false, delivery_radius_km: 0,
            image_color: '#DC2626', open_time: '8:00 AM', close_time: '9:00 PM', is_open: true
        }
    ],

    products: [
        // Amit General Store (s1) - Kirana
        { id: 'p1', store_id: 's1', name: 'Tata Salt (1kg)', price: 28, category: 'Essentials', available: true, emoji: '🧂', inventory: 50 },
        { id: 'p2', store_id: 's1', name: 'Fortune Sunflower Oil (1L)', price: 165, category: 'Oils', available: true, emoji: '🫗', inventory: 30 },
        { id: 'p3', store_id: 's1', name: 'Aashirvaad Atta (5kg)', price: 275, category: 'Flour', available: true, emoji: '🌾', inventory: 25 },
        { id: 'p4', store_id: 's1', name: 'Toor Dal (1kg)', price: 145, category: 'Pulses', available: true, emoji: '🫘', inventory: 40 },
        { id: 'p5', store_id: 's1', name: 'Sugar (1kg)', price: 48, category: 'Essentials', available: true, emoji: '🍬', inventory: 60 },
        { id: 'p6', store_id: 's1', name: 'Maggi Noodles (Pack of 4)', price: 56, category: 'Snacks', available: true, emoji: '🍜', inventory: 80 },
        { id: 'p7', store_id: 's1', name: 'Parle-G Biscuits', price: 10, category: 'Snacks', available: true, emoji: '🍪', inventory: 100 },
        { id: 'p8', store_id: 's1', name: 'Amul Butter (100g)', price: 56, category: 'Dairy', available: false, emoji: '🧈', inventory: 0 },
        { id: 'p9', store_id: 's1', name: 'Red Label Tea (250g)', price: 115, category: 'Beverages', available: true, emoji: '🍵', inventory: 35 },
        { id: 'p10', store_id: 's1', name: 'Nescafe Coffee (50g)', price: 145, category: 'Beverages', available: true, emoji: '☕', inventory: 20 },

        // Sunita's Bakery (s2)
        { id: 'p11', store_id: 's2', name: 'Chocolate Truffle Cake (500g)', price: 450, category: 'Cakes', available: true, emoji: '🎂', inventory: 8 },
        { id: 'p12', store_id: 's2', name: 'Butter Croissant', price: 65, category: 'Breads', available: true, emoji: '🥐', inventory: 24 },
        { id: 'p13', store_id: 's2', name: 'Garlic Bread Loaf', price: 85, category: 'Breads', available: true, emoji: '🍞', inventory: 15 },
        { id: 'p14', store_id: 's2', name: 'Red Velvet Cupcake', price: 80, category: 'Cakes', available: true, emoji: '🧁', inventory: 20 },
        { id: 'p15', store_id: 's2', name: 'Puff Pastry (4pcs)', price: 60, category: 'Pastries', available: true, emoji: '🥧', inventory: 30 },
        { id: 'p16', store_id: 's2', name: 'Vanilla Cookies (Pack)', price: 120, category: 'Cookies', available: true, emoji: '🍪', inventory: 25 },
        { id: 'p17', store_id: 's2', name: 'Banana Bread', price: 150, category: 'Breads', available: false, emoji: '🍌', inventory: 0 },
        { id: 'p18', store_id: 's2', name: 'Blueberry Muffin', price: 75, category: 'Pastries', available: true, emoji: '🫐', inventory: 18 },

        // Vikram Electronics (s3)
        { id: 'p19', store_id: 's3', name: 'USB-C Charger (Fast)', price: 499, category: 'Chargers', available: true, emoji: '🔌', inventory: 15 },
        { id: 'p20', store_id: 's3', name: 'Wireless Earbuds', price: 999, category: 'Audio', available: true, emoji: '🎧', inventory: 10 },
        { id: 'p21', store_id: 's3', name: 'Phone Case (Universal)', price: 199, category: 'Accessories', available: true, emoji: '📱', inventory: 50 },
        { id: 'p22', store_id: 's3', name: 'Screen Protector', price: 149, category: 'Accessories', available: true, emoji: '🔲', inventory: 40 },
        { id: 'p23', store_id: 's3', name: 'Power Bank 10000mAh', price: 799, category: 'Power', available: true, emoji: '🔋', inventory: 12 },
        { id: 'p24', store_id: 's3', name: 'Bluetooth Speaker', price: 1499, category: 'Audio', available: false, emoji: '🔊', inventory: 0 },

        // Meena Fashion House (s4)
        { id: 'p25', store_id: 's4', name: 'Cotton Kurti (M)', price: 599, category: 'Women', available: true, emoji: '👚', inventory: 20 },
        { id: 'p26', store_id: 's4', name: 'Silk Saree', price: 2499, category: 'Sarees', available: true, emoji: '👗', inventory: 8 },
        { id: 'p27', store_id: 's4', name: 'Men\'s Casual Shirt', price: 799, category: 'Men', available: true, emoji: '👔', inventory: 25 },
        { id: 'p28', store_id: 's4', name: 'Kids T-Shirt', price: 299, category: 'Kids', available: true, emoji: '👕', inventory: 35 },
        { id: 'p29', store_id: 's4', name: 'Dupatta Set', price: 349, category: 'Women', available: true, emoji: '🧣', inventory: 15 },
        { id: 'p30', store_id: 's4', name: 'Palazzo Pants', price: 449, category: 'Women', available: false, emoji: '👖', inventory: 0 },

        // Fresh & Green Vegetables (s5)
        { id: 'p31', store_id: 's5', name: 'Tomato (1kg)', price: 40, category: 'Vegetables', available: true, emoji: '🍅', inventory: 100 },
        { id: 'p32', store_id: 's5', name: 'Onion (1kg)', price: 35, category: 'Vegetables', available: true, emoji: '🧅', inventory: 80 },
        { id: 'p33', store_id: 's5', name: 'Potato (1kg)', price: 30, category: 'Vegetables', available: true, emoji: '🥔', inventory: 120 },
        { id: 'p34', store_id: 's5', name: 'Green Chilli (250g)', price: 15, category: 'Vegetables', available: true, emoji: '🌶️', inventory: 50 },
        { id: 'p35', store_id: 's5', name: 'Banana (1 dozen)', price: 50, category: 'Fruits', available: true, emoji: '🍌', inventory: 40 },
        { id: 'p36', store_id: 's5', name: 'Apple (1kg)', price: 180, category: 'Fruits', available: true, emoji: '🍎', inventory: 30 },
        { id: 'p37', store_id: 's5', name: 'Spinach (Bunch)', price: 25, category: 'Leafy Greens', available: true, emoji: '🥬', inventory: 60 },
        { id: 'p38', store_id: 's5', name: 'Carrots (500g)', price: 30, category: 'Vegetables', available: false, emoji: '🥕', inventory: 0 },

        // Amit Medical Store (s6)
        { id: 'p39', store_id: 's6', name: 'Dolo 650 (Strip)', price: 32, category: 'Medicines', available: true, emoji: '💊', inventory: 200 },
        { id: 'p40', store_id: 's6', name: 'Crocin Advance', price: 28, category: 'Medicines', available: true, emoji: '💊', inventory: 150 },
        { id: 'p41', store_id: 's6', name: 'Dettol (250ml)', price: 85, category: 'Hygiene', available: true, emoji: '🧴', inventory: 40 },
        { id: 'p42', store_id: 's6', name: 'Band-Aid (Pack)', price: 45, category: 'First Aid', available: true, emoji: '🩹', inventory: 50 },
        { id: 'p43', store_id: 's6', name: 'Vicks Vaporub', price: 75, category: 'Health', available: true, emoji: '🫙', inventory: 30 },
        { id: 'p44', store_id: 's6', name: 'ORS Sachets (5)', price: 25, category: 'Health', available: true, emoji: '📦', inventory: 80 },

        // Daily Dairy Products (s7)
        { id: 'p45', store_id: 's7', name: 'Full Cream Milk (1L)', price: 64, category: 'Milk', available: true, emoji: '🥛', inventory: 100 },
        { id: 'p46', store_id: 's7', name: 'Fresh Curd (500g)', price: 35, category: 'Curd', available: true, emoji: '🫙', inventory: 60 },
        { id: 'p47', store_id: 's7', name: 'Paneer (200g)', price: 80, category: 'Paneer', available: true, emoji: '🧀', inventory: 25 },
        { id: 'p48', store_id: 's7', name: 'Pure Ghee (500ml)', price: 320, category: 'Ghee', available: true, emoji: '🫗', inventory: 15 },
        { id: 'p49', store_id: 's7', name: 'Buttermilk (500ml)', price: 25, category: 'Drinks', available: true, emoji: '🥤', inventory: 40 },
        { id: 'p50', store_id: 's7', name: 'Cheese Slice (Pack)', price: 95, category: 'Cheese', available: false, emoji: '🧀', inventory: 0 },

        // Spice Corner (s8)
        { id: 'p51', store_id: 's8', name: 'Turmeric Powder (100g)', price: 35, category: 'Spices', available: true, emoji: '🟡', inventory: 60 },
        { id: 'p52', store_id: 's8', name: 'Red Chilli Powder (100g)', price: 40, category: 'Spices', available: true, emoji: '🌶️', inventory: 50 },
        { id: 'p53', store_id: 's8', name: 'Garam Masala (100g)', price: 55, category: 'Spices', available: true, emoji: '🫚', inventory: 45 },
        { id: 'p54', store_id: 's8', name: 'Cashew Nuts (250g)', price: 245, category: 'Dry Fruits', available: true, emoji: '🥜', inventory: 20 },
        { id: 'p55', store_id: 's8', name: 'Almonds (250g)', price: 280, category: 'Dry Fruits', available: true, emoji: '🌰', inventory: 18 },
        { id: 'p56', store_id: 's8', name: 'Mustard Oil (1L)', price: 190, category: 'Oils', available: true, emoji: '🫗', inventory: 25 },
    ],

    orders: [
        {
            id: 'o1', customer_id: 'u1', store_id: 's1', total_price: 494,
            delivery_type: 'home', status: 'delivered',
            created_at: '2026-03-27T10:30:00', updated_at: '2026-03-27T14:00:00',
            address: '12, MG Road, Bengaluru',
            items: [
                { product_id: 'p1', name: 'Tata Salt (1kg)', price: 28, quantity: 2 },
                { product_id: 'p3', name: 'Aashirvaad Atta (5kg)', price: 275, quantity: 1 },
                { product_id: 'p6', name: 'Maggi Noodles (Pack of 4)', price: 56, quantity: 1 },
                { product_id: 'p9', name: 'Red Label Tea (250g)', price: 115, quantity: 1 }
            ]
        },
        {
            id: 'o2', customer_id: 'u1', store_id: 's2', total_price: 595,
            delivery_type: 'pickup', status: 'completed',
            created_at: '2026-03-26T15:00:00', updated_at: '2026-03-26T16:30:00',
            address: '',
            items: [
                { product_id: 'p11', name: 'Chocolate Truffle Cake (500g)', price: 450, quantity: 1 },
                { product_id: 'p14', name: 'Red Velvet Cupcake', price: 80, quantity: 1 },
                { product_id: 'p12', name: 'Butter Croissant', price: 65, quantity: 1 }
            ]
        },
        {
            id: 'o3', customer_id: 'u2', store_id: 's5', total_price: 200,
            delivery_type: 'home', status: 'preparing',
            created_at: '2026-03-28T09:00:00', updated_at: '2026-03-28T09:15:00',
            address: '45, Jayanagar, Bengaluru',
            items: [
                { product_id: 'p31', name: 'Tomato (1kg)', price: 40, quantity: 2 },
                { product_id: 'p32', name: 'Onion (1kg)', price: 35, quantity: 1 },
                { product_id: 'p33', name: 'Potato (1kg)', price: 30, quantity: 1 },
                { product_id: 'p37', name: 'Spinach (Bunch)', price: 25, quantity: 1 },
                { product_id: 'p35', name: 'Banana (1 dozen)', price: 50, quantity: 1 }
            ]
        },
        {
            id: 'o4', customer_id: 'u8', store_id: 's6', total_price: 165,
            delivery_type: 'home', status: 'pending',
            created_at: '2026-03-28T12:00:00', updated_at: '2026-03-28T12:00:00',
            address: '67, JP Nagar, Bengaluru',
            items: [
                { product_id: 'p39', name: 'Dolo 650 (Strip)', price: 32, quantity: 2 },
                { product_id: 'p41', name: 'Dettol (250ml)', price: 85, quantity: 1 },
                { product_id: 'p42', name: 'Band-Aid (Pack)', price: 45, quantity: 1 }
            ]
        },
        {
            id: 'o5', customer_id: 'u1', store_id: 's7', total_price: 524,
            delivery_type: 'home', status: 'ready',
            created_at: '2026-03-28T07:00:00', updated_at: '2026-03-28T08:30:00',
            address: '12, MG Road, Bengaluru',
            items: [
                { product_id: 'p45', name: 'Full Cream Milk (1L)', price: 64, quantity: 2 },
                { product_id: 'p46', name: 'Fresh Curd (500g)', price: 35, quantity: 2 },
                { product_id: 'p47', name: 'Paneer (200g)', price: 80, quantity: 1 },
                { product_id: 'p48', name: 'Pure Ghee (500ml)', price: 320, quantity: 1 }
            ]
        }
    ],

    reviews: [
        { id: 'r1', store_id: 's1', customer_id: 'u1', rating: 5, comment: 'Great store! Always has fresh products and fast delivery.', created_at: '2026-03-20T10:00:00' },
        { id: 'r2', store_id: 's1', customer_id: 'u2', rating: 4, comment: 'Good variety of products. Delivery was on time.', created_at: '2026-03-18T15:00:00' },
        { id: 'r3', store_id: 's2', customer_id: 'u1', rating: 5, comment: 'Best cakes in town! The chocolate truffle is amazing.', created_at: '2026-03-26T17:00:00' },
        { id: 'r4', store_id: 's2', customer_id: 'u8', rating: 5, comment: 'Fresh bakery items every day. Love their croissants!', created_at: '2026-03-22T11:00:00' },
        { id: 'r5', store_id: 's5', customer_id: 'u2', rating: 4, comment: 'Fresh vegetables. Sometimes the delivery takes a bit long.', created_at: '2026-03-25T08:00:00' },
        { id: 'r6', store_id: 's5', customer_id: 'u1', rating: 4, comment: 'Very fresh produce. Good quality overall.', created_at: '2026-03-24T09:00:00' },
        { id: 'r7', store_id: 's6', customer_id: 'u8', rating: 5, comment: 'Reliable for medicines. Good stock availability.', created_at: '2026-03-21T14:00:00' },
        { id: 'r8', store_id: 's3', customer_id: 'u1', rating: 4, comment: 'Good electronics at reasonable prices.', created_at: '2026-03-15T16:00:00' },
        { id: 'r9', store_id: 's4', customer_id: 'u2', rating: 5, comment: 'Beautiful collection of sarees and kurtis!', created_at: '2026-03-19T12:00:00' },
        { id: 'r10', store_id: 's7', customer_id: 'u1', rating: 4, comment: 'Fresh dairy products. Milk is always fresh.', created_at: '2026-03-23T06:00:00' },
    ],

    chats: [
        {
            id: 'c1', order_id: 'o1', messages: [
                { sender: 'u1', text: 'Hi, is the order on the way?', time: '2026-03-27T13:00:00' },
                { sender: 'u3', text: 'Yes! It will reach in 15 minutes.', time: '2026-03-27T13:02:00' },
                { sender: 'u1', text: 'Thank you!', time: '2026-03-27T13:03:00' }
            ]
        },
        {
            id: 'c2', order_id: 'o3', messages: [
                { sender: 'u2', text: 'Please pack extra spinach if available', time: '2026-03-28T09:05:00' },
                { sender: 'u7', text: 'Sure, will add some extra. No charge!', time: '2026-03-28T09:10:00' }
            ]
        }
    ],

    categories: [
        { id: 'cat1', name: 'Kirana', emoji: '🏪', color: '#6C3CE1' },
        { id: 'cat2', name: 'Bakery', emoji: '🧁', color: '#E14BC3' },
        { id: 'cat3', name: 'Electronics', emoji: '📱', color: '#10B981' },
        { id: 'cat4', name: 'Clothing', emoji: '👗', color: '#F59E0B' },
        { id: 'cat5', name: 'Vegetables', emoji: '🥬', color: '#059669' },
        { id: 'cat6', name: 'Pharmacy', emoji: '💊', color: '#EF4444' },
        { id: 'cat7', name: 'Dairy', emoji: '🥛', color: '#3B82F6' },
        { id: 'cat8', name: 'Grocery', emoji: '🛒', color: '#8B5CF6' }
    ]
};

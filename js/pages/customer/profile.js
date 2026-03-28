// ========================== //
// Customer - Profile Page     //
// ========================== //

function renderCustomerProfile(container) {
    const user = DataStore.getCurrentUser();
    const orders = DataStore.getOrdersByCustomer(user?.id || '');

    container.innerHTML = `
        <div class="page-content" style="padding-bottom:var(--bottom-nav-height)">
            <!-- Profile Header -->
            <div class="profile-header">
                <div class="profile-avatar">${Utils.getInitials(user?.name || 'U')}</div>
                <div class="profile-name">${user?.name || 'User'}</div>
                <div class="profile-phone">${user?.phone || ''}</div>
            </div>

            <!-- Quick Stats -->
            <div style="display:flex;justify-content:space-around;padding:var(--space-4);background:white;margin-top:-20px;border-radius:var(--radius-2xl) var(--radius-2xl) 0 0;position:relative;z-index:1;box-shadow:var(--shadow-sm)">
                <div class="text-center">
                    <div class="font-bold text-lg">${orders.length}</div>
                    <div class="text-xs text-muted">Orders</div>
                </div>
                <div style="width:1px;background:var(--neutral-200)"></div>
                <div class="text-center">
                    <div class="font-bold text-lg">${orders.filter(o => o.status === 'delivered' || o.status === 'completed').length}</div>
                    <div class="text-xs text-muted">Completed</div>
                </div>
                <div style="width:1px;background:var(--neutral-200)"></div>
                <div class="text-center">
                    <div class="font-bold text-lg">${Utils.formatPrice(orders.reduce((s, o) => s + o.total_price, 0))}</div>
                    <div class="text-xs text-muted">Total Spent</div>
                </div>
            </div>

            <!-- Menu -->
            <div class="profile-menu">
                <div class="profile-menu-item" onclick="showEditProfile()" id="menu-edit-profile">
                    <div class="menu-icon">${Icons.user}</div>
                    <span class="menu-label">Edit Profile</span>
                    <span class="menu-arrow">${Icons.chevronRight}</span>
                </div>
                <div class="profile-menu-item" onclick="Router.navigate('customer-orders')" id="menu-orders">
                    <div class="menu-icon">${Icons.orders}</div>
                    <span class="menu-label">My Orders</span>
                    <span class="menu-arrow">${Icons.chevronRight}</span>
                </div>
                <div class="profile-menu-item" id="menu-addresses">
                    <div class="menu-icon">${Icons.mapPin}</div>
                    <span class="menu-label">Saved Addresses</span>
                    <span class="menu-arrow">${Icons.chevronRight}</span>
                </div>
                <div class="profile-menu-item" id="menu-help">
                    <div class="menu-icon">${Icons.messageCircle}</div>
                    <span class="menu-label">Help & Support</span>
                    <span class="menu-arrow">${Icons.chevronRight}</span>
                </div>
                <div class="divider"></div>
                <div class="profile-menu-item danger" onclick="handleLogout()" id="menu-logout">
                    <div class="menu-icon">${Icons.logout}</div>
                    <span class="menu-label">Logout</span>
                    <span class="menu-arrow">${Icons.chevronRight}</span>
                </div>
            </div>
        </div>

        ${UI.renderCustomerNav('profile')}
    `;
}

function showEditProfile() {
    const user = DataStore.getCurrentUser();
    const content = `
        <div class="input-group mb-4">
            <label class="input-label">Full Name</label>
            <input type="text" class="input-field" id="edit-name" value="${user?.name || ''}">
        </div>
        <div class="input-group mb-4">
            <label class="input-label">Email</label>
            <input type="email" class="input-field" id="edit-email" value="${user?.email || ''}" placeholder="your@email.com">
        </div>
        <div class="input-group mb-4">
            <label class="input-label">Address</label>
            <textarea class="input-field" id="edit-address" rows="3" placeholder="Enter your address">${user?.address || ''}</textarea>
        </div>
        <button class="btn btn-primary btn-block" onclick="saveProfile()" id="save-profile-btn">Save Changes</button>
    `;
    UI.showModal(content, { title: 'Edit Profile' });
}

function saveProfile() {
    const user = DataStore.getCurrentUser();
    const name = document.getElementById('edit-name')?.value?.trim();
    const email = document.getElementById('edit-email')?.value?.trim();
    const address = document.getElementById('edit-address')?.value?.trim();

    if (!name) {
        UI.showToast('Name is required', 'error');
        return;
    }

    DataStore.updateUser({ ...user, name, email, address });
    UI.closeModal();
    UI.showToast('Profile updated!', 'success');
    renderCustomerProfile(document.getElementById('app-content'));
}

function handleLogout() {
    UI.confirm('Logout', 'Are you sure you want to logout?', () => {
        DataStore.logout();
        Router.clearHistory();
        Router.navigate('role-select');
        UI.showToast('Logged out successfully', 'success');
    });
}

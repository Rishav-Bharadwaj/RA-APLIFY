// ========================== //
// RA APLIFY - Auth Page       //
// ========================== //

function renderAuth(container, params = {}) {
    const role = params.role || 'customer';
    const roleLabel = role === 'customer' ? 'Customer' : 'Seller';

    container.innerHTML = `
        <div class="auth-page">
            <div class="auth-top">
                <button class="back-btn" onclick="Router.navigate('role-select')" style="position:absolute;top:16px;left:16px;color:white;width:36px;height:36px;display:flex;align-items:center;justify-content:center;border-radius:10px" id="auth-back">
                    ${Icons.back}
                </button>
                <h1>Welcome, ${roleLabel}!</h1>
                <p>Enter your phone number to continue</p>
            </div>

            <div class="auth-form-container">
                <div class="auth-form-card" id="auth-form-card">
                    <div id="phone-step">
                        <div class="input-group mb-6">
                            <label class="input-label">Phone Number</label>
                            <div class="input-icon-wrapper">
                                <span class="input-icon">${Icons.phone}</span>
                                <input type="tel" class="input-field" id="phone-input" placeholder="Enter 10-digit mobile number" maxlength="10" style="padding-left:44px">
                            </div>
                        </div>

                        <button class="btn btn-primary btn-block btn-lg" onclick="sendOTP()" id="btn-send-otp">
                            Send OTP
                        </button>

                        <div class="auth-divider">or</div>

                        <button class="google-btn" onclick="loginWithGoogle('${role}')" id="btn-google">
                            ${Icons.google}
                            <span>Continue with Google</span>
                        </button>
                    </div>

                    <div id="otp-step" style="display:none">
                        <p style="text-align:center;color:var(--neutral-500);font-size:var(--font-sm);margin-bottom:var(--space-2)">
                            Enter the OTP sent to
                        </p>
                        <p style="text-align:center;font-weight:700;color:var(--neutral-800);margin-bottom:var(--space-4)" id="otp-phone-display"></p>

                        <div class="otp-inputs">
                            <input type="text" class="otp-input" maxlength="1" id="otp-1" oninput="handleOTPInput(this, 1)">
                            <input type="text" class="otp-input" maxlength="1" id="otp-2" oninput="handleOTPInput(this, 2)">
                            <input type="text" class="otp-input" maxlength="1" id="otp-3" oninput="handleOTPInput(this, 3)">
                            <input type="text" class="otp-input" maxlength="1" id="otp-4" oninput="handleOTPInput(this, 4)">
                        </div>

                        <button class="btn btn-primary btn-block btn-lg" onclick="verifyOTP('${role}')" id="btn-verify-otp">
                            Verify & Continue
                        </button>

                        <p style="text-align:center;margin-top:var(--space-4);font-size:var(--font-sm);color:var(--neutral-400)">
                            Didn't receive? <button style="color:var(--primary-500);font-weight:600" onclick="sendOTP()">Resend OTP</button>
                        </p>
                    </div>
                </div>

                <p style="text-align:center;margin-top:var(--space-6);font-size:var(--font-xs);color:var(--neutral-400);padding-bottom:var(--space-6)">
                    By continuing, you agree to our Terms of Service<br>and Privacy Policy
                </p>
            </div>
        </div>
    `;

    // Auto focus
    setTimeout(() => document.getElementById('phone-input')?.focus(), 300);
}

let _authPhone = '';

function sendOTP() {
    const phone = document.getElementById('phone-input')?.value?.trim();
    if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
        UI.showToast('Please enter a valid 10-digit phone number', 'error');
        return;
    }
    _authPhone = phone;

    document.getElementById('phone-step').style.display = 'none';
    document.getElementById('otp-step').style.display = 'block';
    document.getElementById('otp-phone-display').textContent = '+91 ' + phone;

    UI.showToast('OTP sent successfully! (Use 1234)', 'success');

    setTimeout(() => document.getElementById('otp-1')?.focus(), 200);
}

function handleOTPInput(input, index) {
    if (input.value && index < 4) {
        document.getElementById('otp-' + (index + 1))?.focus();
    }
}

function verifyOTP(role) {
    const otp = [1, 2, 3, 4].map(i => document.getElementById('otp-' + i)?.value || '').join('');

    if (otp.length !== 4) {
        UI.showToast('Please enter the complete OTP', 'error');
        return;
    }

    // Auto-accept any OTP for demo
    const user = DataStore.login(_authPhone, role);
    UI.showToast(`Welcome, ${user.name}!`, 'success');

    if (role === 'customer') {
        Router.navigate('customer-home');
    } else {
        // Check if seller has a store
        const stores = DataStore.getStoresByOwner(user.id);
        if (stores.length === 0) {
            Router.navigate('seller-store-setup', { isNew: true });
        } else {
            Router.navigate('seller-dashboard');
        }
    }
}

function loginWithGoogle(role) {
    // Simulate Google login
    const demoPhones = { customer: '9876543210', seller: '9876543212' };
    const phone = demoPhones[role] || '9876543210';
    const user = DataStore.login(phone, role);
    UI.showToast(`Welcome, ${user.name}!`, 'success');

    if (role === 'customer') {
        Router.navigate('customer-home');
    } else {
        const stores = DataStore.getStoresByOwner(user.id);
        if (stores.length === 0) {
            Router.navigate('seller-store-setup', { isNew: true });
        } else {
            Router.navigate('seller-dashboard');
        }
    }
}

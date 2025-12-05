/**
 * Pantheos RPG - Main JavaScript
 * Organized and Optimized Code
 */

// ===================================
// CONSTANTS AND CONFIGURATION
// ===================================
const CONFIG = {
    DEFAULT_AVATAR: 'profile.png',
    BACKGROUND_IMAGES: ['bg.png', 'bg2.png', 'bg3.png', 'bg4.png'],
    BACKGROUND_ROTATION_INTERVAL: 3000,
    NEWS_UPDATE_INTERVAL: 30000,
    ANIMATION_DELAY: 500,
    STORAGE_KEYS: {
        USER: 'pantheos_user',
        ACCOUNTS: 'pantheos_accounts'
    }
};

// ===================================
// UTILITY FUNCTIONS
// ===================================
const Utils = {
    /**
     * Validate email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Show alert with custom styling (can be replaced with toast notifications)
     */
    showAlert(message) {
        alert(message);
    },

    /**
     * Show confirmation dialog
     */
    showConfirm(message) {
        return confirm(message);
    },

    /**
     * Show prompt dialog
     */
    showPrompt(message) {
        return prompt(message);
    }
};

// ===================================
// LOCAL STORAGE MANAGEMENT
// ===================================
const Storage = {
    /**
     * Get all registered accounts
     */
    getAllAccounts() {
        const accounts = localStorage.getItem(CONFIG.STORAGE_KEYS.ACCOUNTS);
        return accounts ? JSON.parse(accounts) : [];
    },

    /**
     * Save all accounts
     */
    saveAllAccounts(accounts) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
    },

    /**
     * Find account by username or email
     */
    findAccount(usernameOrEmail) {
        const accounts = this.getAllAccounts();
        return accounts.find(acc => 
            acc.username.toLowerCase() === usernameOrEmail.toLowerCase() ||
            acc.email.toLowerCase() === usernameOrEmail.toLowerCase()
        );
    },

    /**
     * Get current user session
     */
    getCurrentUser() {
        const savedUser = localStorage.getItem(CONFIG.STORAGE_KEYS.USER);
        if (savedUser) {
            try {
                return JSON.parse(savedUser);
            } catch (e) {
                localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
                return null;
            }
        }
        return null;
    },

    /**
     * Save current user session
     */
    saveCurrentUser(userData) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER, JSON.stringify(userData));
    },

    /**
     * Clear current user session
     */
    clearCurrentUser() {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER);
    }
};

// ===================================
// NAVIGATION AND SCROLL MANAGEMENT
// ===================================
const Navigation = {
    init() {
        this.setupSmoothScrolling();
        this.setupActiveNavHighlighting();
        this.setupHeaderScrollEffect();
    },

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    // Update active state immediately
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    anchor.classList.add('active');
                    
                    // Calculate scroll position
                    const header = document.querySelector('.header');
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    setupActiveNavHighlighting() {
        const updateActiveNav = () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a');
            const header = document.querySelector('.header');
            const headerHeight = header.offsetHeight;

            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 50;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Set initial active state
    },

    setupHeaderScrollEffect() {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(57, 133, 193, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = '#3985C1';
                header.style.backdropFilter = 'none';
            }
        });
    }
};

// ===================================
// ANIMATION MANAGEMENT
// ===================================
const Animations = {
    init() {
        this.setupLoadingAnimations();
        this.setupParallaxEffect();
        this.setupButtonRippleEffect();
        this.setupBackgroundRotation();
        this.setupNewsUpdates();
    },

    setupLoadingAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.loading').forEach(el => {
            observer.observe(el);
        });

        // Initial hero animation
        setTimeout(() => {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.classList.add('loaded');
            }
        }, CONFIG.ANIMATION_DELAY);
    },

    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    },

    setupButtonRippleEffect() {
        document.querySelectorAll('a[class*="btn"]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    },

    setupBackgroundRotation() {
        let currentImageIndex = 0;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            setInterval(() => {
                currentImageIndex = (currentImageIndex + 1) % CONFIG.BACKGROUND_IMAGES.length;
                heroSection.style.backgroundImage = `url('${CONFIG.BACKGROUND_IMAGES[currentImageIndex]}')`;
            }, CONFIG.BACKGROUND_ROTATION_INTERVAL);
        }
    },

    setupNewsUpdates() {
        const updateNews = () => {
            const newsCards = document.querySelectorAll('.news-card');
            newsCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                    }, 200);
                }, index * 100);
            });
        };

        setInterval(updateNews, CONFIG.NEWS_UPDATE_INTERVAL);
    }
};

// ===================================
// MODAL MANAGEMENT
// ===================================
const ModalManager = {
    init() {
        this.setupLoginModal();
        this.setupForgotPasswordModal();
        this.setupProfileSettingsModal();
        this.setupLegalModal();
        this.setupPasswordToggles();
        this.setupKeyboardSupport();
    },

    setupLoginModal() {
        const modal = document.getElementById('loginModal');
        const loginBtn = document.querySelector('.login-btn');
        const loginTab = document.getElementById('loginTab');
        const signupTab = document.getElementById('signupTab');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        // Open modal
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'block';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Tab switching
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            loginTab.classList.remove('inactive');
            signupTab.classList.add('inactive');
            signupTab.classList.remove('active');
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        });

        signupTab.addEventListener('click', () => {
            signupTab.classList.add('active');
            signupTab.classList.remove('inactive');
            loginTab.classList.add('inactive');
            loginTab.classList.remove('active');
            signupForm.style.display = 'block';
            loginForm.style.display = 'none';
        });
    },

    setupForgotPasswordModal() {
        const forgotPasswordModal = document.getElementById('forgotPasswordModal');
        const forgotPasswordLink = document.getElementById('forgotPasswordLink');
        const backToLoginLink = document.getElementById('backToLoginLink');
        const backToLoginLink2 = document.getElementById('backToLoginLink2');
        const loginModal = document.getElementById('loginModal');

        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'none';
            forgotPasswordModal.style.display = 'block';
            document.getElementById('forgotPasswordStep1').style.display = 'block';
            document.getElementById('forgotPasswordStep2').style.display = 'none';
        });

        backToLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            forgotPasswordModal.style.display = 'none';
            loginModal.style.display = 'block';
            document.getElementById('forgotEmail').value = '';
        });

        backToLoginLink2.addEventListener('click', (e) => {
            e.preventDefault();
            forgotPasswordModal.style.display = 'none';
            loginModal.style.display = 'block';
        });

        // Close when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === forgotPasswordModal) {
                forgotPasswordModal.style.display = 'none';
            }
        });
    },

    setupProfileSettingsModal() {
        const profileSettingsModal = document.getElementById('profileSettingsModal');
        const profileSettingsLink = document.getElementById('profileSettingsLink');
        const cancelSettingsBtn = document.getElementById('cancelSettingsBtn');

        profileSettingsLink.addEventListener('click', (e) => {
            e.preventDefault();
            profileSettingsModal.style.display = 'block';
            document.getElementById('profileDropdown').classList.remove('show');
            document.getElementById('profileBtn').classList.remove('open');
        });

        cancelSettingsBtn.addEventListener('click', () => {
            if (ProfileManager.pendingProfilePic) {
                document.getElementById('profilePicLarge').src = ProfileManager.currentUser.profilePic;
                ProfileManager.pendingProfilePic = null;
            }
            document.getElementById('profilePicInput').value = '';
            profileSettingsModal.style.display = 'none';
        });

        // Close when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === profileSettingsModal) {
                profileSettingsModal.style.display = 'none';
            }
        });
    },

    setupLegalModal() {
        const legalModal = document.getElementById('legalModal');
        const closeLegalModal = document.getElementById('closeLegalModal');

        closeLegalModal.addEventListener('click', () => {
            legalModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === legalModal) {
                legalModal.style.display = 'none';
            }
        });

        // Setup legal links
        document.querySelectorAll('.footer-column a[href="#"]').forEach(link => {
            const text = link.textContent.trim();
            if (text === 'Terms of Service') {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    LegalContent.show('tos');
                });
            } else if (text === 'Privacy Policy') {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    LegalContent.show('privacy');
                });
            } else if (text === 'Refund Policy') {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    LegalContent.show('refund');
                });
            }
        });

        // Setup TOS and Privacy links in signup form
        document.getElementById('tosLink').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            LegalContent.show('tos');
        });

        document.getElementById('privacyLink').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            LegalContent.show('privacy');
        });
    },

    setupPasswordToggles() {
        window.togglePassword = (inputId) => {
            const input = document.getElementById(inputId);
            const toggle = input.nextElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                toggle.textContent = '🙈';
                toggle.title = 'Hide password';
            } else {
                input.type = 'password';
                toggle.textContent = '👁';
                toggle.title = 'Show password';
            }
        };

        // Add tooltips
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.title = 'Show password';
            toggle.style.cursor = 'pointer';
            toggle.setAttribute('aria-label', 'Toggle password visibility');
        });
    },

    setupKeyboardSupport() {
        // Login form Enter key support
        const loginInputs = document.querySelectorAll('#loginForm input');
        loginInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    AuthManager.handleLogin();
                }
            });
        });

        // Signup form Enter key support
        const signupInputs = document.querySelectorAll('#signupForm input[type="text"], #signupForm input[type="email"], #signupForm input[type="password"]');
        signupInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    AuthManager.handleSignup();
                }
            });
        });

        // General keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modals
                document.getElementById('loginModal').style.display = 'none';
                document.getElementById('forgotPasswordModal').style.display = 'none';
                document.getElementById('profileSettingsModal').style.display = 'none';
                document.getElementById('legalModal').style.display = 'none';
            }
        });
    }
};

// ===================================
// AUTHENTICATION MANAGEMENT
// ===================================
const AuthManager = {
    handleLogin() {
        const usernameOrEmail = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        const loginBtn = document.querySelector('#loginForm .modal-btn');

        // Validation
        if (!usernameOrEmail) {
            Utils.showAlert('Please enter your username or email!');
            document.getElementById('loginUsername').focus();
            return;
        }

        if (!password) {
            Utils.showAlert('Please enter your password!');
            document.getElementById('loginPassword').focus();
            return;
        }

        if (password.length < 6) {
            Utils.showAlert('Password must be at least 6 characters long!');
            document.getElementById('loginPassword').focus();
            return;
        }

        // Check if account exists
        const account = Storage.findAccount(usernameOrEmail);
        
        if (!account) {
            Utils.showAlert('Account not found! Please sign up first or check your username/email.');
            document.getElementById('loginUsername').focus();
            return;
        }

        // Verify password
        if (account.password !== password) {
            Utils.showAlert('Incorrect password! Please try again.');
            document.getElementById('loginPassword').focus();
            return;
        }

        // Login process
        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;
        loginBtn.style.backgroundColor = '#9ca3af';

        setTimeout(() => {
            loginBtn.textContent = 'Login Successful!';
            loginBtn.style.backgroundColor = '#10b981';

            setTimeout(() => {
                document.getElementById('loginModal').style.display = 'none';

                // Reset form
                document.getElementById('loginUsername').value = '';
                document.getElementById('loginPassword').value = '';
                loginBtn.textContent = 'LOGIN';
                loginBtn.disabled = false;
                loginBtn.style.backgroundColor = '#FAA53C';

                // Update UI
                ProfileManager.showUserProfile(account.username, account.profilePic, account.email);
            }, 1000);
        }, 1500);
    },

    handleSignup() {
        const username = document.getElementById('signupUsername').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsChecked = document.getElementById('termsCheckbox').checked;
        const signupBtn = document.querySelector('#signupForm .modal-btn');

        // Validation
        if (!username) {
            Utils.showAlert('Please enter a username!');
            document.getElementById('signupUsername').focus();
            return;
        }

        if (username.length < 3) {
            Utils.showAlert('Username must be at least 3 characters long!');
            document.getElementById('signupUsername').focus();
            return;
        }

        if (!email) {
            Utils.showAlert('Please enter your email address!');
            document.getElementById('signupEmail').focus();
            return;
        }

        if (!Utils.isValidEmail(email)) {
            Utils.showAlert('Please enter a valid email address!');
            document.getElementById('signupEmail').focus();
            return;
        }

        if (!password) {
            Utils.showAlert('Please enter a password!');
            document.getElementById('signupPassword').focus();
            return;
        }

        if (password.length < 6) {
            Utils.showAlert('Password must be at least 6 characters long!');
            document.getElementById('signupPassword').focus();
            return;
        }

        if (!confirmPassword) {
            Utils.showAlert('Please confirm your password!');
            document.getElementById('confirmPassword').focus();
            return;
        }

        if (password !== confirmPassword) {
            Utils.showAlert('Passwords do not match! Please make sure both passwords are identical.');
            document.getElementById('confirmPassword').focus();
            return;
        }

        if (!termsChecked) {
            Utils.showAlert('⚠️ You must agree to the Terms of Service and Privacy Policy before creating an account!\n\nPlease check the box to continue.');
            document.getElementById('termsCheckbox').focus();
            return;
        }

        // Check if username already exists
        const existingAccount = Storage.findAccount(username);
        if (existingAccount) {
            Utils.showAlert('Username already exists! Please choose a different username.');
            document.getElementById('signupUsername').focus();
            return;
        }

        // Check if email already exists
        const accounts = Storage.getAllAccounts();
        const emailExists = accounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
            Utils.showAlert('Email already registered! Please use a different email or login to your existing account.');
            document.getElementById('signupEmail').focus();
            return;
        }

        // Signup process
        signupBtn.textContent = 'Creating Account...';
        signupBtn.disabled = true;
        signupBtn.style.backgroundColor = '#9ca3af';

        setTimeout(() => {
            // Create new account
            const newAccount = {
                username: username,
                email: email,
                password: password,
                profilePic: CONFIG.DEFAULT_AVATAR,
                createdAt: new Date().toISOString()
            };

            accounts.push(newAccount);
            Storage.saveAllAccounts(accounts);

            signupBtn.textContent = 'Account Created!';
            signupBtn.style.backgroundColor = '#10b981';

            setTimeout(() => {
                Utils.showAlert(`Welcome to Pantheos, ${username}! Your account has been created successfully. You can now log in with your credentials.`);

                // Switch to login tab
                document.getElementById('loginTab').classList.add('active');
                document.getElementById('loginTab').classList.remove('inactive');
                document.getElementById('signupTab').classList.add('inactive');
                document.getElementById('signupTab').classList.remove('active');
                document.getElementById('loginForm').style.display = 'block';
                document.getElementById('signupForm').style.display = 'none';

                // Pre-fill login username
                document.getElementById('loginUsername').value = username;
                document.getElementById('loginPassword').focus();

                // Reset signup form
                document.getElementById('signupUsername').value = '';
                document.getElementById('signupEmail').value = '';
                document.getElementById('signupPassword').value = '';
                document.getElementById('confirmPassword').value = '';
                document.getElementById('termsCheckbox').checked = false;
                signupBtn.textContent = 'SIGNUP';
                signupBtn.disabled = false;
                signupBtn.style.backgroundColor = '#FAA53C';
            }, 1000);
        }, 2000);
    },

    setupTermsCheckbox() {
        const signupBtn = document.querySelector('#signupForm .modal-btn');
        const termsCheckbox = document.getElementById('termsCheckbox');
        
        // Initially disable signup button
        signupBtn.disabled = true;
        signupBtn.style.opacity = '0.5';
        signupBtn.style.cursor = 'not-allowed';

        // Enable/disable based on checkbox
        termsCheckbox.addEventListener('change', function() {
            if (this.checked) {
                signupBtn.disabled = false;
                signupBtn.style.opacity = '1';
                signupBtn.style.cursor = 'pointer';
            } else {
                signupBtn.disabled = true;
                signupBtn.style.opacity = '0.5';
                signupBtn.style.cursor = 'not-allowed';
            }
        });
    }
};

// Make functions globally accessible for inline onclick handlers
window.handleLogin = () => AuthManager.handleLogin();
window.handleSignup = () => AuthManager.handleSignup();

// ===================================
// PASSWORD RESET MANAGEMENT
// ===================================
const PasswordResetManager = {
    resetEmail: '',

    init() {
        document.getElementById('sendCodeBtn').addEventListener('click', () => this.sendCode());
        document.getElementById('resetPasswordBtn').addEventListener('click', () => this.resetPassword());
    },

    showError(elementId, message) {
        const errorMsg = document.getElementById(elementId);
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 4000);
    },

    sendCode() {
        const email = document.getElementById('forgotEmail').value.trim();
        const sendBtn = document.getElementById('sendCodeBtn');

        if (!email) {
            this.showError('forgotErrorMsg', '⚠️ Please enter your email address!');
            document.getElementById('forgotEmail').focus();
            return;
        }

        if (!Utils.isValidEmail(email)) {
            this.showError('forgotErrorMsg', '⚠️ Please enter a valid email address!');
            document.getElementById('forgotEmail').focus();
            return;
        }

        this.resetEmail = email;

        sendBtn.textContent = 'SENDING...';
        sendBtn.disabled = true;
        sendBtn.style.backgroundColor = '#9ca3af';

        setTimeout(() => {
            document.getElementById('forgotPasswordStep1').style.display = 'none';
            document.getElementById('forgotPasswordStep2').style.display = 'block';

            sendBtn.textContent = 'SEND CODE';
            sendBtn.disabled = false;
            sendBtn.style.backgroundColor = '#FAA53C';
        }, 1000);
    },

    resetPassword() {
        const code = document.getElementById('verificationCode').value.trim();
        const newPassword = document.getElementById('newPasswordReset').value;
        const confirmPassword = document.getElementById('confirmPasswordReset').value;
        const resetBtn = document.getElementById('resetPasswordBtn');

        if (!code || code.length !== 6) {
            this.showError('resetErrorMsg', '⚠️ Please enter the 6-digit verification code!');
            document.getElementById('verificationCode').focus();
            return;
        }

        if (!newPassword || newPassword.length < 6) {
            this.showError('resetErrorMsg', '⚠️ Password must be at least 6 characters long!');
            document.getElementById('newPasswordReset').focus();
            return;
        }

        if (newPassword !== confirmPassword) {
            this.showError('resetErrorMsg', '❌ Passwords do not match!');
            document.getElementById('confirmPasswordReset').focus();
            return;
        }

        resetBtn.textContent = 'RESETTING...';
        resetBtn.disabled = true;
        resetBtn.style.backgroundColor = '#9ca3af';

        setTimeout(() => {
            const accounts = Storage.getAllAccounts();
            const accountIndex = accounts.findIndex(acc => acc.email.toLowerCase() === this.resetEmail.toLowerCase());
            
            if (accountIndex !== -1) {
                accounts[accountIndex].password = newPassword;
                Storage.saveAllAccounts(accounts);
            } else {
                // Create new account (prototype mode)
                const newAccount = {
                    username: this.resetEmail.split('@')[0],
                    email: this.resetEmail,
                    password: newPassword,
                    profilePic: CONFIG.DEFAULT_AVATAR,
                    createdAt: new Date().toISOString()
                };
                accounts.push(newAccount);
                Storage.saveAllAccounts(accounts);
            }

            resetBtn.textContent = 'PASSWORD RESET!';
            resetBtn.style.backgroundColor = '#10b981';

            setTimeout(() => {
                document.getElementById('forgotPasswordModal').style.display = 'none';
                document.getElementById('loginModal').style.display = 'block';
                
                // Reset form
                document.getElementById('forgotEmail').value = '';
                document.getElementById('verificationCode').value = '';
                document.getElementById('newPasswordReset').value = '';
                document.getElementById('confirmPasswordReset').value = '';
                document.getElementById('forgotPasswordStep1').style.display = 'block';
                document.getElementById('forgotPasswordStep2').style.display = 'none';
                
                resetBtn.textContent = 'RESET PASSWORD';
                resetBtn.disabled = false;
                resetBtn.style.backgroundColor = '#FAA53C';
            }, 1500);
        }, 1500);
    }
};

// ===================================
// PROFILE MANAGEMENT
// ===================================
const ProfileManager = {
    currentUser: {
        username: '',
        email: '',
        profilePic: CONFIG.DEFAULT_AVATAR
    },
    pendingProfilePic: null,

    init() {
        this.checkSavedSession();
        this.setupProfileDropdown();
        this.setupProfilePictureChange();
        this.setupProfileSettings();
        this.setupLogout();
        this.setupDeleteAccount();
    },

    checkSavedSession() {
        const savedUser = Storage.getCurrentUser();
        if (savedUser && savedUser.isLoggedIn && savedUser.username) {
            this.showUserProfile(savedUser.username, savedUser.profilePic, savedUser.email || '');
        }
    },

    showUserProfile(username, profilePic = null, email = '') {
        this.currentUser.username = username;
        this.currentUser.email = email;
        if (profilePic) {
            this.currentUser.profilePic = profilePic;
        }
        
        // Save session
        Storage.saveCurrentUser({
            username: username,
            email: email,
            profilePic: this.currentUser.profilePic,
            isLoggedIn: true
        });
        
        // Update UI
        document.querySelector('.login-btn').style.display = 'none';
        document.getElementById('userProfileContainer').classList.add('active');
        document.getElementById('dropdownUsername').textContent = username;
        document.getElementById('settingsUsername').value = username;
        document.getElementById('settingsEmail').value = email;
        document.getElementById('headerProfilePic').src = this.currentUser.profilePic;
        document.getElementById('profilePicLarge').src = this.currentUser.profilePic;
    },

    setupProfileDropdown() {
        const profileBtn = document.getElementById('profileBtn');
        const dropdown = document.getElementById('profileDropdown');

        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
            profileBtn.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-profile-container')) {
                dropdown.classList.remove('show');
                profileBtn.classList.remove('open');
            }
        });
    },

    setupProfilePictureChange() {
        const changePicBtn = document.getElementById('changePicBtn');
        const profilePicInput = document.getElementById('profilePicInput');

        changePicBtn.addEventListener('click', () => {
            profilePicInput.click();
        });

        profilePicInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const newPic = event.target.result;
                    this.pendingProfilePic = newPic;
                    document.getElementById('profilePicLarge').src = newPic;
                };
                reader.readAsDataURL(file);
            }
        });
    },

    setupProfileSettings() {
        const saveBtn = document.getElementById('saveSettingsBtn');

        saveBtn.addEventListener('click', () => {
            const newUsername = document.getElementById('settingsUsername').value.trim();
            const newEmail = document.getElementById('settingsEmail').value.trim();
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;

            // Validation
            if (!newUsername || newUsername.length < 3) {
                document.getElementById('settingsUsername').focus();
                return;
            }

            if (!newEmail || !Utils.isValidEmail(newEmail)) {
                document.getElementById('settingsEmail').focus();
                return;
            }

            if (newPassword || confirmNewPassword) {
                if (!currentPassword || newPassword.length < 6 || newPassword !== confirmNewPassword) {
                    document.getElementById('currentPassword').focus();
                    return;
                }
            }

            // Save process
            saveBtn.textContent = 'SAVING...';
            saveBtn.disabled = true;
            saveBtn.style.backgroundColor = '#9ca3af';

            setTimeout(() => {
                // Update account
                const accounts = Storage.getAllAccounts();
                const accountIndex = accounts.findIndex(acc => 
                    acc.username.toLowerCase() === this.currentUser.username.toLowerCase()
                );
                
                if (accountIndex !== -1) {
                    accounts[accountIndex].username = newUsername;
                    accounts[accountIndex].email = newEmail;
                    if (newPassword) {
                        accounts[accountIndex].password = newPassword;
                    }
                    Storage.saveAllAccounts(accounts);
                }
                
                // Apply pending profile picture
                if (this.pendingProfilePic) {
                    this.currentUser.profilePic = this.pendingProfilePic;
                    document.getElementById('headerProfilePic').src = this.pendingProfilePic;
                    this.pendingProfilePic = null;
                }
                
                this.currentUser.username = newUsername;
                this.currentUser.email = newEmail;
                document.getElementById('dropdownUsername').textContent = newUsername;
                
                // Update session
                Storage.saveCurrentUser({
                    username: newUsername,
                    email: newEmail,
                    profilePic: this.currentUser.profilePic,
                    isLoggedIn: true
                });
                
                saveBtn.textContent = 'SAVED!';
                saveBtn.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    document.getElementById('profileSettingsModal').style.display = 'none';
                    
                    // Reset password fields
                    document.getElementById('currentPassword').value = '';
                    document.getElementById('newPassword').value = '';
                    document.getElementById('confirmNewPassword').value = '';
                    document.getElementById('profilePicInput').value = '';
                    
                    saveBtn.textContent = 'SAVE CHANGES';
                    saveBtn.disabled = false;
                    saveBtn.style.backgroundColor = '#3985C1';
                }, 1000);
            }, 1500);
        });
    },

    setupLogout() {
        const logoutBtn = document.getElementById('logoutBtn');

        logoutBtn.addEventListener('click', () => {
            if (Utils.showConfirm('Are you sure you want to logout?')) {
                Storage.clearCurrentUser();
                
                document.getElementById('userProfileContainer').classList.remove('active');
                document.querySelector('.login-btn').style.display = 'block';
                
                this.currentUser = {
                    username: '',
                    email: '',
                    profilePic: CONFIG.DEFAULT_AVATAR
                };
                
                document.getElementById('headerProfilePic').src = CONFIG.DEFAULT_AVATAR;
                document.getElementById('profilePicLarge').src = CONFIG.DEFAULT_AVATAR;
                document.getElementById('profileDropdown').classList.remove('show');
                document.getElementById('profileBtn').classList.remove('open');
                
                Utils.showAlert('You have been logged out successfully!');
            }
        });
    },

    setupDeleteAccount() {
        const deleteBtn = document.getElementById('deleteAccountBtn');

        deleteBtn.addEventListener('click', () => {
            const firstConfirm = Utils.showConfirm('⚠️ WARNING: Are you sure you want to delete your account?\n\nThis action cannot be undone and you will lose:\n• All your game progress\n• All purchased items\n• All achievements\n• All friends and connections\n\nClick OK to continue or Cancel to go back.');
            
            if (firstConfirm) {
                const username = this.currentUser.username;
                const typedUsername = Utils.showPrompt(`To confirm deletion, please type your username: "${username}"`);
                
                if (typedUsername === username) {
                    const finalConfirm = Utils.showConfirm('🚨 FINAL WARNING 🚨\n\nThis is your last chance to cancel.\n\nYour account will be permanently deleted in 3 seconds.\n\nClick OK to proceed with deletion or Cancel to abort.');
                    
                    if (finalConfirm) {
                        deleteBtn.textContent = 'DELETING IN 3...';
                        deleteBtn.disabled = true;
                        
                        setTimeout(() => deleteBtn.textContent = 'DELETING IN 2...', 1000);
                        setTimeout(() => deleteBtn.textContent = 'DELETING IN 1...', 2000);
                        
                        setTimeout(() => {
                            deleteBtn.textContent = 'ACCOUNT DELETED';
                            deleteBtn.style.backgroundColor = '#991b1b';
                            
                            // Remove account
                            const accounts = Storage.getAllAccounts();
                            const updatedAccounts = accounts.filter(acc => 
                                acc.username.toLowerCase() !== username.toLowerCase()
                            );
                            Storage.saveAllAccounts(updatedAccounts);
                            Storage.clearCurrentUser();
                            
                            document.getElementById('userProfileContainer').classList.remove('active');
                            document.querySelector('.login-btn').style.display = 'block';
                            
                            this.currentUser = {
                                username: '',
                                email: '',
                                profilePic: CONFIG.DEFAULT_AVATAR
                            };
                            
                            document.getElementById('headerProfilePic').src = CONFIG.DEFAULT_AVATAR;
                            document.getElementById('profilePicLarge').src = CONFIG.DEFAULT_AVATAR;
                            document.getElementById('profileSettingsModal').style.display = 'none';
                            
                            setTimeout(() => {
                                Utils.showAlert('Your account has been permanently deleted.\n\nWe\'re sorry to see you go. You can create a new account anytime.');
                                
                                deleteBtn.textContent = '🗑️ DELETE ACCOUNT';
                                deleteBtn.disabled = false;
                                deleteBtn.style.backgroundColor = '#ef4444';
                            }, 1000);
                        }, 3000);
                    } else {
                        Utils.showAlert('Account deletion cancelled. Your account is safe.');
                    }
                } else if (typedUsername !== null) {
                    Utils.showAlert('Username does not match. Account deletion cancelled for your safety.');
                }
            }
        });
    }
};

// ===================================
// LEGAL CONTENT MANAGEMENT
// ===================================
const LegalContent = {
    content: {
        tos: {
            title: 'Terms of Service',
            body: `
                <h3>1. Acceptance of Terms</h3>
                <p>By accessing and using Pantheos RPG, you accept and agree to be bound by the terms and provision of this agreement.</p>
                
                <h3>2. Account Responsibilities</h3>
                <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
                
                <h3>3. Prohibited Activities</h3>
                <p>You may not use the game for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction.</p>
                
                <h3>4. Virtual Items</h3>
                <p>All virtual items, currency, and content within the game are owned by Pantheos RPG and licensed to you for use within the game only.</p>
                
                <h3>5. Termination</h3>
                <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                
                <h3>6. Changes to Terms</h3>
                <p>We reserve the right to modify or replace these Terms at any time. Continued use of the service after changes constitutes acceptance of the new Terms.</p>
            `
        },
        privacy: {
            title: 'Privacy Policy',
            body: `
                <h3>1. Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you create an account, including your username, email address, and profile information.</p>
                
                <h3>2. How We Use Your Information</h3>
                <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to monitor and analyze trends and usage.</p>
                
                <h3>3. Information Sharing</h3>
                <p>We do not share your personal information with third parties except as described in this policy or with your consent.</p>
                
                <h3>4. Data Security</h3>
                <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
                
                <h3>5. Cookies and Tracking</h3>
                <p>We use cookies and similar tracking technologies to track activity on our service and hold certain information to improve and analyze our service.</p>
                
                <h3>6. Your Rights</h3>
                <p>You have the right to access, update, or delete your personal information at any time through your account settings.</p>
                
                <h3>7. Changes to Privacy Policy</h3>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            `
        },
        refund: {
            title: 'Refund Policy',
            body: `
                <h3>1. Refund Eligibility</h3>
                <p>Refunds are available for in-game purchases within 14 days of purchase, provided the virtual items have not been used or consumed.</p>
                
                <h3>2. Non-Refundable Items</h3>
                <p>The following items are non-refundable: used consumables, opened loot boxes, redeemed codes, and promotional items.</p>
                
                <h3>3. Subscription Refunds</h3>
                <p>Subscription fees are non-refundable except where required by law. You may cancel your subscription at any time to prevent future charges.</p>
                
                <h3>4. How to Request a Refund</h3>
                <p>To request a refund, contact our support team with your purchase details and reason for the refund request. Refunds are processed within 5-10 business days.</p>
                
                <h3>5. Account Termination</h3>
                <p>If your account is terminated for violating our Terms of Service, you forfeit all purchases and are not eligible for refunds.</p>
                
                <h3>6. Technical Issues</h3>
                <p>If you experience technical issues preventing you from accessing purchased content, contact support for assistance before requesting a refund.</p>
                
                <h3>7. Currency Exchange</h3>
                <p>Refunds are processed in the original currency of purchase. Exchange rate fluctuations are not grounds for additional compensation.</p>
                
                <h3>8. Dispute Resolution</h3>
                <p>If you disagree with a refund decision, you may appeal by contacting our support team with additional information.</p>
            `
        }
    },

    show(type) {
        const modal = document.getElementById('legalModal');
        const title = document.getElementById('legalModalTitle');
        const body = document.getElementById('legalModalContent');
        
        const content = this.content[type];
        title.textContent = content.title;
        body.innerHTML = content.body;
        modal.style.display = 'block';
    }
};

// ===================================
// INTERACTIVE FEATURES
// ===================================
const InteractiveFeatures = {
    init() {
        this.setupDownloadButton();
        this.setupContactForm();
        this.setupNewsCardHover();
    },

    setupDownloadButton() {
        const downloadBtn = document.getElementById('downloadBtn');
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();

                const originalText = this.textContent;
                
                // GitHub release download URL
                // Update this URL when you create a release
                const downloadUrl = 'https://github.com/saladnigek/PAN/releases/latest/download/pantheos-game.zip';
                
                // Check if release exists (for demo, we'll simulate)
                const hasRelease = true; // Set to true when you upload a release
                
                if (hasRelease) {
                    // Real download
                    this.textContent = 'Starting Download...';
                    this.style.backgroundColor = '#10b981';
                    
                    // Trigger download
                    window.location.href = downloadUrl;
                    
                    setTimeout(() => {
                        this.textContent = 'Download Started!';
                        this.style.backgroundColor = '#059669';
                        
                        setTimeout(() => {
                            this.textContent = originalText;
                            this.style.backgroundColor = '#2563eb';
                        }, 2000);
                    }, 500);
                } else {
                    // Demo mode - simulate download
                    this.textContent = 'Preparing Download...';
                    this.style.backgroundColor = '#10b981';

                    setTimeout(() => {
                        this.textContent = 'Download Ready!';
                        this.style.backgroundColor = '#059669';
                        
                        // Show info about release
                        setTimeout(() => {
                            Utils.showAlert('Game client will be available soon!\n\nCheck the GitHub releases page:\nhttps://github.com/saladnigek/PAN/releases');
                            this.textContent = originalText;
                            this.style.backgroundColor = '#2563eb';
                        }, 1500);
                    }, 2000);
                }
            });
        }
    },

    setupContactForm() {
        const sendBtn = document.querySelector('.send-btn');
        
        if (sendBtn) {
            sendBtn.addEventListener('click', function(e) {
                e.preventDefault();

                const nameInput = document.querySelector('.contact-form input[type="text"]');
                const emailInput = document.querySelector('.contact-form input[type="email"]');
                const messageInput = document.querySelector('.contact-form textarea');

                const name = nameInput.value;
                const email = emailInput.value;
                const message = messageInput.value;

                if (name && email && message) {
                    this.textContent = 'Sending...';
                    this.style.backgroundColor = '#10b981';

                    setTimeout(() => {
                        this.textContent = 'Message Sent!';
                        this.style.backgroundColor = '#059669';

                        nameInput.value = '';
                        emailInput.value = '';
                        messageInput.value = '';

                        setTimeout(() => {
                            this.textContent = 'Send Message';
                            this.style.backgroundColor = '#0EA5E9';
                        }, 2000);
                    }, 1500);
                } else {
                    Utils.showAlert('Please fill in all fields!');
                }
            });
        }
    },

    setupNewsCardHover() {
        document.querySelectorAll('.news-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.borderColor = '#2563eb';
            });

            card.addEventListener('mouseleave', function() {
                this.style.borderColor = '#e5e7eb';
            });
        });
    }
};

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Navigation.init();
    Animations.init();
    ModalManager.init();
    AuthManager.setupTermsCheckbox();
    PasswordResetManager.init();
    ProfileManager.init();
    InteractiveFeatures.init();
    
    console.log('Pantheos RPG initialized successfully!');
});

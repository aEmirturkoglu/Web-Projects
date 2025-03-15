import React, { useState, useEffect } from 'react';
import './index.css';

// Secure hash function for client-side security
const secureHash = (str) => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(16);
};

// Create a device ID
const createDeviceId = () => {
    const nav = navigator.userAgent;
    const screen = `${window.screen.width}x${window.screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return secureHash(`${nav}-${screen}-${timezone}-${Date.now()}`);
};

// Cookie utility functions
const setCookie = (name, value, days, secure = true) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    const securePart = secure ? '; Secure; SameSite=Strict' : '';
    document.cookie = `${name}=${value}; ${expires}; path=/${securePart}`;
};

const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return '';
};

// Sanitize inputs to prevent XSS
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input
        .replace(/&/g, '&')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '"')
        .replace(/'/g, '&#039;');
};

// Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (amount) => {
        const newQuantity = quantity + amount;
        if (newQuantity > 0 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-info">
                <h3 className="product-title" title={product.title}>{product.title}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <div className="product-rating">
                    <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span>({product.reviews})</span>
                </div>
                <p className="product-stock">{product.stock} in stock</p>
                <div className="quantity-control">
                    <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>-</button>
                    <input
                        type="number"
                        className="quantity"
                        value={quantity}
                        readOnly
                    />
                    <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>+</button>
                </div>
                <button className="add-to-cart" onClick={() => onAddToCart(product, quantity)}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

// Cart Item Component
const CartItem = ({ item, updateQuantity, removeItem }) => {
    return (
        <div className="cart-item">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                <div className="quantity-control">
                    <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <input
                        type="number"
                        className="quantity"
                        value={item.quantity}
                        readOnly
                    />
                    <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
            </div>
            <div className="cart-item-actions">
                <p>${(item.price * item.quantity).toFixed(2)}</p>
                <button className="remove-item" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
        </div>
    );
};

// Cart Page Component
const CartPage = ({ cart, updateQuantity, removeItem, total, navigateTo }) => {
    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <h2 className="page-title">Your Cart</h2>
                <div className="empty-state">
                    <div className="empty-icon">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p className="empty-message">Add items to your cart to see them here.</p>
                    <button className="empty-action" onClick={() => navigateTo('home')}>Shop Now</button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h2 className="page-title">Your Cart</h2>
            <div>
                {cart.map(item => (
                    <CartItem
                        key={item.id}
                        item={item}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                    />
                ))}
            </div>

            <div className="cart-summary">
                <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                    <span>Shipping:</span>
                    <span>$5.99</span>
                </div>
                <div className="summary-row">
                    <span>Tax:</span>
                    <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="total-row">
                    <span>Total:</span>
                    <span>${(total + 5.99 + (total * 0.08)).toFixed(2)}</span>
                </div>
                <button className="checkout-btn" onClick={() => navigateTo('checkout')}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

// Checkout Page Component
const CheckoutPage = ({ total, onCheckout, paymentCards }) => {
    return (
        <div className="checkout-page">
            <h2 className="page-title">Checkout</h2>
            <div className="checkout-form">
                <h3 style={{ marginBottom: '1rem' }}>Shipping Information</h3>
                <div className="form-row">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" placeholder="John Doe" />
                </div>
                <div className="form-row">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-input" placeholder="john@example.com" />
                </div>
                <div className="form-row">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-input" placeholder="123 Main St" />
                </div>
                <div className="form-row-grid">
                    <div className="form-row">
                        <label className="form-label">City</label>
                        <input type="text" className="form-input" placeholder="New York" />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Zip Code</label>
                        <input type="text" className="form-input" placeholder="10001" />
                    </div>
                </div>

                <h3 style={{ margin: '1.5rem 0 1rem' }}>Payment Information</h3>
                <div className="form-row">
                    <label className="form-label">Payment Method</label>
                    <select className="form-input">
                        {paymentCards.map(card => (
                            <option key={card.id} value={card.id}>
                                {card.cardNumber} - {card.cardHolder}
                            </option>
                        ))}
                        <option value="new">Add New Card</option>
                    </select>
                </div>

                <div className="cart-summary">
                    <div className="summary-row">
                        <span>Subtotal:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping:</span>
                        <span>$5.99</span>
                    </div>
                    <div className="summary-row">
                        <span>Tax:</span>
                        <span>${(total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                        <span>Total:</span>
                        <span>${(total + 5.99 + (total * 0.08)).toFixed(2)}</span>
                    </div>
                </div>

                <button className="place-order-btn" onClick={onCheckout}>
                    Place Order
                </button>
            </div>
        </div>
    );
};

// Order Confirmation Component
const OrderConfirmation = ({ navigateTo }) => {
    return (
        <div className="checkout-page">
            <h2 className="page-title">Order Confirmation</h2>

            <div className="order-confirmation">
                <div className="confirmation-icon">✓</div>
                <h3>Thank you for your order!</h3>
                <p style={{ margin: '1rem 0' }}>Your order has been placed successfully.</p>
                <p style={{ margin: '1rem 0' }}>Order #: {Math.floor(Math.random() * 10000000)}</p>

                <div className="delivery-animation">
                    <div className="truck-container">
                        <div className="truck">🚚</div>
                    </div>
                    <div className="progress-bar">
                        <div className="progress"></div>
                    </div>
                    <p>Your package is on the way!</p>
                </div>

                <button className="empty-action" onClick={() => navigateTo('home')}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

// My Cards Page Component
const MyCardsPage = ({ cards, setCards }) => {
    return (
        <div className="my-cart-page">
            <h2 className="page-title">My Payment Cards</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {cards.map(card => (
                    <div key={card.id} className="payment-card">
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💳</div>
                        <h3>{card.cardHolder}</h3>
                        <div style={{ fontFamily: 'monospace', letterSpacing: '2px', margin: '1rem 0' }}>
                            {card.cardNumber}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Expires: {card.expiryDate}</div>
                            {card.default && <div style={{ color: 'var(--accent-color)' }}>Default</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main App Component
const App = () => {
    // Product data
    const productData = [
        {
            id: "p1",
            title: "Premium Wireless Headphones",
            price: 199.99,
            image: "https://i.imgur.com/JcZRlKt.png", // Pixel art headphones
            rating: 4.8,
            reviews: 245,
            stock: 15,
            category: "audio",
            description: "Experience crystal clear sound with deep bass and active noise cancellation."
        },
        {
            id: "p2",
            title: "Ultra-Slim Laptop",
            price: 1299.99,
            image: "https://i.imgur.com/Zx6TqLX.png", // Pixel art laptop
            rating: 4.6,
            reviews: 189,
            stock: 8,
            category: "computers",
            description: "Powerful performance in a sleek, lightweight design."
        },
        {
            id: "p3",
            title: "Smart Fitness Watch",
            price: 149.99,
            image: "https://i.imgur.com/W237CjS.png", // Pixel art watch
            rating: 4.5,
            reviews: 312,
            stock: 23,
            category: "wearables",
            description: "Track your workouts, heart rate, and sleep."
        },
        {
            id: "p4",
            title: "Professional Camera Kit",
            price: 899.99,
            image: "https://i.imgur.com/kJBjB9j.png", // Pixel art camera
            rating: 4.9,
            reviews: 156,
            stock: 5,
            category: "photography",
            description: "Capture stunning photos and videos with this high-resolution camera."
        },
        {
            id: "p5",
            title: "Wireless Gaming Mouse",
            price: 79.99,
            image: "https://i.imgur.com/LqQ379C.png", // Pixel art mouse
            rating: 4.7,
            reviews: 288,
            stock: 12,
            category: "computers",
            description: "Ergonomic design with customizable DPI settings for ultimate gaming."
        },
        {
            id: "p6",
            title: "Noise Cancelling Earbuds",
            price: 89.99,
            image: "https://i.imgur.com/jFaKSeE.png", // Pixel art earbuds
            rating: 4.4,
            reviews: 201,
            stock: 30,
            category: "audio",
            description: "Immerse yourself in music with these comfortable, noise-cancelling earbuds."
        },
        {
            id: "p7",
            title: "4K Monitor",
            price: 349.99,
            image: "https://i.imgur.com/ZU0p2jj.png", // Pixel art monitor
            rating: 4.8,
            reviews: 190,
            stock: 7,
            category: "computers",
            description: "Experience stunning visuals with this 4K ultra HD monitor."
        },
        {
            id: "p8",
            title: "Mechanical Keyboard",
            price: 129.99,
            image: "https://i.imgur.com/sR6Tq5k.png", // Pixel art keyboard
            rating: 4.6,
            reviews: 220,
            stock: 18,
            category: "computers",
            description: "Tactile feedback and fast response for serious typists and gamers."
        },
        {
            id: "p9",
            title: "Portable Bluetooth Speaker",
            price: 59.99,
            image: "https://i.imgur.com/ZU1t9iV.png", // Pixel art speaker
            rating: 4.3,
            reviews: 250,
            stock: 25,
            category: "audio",
            description: "Enjoy your music anywhere with this rugged, waterproof Bluetooth speaker."
        },
        {
            id: "p10",
            title: "Instant Print Camera",
            price: 99.99,
            image: "https://i.imgur.com/1a1zKwG.png", // Pixel art camera tripod
            rating: 4.7,
            reviews: 175,
            stock: 10,
            category: "photography",
            description: "Capture and print memories instantly with this fun, easy-to-use camera."
        },
        {
            id: "p11",
            title: "Tablet with Stylus",
            price: 249.99,
            image: "https://i.imgur.com/l7J7VtC.png", // Pixel art bluetooth speaker
            rating: 4.5,
            reviews: 210,
            stock: 14,
            category: "computers",
            description: "Versatile tablet for work and play, includes a precise stylus."
        },
        {
            id: "p12",
            title: "Tripod for Cameras",
            price: 39.99,
            image: "https://i.imgur.com/1a1zKwG.png", // Pixel art tripod
            rating: 4.2,
            reviews: 165,
            stock: 35,
            category: "photography",
            description: "Stable and adjustable tripod for perfect photos and videos."
        }
    ];
    const categories = ['all', 'audio', 'computers', 'wearables', 'photography'];
    const paymentCardData = [
        { id: 'card1', cardHolder: 'John Doe', cardNumber: '****-****-****-1234', expiryDate: '12/24', default: true },
        { id: 'card2', cardHolder: 'Jane Smith', cardNumber: '****-****-****-5678', expiryDate: '11/25' }
    ];

    const [products] = useState(productData);
    const [cart, setCart] = useState(() => {
        const storedCart = getCookie('shoppingCart');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [paymentCards, setPaymentCards] = useState(paymentCardData);
    const [activeCategory, setActiveCategory] = useState('all');
    const [page, setPage] = useState('home');
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    useEffect(() => {
        // Load cart from cookie on component mount
        const storedCart = getCookie('shoppingCart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        // Save cart to cookie whenever it changes
        setCookie('shoppingCart', JSON.stringify(cart), 30);
    }, [cart]);


    const addToCart = (product, quantityToAdd) => {
        let updatedCart = [...cart];
        const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].quantity += quantityToAdd;
        } else {
            updatedCart.push({ ...product, quantity: quantityToAdd });
        }
        setCart(updatedCart);
    };

    const updateQuantity = (itemId, newQuantity) => {
        let updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(item => item.id === itemId);

        if (itemIndex !== -1 && newQuantity > 0) {
            updatedCart[itemIndex].quantity = newQuantity;
            setCart(updatedCart);
        } else if (newQuantity <= 0) {
            removeItem(itemId);
        }
    };

    const removeItem = (itemId) => {
        const updatedCart = cart.filter(item => item.id !== itemId);
        setCart(updatedCart);
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const navigateTo = (pageName) => {
        setPage(pageName);
        if (pageName === 'checkout') {
            setOrderConfirmed(false); // Reset order confirmation on checkout navigation
        }
    };

    const handleCheckout = () => {
        setCart([]); // Clear cart on checkout
        setOrderConfirmed(true); // Set order confirmation state
        navigateTo('orderConfirmation'); // Navigate to order confirmation page
    };

    const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = getTotal();


    return (
        <div className="container">
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="logo" onClick={() => navigateTo('home')}>TechBazaar</div>
                    <div className="nav-links">
                        <span className={`nav-link ${page === 'home' ? 'active' : ''}`} onClick={() => navigateTo('home')}>Home</span>
                        <span className={`nav-link ${page === 'myCards' ? 'active' : ''}`} onClick={() => navigateTo('myCards')}>My Cards</span>
                        <div className="cart-icon" onClick={() => navigateTo('cart')}>
                            <span>Cart</span>
                            <span className="cart-count">{cartCount}</span>
                        </div>
                    </div>
                </div>
            </nav>

            {page === 'home' && (
                <>
                    <div className="category-tabs">
                        {categories.map(category => (
                            <button 
                                key={category} 
                                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    <div className="products-grid">
                        {filteredProducts.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                onAddToCart={addToCart} 
                            />
                        ))}
                    </div>
                </>
            )}

            {page === 'cart' && (
                <CartPage 
                    cart={cart} 
                    updateQuantity={updateQuantity} 
                    removeItem={removeItem} 
                    total={total}
                    navigateTo={navigateTo} 
                />
            )}

            {page === 'checkout' && (
                <CheckoutPage 
                    total={total} 
                    onCheckout={handleCheckout} 
                    paymentCards={paymentCards}
                />
            )}

            {page === 'orderConfirmation' && (
                <OrderConfirmation navigateTo={navigateTo} />
            )}
            
            {page === 'myCards' && (
                <MyCardsPage cards={paymentCards} setCards={setPaymentCards} />
            )}
        </div>
    );
};

export default App;

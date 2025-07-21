document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.classList.add('mobile-menu-btn');
    document.querySelector('.header').prepend(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', function() {
        document.querySelector('.nav').classList.toggle('show');
    });

    // Smooth scrolling for anchor links
  const anchors = document.querySelectorAll('a[href^="#"]');
const sections = Array.from(anchors).map(anchor => document.querySelector(anchor.getAttribute('href')));

anchors.forEach((anchor, index) => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        let targetSection;

        // If it's the last anchor, scroll to the first section
        if (index === anchors.length - 1) {
            targetSection = sections[0];
        } else {
            targetSection = document.querySelector(this.getAttribute('href'));
        }

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to the server
            alert('Form submitted successfully!');
            this.reset();
        });
    });

    // Shop filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Filter products based on category
                const category = this.getAttribute('data-filter');
                alert(`Filtering by ${category} - this would filter products in a real implementation`);
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(document.querySelectorAll('.service-slide'));
        const nextBtn = document.querySelector('.carousel-next');
        const prevBtn = document.querySelector('.carousel-prev');
        
        const slideWidth = slides[0].getBoundingClientRect().width;
        let currentIndex = 0;
        
        // Set initial position
        const setSlidePosition = () => {
            track.style.transform = `translateX(-${currentIndex * (slideWidth + 20)}px)`;
        };
        
        // Next slide
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            setSlidePosition();
        });
        
        // Previous slide
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            setSlidePosition();
        });
        
        // Auto-rotate every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            setSlidePosition();
        }, 5000);
    });

     // Shopping Cart Functionality
    document.addEventListener('DOMContentLoaded', function() {
        const cart = [];
        const cartSidebar = document.querySelector('.cart-sidebar');
        const cartOverlay = document.querySelector('.cart-overlay');
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total span');
        
        // Add to Cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                if (this.disabled) return;
                
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('$', ''));
                const productImg = productCard.querySelector('.product-img').style.backgroundImage;
                
                // Check if product already in cart
                const existingItem = cart.find(item => item.name === productName);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        name: productName,
                        price: productPrice,
                        quantity: 1,
                        img: productImg
                    });
                }
                
                updateCart();
                openCart();
            });
        });
        
        // Open/Close Cart
        function openCart() {
            cartSidebar.style.right = '0';
            cartOverlay.style.display = 'block';
        }
        
        function closeCart() {
            cartSidebar.style.right = '-400px';
            cartOverlay.style.display = 'none';
        }
        
        document.querySelector('.close-cart').addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', closeCart);
        
        // Update Cart Display
        function updateCart() {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            
            cart.forEach(item => {
                total += item.price * item.quantity;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-img" style="${item.img}"></div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                        <button class="remove-item">Remove</button>
                    </div>
                    <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                `;
                
                cartItemsContainer.appendChild(cartItem);
            });
            
            cartTotal.textContent = `$${total.toFixed(2)}`;
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const itemName = this.closest('.cart-item').querySelector('h4').textContent;
                    const itemIndex = cart.findIndex(item => item.name === itemName);
                    
                    if (itemIndex !== -1) {
                        cart.splice(itemIndex, 1);
                        updateCart();
                    }
                });
            });
        }
        
        // Filter Functionality
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const sortBy = document.getElementById('sort-by');
        const availability = document.getElementById('availability');
        const productSearch = document.getElementById('product-search');
        
        function filterProducts() {
            const categoryValue = categoryFilter.value;
            const priceValue = priceFilter.value;
            const sortValue = sortBy.value;
            const availabilityValue = availability.value;
            const searchValue = productSearch.value.toLowerCase();
            
            document.querySelectorAll('.product-card').forEach(card => {
                const category = card.dataset.category;
                const price = parseFloat(card.dataset.price);
                const stock = card.dataset.stock === 'true';
                const name = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                // Category filter
                const categoryMatch = categoryValue === 'all' || category === categoryValue;
                
                // Price filter
                let priceMatch = true;
                if (priceValue !== 'all') {
                    const [min, max] = priceValue.split('-').map(Number);
                    if (max) {
                        priceMatch = price >= min && price <= max;
                    } else {
                        priceMatch = price >= min;
                    }
                }
                
                // Availability filter
                const stockMatch = availabilityValue === 'all' || (availabilityValue === 'in-stock' && stock);
                
                // Search filter
                const searchMatch = searchValue === '' || 
                    name.includes(searchValue) || 
                    description.includes(searchValue);
                
                // Show/hide based on filters
                if (categoryMatch && priceMatch && stockMatch && searchMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Sort products
            const productGrid = document.querySelector('.products-grid');
            const products = Array.from(document.querySelectorAll('.product-card'));
            
            products.sort((a, b) => {
                const aPrice = parseFloat(a.dataset.price);
                const bPrice = parseFloat(b.dataset.price);
                const aPopularity = parseInt(a.dataset.popularity);
                const bPopularity = parseInt(b.dataset.popularity);
                
                switch(sortValue) {
                    case 'price-low':
                        return aPrice - bPrice;
                    case 'price-high':
                        return bPrice - aPrice;
                    case 'newest':
                        return parseInt(b.dataset.id) - parseInt(a.dataset.id);
                    case 'popularity':
                    default:
                        return bPopularity - aPopularity;
                }
            });
            
            // Re-append sorted products
            products.forEach(product => {
                productGrid.appendChild(product);
            });
        }
        
        // Event listeners for filters
        categoryFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);
        sortBy.addEventListener('change', filterProducts);
        availability.addEventListener('change', filterProducts);
        productSearch.addEventListener('input', filterProducts);
        
        // Initialize filters
        filterProducts();
    });
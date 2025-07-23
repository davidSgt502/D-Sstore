document.addEventListener('DOMContentLoaded', function() {
    // ELEMENTOS DEL DOM
    const DOM = {
        productsGrid: document.querySelector('.products-grid'),
        cartCount: document.querySelector('.cart-count'),
        cartModal: document.getElementById('cartModal'),
        checkoutModal: document.getElementById('checkoutModal'),
        cartItemsList: document.getElementById('cartItemsList'),
        checkoutItemsList: document.getElementById('checkoutItemsList'),
        checkoutForm: document.getElementById('checkoutForm'),
        categoryButtons: document.querySelectorAll('.category-btn'),
        viewAllButton: document.querySelector('.view-all'),
        ctaButton: document.querySelector('.cta-button'),
        proceedCheckoutBtn: document.getElementById('proceedCheckout'),
        closeModalButtons: document.querySelectorAll('.close-modal'),
        closeCartButton: document.querySelector('.close-cart'),
        searchInput: document.querySelector('.search-bar input'),
        searchButton: document.querySelector('.search-bar button'),
        cartIcon: document.querySelector('.cart-icon-container'),
        deliveryMethodSelect: document.getElementById('deliveryMethod'),
        deliveryMethodCheckout: document.getElementById('deliveryMethodCheckout')
    };

    // ESTADO DE LA APLICACIÓN
    const state = {
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        currentCategory: 'all',
        currentSearchQuery: '',
        checkoutStep: 1
    };

    // FUNCIONES DE UTILIDAD
    const utils = {
        formatPrice: (price) => `Q${price.toFixed(2)}`,
        
        animateElement: (element, animationClass, duration = 300) => {
            if (!element) return;
            element.classList.add(animationClass);
            setTimeout(() => element.classList.remove(animationClass), duration);
        },
        
        showNotification: (message, icon = 'fa-check-circle', duration = 3000) => {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
            document.body.appendChild(notification);
            
            setTimeout(() => notification.classList.add('show'), 10);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => document.body.removeChild(notification), 300);
            }, duration);
        },
        
        getCurrentDate: () => new Date().toISOString().split('T')[0],
        
        formatDate: (dateString) => {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('es-GT', options);
        },
        
        debounce: (func, delay) => {
            let timeoutId;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(context, args), delay);
            };
        },
        
        validateField: (input, pattern = null) => {
            const value = input.value.trim();
            const isValid = value && (!pattern || pattern.test(value));
            
            if (isValid) {
                input.classList.remove('error');
            } else {
                input.classList.add('error');
                utils.animateElement(input, 'shake');
            }
            
            return isValid;
        },

        generateOrderPDF: (formData, cartItems, subtotal, shippingCost, total) => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Configuración de colores
            const primaryColor = [52, 152, 219];
            const secondaryColor = [41, 128, 185];
            const darkColor = [44, 62, 80];
            const lightColor = [236, 240, 241];
            const successColor = [39, 174, 96];
            
            // Configuración de productos por página
            const productsPerPage = 7;
            const totalPages = Math.ceil(cartItems.length / productsPerPage);
            
            for (let page = 0; page < totalPages; page++) {
                if (page > 0) {
                    doc.addPage();
                }
                
                // Encabezado con estilo moderno (en cada página)
                doc.setFillColor(...primaryColor);
                doc.rect(0, 0, 210, 30, 'F');
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(20);
                doc.setTextColor(255, 255, 255);
                doc.text(`NOTA DE PEDIDO - ${APP_CONFIG.storeName.toUpperCase()}`, 105, 20, { align: 'center' });
                
                // Información de la tienda
                doc.setFontSize(10);
                doc.setTextColor(40, 40, 40);
                doc.text(
                    `Teléfono: ${APP_CONFIG.NPT_ENVIO.Number} | ${APP_CONFIG.NPT_ENVIO.storeEmail || ''}`,
                    105,
                    35,
                    { align: 'center' }
                );

                // Línea separadora decorativa
                doc.setDrawColor(...secondaryColor);
                doc.setLineWidth(0.5);
                doc.line(15, 40, 195, 40);
                
                // Solo mostrar información del cliente en la primera página
                if (page === 0) {
                    // Información del cliente con fondo destacado
                    doc.setFillColor(...lightColor);
                    doc.rect(15, 45, 180, 50, 'F');
                    doc.setFontSize(12);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...darkColor);
                    doc.text('INFORMACIÓN DEL CLIENTE', 20, 55);
                    
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(80, 80, 80);
                    const clientInfo = [
                        `Nombre: ${formData.name}`,
                        `Teléfono: ${formData.phone}`,
                        formData.email ? `Email: ${formData.email}` : null,
                        `Dirección: ${formData.address}`,
                        `Método de entrega: ${APP_CONFIG.shippingMethods[formData.deliveryMethod].name}`
                    ].filter(Boolean);
                    
                    clientInfo.forEach((info, i) => {
                        doc.text(info, 20, 65 + (i * 5));
                    });
                    
                    // Detalles del pedido con estilo de tarjeta
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...darkColor);
                    doc.text('DETALLES DEL PEDIDO', 15, 105);
                    
                    // Posición inicial para la tabla
                    var startY = 110;
                } else {
                    // En páginas siguientes, solo mostrar título de continuación
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...darkColor);
                    doc.text('DETALLES DEL PEDIDO (continuación)', 15, 50);
                    
                    // Posición inicial para la tabla en páginas siguientes
                    var startY = 55;
                }
                
                // Obtener los productos para esta página
                const startIndex = page * productsPerPage;
                const endIndex = Math.min(startIndex + productsPerPage, cartItems.length);
                const pageProducts = cartItems.slice(startIndex, endIndex);
                
                // Tabla de productos con estilo moderno
                const itemsData = pageProducts.map((item, index) => [
                    startIndex + index + 1,
                    item.title,
                    item.quantity,
                    `Q${item.price.toFixed(2)}`,
                    `Q${(item.price * item.quantity).toFixed(2)}`
                ]);
                
                doc.autoTable({
                    startY: startY,
                    head: [['#', 'Producto', 'Cantidad', 'Precio Unitario', 'Total']],
                    body: itemsData,
                    headStyles: {
                        fillColor: secondaryColor,
                        textColor: 255,
                        fontStyle: 'bold',
                        fontSize: 10
                    },
                    bodyStyles: {
                        textColor: darkColor,
                        fontSize: 9
                    },
                    alternateRowStyles: {
                        fillColor: [245, 245, 245]
                    },
                    styles: {
                        cellPadding: 4,
                        fontSize: 9,
                        lineWidth: 0.1,
                        lineColor: lightColor
                    },
                    margin: { left: 15 }
                });
                
                // Solo mostrar resumen y datos bancarios en la última página
                if (page === totalPages - 1) {
                    const lastY = doc.lastAutoTable.finalY + 15;
                    
                    // Resumen del pago con diseño destacado
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...darkColor);
                    doc.text('RESUMEN DE PAGO', 15, lastY);
                    
                    // Rectángulo de fondo para resumen
                    doc.setFillColor(...lightColor);
                    doc.rect(15, lastY + 5, 180, 40, 'F');
                    
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(80, 80, 80);
                    doc.text(`Subtotal:`, 20, lastY + 15);
                    doc.text(`Q${subtotal.toFixed(2)}`, 170, lastY + 15, { align: 'right' });
                    
                    doc.text(`Costo de envío:`, 20, lastY + 25);
                    doc.text(`Q${shippingCost.toFixed(2)}`, 170, lastY + 25, { align: 'right' });
                    
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...successColor);
                    doc.text(`TOTAL A PAGAR:`, 20, lastY + 35);
                    doc.text(`Q${total.toFixed(2)}`, 170, lastY + 35, { align: 'right' });
                    
                    // Datos bancarios con estilo de tarjeta
                    const bankY = lastY + 50;
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...darkColor);
                    doc.text('DATOS BANCARIOS PARA TRANSFERENCIA', 15, bankY);
                    
                    doc.setFillColor(...lightColor);
                    doc.rect(15, bankY + 5, 180, 40, 'F');
                    
                    doc.setFont('helvetica', 'normal');
                    doc.setTextColor(80, 80, 80);
                    const bankInfo = [
                        `Banco: ${APP_CONFIG.bankName}`,
                        `Cuenta: ${APP_CONFIG.accountNumber}`,
                        `A nombre de: ${APP_CONFIG.accountHolder}`,
                        `Tipo: ${APP_CONFIG.accountType}`
                    ];
                    
                    bankInfo.forEach((info, i) => {
                        doc.text(info, 20, bankY + 15 + (i * 5));
                    });
                    
                    // Pie de página con estilo
                    const footerY = bankY + 55;
                    doc.setFontSize(10);
                    doc.setTextColor(100, 100, 100);
                    doc.text('¡Gracias por su compra! Para cualquier consulta puede contactarnos.', 105, footerY, { align: 'center' });
                    
                    doc.setFontSize(8);
                    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString()}`, 105, footerY + 5, { align: 'center' });
                    doc.text(`Hora de emisión: ${new Date().toLocaleTimeString()}`, 105, footerY + 10, { align: 'center' });
                } else {
                    // En páginas que no son la última, agregar indicador de continuación
                    const lastY = doc.lastAutoTable.finalY + 10;
                    doc.setFontSize(10);
                    doc.setTextColor(100, 100, 100);
                    doc.text('Continúa en la siguiente página...', 105, lastY, { align: 'center' });
                }
            }
            
            // Generar nombre único para el archivo
            const fileName = `Pedido_${formData.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
            
            // Guardar el PDF
            doc.save(fileName);
            
            // Retornar el PDF como blob y el nombre del archivo
            const pdfBlob = doc.output('blob');
            return { blob: pdfBlob, fileName: fileName };
        }
    };

    // FUNCIONES DE PRODUCTOS
    const productFunctions = {
        displayProducts: (filter = 'all', productsArray = PRODUCTS) => {
    DOM.productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? productsArray 
        : productsArray.filter(product => product.category === filter);
    
    if (filteredProducts.length === 0) {
        DOM.productsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros términos de búsqueda o categoría</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const isOutOfStock = product.stock <= 0;
        const isClothing = product.category.includes('ropa');
        
        // Generar selector de tallas si es ropa y tiene tallas definidas
        const sizeSelector = isClothing && product.sizes 
            ? `<div class="size-selector">
                  <select class="product-size" data-id="${product.id}">
                      ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                  </select>
               </div>`
            : '';
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image-container ${isOutOfStock ? 'out-of-stock' : ''}">
                <img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy">
                ${product.badge ? `<span class="product-badge ${product.badge.type}">${product.badge.text}</span>` : ''}
                ${isOutOfStock ? '<span class="stock-badge">AGOTADO</span>' : ''}
                ${!isOutOfStock ? `<span class="stock-counter">${product.stock} disponibles</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price-container">
                    <div>
                        ${product.originalPrice ? 
                            `<span class="product-original-price">${utils.formatPrice(product.originalPrice)}</span>` : ''}
                        <span class="product-price">${utils.formatPrice(product.price)}</span>
                    </div>
                </div>
                ${sizeSelector}
                <button class="add-to-cart" data-id="${product.id}" ${isOutOfStock ? 'disabled' : ''}>
                    <i class="fas fa-cart-plus"></i> ${isOutOfStock ? 'Agotado' : 'Agregar'}
                </button>
            </div>
        `;
        
        DOM.productsGrid.appendChild(productCard);
    });
    
    // Agregar event listeners solo a productos disponibles
    document.querySelectorAll('.add-to-cart:not([disabled])').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.dataset.id);
            const sizeSelector = e.currentTarget.closest('.product-card').querySelector('.product-size');
            const selectedSize = sizeSelector ? sizeSelector.value : null;
            
            cartFunctions.addToCart(productId, selectedSize);
        });
    });
},
        
        searchProducts: utils.debounce(function(query) {
            state.currentSearchQuery = query.toLowerCase();
            
            if (!query.trim()) {
                productFunctions.displayProducts(state.currentCategory);
                return;
            }
            
            // Buscar en todos los campos relevantes del producto
            const filtered = PRODUCTS.filter(product => {
                const searchText = query.toLowerCase();
                const searchFields = [
                    product.title.toLowerCase(),
                    product.description.toLowerCase(),
                    product.category.toLowerCase(),
                    product.badge?.text.toLowerCase() || '',
                    `q${product.price.toFixed(2)}`, // Para buscar por precio (ej. "q50.00")
                    product.originalPrice ? `q${product.originalPrice.toFixed(2)}` : ''
                ];
                
                return searchFields.some(field => field.includes(searchText));
            });
            
            productFunctions.displayProducts('all', filtered);
        }, 300)
    };

    //INICIO
    // FUNCIONES DEL CARRITO
    const cartFunctions = {
        addToCart: function(productId, size = null) {
    const product = PRODUCTS.find(p => p.id === productId);
    
    if (!product) {
        utils.showNotification('Producto no encontrado', 'fa-exclamation-circle');
        return;
    }
    
    // Verificar si hay stock disponible
    if (product.stock <= 0) {
        utils.showNotification('Este producto está agotado', 'fa-exclamation-circle');
        productFunctions.displayProducts(state.currentCategory);
        return;
    }
    
    // Crear clave única que combine ID y talla (si existe)
    const cartItemKey = size ? `${productId}-${size}` : productId.toString();
    
    const existingItem = state.cart.find(item => 
        (size ? `${item.id}-${item.size}` : item.id.toString()) === cartItemKey
    );
    
    if (existingItem) {
        // Verificar si aún hay stock disponible
        if (existingItem.quantity >= product.stock) {
            utils.showNotification('No hay suficiente stock disponible', 'fa-exclamation-circle');
            return;
        }
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            ...product,
            quantity: 1,
            size: size // Agregar la talla seleccionada al item del carrito
        });
    }
    
    // Reducir el stock del producto
    product.stock -= 1;
    
    // Si el stock llegó a 0, actualizar la vista
    if (product.stock === 0) {
        productFunctions.displayProducts(state.currentCategory);
    }
    
    this.updateCart();
    utils.showNotification(`¡${product.title} ${size ? `(Talla: ${size}) ` : ''}añadido al carrito!`, 'fa-cart-plus');
    
    // Animación de vuelo al carrito
    const button = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    if (button && button.querySelector('i')) {
        const icon = button.querySelector('i').cloneNode(true);
        icon.style.position = 'fixed';
        icon.style.zIndex = '9999';
        icon.style.fontSize = '20px';
        icon.style.color = '#4CAF50';
        icon.style.transition = 'all 0.5s ease-out';
        
        const buttonRect = button.getBoundingClientRect();
        const cartRect = DOM.cartIcon.getBoundingClientRect();
        
        icon.style.left = `${buttonRect.left + buttonRect.width/2 - 10}px`;
        icon.style.top = `${buttonRect.top}px`;
        
        document.body.appendChild(icon);
        
        setTimeout(() => {
            icon.style.left = `${cartRect.left + cartRect.width/2 - 10}px`;
            icon.style.top = `${cartRect.top}px`;
            icon.style.transform = 'scale(1.5)';
            icon.style.opacity = '0.5';
        }, 10);
        
        setTimeout(() => document.body.removeChild(icon), 500);
    }
},//FIN
        
        updateCart: function() {
            const totalItems = state.cart.reduce((total, item) => total + item.quantity, 0);
            
            // Actualizar contador
            if (DOM.cartCount) {
                DOM.cartCount.textContent = totalItems;
                DOM.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
                utils.animateElement(DOM.cartCount, 'update-animation');
            }
            
            localStorage.setItem('cart', JSON.stringify(state.cart));
            
            // Actualizar vista del carrito si está abierto
            if (DOM.cartModal.style.display === 'flex') {
                this.renderCart();
            }
        },
        
        renderCart: function() {
    if (state.cart.length === 0) {
        document.querySelector('.empty-cart-message').style.display = 'flex';
        document.querySelector('.cart-summary').style.display = 'none';
        return;
    }
    
    document.querySelector('.empty-cart-message').style.display = 'none';
    document.querySelector('.cart-summary').style.display = 'block';
    
    DOM.cartItemsList.innerHTML = '';
    
    state.cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.dataset.id = item.id;
        ///
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.title}</h3>
                ${item.size ? `<p class="cart-item-size">Talla: ${item.size}</p>` : ''}
                <p class="cart-item-description">${item.description}</p>
                <div class="cart-item-price">
                    <span class="current-price">${utils.formatPrice(item.price)}</span>
                    ${item.originalPrice ? 
                        `<span class="original-price">${utils.formatPrice(item.originalPrice)}</span>` : ''}
                    ${item.badge ? `<span class="discount-badge">${item.badge.text}</span>` : ''}
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                    </div>
                    <button class="remove-item"><i class="fas fa-trash"></i> Eliminar</button>
                </div>
            </div>
        `;
        ///
        DOM.cartItemsList.appendChild(cartItem);
    });
    
    // Resto del código permanece igual...
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', this.decreaseQuantity.bind(this));
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', this.increaseQuantity.bind(this));
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', this.removeItem.bind(this));
    });
    
    this.updateCartSummary();
},//FIN
        updateCartSummary: function() {
            const itemCount = state.cart.reduce((total, item) => total + item.quantity, 0);
            const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            const discount = state.cart.reduce((sum, item) => {
                return item.originalPrice 
                    ? sum + ((item.originalPrice - item.price) * item.quantity)
                    : sum;
            }, 0);
            
            // Usar el método de envío del checkout en lugar del del carrito
            const shippingMethod = DOM.deliveryMethodCheckout.value || 'pickup';
            const shippingCost = APP_CONFIG.shippingMethods[shippingMethod].cost;
            const total = subtotal + shippingCost;
            
            // Actualizar UI
            document.getElementById('item-count').textContent = 
                `${itemCount} ${itemCount === 1 ? 'artículo' : 'artículos'}`;
            document.getElementById('cart-subtotal').textContent = 
                `Total: ${utils.formatPrice(total)}`;
            
            document.getElementById('summary-subtotal').textContent = utils.formatPrice(subtotal);
            document.getElementById('summary-shipping').textContent = utils.formatPrice(shippingCost);
            document.getElementById('summary-discount').textContent = `-${utils.formatPrice(discount)}`;
            document.getElementById('summary-total').textContent = utils.formatPrice(total);
        },
        
        //INICIO
        decreaseQuantity: function(e) {
    const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
    const itemIndex = state.cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    const product = PRODUCTS.find(p => p.id === itemId);
    
    if (state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity--;
        // Devolver 1 unidad al stock
        if (product) {
            product.stock += 1;
            // Actualizar la vista si el producto estaba agotado
            if (product.stock === 1) {
                productFunctions.displayProducts(state.currentCategory);
            }
        }
    } else {
        // Devolver 1 unidad al stock antes de eliminar
        if (product) {
            product.stock += 1;
            // Actualizar la vista si el producto estaba agotado
            if (product.stock === 1) {
                productFunctions.displayProducts(state.currentCategory);
            }
        }
        state.cart.splice(itemIndex, 1);
    }
    
    this.updateCart();
},//FIN
        ///INICIO
        increaseQuantity: function(e) {
    const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
    const item = state.cart.find(item => item.id === itemId);
    const product = PRODUCTS.find(p => p.id === itemId);
    
    if (item && product) {
        // Verificar stock antes de aumentar cantidad
        if (item.quantity >= product.stock) {
            utils.showNotification('No hay suficiente stock disponible', 'fa-exclamation-circle');
            return;
        }
        item.quantity++;
        product.stock -= 1;
        this.updateCart();
        
        // Si el stock llegó a 0, actualizar la vista
        if (product.stock === 0) {
            productFunctions.displayProducts(state.currentCategory);
        }
    }
},
//FIN
        
        removeItem: function(e) {
            const itemElement = e.target.closest('.cart-item');
            const itemId = parseInt(itemElement.dataset.id);
            const cartItem = state.cart.find(item => item.id === itemId);
            
            if (!cartItem) return;
            
            // Devolver el stock al producto
            const product = PRODUCTS.find(p => p.id === itemId);
            if (product) {
                product.stock += cartItem.quantity;
                // Actualizar la vista si el producto estaba agotado
                if (product.stock === cartItem.quantity) {
                    productFunctions.displayProducts(state.currentCategory);
                }
            }
            
            itemElement.classList.add('removing');
            setTimeout(() => {
                state.cart = state.cart.filter(item => item.id !== itemId);
                this.updateCart();
            }, 300);
        },
        
        showCart: function() {
            this.renderCart();
            DOM.cartModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        },
        
        closeCart: function() {
            DOM.cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        },
        
        proceedToCheckout: function() {
            if (state.cart.length === 0) {
                utils.showNotification('El carrito está vacío', 'fa-exclamation-circle');
                return;
            }
            
            this.closeCart();
            checkoutFunctions.showCheckout();
        }
    };

    // FUNCIONES DE CHECKOUT
    const checkoutFunctions = {
        showCheckout: function() {
            DOM.checkoutItemsList.innerHTML = '';
            
            let subtotal = 0;
            let discount = 0;
            
            state.cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                if (item.originalPrice) {
                    discount += (item.originalPrice - item.price) * item.quantity;
                }
                
                const cartItem = document.createElement('div');
                cartItem.className = 'checkout-item';
                cartItem.innerHTML = `
                    <div class="order-item-image">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                    </div>
                    <div class="order-item-details">
                        <div class="order-item-name">${item.title}</div>
                        <div class="order-item-quantity">Cantidad: ${item.quantity}</div>
                    </div>
                    <div class="order-item-price">${utils.formatPrice(itemTotal)}</div>
                `;
                
                DOM.checkoutItemsList.appendChild(cartItem);
            });
            
            const shippingMethod = DOM.deliveryMethodCheckout.value || 'pickup';
            const shippingCost = APP_CONFIG.shippingMethods[shippingMethod].cost;
            const total = subtotal + shippingCost;
            
            document.getElementById('checkoutSubtotal').textContent = utils.formatPrice(subtotal);
            document.getElementById('checkoutShipping').textContent = utils.formatPrice(shippingCost);
            document.getElementById('checkoutTotal').textContent = utils.formatPrice(total);
            
            // Configurar fecha de entrega
            const deliveryDateInput = document.getElementById('deliveryDate');
            if (deliveryDateInput) {
                const today = new Date();
                const minDate = new Date(today);
                minDate.setDate(today.getDate() + 2);
                deliveryDateInput.min = minDate.toISOString().split('T')[0];
                
                if (shippingMethod === 'express') {
                    const maxDate = new Date(today);
                    maxDate.setDate(today.getDate() + 3);
                    deliveryDateInput.max = maxDate.toISOString().split('T')[0];
                } else {
                    deliveryDateInput.removeAttribute('max');
                }
            }
            
            DOM.checkoutModal.style.display = 'flex';
        },
        
        submitOrder: function(e) {
            e.preventDefault();
            
            // Validación
            const requiredFields = [
                {id: 'name', name: 'Nombre'},
                {id: 'phone', name: 'Teléfono', pattern: /^[0-9]{8,15}$/},
                {id: 'address', name: 'Dirección'}
            ];
            
            let isValid = true;
            let firstInvalidField = null;
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field.id);
                if (!input) return;
                
                const value = input.value.trim();
                const fieldValid = value && (!field.pattern || field.pattern.test(value));
                
                if (!fieldValid) {
                    isValid = false;
                    input.classList.add('error');
                    utils.animateElement(input, 'shake');
                    
                    if (!firstInvalidField) {
                        firstInvalidField = field.name;
                    }
                } else {
                    input.classList.remove('error');
                }
            });
                
            if (!isValid) {
                utils.showNotification(
                    firstInvalidField ? 
                    `Complete correctamente: ${firstInvalidField}` : 
                    'Complete todos los campos requeridos',
                    'fa-exclamation-circle'
                );
                return;
            }
            
            // Obtener datos del formulario
            const formData = {
                name: document.getElementById('name').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                address: document.getElementById('address').value.trim(),
                email: document.getElementById('email').value.trim(),
                deliveryMethod: DOM.deliveryMethodCheckout.value || 'pickup'
            };
            
            // Calcular totales
            const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shippingCost = APP_CONFIG.shippingMethods[formData.deliveryMethod].cost;
            const total = subtotal + shippingCost;
            
            // Generar PDF
            const { blob: pdfBlob, fileName } = utils.generateOrderPDF(formData, state.cart, subtotal, shippingCost, total);

            // Crear mensaje para WhatsApp
            let message = `📝 *No. Pedido:* ${Math.floor(1000 + Math.random() * 9000)}%0A`;
            message += `📅 *Fecha:* ${new Date().toLocaleDateString('es-GT', {day: '2-digit', month: '2-digit', year: 'numeric'})}%0A`;
            message += `👤 *Cliente:* ${formData.name}%0A`;
            message += `➖ *Teléfono:* ${formData.phone}%0A`;
            message += `➖ *Total:* Q${total.toFixed(2)}%0A%0A`;
            message += `⚠ *Por favor:*%0A`;
            message += `1. Descargue el PDF adjunto%0A`;
            message += `2. Envíelo por este chat%0A`;
            message += `3. Realice el pago según los datos bancarios en el PDF%0A%0A`;
            message += `4. Recuerde que para proceder con el envío es previo depósito%0A%0A`;
            message += `📈 *El PDF contiene todos los detalles del pedido y datos bancarios para pago.*`;

            // Crear enlace de descarga del PDF
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = pdfUrl;
            downloadLink.download = fileName;
            document.body.appendChild(downloadLink);

            // Descargar automáticamente el PDF
            downloadLink.click();

            // Abrir WhatsApp
            try {
                const whatsappUrl = `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${message}`;
                const newWindow = window.open(whatsappUrl, '_blank');
                
                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                    throw new Error('No se pudo abrir WhatsApp');
                }
                
                // Limpiar carrito después de enviar
                state.cart = [];
                cartFunctions.updateCart();
                DOM.checkoutModal.style.display = 'none';
                DOM.checkoutForm.reset();
                
                utils.showNotification('Pedido enviado con éxito', 'fa-check-circle');
            } catch (error) {
                console.error('Error al abrir WhatsApp:', error);
                utils.showNotification(
                    'No se pudo abrir WhatsApp. Por favor contáctenos directamente.', 
                    'fa-exclamation-triangle'
                );
            }
        },
        
        closeCheckout: function() {
            DOM.checkoutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // MANEJADORES DE EVENTOS
    const setupEventListeners = () => {
        // Categorías
        DOM.categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                DOM.categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                state.currentCategory = this.dataset.category;
                productFunctions.displayProducts(state.currentCategory);
            });
        });
        
        // Ver todos
        DOM.viewAllButton.addEventListener('click', function() {
            DOM.categoryButtons.forEach(btn => btn.classList.remove('active'));
            DOM.categoryButtons[0].classList.add('active');
            state.currentCategory = 'all';
            productFunctions.displayProducts();
        });
        
        // CTA (Ofertas)
        DOM.ctaButton.addEventListener('click', function() {
            const ofertasButton = document.querySelector('[data-category="ofertas"]');
            if (ofertasButton) {
                DOM.categoryButtons.forEach(btn => btn.classList.remove('active'));
                ofertasButton.classList.add('active');
                state.currentCategory = 'ofertas';
                productFunctions.displayProducts('ofertas');
                
                const categoriesSection = document.querySelector('.modern-categories');
                if (categoriesSection) {
                    window.scrollTo({
                        top: categoriesSection.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
        
        // Buscador
        DOM.searchInput.addEventListener('input', (e) => {
            productFunctions.searchProducts(e.target.value.trim());
        });
        
        DOM.searchButton.addEventListener('click', () => {
            productFunctions.searchProducts(DOM.searchInput.value.trim());
        });
        
        // Carrito
        DOM.cartIcon.addEventListener('click', cartFunctions.showCart.bind(cartFunctions));
        
        // Cerrar modales
        DOM.closeModalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                if (DOM.cartModal.style.display === 'flex') {
                    cartFunctions.closeCart();
                } else if (DOM.checkoutModal.style.display === 'flex') {
                    checkoutFunctions.closeCheckout();
                }
            });
        });
        
        if (DOM.closeCartButton) {
            DOM.closeCartButton.addEventListener('click', cartFunctions.closeCart.bind(cartFunctions));
        }
        
        // Checkout
        DOM.proceedCheckoutBtn.addEventListener('click', cartFunctions.proceedToCheckout.bind(cartFunctions));
        
        // Método de envío en el carrito
        DOM.deliveryMethodCheckout.addEventListener('change', function() {
            cartFunctions.updateCartSummary();
            checkoutFunctions.showCheckout();
        });        
        // Método de envío en el checkout
        DOM.deliveryMethodCheckout.addEventListener('change', checkoutFunctions.showCheckout.bind(checkoutFunctions));
        
        // Enviar pedido por WhatsApp
        DOM.checkoutForm.addEventListener('submit', checkoutFunctions.submitOrder.bind(checkoutFunctions));
        
        // Cerrar modales al hacer clic fuera
        window.addEventListener('click', (e) => {
            if (e.target === DOM.cartModal) {
                cartFunctions.closeCart();
            } else if (e.target === DOM.checkoutModal) {
                checkoutFunctions.closeCheckout();
            }
        });
    };

    // INICIALIZACIÓN
    const init = () => {
        setupEventListeners();
        productFunctions.displayProducts();
        cartFunctions.updateCart();
    };

    init();
});
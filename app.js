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
        regionSelect: document.getElementById('region'),
        zoneSelect: document.getElementById('zone'),
        nameInput: document.getElementById('name'),
        phoneInput: document.getElementById('phone'),
        addressInput: document.getElementById('address'),
        emailInput: document.getElementById('email'),
        confirmOrderBtn: document.querySelector('.btn-confirm-order')
    };

    // ESTADO DE LA APLICACIÓN
    const state = {
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        currentCategory: 'all',
        currentSearchQuery: ''
    };

    // FUNCIONES DE UTILIDAD - Optimizadas
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
            if (!input) return false;
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

        // Función optimizada para generar mensaje de WhatsApp
        generateWhatsAppMessage: (formData, cartItems, total) => {
            const [region, zone] = formData.zone ? formData.zone.split('|') : ['', ''];
            const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
            
            const messageParts = [
                `*📦 NOTA DE PEDIDO - ${APP_CONFIG.storeName.toUpperCase()}*%0A%0A`,
                `*🛒 No. Pedido:* ${orderNumber}%0A`,
                `*📅 Fecha:* ${new Date().toLocaleDateString('es-GT', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})}%0A`,
                `*👤 Cliente:* ${formData.name}%0A`,
                `*📱 Teléfono:* ${formData.phone}%0A`,
                formData.email ? `*✉️ Email:* ${formData.email}%0A` : '',
                `*📍 Dirección:* ${formData.address}%0A`,
                `*🏙️ Región:* ${region}%0A`,
                `*🏘️ Zona/Municipio:* ${zone}%0A`,
                `*🚚 Método de entrega:* ${APP_CONFIG.shippingMethods.standard.name}%0A`,
                `*💰 Total a pagar:* Q${total.toFixed(2)}%0A%0A`,
                `*📋 Resumen del pedido:*%0A`,
                ...cartItems.map(item => `- ${item.title} (x${item.quantity}) - Q${(item.price * item.quantity).toFixed(2)}%0A`),
                `%0A*💳 Datos bancarios:*%0A`,
                `Banco: ${APP_CONFIG.bankName}%0A`,
                `Cuenta: ${APP_CONFIG.accountNumber}%0A`,
                `A nombre de: ${APP_CONFIG.accountHolder}%0A`,
                `Tipo: ${APP_CONFIG.accountType}%0A%0A`,
                `*⚠️ Por favor:*%0A`,
                `1. Realice el pago según los datos bancarios%0A`,
                `2. Envíe el comprobante por este chat%0A`,
                `3. Su pedido será procesado al confirmar pago%0A%0A`,
                `*🙏 Gracias por su compra!*`
            ];
            
            return encodeURIComponent(messageParts.filter(part => part !== '').join(''));
        },

// Función optimizada para generar PDF con manejo mejorado de imágenes
generateOrderPDF: (formData, cartItems, subtotal, shippingCost, total) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Configuración
    const margin = 15;
    const pageWidth = 210;
    const contentWidth = pageWidth - (margin * 2);
    
    // Colores corporativos
    const primaryColor = [57, 181, 74];  // Verde
    const darkColor = [0, 0, 0];
    const lightColor = [240, 240, 240];
    
    // Variables de posición
    let yPosition = 15;
    
    // ===== ENCABEZADO PROFESIONAL =====
    // Logo - Intentamos cargarlo pero con manejo de errores mejorado
    let logoLoaded = false;
    
   try {
    // Ruta local relativa a la imagen
    const localImagePath = './assets/images/logo.png'; // ajusta la ruta según tu estructura
    
    // Crear una imagen para verificar si existe
    const testImg = new Image();
    testImg.onload = function() {
        logoLoaded = true;
        // Una vez que la imagen se carga, agregarla al documento
        doc.addImage(localImagePath, 'PNG', pageWidth / 2 - 15, yPosition, 30, 30);
        yPosition += 35;
    };
    testImg.onerror = function() {
        logoLoaded = false;
        throw new Error("Imagen local no disponible");
    };
    testImg.src = localImagePath;
    
} catch (error) {
    // Si falla la imagen, usar texto
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(APP_CONFIG.storeName.toUpperCase(), pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 7;
}
    
    // Información de la empresa
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("Donde cada compra es una bendición", pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 4;
    
    doc.text("Ciudad de Guatemala", pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 4;
    
    doc.text(`Tel: +502 ${APP_CONFIG.whatsappNumber} • ${APP_CONFIG.storeEmail}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;
    
    // ===== INFORMACIÓN DEL PEDIDO =====
    const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentDate = new Date().toLocaleDateString('es-GT', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric'
    });
    
    // Fondo para información del pedido
    doc.setFillColor(lightColor[0], lightColor[1], lightColor[2]);
    doc.roundedRect(margin, yPosition, contentWidth, 20, 2, 2, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text("NOTA DE ENVÍO", pageWidth / 2, yPosition + 8, { align: 'center' });
    
    doc.setFontSize(9);
    doc.text(`No. Pedido: ${orderNumber}`, margin + 5, yPosition + 15);
    doc.text(`Fecha: ${currentDate}`, pageWidth - margin - 5, yPosition + 15, { align: 'right' });
    
    yPosition += 30;
    
    // ===== DATOS DEL CLIENTE =====
    const [region, zone] = formData.zone ? formData.zone.split('|') : ['', ''];
    
    // Título sección
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("DATOS DEL CLIENTE", margin, yPosition);
    
    yPosition += 5;
    
    // Línea decorativa
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.line(margin, yPosition, margin + 50, yPosition);
    
    yPosition += 8;
    
    // Información del cliente
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(formData.name, margin, yPosition);
    yPosition += 6;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const clientInfo = [
        `📱 Teléfono: +502 ${formData.phone}`,
        formData.email && `📧 Email: ${formData.email}`,
        `📍 Dirección: ${formData.address}`,
        region && `🏙️ Región: ${region}`,
        zone && `🏘️ Zona/Municipio: ${zone}`
    ].filter(Boolean);
    
    clientInfo.forEach(info => {
        doc.text(info, margin, yPosition);
        yPosition += 5;
    });
    
    yPosition += 10;
    
    // ===== TABLA DE PRODUCTOS =====
    // Encabezado de tabla
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.roundedRect(margin, yPosition, contentWidth, 10, 2, 2, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    
    const colWidths = [20, 85, 30, 30, 25];
    const colPositions = [margin];
    
    for (let i = 1; i < colWidths.length; i++) {
        colPositions[i] = colPositions[i-1] + colWidths[i-1];
    }
    
    // Encabezados de tabla
    doc.text("Cant.", colPositions[0] + 5, yPosition + 7);
    doc.text("Producto", colPositions[1] + 5, yPosition + 7);
    doc.text("P. Unit.", colPositions[2] + 5, yPosition + 7);
    doc.text("Desc.", colPositions[3] + 5, yPosition + 7);
    doc.text("Total", colPositions[4] + 5, yPosition + 7);
    
    yPosition += 15;
    
    // Productos
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFontSize(9);
    
    let needsNewPage = false;
    
    cartItems.forEach((item, index) => {
        // Verificar si necesita nueva página
        if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
            needsNewPage = true;
        }
        
        // Fondos alternados para filas
        if (index % 2 === 0 && !needsNewPage) {
            doc.setFillColor(248, 248, 248);
            doc.rect(margin, yPosition - 3, contentWidth, 10, 'F');
        }
        
        // Cantidad
        doc.text(item.quantity.toString(), colPositions[0] + 5, yPosition + 3);
        
        // Nombre del producto (con ajuste para textos largos)
        const productName = item.title.length > 30 ? item.title.substring(0, 27) + "..." : item.title;
        doc.text(productName, colPositions[1] + 5, yPosition + 3);
        
        // Precio unitario
        doc.text(`Q${item.price.toFixed(2)}`, colPositions[2] + 5, yPosition + 3, { align: 'right' });
        
        // Descuento (si aplica)
        const discount = item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0;
        doc.text(discount > 0 ? `-Q${discount.toFixed(2)}` : '-', colPositions[3] + 5, yPosition + 3, { align: 'right' });
        
        // Total del producto
        doc.text(`Q${(item.price * item.quantity).toFixed(2)}`, colPositions[4] + 5, yPosition + 3, { align: 'right' });
        
        yPosition += 6;
    });
    
    // Línea al final de la tabla
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
    
    // ===== TOTALES =====
    const totalsX = pageWidth - margin - 40;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text("Subtotal:", totalsX, yPosition);
    doc.text(`Q${subtotal.toFixed(2)}`, pageWidth - margin, yPosition, { align: 'right' });
    yPosition += 6;
    
    doc.text("Costo de envío:", totalsX, yPosition);
    doc.text(`Q${shippingCost.toFixed(2)}`, pageWidth - margin, yPosition, { align: 'right' });
    yPosition += 6;
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("TOTAL:", totalsX, yPosition);
    doc.text(`Q${total.toFixed(2)}`, pageWidth - margin, yPosition, { align: 'right' });
    yPosition += 15;
    
    // ===== FIRMA =====
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text("FIRMA DE CONFORMIDAD:", margin, yPosition);
    yPosition += 10;
    
    // Línea para firma
    doc.setDrawColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.line(margin, yPosition, margin + 80, yPosition);
    yPosition += 15;
    
    // ===== INFORMACIÓN DE CONTACTO =====
    if (yPosition > 220) {
        doc.addPage();
        yPosition = 20;
    }
    
    doc.setFillColor(lightColor[0], lightColor[1], lightColor[2]);
    doc.roundedRect(margin, yPosition, contentWidth, 45, 2, 2, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("INFORMACIÓN DE CONTACTO", pageWidth / 2, yPosition + 7, { align: 'center' });
    
    yPosition += 12;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    
    const contactInfo = [
        `📞 Teléfono: +502 ${APP_CONFIG.whatsappNumber}`,
        `✉️ Email: ${APP_CONFIG.storeEmail}`,
        `🏠 Dirección: Ciudad de Guatemala`,
        `🌐 Sitio web: ${window.location.hostname}`
    ];
    
    contactInfo.forEach(info => {
        doc.text(info, margin + 5, yPosition);
        yPosition += 5;
    });
    
    yPosition += 10;
    
    // ===== INSTRUCCIONES =====
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("INSTRUCCIONES DE PAGO", margin, yPosition);
    yPosition += 6;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    
    const instructions = [
        `1. Realice el pago a: ${APP_CONFIG.bankName}`,
        `2. Número de cuenta: ${APP_CONFIG.accountNumber} (${APP_CONFIG.accountType})`,
        `3. A nombre de: ${APP_CONFIG.accountHolder}`,
        `4. Envíe el comprobante por WhatsApp al +502 ${APP_CONFIG.whatsappNumber}`,
        `5. Su pedido será procesado al confirmar el pago`
    ];
    
    instructions.forEach(instruction => {
        doc.text(instruction, margin, yPosition);
        yPosition += 5;
    });
    
    // ===== PIE DE PÁGINA =====
    const footerY = 280;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("¡Gracias por su compra! - Este documento es una nota de envío oficial", pageWidth / 2, footerY, { align: 'center' });
    
    // Generar PDF
    const fileName = `Nota_Envio_${orderNumber}_${formData.name.replace(/\s+/g, '_')}.pdf`;
    const pdfBlob = doc.output('blob');
    
    return { blob: pdfBlob, fileName, orderNumber };
}
    };

    // FUNCIONES DE PRODUCTOS
    const productFunctions = {
        displayProducts: (filter = 'all', productsArray = PRODUCTS) => {
            if (!DOM.productsGrid) return;
            
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
                        <button class="add-to-cart" data-id="${product.id}" ${isOutOfStock ? 'disabled' : ''}>
                            <i class="fas fa-cart-plus"></i> ${isOutOfStock ? 'Agotado' : 'Agregar'}
                        </button>
                    </div>
                `;
                
                DOM.productsGrid.appendChild(productCard);
            });
            
            document.querySelectorAll('.add-to-cart:not([disabled])').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.currentTarget.dataset.id);
                    cartFunctions.addToCart(productId);
                });
            });
        },
        
        searchProducts: utils.debounce(function(query) {
            state.currentSearchQuery = query.toLowerCase();
            
            if (!query.trim()) {
                productFunctions.displayProducts(state.currentCategory);
                return;
            }
            
            const filtered = PRODUCTS.filter(product => 
                product.title.toLowerCase().includes(state.currentSearchQuery) || 
                product.description.toLowerCase().includes(state.currentSearchQuery)
            );
            
            productFunctions.displayProducts('all', filtered);
        }, 300)
    };

    // FUNCIONES DEL CARRITO
    const cartFunctions = {
        addToCart: function(productId) {
            const product = PRODUCTS.find(p => p.id === productId);
            
            if (!product) {
                utils.showNotification('Producto no encontrado', 'fa-exclamation-circle');
                return;
            }
            
            if (product.stock <= 0) {
                utils.showNotification('Este producto está agotado', 'fa-exclamation-circle');
                return;
            }
            
            const existingItem = state.cart.find(item => item.id === productId);
            
            if (existingItem) {
                if (existingItem.quantity >= product.stock) {
                    utils.showNotification('No hay suficiente stock disponible', 'fa-exclamation-circle');
                    return;
                }
                existingItem.quantity += 1;
            } else {
                state.cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            product.stock -= 1;
            this.updateCart();
            utils.showNotification(`¡${product.title} añadido al carrito!`, 'fa-cart-plus');
            
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
        },
        
        updateCart: function() {
            const totalItems = state.cart.reduce((total, item) => total + item.quantity, 0);
            
            if (DOM.cartCount) {
                DOM.cartCount.textContent = totalItems;
                DOM.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
                utils.animateElement(DOM.cartCount, 'update-animation');
            }
            
            localStorage.setItem('cart', JSON.stringify(state.cart));
            
            if (DOM.cartModal && DOM.cartModal.style.display === 'flex') {
                this.renderCart();
            }
        },
        
        renderCart: function() {
            if (!DOM.cartItemsList) return;
            
            if (state.cart.length === 0) {
                DOM.cartItemsList.innerHTML = `
                    <div class="empty-cart-message">
                        <i class="fas fa-shopping-bag"></i>
                        <p>Tu carrito está vacío</p>
                        <button class="btn-primary close-cart">Seguir comprando</button>
                    </div>
                `;
                
                if (DOM.proceedCheckoutBtn) {
                    DOM.proceedCheckoutBtn.style.display = 'none';
                }
                
                const closeCartBtn = DOM.cartItemsList.querySelector('.close-cart');
                if (closeCartBtn) {
                    closeCartBtn.addEventListener('click', this.closeCart.bind(this));
                }
            } else {
                DOM.cartItemsList.innerHTML = '';
                
                state.cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.dataset.id = item.id;
                    cartItem.innerHTML = `
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.title}">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.title}</div>
                            <div class="cart-item-actions">
                                <div class="quantity-selector">
                                    <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
                                    <span class="quantity-display">${item.quantity}</span>
                                    <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
                                </div>
                                <button class="remove-item">
                                    <i class="fas fa-trash"></i> Eliminar
                                </button>
                            </div>
                        </div>
                        <div class="cart-item-price">
                            <span class="current-price">${utils.formatPrice(item.price * item.quantity)}</span>
                            ${item.originalPrice ? 
                                `<span class="original-price">${utils.formatPrice(item.originalPrice * item.quantity)}</span>` : ''}
                        </div>
                    `;
                    
                    DOM.cartItemsList.appendChild(cartItem);
                    
                    cartItem.querySelector('.decrease').addEventListener('click', this.decreaseQuantity.bind(this));
                    cartItem.querySelector('.increase').addEventListener('click', this.increaseQuantity.bind(this));
                    cartItem.querySelector('.remove-item').addEventListener('click', this.removeItem.bind(this));
                });
                
                if (DOM.proceedCheckoutBtn) {
                    DOM.proceedCheckoutBtn.style.display = 'flex';
                }
            }
            
            this.updateCartSummary();
        },
        
        updateCartSummary: function() {
            const itemCount = state.cart.reduce((total, item) => total + item.quantity, 0);
            const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            const discount = state.cart.reduce((sum, item) => {
                return item.originalPrice 
                    ? sum + ((item.originalPrice - item.price) * item.quantity)
                    : sum;
            }, 0);
            
            let shippingCost = 0;
            if (DOM.zoneSelect && DOM.zoneSelect.value) {
                const [region, zone] = DOM.zoneSelect.value.split('|');
                shippingCost = APP_CONFIG.shippingZones[region][zone] || 0;
            }
            
            const total = subtotal + shippingCost;
            
            if (document.getElementById('item-count')) {
                document.getElementById('item-count').textContent = `${itemCount} ${itemCount === 1 ? 'artículo' : 'artículos'}`;
            }
            
            if (document.getElementById('cart-subtotal')) {
                document.getElementById('cart-subtotal').textContent = `Total: ${utils.formatPrice(total)}`;
            }
            
            if (document.getElementById('summary-subtotal')) {
                document.getElementById('summary-subtotal').textContent = utils.formatPrice(subtotal);
            }
            
            if (document.getElementById('summary-shipping')) {
                document.getElementById('summary-shipping').textContent = utils.formatPrice(shippingCost);
            }
            
            if (document.getElementById('summary-discount')) {
                document.getElementById('summary-discount').textContent = `-${utils.formatPrice(discount)}`;
            }
            
            if (document.getElementById('summary-total')) {
                document.getElementById('summary-total').textContent = utils.formatPrice(total);
            }
        },
        
        decreaseQuantity: function(e) {
            const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
            const itemIndex = state.cart.findIndex(item => item.id === itemId);
            
            if (itemIndex === -1) return;
            
            if (state.cart[itemIndex].quantity > 1) {
                state.cart[itemIndex].quantity--;
                const product = PRODUCTS.find(p => p.id === itemId);
                if (product) product.stock += 1;
            } else {
                const product = PRODUCTS.find(p => p.id === itemId);
                if (product) product.stock += 1;
                state.cart.splice(itemIndex, 1);
            }
            
            this.updateCart();
        },
        
        increaseQuantity: function(e) {
            const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
            const item = state.cart.find(item => item.id === itemId);
            const product = PRODUCTS.find(p => p.id === itemId);
            
            if (item && product) {
                if (item.quantity >= product.stock) {
                    utils.showNotification('No hay suficiente stock disponible', 'fa-exclamation-circle');
                    return;
                }
                item.quantity++;
                product.stock -= 1;
                this.updateCart();
            }
        },
        
        removeItem: function(e) {
            const button = e.target.closest('.remove-item');
            if (!button) return;
            
            const itemId = parseInt(button.closest('.cart-item').dataset.id);
            const itemElement = button.closest('.cart-item');
            const cartItem = state.cart.find(item => item.id === itemId);
            
            if (!cartItem) return;
            
            const product = PRODUCTS.find(p => p.id === itemId);
            if (product) product.stock += cartItem.quantity;
            
            itemElement.classList.add('removing');
            
            setTimeout(() => {
                state.cart = state.cart.filter(item => item.id !== itemId);
                this.updateCart();
            }, 300);
        },
        
        showCart: function() {
            this.renderCart();
            if (DOM.cartModal) {
                DOM.cartModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        },
        
        closeCart: function() {
            if (DOM.cartModal) {
                DOM.cartModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
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

    // FUNCIONES DE CHECKOUT - Optimizadas
    const checkoutFunctions = {
        showCheckout: function() {
            if (!DOM.checkoutItemsList) return;
            
            DOM.checkoutItemsList.innerHTML = '';
            
            let subtotal = 0;
            
            state.cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
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
            
            const shippingCost = this.calculateShippingCost();
            const total = subtotal + shippingCost;
            
            if (document.getElementById('checkoutSubtotal')) {
                document.getElementById('checkoutSubtotal').textContent = utils.formatPrice(subtotal);
            }
            
            if (document.getElementById('checkoutShipping')) {
                document.getElementById('checkoutShipping').textContent = utils.formatPrice(shippingCost);
            }
            
            if (document.getElementById('checkoutTotal')) {
                document.getElementById('checkoutTotal').textContent = utils.formatPrice(total);
            }
            
            if (DOM.checkoutModal) {
                DOM.checkoutModal.style.display = 'flex';
            }
        },
        
        calculateShippingCost: function() {
            if (!DOM.zoneSelect || !DOM.zoneSelect.value) return 0;
            
            const [region, zone] = DOM.zoneSelect.value.split('|');
            return APP_CONFIG.shippingZones[region][zone] || 0;
        },
        
        submitOrder: async function(e) {
            e.preventDefault();

            // Estado del botón de confirmación
            const originalBtnContent = DOM.confirmOrderBtn?.innerHTML;
            if (DOM.confirmOrderBtn) {
                DOM.confirmOrderBtn.disabled = true;
                DOM.confirmOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
            }

            // Validación optimizada
            const requiredFields = [
                {id: 'name', name: 'Nombre', element: DOM.nameInput, pattern: null},
                {id: 'phone', name: 'Teléfono', element: DOM.phoneInput, pattern: /^[0-9]{8,15}$/},
                {id: 'address', name: 'Dirección', element: DOM.addressInput, pattern: null},
                {id: 'region', name: 'Región', element: DOM.regionSelect, pattern: null},
                {id: 'zone', name: 'Zona/Municipio', element: DOM.zoneSelect, pattern: null}
            ];

            let isValid = true;
            let firstInvalidField = null;

            for (const field of requiredFields) {
                const value = field.element?.value?.trim();
                const fieldValid = value && (!field.pattern || field.pattern.test(value));
                
                if (!fieldValid) {
                    isValid = false;
                    field.element?.classList.add('error');
                    if (!firstInvalidField) firstInvalidField = field.name;
                } else {
                    field.element?.classList.remove('error');
                }
            }

            if (!isValid) {
                if (DOM.confirmOrderBtn) {
                    DOM.confirmOrderBtn.disabled = false;
                    DOM.confirmOrderBtn.innerHTML = originalBtnContent;
                }
                utils.showNotification(
                    firstInvalidField ? 
                    `Complete correctamente: ${firstInvalidField}` : 
                    'Complete todos los campos requeridos',
                    'fa-exclamation-circle'
                );
                return;
            }
            
            // Feedback inmediato al usuario
            utils.showNotification('Preparando tu pedido...', 'fa-check-circle', 2000);

            // Obtener datos del formulario
            const formData = {
                name: DOM.nameInput.value.trim(),
                phone: DOM.phoneInput.value.trim(),
                address: DOM.addressInput.value.trim(),
                email: DOM.emailInput.value.trim(),
                zone: DOM.zoneSelect.value,
                deliveryMethod: 'standard'
            };
            
            // Calcular totales
            const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shippingCost = this.calculateShippingCost();
            const total = subtotal + shippingCost;

            try {
                // Operaciones en paralelo para mayor velocidad
                const [pdfResult, whatsappMessage] = await Promise.all([
                    utils.generateOrderPDF(formData, state.cart, subtotal, shippingCost, total),
                    utils.generateWhatsAppMessage(formData, state.cart, total)
                ]);

                // Descargar PDF en segundo plano
                const pdfUrl = URL.createObjectURL(pdfResult.blob);
                const downloadLink = document.createElement('a');
                downloadLink.href = pdfUrl;
                downloadLink.download = pdfResult.fileName;
                document.body.appendChild(downloadLink);
                setTimeout(() => {
                    downloadLink.click();
                    setTimeout(() => {
                        document.body.removeChild(downloadLink);
                        URL.revokeObjectURL(pdfUrl);
                    }, 1000);
                }, 0);

                // Abrir WhatsApp inmediatamente
                window.open(`https://wa.me/${APP_CONFIG.whatsappNumber}?text=${whatsappMessage}`, '_blank');

                // Limpiar carrito y UI
                state.cart = [];
                cartFunctions.updateCart();
                if (DOM.checkoutModal) DOM.checkoutModal.style.display = 'none';
                if (DOM.checkoutForm) DOM.checkoutForm.reset();

                // Confirmación final
                utils.showNotification(`Pedido #${pdfResult.orderNumber} enviado con éxito`, 'fa-check-circle');

            } catch (error) {
                console.error("Error al procesar pedido:", error);
                utils.showNotification('Error al procesar el pedido', 'fa-exclamation-circle');
            } finally {
                // Restaurar el botón
                if (DOM.confirmOrderBtn) {
                    DOM.confirmOrderBtn.disabled = false;
                    DOM.confirmOrderBtn.innerHTML = originalBtnContent;
                }
            }
        },
        
        closeCheckout: function() {
            if (DOM.checkoutModal) {
                DOM.checkoutModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    };

    // MANEJADORES DE EVENTOS
    const setupEventListeners = () => {
        // Categorías
        if (DOM.categoryButtons) {
            DOM.categoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    DOM.categoryButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    state.currentCategory = this.dataset.category;
                    productFunctions.displayProducts(state.currentCategory);
                });
            });
        }
        
        // Ver todos
        if (DOM.viewAllButton) {
            DOM.viewAllButton.addEventListener('click', function() {
                if (DOM.categoryButtons) {
                    DOM.categoryButtons.forEach(btn => btn.classList.remove('active'));
                }
                state.currentCategory = 'all';
                productFunctions.displayProducts();
            });
        }
        
        // CTA (Ofertas)
        if (DOM.ctaButton) {
            DOM.ctaButton.addEventListener('click', function() {
                const ofertasButton = document.querySelector('[data-category="ofertas"]');
                if (ofertasButton) {
                    if (DOM.categoryButtons) {
                        DOM.categoryButtons.forEach(btn => btn.classList.remove('active'));
                    }
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
        }
        
        // Buscador
        if (DOM.searchInput) {
            DOM.searchInput.addEventListener('input', (e) => {
                productFunctions.searchProducts(e.target.value.trim());
            });
        }
        
        if (DOM.searchButton) {
            DOM.searchButton.addEventListener('click', () => {
                if (DOM.searchInput) {
                    productFunctions.searchProducts(DOM.searchInput.value.trim());
                }
            });
        }
        
        // Carrito
        if (DOM.cartIcon) {
            DOM.cartIcon.addEventListener('click', cartFunctions.showCart.bind(cartFunctions));
        }
        
        // Cerrar modales
        if (DOM.closeModalButtons) {
            DOM.closeModalButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (DOM.cartModal && DOM.cartModal.style.display === 'flex') {
                        cartFunctions.closeCart();
                    } else if (DOM.checkoutModal && DOM.checkoutModal.style.display === 'flex') {
                        checkoutFunctions.closeCheckout();
                    }
                });
            });
        }
        
        if (DOM.closeCartButton) {
            DOM.closeCartButton.addEventListener('click', cartFunctions.closeCart.bind(cartFunctions));
        }
        
        // Checkout
        if (DOM.proceedCheckoutBtn) {
            DOM.proceedCheckoutBtn.addEventListener('click', cartFunctions.proceedToCheckout.bind(cartFunctions));
        }
        
        // Enviar pedido
        if (DOM.checkoutForm) {
            DOM.checkoutForm.addEventListener('submit', checkoutFunctions.submitOrder.bind(checkoutFunctions));
        }
        
        // Cerrar modales al hacer clic fuera
        window.addEventListener('click', (e) => {
            if (DOM.cartModal && e.target === DOM.cartModal) {
                cartFunctions.closeCart();
            } else if (DOM.checkoutModal && e.target === DOM.checkoutModal) {
                checkoutFunctions.closeCheckout();
            }
        });
        
        // Selector de región y zona
        if (DOM.regionSelect) {
            DOM.regionSelect.addEventListener('change', function() {
                if (!DOM.zoneSelect) return;
                
                DOM.zoneSelect.innerHTML = '<option value="">Seleccione...</option>';
                DOM.zoneSelect.disabled = !this.value;
                
                if (this.value) {
                    const zones = APP_CONFIG.shippingZones[this.value];
                    for (const zone in zones) {
                        const option = document.createElement('option');
                        option.value = `${this.value}|${zone}`;
                        option.textContent = `${zone} - Q${zones[zone]}`;
                        DOM.zoneSelect.appendChild(option);
                    }
                    
                    if (state.cart.length > 0) {
                        cartFunctions.updateCartSummary();
                    }
                }
            });
        }

        if (DOM.zoneSelect) {
            DOM.zoneSelect.addEventListener('change', function() {
                if (state.cart.length > 0) {
                    cartFunctions.updateCartSummary();
                    checkoutFunctions.showCheckout();
                }
            });
        }
    };

    // INICIALIZACIÓN
    const init = () => {
        setupEventListeners();
        productFunctions.displayProducts();
        cartFunctions.updateCart();
    };

    init();
});
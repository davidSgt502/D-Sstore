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

// Función optimizada para generar mensaje de WhatsApp - VERSIÓN MEJORADA
generateWhatsAppMessage: (formData, cartItems, total, orderNumber) => {
    const [region, zone] = formData.zone ? formData.zone.split('|') : ['', ''];
    
    // Calcular subtotal y costo de envío
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = total - subtotal;
    
    // Construir el mensaje con saltos de línea adecuados
    let message = `*🛒 NUEVO PEDIDO - ${APP_CONFIG.storeName.toUpperCase()}*\n\n`;
    
    message += `*📋 Información del Pedido*\n`;
    message += `• *Número de orden:* ${orderNumber}\n`;
    message += `• *Fecha y hora:* ${new Date().toLocaleDateString('es-GT', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})}\n\n`;
    
    message += `*👤 Datos del Cliente*\n`;
    message += `• *Nombre:* ${formData.name}\n`;
    message += `• *Teléfono:* ${formData.phone}\n`;
    if (formData.email) message += `• *Email:* ${formData.email}\n`;
    message += `• *Dirección:* ${formData.address}\n`;
    message += `• *Región:* ${region}\n`;
    message += `• *Zona/Municipio:* ${zone}\n\n`;
    
    message += `*📦 Productos solicitados*\n`;
    cartItems.forEach(item => {
        message += `➤ *${item.title}*\n   Cantidad: ${item.quantity}\n   Precio unitario: Q${item.price.toFixed(2)}\n   Subtotal: Q${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `*💰 Resumen de Pago*\n`;
    message += `• Subtotal: Q${subtotal.toFixed(2)}\n`;
    message += `• Costo de envío: Q${shippingCost.toFixed(2)}\n`;
    message += `• *TOTAL A PAGAR: Q${total.toFixed(2)}*\n\n`;
    
    message += `*💳 Instrucciones de Pago*\n`;
    message += `1. *Realice el pago por el monto exacto de Q${total.toFixed(2)}*\n`;
    message += `2. *Banco:* ${APP_CONFIG.bankName}\n`;
    message += `3. *Cuenta:* ${APP_CONFIG.accountNumber}\n`;
    message += `4. *Tipo:* ${APP_CONFIG.accountType}\n`;
    message += `5. *Titular:* ${APP_CONFIG.accountHolder}\n\n`;
    
    message += `*📋 Proceso de confirmación*\n`;
    message += `1. Transfiera/deposite el monto exacto\n`;
    message += `2. *Envíe el comprobante* por este chat\n`;
    message += `3. *Adjunte el PDF* con los detalles de su pedido\n`;
    message += `4. Su pedido se procesará al confirmar el pago\n\n`;
    
    message += `*🚚 Información de envío*\n`;
    message += `• *Método:* ${APP_CONFIG.shippingMethods.standard.name}\n`;
    message += `• *Tiempo de entrega:* 24-48 horas después de confirmado el pago\n\n`;
    
    message += `¡Gracias por confiar en nosotros! 🌟\n*${APP_CONFIG.storeName}*`;
    
    // Codificar para URL (los \n se convierten en %0A automáticamente)
    return encodeURIComponent(message);
},

        // Función optimizada para generar PDF con manejo mejorado de imágenes
        generateOrderPDF: (formData, cartItems, subtotal, shippingCost, total, orderNumber) => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Configuración
            const margin = 15;
            const pageWidth = 210;
            const contentWidth = pageWidth - (margin * 2);
            
            // Colores corporativos (puedes ajustarlos según tu marca)
            const primaryColor = [57, 181, 74];  // Verde
            const secondaryColor = [41, 128, 185]; // Azul
            const accentColor = [231, 76, 60]; // Rojo
            const darkColor = [44, 62, 80]; // Gris oscuro
            const lightColor = [245, 245, 245]; // Gris claro
            
            // Variables de posición
            let yPosition = 15;
            
            // ===== ENCABEZADO PROFESIONAL =====
            // Logo (usando texto como alternativa si no hay imagen)
            try {
                // Intenta cargar el logo
                const logoImg = new Image();
                logoImg.src = 'img/ds.png';
                doc.addImage(logoImg, 'PNG', margin, yPosition, 30, 30);
            } catch (e) {
                // Si falla, usar texto
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(16);
                doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
                doc.text(APP_CONFIG.storeName.toUpperCase(), margin, yPosition + 10);
            }
            
            // Información de la empresa
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text("Donde cada compra es una bendición", margin, yPosition + 17);
            doc.text("Ciudad de Guatemala", margin, yPosition + 22);
            doc.text(`Tel: +502 ${APP_CONFIG.whatsappNumber} • ${APP_CONFIG.storeEmail}`, margin, yPosition + 27);
            
            // Número de pedido y fecha (alineado a la derecha)
            const currentDate = new Date().toLocaleDateString('es-GT', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            doc.text(`Pedido: ${orderNumber}`, pageWidth - margin, yPosition + 10, { align: 'right' });
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(currentDate, pageWidth - margin, yPosition + 15, { align: 'right' });
            
            yPosition = 45;
            
            // Línea separadora
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, yPosition, pageWidth - margin, yPosition);
            yPosition += 10;
            
            // ===== INFORMACIÓN DEL CLIENTE =====
            const [region, zone] = formData.zone ? formData.zone.split('|') : ['', ''];
            
            // Título sección
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            doc.text("INFORMACIÓN DEL CLIENTE", margin, yPosition);
            
            yPosition += 8;
            
            // Información del cliente en dos columnas
            const clientInfoLeft = [
                `Nombre: ${formData.name}`,
                `Teléfono: +502 ${formData.phone}`,
                formData.email ? `Email: ${formData.email}` : null
            ].filter(Boolean);
            
            const clientInfoRight = [
                `Dirección: ${formData.address}`,
                region ? `Región: ${region}` : null,
                zone ? `Zona: ${zone}` : null
            ].filter(Boolean);
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(80, 80, 80);
            
            // Columna izquierda
            clientInfoLeft.forEach((info, i) => {
                doc.text(info, margin, yPosition + (i * 6));
            });
            
            // Columna derecha
            clientInfoRight.forEach((info, i) => {
                doc.text(info, pageWidth / 2, yPosition + (i * 6));
            });
            
            yPosition += Math.max(clientInfoLeft.length, clientInfoRight.length) * 6 + 15;
            
            // ===== DETALLES DEL PEDIDO =====
            // Encabezado de la tabla
            doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.rect(margin, yPosition, contentWidth, 10, 'F');
            
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(255, 255, 255);
            
            const colWidths = [15, 95, 25, 25, 30];
            const colPositions = [margin];
            
            for (let i = 1; i < colWidths.length; i++) {
                colPositions[i] = colPositions[i-1] + colWidths[i-1];
            }
            
            // Encabezados de tabla
            doc.text("Cant.", colPositions[0] + 3, yPosition + 7);
            doc.text("Producto", colPositions[1] + 5, yPosition + 7);
            doc.text("P. Unit.", colPositions[2] + 5, yPosition + 7);
            doc.text("Desc.", colPositions[3] + 5, yPosition + 7);
            doc.text("Total", colPositions[4] + 5, yPosition + 7);
            
            yPosition += 15;
            
            // Productos
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            
            cartItems.forEach((item, index) => {
                // Verificar si necesita nueva página
                if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 20;
                    
                    // Volver a dibujar encabezados en nueva página
                    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
                    doc.rect(margin, yPosition, contentWidth, 10, 'F');
                    
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(10);
                    doc.setTextColor(255, 255, 255);
                    doc.text("Cant.", colPositions[0] + 3, yPosition + 7);
                    doc.text("Producto", colPositions[1] + 5, yPosition + 7);
                    doc.text("P. Unit.", colPositions[2] + 5, yPosition + 7);
                    doc.text("Desc.", colPositions[3] + 5, yPosition + 7);
                    doc.text("Total", colPositions[4] + 5, yPosition + 7);
                    
                    yPosition += 15;
                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(9);
                    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
                }
                
                // Fondo alternado para filas
                if (index % 2 === 0) {
                    doc.setFillColor(lightColor[0], lightColor[1], lightColor[2]);
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
            doc.setDrawColor(200, 200, 200);
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
            
            // ===== MÉTODO DE PAGO =====
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            doc.text("MÉTODO DE PAGO", margin, yPosition);
            yPosition += 7;
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(80, 80, 80);
            
            const paymentInfo = [
                `Banco: ${APP_CONFIG.bankName}`,
                `Cuenta: ${APP_CONFIG.accountNumber}`,
                `Tipo: ${APP_CONFIG.accountType}`,
                `A nombre de: ${APP_CONFIG.accountHolder}`
            ];
            
            paymentInfo.forEach(info => {
                doc.text(info, margin, yPosition);
                yPosition += 5;
            });
            
            yPosition += 10;
            
            // ===== INSTRUCCIONES =====
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            doc.text("INSTRUCCIONES", margin, yPosition);
            yPosition += 7;
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            
            const instructions = [
                "1. Realice el pago según los datos bancarios indicados",
                "2. Envíe el comprobante por WhatsApp al número indicado",
                "3. Su pedido será procesado al confirmar el pago",
                "4. Recibirá una confirmación de entrega una vez enviado",
                "5. Envíe el PDF con los detalles de su pedido"
            ];
            
            instructions.forEach(instruction => {
                doc.text(instruction, margin, yPosition);
                yPosition += 5;
            });
            
            yPosition += 15;
            
            // ===== FIRMA Y SELLO =====
            if (yPosition > 200) {
                doc.addPage();
                yPosition = 20;
            }
            
            doc.setDrawColor(200, 200, 200);
            doc.line(margin, yPosition, margin + 80, yPosition);
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(9);
            doc.setTextColor(150, 150, 150);
            doc.text("Firma de conformidad", margin, yPosition + 5);
            
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text("Documento generado automáticamente - " + new Date().toLocaleDateString(), pageWidth / 2, 285, { align: 'center' });
            
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
                // Generar número de orden único
                const orderNumber = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
                
                // Operaciones en paralelo para mayor velocidad
                const [pdfResult, whatsappMessage] = await Promise.all([
                    utils.generateOrderPDF(formData, state.cart, subtotal, shippingCost, total, orderNumber),
                    utils.generateWhatsAppMessage(formData, state.cart, total, orderNumber)
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
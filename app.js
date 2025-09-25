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
    
    // Obtener información bancaria
    const bankInfo = APP_CONFIG.shippingBancks;
    const firstBank = Object.keys(bankInfo)[0];
    const bankDetails = bankInfo[firstBank];
    
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
        message += `➤ *${item.title}*\n`;
        message += `   Cantidad: ${item.quantity}\n`;
        if (item.selectedColor) message += `   Color: ${item.selectedColor}\n`;
        if (item.selectedSize) message += `   Talla: ${item.selectedSize}\n`;
        message += `   Precio unitario: Q${item.price.toFixed(2)}\n`;
        message += `   Subtotal: Q${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `*💰 Resumen de Pago*\n`;
    message += `• Subtotal: Q${subtotal.toFixed(2)}\n`;
    message += `• Costo de envío: Q${shippingCost.toFixed(2)}\n`;
    message += `• *TOTAL A PAGAR: Q${total.toFixed(2)}*\n\n`;
    
    message += `*💳 Información Bancaria*\n`;
message += `📄 Revisar los datos completos en el PDF adjunto.\n\n`;
    
    message += `*📋 Proceso de confirmación*\n`;
    message += `1. Transfiera/deposite el monto exacto\n`;
    message += `2. *Envíe el comprobante* por este chat\n`;
    message += `3. *Adjunte el PDF* con los detalles de su pedido\n`;
    message += `4. Su pedido se procesará al confirmar el pago\n\n`;
    
    message += `*🚚 Información de envío*\n`;
    message += `• *Método:* ${APP_CONFIG.shippingMethods.standard.name}\n`;
    message += `• *Tiempo de entrega:* 24-48 horas después de confirmado el pago\n\n`;
    
    message += `¡Gracias por confiar en nosotros! 🌟\n*${APP_CONFIG.storeName}*`;
    
    // Codificar para URL
    return encodeURIComponent(message);
},

        
// En app.js, reemplazar la función generateOrderPDF completa con este código:

generateOrderPDF: (formData, cartItems, subtotal, shippingCost, total, orderNumber) => {
    const { jsPDF } = window.jspdf;

    // Crear documento en formato carta (Letter)
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter"
    });

    // Configuración
    const margin = 15;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - (margin * 2);

    // Colores corporativos
    const primaryColor = [66, 153, 225]; // Azul
    const darkColor = [45, 55, 72];      // Gris oscuro
    const lightColor = [247, 250, 252];  // Gris claro

    let yPosition = 15;
    let currentPage = 1;

    // Función para agregar nueva página
    const addNewPage = () => {
        doc.addPage();
        currentPage++;
        yPosition = 15;
        
        // Agregar número de página en el pie
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Página ${currentPage}`, pageWidth / 2, pageHeight - 5, { align: 'center' });
    };

    // Función para verificar espacio y agregar nueva página si es necesario
    const checkPageBreak = (requiredSpace = 10) => {
        if (yPosition + requiredSpace > pageHeight - 20) {
            addNewPage();
            return true;
        }
        return false;
    };

    // ===== ENCABEZADO (en cada página) =====
    const drawHeader = () => {
        try {
            const logoImg = new Image();
            logoImg.src = 'img/DyS.png';
            doc.addImage(logoImg, 'PNG', margin, yPosition, 25, 25);
        } catch (e) {
            console.log("No se pudo cargar el logo:", e);
        }

        // Información de la tienda
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(...primaryColor);
        doc.text(APP_CONFIG.storeName.toUpperCase(), margin + 30, yPosition + 10);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text("Donde cada compra es una bendición", margin + 30, yPosition + 15);
        doc.text("Ciudad de Guatemala", margin + 30, yPosition + 20);
        doc.text(`Tel: +502 ${APP_CONFIG.whatsappNumber} • ${APP_CONFIG.storeEmail}`, margin + 30, yPosition + 25);

        // Información del pedido (derecha)
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
        doc.setTextColor(...darkColor);
        doc.text(`Pedido: ${orderNumber}`, pageWidth - margin, yPosition + 10, { align: 'right' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text(currentDate, pageWidth - margin, yPosition + 15, { align: 'right' });

        yPosition = 45;
    };

    // Dibujar encabezado en la primera página
    drawHeader();

    // ===== INFORMACIÓN DEL CLIENTE =====
    checkPageBreak(25); // Verificar espacio para esta sección
    
    const [region, zone] = formData.zone ? formData.zone.split('|') : ['', ''];
    
    // Título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...darkColor);
    doc.text("INFORMACIÓN DEL CLIENTE", margin, yPosition);
    
    // Línea decorativa
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition + 2, margin + 50, yPosition + 2);
    
    yPosition += 10;

    // Datos del cliente
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    const clientData = [
        `Nombre: ${formData.name}`,
        `Teléfono: ${formData.phone}`,
        formData.email ? `Email: ${formData.email}` : null,
        `Dirección: ${formData.address}`,
        region ? `Región: ${region}` : null,
        zone ? `Zona/Municipio: ${zone}` : null
    ].filter(Boolean);

    clientData.forEach((line, index) => {
        // Verificar si necesitamos nueva página antes de agregar cada línea
        if (checkPageBreak(5)) {
            // Dibujar encabezado en la nueva página
            drawHeader();
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
        }
        doc.text(line, margin, yPosition);
        yPosition += 5;
    });
    
    yPosition += 10;

    // ===== DETALLES DEL PEDIDO =====
    checkPageBreak(20); // Verificar espacio para esta sección
    
    // Encabezado de la tabla
    doc.setFillColor(...primaryColor);
    doc.rect(margin, yPosition, contentWidth, 8, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    
    // Columnas
    const colWidths = [15, 70, 40, 25, 30];
    const colPositions = [margin];
    for (let i = 1; i < colWidths.length; i++) {
        colPositions[i] = colPositions[i - 1] + colWidths[i - 1];
    }
    
    doc.text("Cant.", colPositions[0] + (colWidths[0] / 2), yPosition + 5, { align: 'center' });
    doc.text("Producto", colPositions[1] + 2, yPosition + 5);
    doc.text("Variantes", colPositions[2] + 2, yPosition + 5);
    doc.text("P. Unit.", colPositions[3] + (colWidths[3] / 2), yPosition + 5, { align: 'center' });
    doc.text("Total", colPositions[4] + (colWidths[4] / 2), yPosition + 5, { align: 'center' });
    
    yPosition += 10;

    // Productos
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...darkColor);
    
    cartItems.forEach((item, index) => {
        // Verificar si necesitamos nueva página antes de agregar cada producto
        if (checkPageBreak(10)) {
            // Dibujar encabezado en la nueva página
            drawHeader();
            
            // Volver a dibujar el encabezado de la tabla en la nueva página
            doc.setFillColor(...primaryColor);
            doc.rect(margin, yPosition, contentWidth, 8, 'F');
            
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            doc.setTextColor(255, 255, 255);
            
            doc.text("Cant.", colPositions[0] + (colWidths[0] / 2), yPosition + 5, { align: 'center' });
            doc.text("Producto", colPositions[1] + 2, yPosition + 5);
            doc.text("Variantes", colPositions[2] + 2, yPosition + 5);
            doc.text("P. Unit.", colPositions[3] + (colWidths[3] / 2), yPosition + 5, { align: 'center' });
            doc.text("Total", colPositions[4] + (colWidths[4] / 2), yPosition + 5, { align: 'center' });
            
            yPosition += 10;
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(...darkColor);
        }
        
        // Fondo alternado para mejor legibilidad
        if (index % 2 === 0) {
            doc.setFillColor(...lightColor);
            doc.rect(margin, yPosition - 2, contentWidth, 10, 'F');
        }
        
        // Cantidad
        doc.text(item.quantity.toString(), colPositions[0] + (colWidths[0] / 2), yPosition + 3, { align: 'center' });
        
        // Nombre del producto (puede ocupar múltiples líneas)
        const productName = doc.splitTextToSize(item.title, colWidths[1] - 4);
        const lineHeight = 5; // Altura aproximada de cada línea
        const lines = productName.length;
        
        // Si el nombre del producto tiene múltiples líneas, ajustar la posición Y
        if (lines > 1) {
            // Verificar si hay espacio suficiente para todas las líneas
            if (checkPageBreak(lines * lineHeight)) {
                // Si no hay espacio, crear nueva página y volver a dibujar este producto
                drawHeader();
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(...darkColor);
                
                // Volver a dibujar el encabezado de la tabla
                doc.setFillColor(...primaryColor);
                doc.rect(margin, yPosition, contentWidth, 8, 'F');
                
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10);
                doc.setTextColor(255, 255, 255);
                
                doc.text("Cant.", colPositions[0] + (colWidths[0] / 2), yPosition + 5, { align: 'center' });
                doc.text("Producto", colPositions[1] + 2, yPosition + 5);
                doc.text("Variantes", colPositions[2] + 2, yPosition + 5);
                doc.text("P. Unit.", colPositions[3] + (colWidths[3] / 2), yPosition + 5, { align: 'center' });
                doc.text("Total", colPositions[4] + (colWidths[4] / 2), yPosition + 5, { align: 'center' });
                
                yPosition += 10;
                
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(...darkColor);
                
                // Fondo alternado
                if (index % 2 === 0) {
                    doc.setFillColor(...lightColor);
                    doc.rect(margin, yPosition - 2, contentWidth, 10, 'F');
                }
                
                // Volver a agregar la cantidad
                doc.text(item.quantity.toString(), colPositions[0] + (colWidths[0] / 2), yPosition + 3, { align: 'center' });
            }
            
            // Agregar el nombre del producto con múltiples líneas
            doc.text(productName, colPositions[1] + 2, yPosition + 3);
            yPosition += (lines - 1) * lineHeight;
        } else {
            doc.text(productName, colPositions[1] + 2, yPosition + 3);
        }
        
        // Variantes (color/talla)
        let variantsText = "";
        if (item.selectedColor) variantsText += `Color: ${item.selectedColor}`;
        if (item.selectedSize) {
            variantsText += (variantsText ? ", " : "") + `Talla: ${item.selectedSize}`;
        }
        variantsText = variantsText || "-";
        
        // Verificar si el texto de variantes es demasiado largo
        const variantsLines = doc.splitTextToSize(variantsText, colWidths[2] - 4);
        if (variantsLines.length > 1) {
            if (checkPageBreak(variantsLines.length * lineHeight)) {
                // Manejar salto de página para variantes (similar al código anterior)
                // Este es un caso complejo que podría requerir lógica adicional
            }
            doc.text(variantsLines, colPositions[2] + 2, yPosition + 3);
            yPosition += (variantsLines.length - 1) * lineHeight;
        } else {
            doc.text(variantsText, colPositions[2] + 2, yPosition + 3);
        }
        
        // Precio unitario
        doc.text(`Q${item.price.toFixed(2)}`, colPositions[3] + (colWidths[3] / 2), yPosition + 3, { align: 'center' });
        
        // Total del item
        doc.text(`Q${(item.price * item.quantity).toFixed(2)}`, colPositions[4] + (colWidths[4] / 2), yPosition + 3, { align: 'center' });
        
        yPosition += 10;
    });
    
    yPosition += 5;
    
    // ===== TOTALES =====
    checkPageBreak(20); // Verificar espacio para esta sección
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    
    // Subtotal
    doc.text("Subtotal:", pageWidth - margin - 40, yPosition);
    doc.text(`Q${subtotal.toFixed(2)}`, pageWidth - margin, yPosition, { align: 'right' });
    yPosition += 6;
    
    // Envío
    doc.text("Envío:", pageWidth - margin - 40, yPosition);
    doc.text(`Q${shippingCost.toFixed(2)}`, pageWidth - margin, yPosition, { align: 'right' });
    yPosition += 8;
    
    // Total
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text("TOTAL:", pageWidth - margin - 40, yPosition);
    doc.text(`Q${total.toFixed(2)}`, pageWidth - margin, yPosition, { align: 'right' });
    yPosition += 15;
    
    // ===== MÉTODO DE PAGO =====
    checkPageBreak(30); // Verificar espacio para esta sección
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...darkColor);
    doc.text("MÉTODO DE PAGO", margin, yPosition);
    
    // Línea decorativa
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition + 2, margin + 45, yPosition + 2);
    
    yPosition += 10;
    
    // Mostrar información de todos los bancos
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    APP_CONFIG.shippingBancks.forEach((bank, index) => {
        // Verificar si necesitamos nueva página antes de agregar cada banco
        if (checkPageBreak(20)) {
            drawHeader();
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
        }
        
        // Título del banco
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...primaryColor);
        doc.text(`${bank.name}:`, margin, yPosition);
        
        // Detalles de la cuenta
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...darkColor);
        doc.text(`Cuenta: ${bank.accountNumber}`, margin + 5, yPosition + 5);
        doc.text(`Tipo: ${bank.accountType}`, margin + 5, yPosition + 10);
        doc.text(`Titular: ${bank.accountHolder}`, margin + 5, yPosition + 15);
        
        yPosition += 20;
    });
    
    yPosition += 10;
    
    // ===== INSTRUCCIONES =====
    checkPageBreak(40); // Verificar espacio para esta sección
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...darkColor);
    doc.text("INSTRUCCIONES", margin, yPosition);
    
    // Línea decorativa
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition + 2, margin + 35, yPosition + 2);
    
    yPosition += 10;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...darkColor);
    
    const instructions = [
        "1. Realice el pago según los datos bancarios mostrados",
        "2. Envíe el comprobante por WhatsApp al número indicado",
        "3. Su pedido será procesado al confirmar el pago",
        "4. Recibirá confirmación de entrega por correo o WhatsApp",
        "5. Conserve este documento como comprobante de su pedido"
    ];
    
    instructions.forEach((instruction, index) => {
        // Verificar si necesitamos nueva página antes de agregar cada instrucción
        if (checkPageBreak(5)) {
            drawHeader();
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(...darkColor);
        }
        doc.text(instruction, margin, yPosition);
        yPosition += 5;
    });
    
    yPosition += 10;
    
    // ===== FIRMA =====
    checkPageBreak(15); // Verificar espacio para esta sección
    
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, margin + 70, yPosition);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Firma de conformidad", margin, yPosition + 4);
    
    // ===== PIE DE PÁGINA (solo en la última página) =====
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Documento generado automáticamente - ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text(APP_CONFIG.storeName, pageWidth / 2, pageHeight - 5, { align: 'center' });

    // Agregar número de página a todas las páginas excepto la primera
    for (let i = 2; i <= currentPage; i++) {
        doc.setPage(i);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(`Página ${i}`, pageWidth / 2, pageHeight - 5, { align: 'center' });
    }

    // Volver a la primera página para exportar
    doc.setPage(1);

    // Exportar PDF
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
                
                // En productFunctions.displayProducts, dentro del forEach:
const productCard = document.createElement('div');
productCard.className = 'product-card';
// Acortar título si es muy largo
const shortTitle = product.title.length > 40 ? 
    product.title.substring(0, 37) + "..." : product.title;

// Acortar descripción si es muy larga
const shortDescription = product.description.length > 100 ?
    product.description.substring(0, 97) + "..." : product.description;
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
        
        <!-- Selector de colores -->
        ${product.variants && product.variants.colors && product.variants.colors.length > 1 ? `
        <div class="color-selector">
            <span class="selector-label">Color:</span>
            <div class="color-options">
                ${product.variants.colors.map(color => `
                    <button class="color-option" data-color="${color}" 
                            style="background-color: ${getColorCode(color)}" 
                            title="${color}"></button>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <!-- Selector de tallas -->
        ${product.variants && product.variants.sizes && product.variants.sizes.length > 1 ? `
        <div class="size-selector">
            <span class="selector-label">Talla:</span>
            <div class="size-options">
                ${product.variants.sizes.map(size => `
                    <button class="size-option" data-size="${size}">${size}</button>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
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


// Función auxiliar para obtener código de color
function getColorCode(colorName) {
  const colorMap = {
    // Colores básicos
    'Negro': '#000000',
    'Gris': '#808080',
    'Gris oscuro': '#A9A9A9',
    'Gris claro': '#D3D3D3',
    'Gris muy claro': '#DCDCDC',
    'Blanco': '#FFFFFF',
    'Rojo': '#FF0000',
    'Rojo oscuro': '#8B0000',
    'Rojo fuego': '#B22222',
    'Rosa': '#FFC0CB',
    'Rosa fuerte': '#FF1493',
    'Rosa pálido': '#FFE4E1',
    'Rosa claro': '#FFB6C1',
    'Fucsia': '#FF00FF',
    'Magenta': '#FF00FF',
    'Naranja': '#FFA500',
    'Naranja oscuro': '#FF8C00',
    'Coral': '#FF7F50',
    'Tomate': '#FF6347',
    'Salmón': '#FA8072',
    'Salmón claro': '#FFA07A',
    'Salmón oscuro': '#E9967A',
    'Dorado': '#FFD700',
    'Amarillo': '#FFFF00',
    'Caqui': '#F0E68C',
    'Mostaza': '#FFDB58',
    'Trigo': '#F5DEB3',
    'Mocasin': '#FFE4B5',
    'Melón': '#FFEFD5',
    'Durazno': '#FFDAB9',
    'Miel': '#FFF8DC',
    'Lino': '#FAF0E6',
    'Marfil': '#FFFFF0',
    'Beige': '#F5F5DC',
    'Champaña': '#FFFACD',
    'Limón': '#FFF44F',

    // Marrones y tierras
    'Marrón': '#A52A2A',
    'Marrón claro': '#CD853F',
    'Marrón rojizo': '#8B4513',
    'Chocolate': '#D2691E',
    'Canela': '#A0522D',
    'Arena': '#F4A460',
    'Siena': '#A0522D',
    'Siena tostado': '#D2B48C',
    'Perú': '#CD853F',
    'Café': '#6F4E37',

    // Verdes
    'Verde': '#008000',
    'Verde oscuro': '#006400',
    'Verde bosque': '#228B22',
    'Verde oliva': '#808000',
    'Verde amarillento': '#9ACD32',
    'Verde césped': '#7CFC00',
    'Verde lima': '#32CD32',
    'Verde claro': '#90EE90',
    'Verde pálido': '#98FB98',
    'Verde menta': '#98FF98',
    'Verde mar': '#3CB371',
    'Verde mar oscuro': '#8FBC8F',
    'Verde mar claro': '#20B2AA',
    'Aguamarina': '#7FFFD4',
    'Turquesa': '#40E0D0',
    'Turquesa oscuro': '#00CED1',
    'Turquesa medio': '#48D1CC',

    // Azules
    'Azul': '#0000FF',
    'Azul oscuro': '#00008B',
    'Azul medio': '#0000CD',
    'Azul claro': '#ADD8E6',
    'Azul cielo': '#87CEEB',
    'Azul cielo claro': '#87CEFA',
    'Azul acero': '#4682B4',
    'Azul acero claro': '#B0C4DE',
    'Azul cobalto': '#0047AB',
    'Azul real': '#4169E1',
    'Azul dodger': '#1E90FF',
    'Azul profundo': '#191970',
    'Azul cadete': '#5F9EA0',
    'Azul turquesa': '#00BFFF',
    'Azul pizarra': '#6A5ACD',
    'Azul pizarra oscuro': '#483D8B',
    'Azul pizarra claro': '#8470FF',
    'Azul marino': '#000080',
    'Cian': '#00FFFF',
    'Aqua': '#00FFFF',
    'Cian claro': '#E0FFFF',
    'Cian oscuro': '#008B8B',

    // Morados
    'Morado': '#800080',
    'Morado oscuro': '#4B0082',
    'Índigo': '#4B0082',
    'Violeta': '#EE82EE',
    'Violeta oscuro': '#9400D3',
    'Violeta claro': '#9370DB',
    'Orquídea': '#DA70D6',
    'Orquídea oscura': '#9932CC',
    'Orquídea media': '#BA55D3',
    'Lavanda': '#E6E6FA',
    'Lavanda pálida': '#DDA0DD',
    'Lila': '#C8A2C8',
    'Ciruelo': '#DDA0DD',
    'Malva': '#E0B0FF',

    // Metales y especiales
    'Plateado': '#C0C0C0',
    'Oro viejo': '#B8860B',
    'Oro oscuro': '#FFD700',
    'Cobre': '#B87333',

    // Extras CSS
    'Azul petróleo': '#2F4F4F',
    'Verde azulado': '#008080',
    'Verde esmeralda': '#50C878',
    'Aguamarina medio': '#66CDAA',
    'Carmesí': '#DC143C',
    'Caoba': '#C04000',
    'Ambar': '#FFBF00',
    'Mostaza': '#FFDB58'
  };

  return colorMap[colorName] || '#CCCCCC';
}

                
                DOM.productsGrid.appendChild(productCard);
            });
            
            document.querySelectorAll('.add-to-cart:not([disabled])').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = parseInt(e.currentTarget.dataset.id);
                    cartFunctions.addToCart(productId);
                });
            });

            // Manejar selección de colores y tallas
document.querySelectorAll('.product-card').forEach(card => {
    // Selección de colores
    card.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            const colorOptions = this.parentElement.querySelectorAll('.color-option');
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Selección de tallas
    card.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', function() {
            const sizeOptions = this.parentElement.querySelectorAll('.size-option');
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Seleccionar primera opción por defecto
    const firstColor = card.querySelector('.color-option');
    if (firstColor) firstColor.classList.add('selected');
    
    const firstSize = card.querySelector('.size-option');
    if (firstSize) firstSize.classList.add('selected');
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
    
    // Obtener las variantes seleccionadas
    const productCard = document.querySelector(`.product-card [data-id="${productId}"]`)?.closest('.product-card');
    let selectedColor = null;
    let selectedSize = null;
    
    if (productCard) {
        const colorOption = productCard.querySelector('.color-option.selected');
        const sizeOption = productCard.querySelector('.size-option.selected');
        
        selectedColor = colorOption ? colorOption.dataset.color : null;
        selectedSize = sizeOption ? sizeOption.dataset.size : null;
    }


            if (product.stock <= 0) {
                utils.showNotification('Este producto está agotado', 'fa-exclamation-circle');
                return;
            }
            
           // Buscar si ya existe el producto con las mismas variantes
    const existingItem = state.cart.find(item => 
        item.id === productId && 
        item.selectedColor === selectedColor && 
        item.selectedSize === selectedSize
    );
            
            if (existingItem) {
                if (existingItem.quantity >= product.stock) {
                    utils.showNotification('No hay suficiente stock disponible', 'fa-exclamation-circle');
                    return;
                }
                existingItem.quantity += 1;
            } else {
                state.cart.push({
                    ...product,
                    quantity: 1,
                    selectedColor,
                    selectedSize
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
            
            // Mostrar las variantes seleccionadas si existen
            let variantsInfo = '';
            if (item.selectedColor) variantsInfo += `<div class="cart-item-variant">Color: ${item.selectedColor}</div>`;
            if (item.selectedSize) variantsInfo += `<div class="cart-item-variant">Talla: ${item.selectedSize}</div>`;
            
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    ${variantsInfo}
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
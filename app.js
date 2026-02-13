/**
 * ========================================
 * FINANZAPP - SISTEMA DE FINANZAS PERSONALES
 * Proyecto SENA - Análisis y Desarrollo de Software
 * 
 * ARCHIVO: app.js
 * DESCRIPCIÓN: Lógica principal de la aplicación
 * 
 * ÍNDICE:
 * 1. Constantes y Configuración
 * 2. Utilidades Generales
 * 3. LocalStorage Management
 * 4. Autenticación
 * 5. Dashboard
 * 6. Movimientos Financieros
 * 7. Metas de Ahorro
 * 8. Recordatorios
 * 9. Tips Financieros
 * 10. Perfil de Usuario
 * 11. Inicialización
 * ========================================
 */

// ========================================
// 1. CONSTANTES Y CONFIGURACIÓN
// ========================================

const CONFIG = {
    APP_NAME: 'FinanzApp',
    VERSION: '1.0.0',
    STORAGE_PREFIX: 'finanzapp_',
    TIP_CHANGE_HOUR: 6, // Hora en que cambia el tip del día (6 AM)
};

// Keys para LocalStorage
const STORAGE_KEYS = {
    USERS: 'finanzapp_users',
    CURRENT_USER: 'finanzapp_current_user',
    MOVIMIENTOS: 'finanzapp_movimientos',
    METAS: 'finanzapp_metas',
    RECORDATORIOS: 'finanzapp_recordatorios',
    PERFILES: 'finanzapp_perfiles',
    TIP_DEL_DIA: 'finanzapp_tip_del_dia',
};

// ========================================
// 2. UTILIDADES GENERALES
// ========================================

/**
 * Formatea un número como moneda colombiana
 * @param {number} amount - Cantidad a formatear
 * @returns {string} - Cantidad formateada
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Formatea una fecha en español
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Obtiene la fecha actual en formato YYYY-MM-DD
 * @returns {string} - Fecha en formato ISO
 */
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

/**
 * Genera un ID único
 * @returns {string} - ID único
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Muestra un mensaje de alerta
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de alerta (success, error, warning, info)
 */
function showAlert(message, type = 'info') {
    // Podrías implementar un sistema de notificaciones más sofisticado
    console.log(`[${type.toUpperCase()}] ${message}`);
    alert(message);
}

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida una contraseña (mínimo 6 caracteres)
 * @param {string} password - Contraseña a validar
 * @returns {boolean} - True si es válida
 */
function isValidPassword(password) {
    return password.length >= 6;
}

/**
 * Calcula la fortaleza de una contraseña
 * @param {string} password - Contraseña a evaluar
 * @returns {object} - Objeto con nivel y porcentaje
 */
function getPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    
    let level = 'Débil';
    if (strength >= 75) level = 'Fuerte';
    else if (strength >= 50) level = 'Media';
    
    return { strength: Math.min(strength, 100), level };
}

// ========================================
// 3. LOCALSTORAGE MANAGEMENT
// ========================================

/**
 * Guarda datos en LocalStorage
 * @param {string} key - Clave
 * @param {any} value - Valor a guardar
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error al guardar en LocalStorage:', error);
        return false;
    }
}

/**
 * Obtiene datos de LocalStorage
 * @param {string} key - Clave
 * @returns {any} - Datos guardados o null
 */
function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error al leer de LocalStorage:', error);
        return null;
    }
}

/**
 * Elimina datos de LocalStorage
 * @param {string} key - Clave
 */
function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error al eliminar de LocalStorage:', error);
        return false;
    }
}

/**
 * Inicializa datos por defecto si no existen
 */
function initializeStorage() {
    if (!getFromStorage(STORAGE_KEYS.USERS)) {
        saveToStorage(STORAGE_KEYS.USERS, []);
    }
    if (!getFromStorage(STORAGE_KEYS.MOVIMIENTOS)) {
        saveToStorage(STORAGE_KEYS.MOVIMIENTOS, []);
    }
    if (!getFromStorage(STORAGE_KEYS.METAS)) {
        saveToStorage(STORAGE_KEYS.METAS, []);
    }
    if (!getFromStorage(STORAGE_KEYS.RECORDATORIOS)) {
        saveToStorage(STORAGE_KEYS.RECORDATORIOS, []);
    }
    if (!getFromStorage(STORAGE_KEYS.PERFILES)) {
        saveToStorage(STORAGE_KEYS.PERFILES, []);
    }
}

// ========================================
// 4. AUTENTICACIÓN
// ========================================

/**
 * Registra un nuevo usuario
 * @param {object} userData - Datos del usuario
 * @returns {object} - Resultado de la operación
 */
function registerUser(userData) {
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    
    // Verificar si el email ya existe
    if (users.some(user => user.correo === userData.correo)) {
        return { success: false, message: 'El correo ya está registrado' };
    }
    
    // Crear nuevo usuario
    const newUser = {
        idUsuario: generateId(),
        nombre: userData.nombre,
        apellido: userData.apellido,
        correo: userData.correo,
        password: userData.password, // En producción, esto debería estar hasheado
        telefono: userData.telefono,
        numeroIdentificacion: userData.numeroIdentificacion,
        tipoIdentificacion: userData.tipoIdentificacion,
        estado: 'activo',
        fechaRegistro: new Date().toISOString(),
        idRol: 1, // Usuario normal
    };
    
    users.push(newUser);
    saveToStorage(STORAGE_KEYS.USERS, users);
    
    // Crear perfil financiero por defecto
    const perfiles = getFromStorage(STORAGE_KEYS.PERFILES) || [];
    perfiles.push({
        idPerfil: generateId(),
        idUsuario: newUser.idUsuario,
        ingresoMensual: 0,
        nivelAhorro: 0,
        objetivoFinanciero: '',
        fechaActualizacion: new Date().toISOString(),
    });
    saveToStorage(STORAGE_KEYS.PERFILES, perfiles);
    
    return { success: true, message: 'Usuario registrado exitosamente', user: newUser };
}

/**
 * Inicia sesión
 * @param {string} email - Correo electrónico
 * @param {string} password - Contraseña
 * @returns {object} - Resultado de la operación
 */
function loginUser(email, password) {
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    const user = users.find(u => u.correo === email && u.password === password);
    
    if (!user) {
        return { success: false, message: 'Credenciales incorrectas' };
    }
    
    // Guardar usuario actual
    saveToStorage(STORAGE_KEYS.CURRENT_USER, user);
    
    return { success: true, message: 'Login exitoso', user };
}

/**
 * Cierra sesión
 */
function logoutUser() {
    removeFromStorage(STORAGE_KEYS.CURRENT_USER);
    window.location.href = 'index.html';
}

/**
 * Obtiene el usuario actual
 * @returns {object|null} - Usuario actual o null
 */
function getCurrentUser() {
    return getFromStorage(STORAGE_KEYS.CURRENT_USER);
}

/**
 * Verifica si hay una sesión activa
 * @returns {boolean} - True si hay sesión
 */
function isLoggedIn() {
    return getCurrentUser() !== null;
}

/**
 * Protege páginas que requieren autenticación
 */
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// ========================================
// 5. DASHBOARD
// ========================================

/**
 * Obtiene estadísticas del dashboard
 * @returns {object} - Estadísticas
 */
function getDashboardStats() {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;
    
    const movimientos = getFromStorage(STORAGE_KEYS.MOVIMIENTOS) || [];
    const userMovimientos = movimientos.filter(m => m.idUsuario === currentUser.idUsuario);
    
    const ingresos = userMovimientos
        .filter(m => m.tipoMovimiento === 'ingreso')
        .reduce((sum, m) => sum + parseFloat(m.monto), 0);
    
    const gastos = userMovimientos
        .filter(m => m.tipoMovimiento === 'gasto')
        .reduce((sum, m) => sum + parseFloat(m.monto), 0);
    
    const balance = ingresos - gastos;
    
    const metas = getFromStorage(STORAGE_KEYS.METAS) || [];
    const userMetas = metas.filter(m => m.idUsuario === currentUser.idUsuario);
    const ahorros = userMetas.reduce((sum, m) => sum + parseFloat(m.ahorroActual || 0), 0);
    
    return {
        ingresos,
        gastos,
        balance,
        ahorros,
        totalMovimientos: userMovimientos.length,
        totalMetas: userMetas.length,
    };
}

/**
 * Obtiene los últimos movimientos
 * @param {number} limit - Número de movimientos a obtener
 * @returns {array} - Array de movimientos
 */
function getRecentMovimientos(limit = 5) {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const movimientos = getFromStorage(STORAGE_KEYS.MOVIMIENTOS) || [];
    return movimientos
        .filter(m => m.idUsuario === currentUser.idUsuario)
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, limit);
}

/**
 * Renderiza el dashboard
 */
function renderDashboard() {
    const stats = getDashboardStats();
    if (!stats) return;
    
    // Actualizar estadísticas
    document.getElementById('balanceTotal').textContent = formatCurrency(stats.balance);
    document.getElementById('ingresosTotal').textContent = formatCurrency(stats.ingresos);
    document.getElementById('gastosTotal').textContent = formatCurrency(stats.gastos);
    document.getElementById('ahorrosTotal').textContent = formatCurrency(stats.ahorros);
    
    // Actualizar nombre de usuario
    const currentUser = getCurrentUser();
    if (currentUser) {
        const userNameElements = document.querySelectorAll('#userName, #userDisplayName');
        userNameElements.forEach(el => {
            if (el) el.textContent = currentUser.nombre;
        });
        
        const emailElement = document.getElementById('userEmail');
        if (emailElement) emailElement.textContent = currentUser.correo;
    }
    
    // Actualizar fecha actual
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = formatDate(new Date());
    }
    
    // Renderizar últimos movimientos
    renderRecentMovimientos();
    
    // Mostrar tip del día
    displayTipDelDia();
}

/**
 * Renderiza los últimos movimientos en el dashboard
 */
function renderRecentMovimientos() {
    const tableBody = document.getElementById('movimientosTable');
    if (!tableBody) return;
    
    const movimientos = getRecentMovimientos(5);
    
    if (movimientos.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" class="text-center">No hay movimientos recientes</td></tr>';
        return;
    }
    
    tableBody.innerHTML = movimientos.map(m => `
        <tr>
            <td>${formatDate(m.fecha)}</td>
            <td>${m.descripcion || '-'}</td>
            <td>${m.categoriaMovimiento}</td>
            <td class="${m.tipoMovimiento === 'ingreso' ? 'text-success' : 'text-danger'}">
                ${m.tipoMovimiento === 'ingreso' ? '+' : '-'}${formatCurrency(m.monto)}
            </td>
        </tr>
    `).join('');
}

// ========================================
// 6. MOVIMIENTOS FINANCIEROS
// ========================================

/**
 * Crea un nuevo movimiento
 * @param {object} movimientoData - Datos del movimiento
 * @returns {object} - Resultado de la operación
 */
function createMovimiento(movimientoData) {
    const currentUser = getCurrentUser();
    if (!currentUser) return { success: false, message: 'Usuario no autenticado' };
    
    const movimientos = getFromStorage(STORAGE_KEYS.MOVIMIENTOS) || [];
    
    const newMovimiento = {
        idMovimiento: generateId(),
        idUsuario: currentUser.idUsuario,
        tipoMovimiento: movimientoData.tipo,
        categoriaMovimiento: movimientoData.categoria,
        monto: parseFloat(movimientoData.monto),
        fecha: movimientoData.fecha,
        descripcion: movimientoData.descripcion || '',
        fechaCreacion: new Date().toISOString(),
    };
    
    movimientos.push(newMovimiento);
    saveToStorage(STORAGE_KEYS.MOVIMIENTOS, movimientos);
    
    return { success: true, message: 'Movimiento creado exitosamente', movimiento: newMovimiento };
}

/**
 * Actualiza un movimiento
 * @param {string} id - ID del movimiento
 * @param {object} data - Nuevos datos
 * @returns {object} - Resultado
 */
function updateMovimiento(id, data) {
    const movimientos = getFromStorage(STORAGE_KEYS.MOVIMIENTOS) || [];
    const index = movimientos.findIndex(m => m.idMovimiento === id);
    
    if (index === -1) {
        return { success: false, message: 'Movimiento no encontrado' };
    }
    
    movimientos[index] = { ...movimientos[index], ...data };
    saveToStorage(STORAGE_KEYS.MOVIMIENTOS, movimientos);
    
    return { success: true, message: 'Movimiento actualizado' };
}

/**
 * Elimina un movimiento
 * @param {string} id - ID del movimiento
 * @returns {object} - Resultado
 */
function deleteMovimiento(id) {
    const movimientos = getFromStorage(STORAGE_KEYS.MOVIMIENTOS) || [];
    const filtered = movimientos.filter(m => m.idMovimiento !== id);
    saveToStorage(STORAGE_KEYS.MOVIMIENTOS, filtered);
    return { success: true, message: 'Movimiento eliminado' };
}

/**
 * Obtiene todos los movimientos del usuario actual
 * @returns {array} - Array de movimientos
 */
function getUserMovimientos() {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const movimientos = getFromStorage(STORAGE_KEYS.MOVIMIENTOS) || [];
    return movimientos.filter(m => m.idUsuario === currentUser.idUsuario);
}

// ========================================
// 7. METAS DE AHORRO
// ========================================

/**
 * Crea una nueva meta de ahorro
 * @param {object} metaData - Datos de la meta
 * @returns {object} - Resultado
 */
function createMeta(metaData) {
    const currentUser = getCurrentUser();
    if (!currentUser) return { success: false, message: 'Usuario no autenticado' };
    
    const metas = getFromStorage(STORAGE_KEYS.METAS) || [];
    
    const newMeta = {
        idMeta: generateId(),
        idUsuario: currentUser.idUsuario,
        nombreMeta: metaData.nombreMeta,
        montoObjetivo: parseFloat(metaData.montoObjetivo),
        ahorroActual: parseFloat(metaData.ahorroActual || 0),
        fechaInicio: metaData.fechaInicio,
        fechaLimite: metaData.fechaLimite,
        descripcion: metaData.descripcion || '',
        icono: metaData.icono || 'other',
        estado: 'en-progreso',
        fechaCreacion: new Date().toISOString(),
    };
    
    metas.push(newMeta);
    saveToStorage(STORAGE_KEYS.METAS, metas);
    
    return { success: true, message: 'Meta creada exitosamente', meta: newMeta };
}

/**
 * Actualiza una meta
 * @param {string} id - ID de la meta
 * @param {object} data - Nuevos datos
 * @returns {object} - Resultado
 */
function updateMeta(id, data) {
    const metas = getFromStorage(STORAGE_KEYS.METAS) || [];
    const index = metas.findIndex(m => m.idMeta === id);
    
    if (index === -1) {
        return { success: false, message: 'Meta no encontrada' };
    }
    
    metas[index] = { ...metas[index], ...data };
    
    // Verificar si la meta se completó
    if (metas[index].ahorroActual >= metas[index].montoObjetivo) {
        metas[index].estado = 'completada';
    }
    
    saveToStorage(STORAGE_KEYS.METAS, metas);
    
    return { success: true, message: 'Meta actualizada' };
}

/**
 * Agrega ahorro a una meta
 * @param {string} metaId - ID de la meta
 * @param {number} monto - Monto a agregar
 * @returns {object} - Resultado
 */
function addAhorroToMeta(metaId, monto) {
    const metas = getFromStorage(STORAGE_KEYS.METAS) || [];
    const meta = metas.find(m => m.idMeta === metaId);
    
    if (!meta) {
        return { success: false, message: 'Meta no encontrada' };
    }
    
    meta.ahorroActual = (parseFloat(meta.ahorroActual) || 0) + parseFloat(monto);
    
    if (meta.ahorroActual >= meta.montoObjetivo) {
        meta.estado = 'completada';
    }
    
    saveToStorage(STORAGE_KEYS.METAS, metas);
    
    return { success: true, message: 'Ahorro agregado exitosamente' };
}

/**
 * Obtiene todas las metas del usuario
 * @returns {array} - Array de metas
 */
function getUserMetas() {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const metas = getFromStorage(STORAGE_KEYS.METAS) || [];
    return metas.filter(m => m.idUsuario === currentUser.idUsuario);
}

// ========================================
// 8. RECORDATORIOS
// ========================================

/**
 * Crea un nuevo recordatorio
 * @param {object} recordatorioData - Datos del recordatorio
 * @returns {object} - Resultado
 */
function createRecordatorio(recordatorioData) {
    const currentUser = getCurrentUser();
    if (!currentUser) return { success: false, message: 'Usuario no autenticado' };
    
    const recordatorios = getFromStorage(STORAGE_KEYS.RECORDATORIOS) || [];
    
    const newRecordatorio = {
        idRecordatorio: generateId(),
        idUsuario: currentUser.idUsuario,
        titulo: recordatorioData.titulo,
        descripcion: recordatorioData.descripcion || '',
        fechaRecordatorio: recordatorioData.fechaRecordatorio,
        horaRecordatorio: recordatorioData.horaRecordatorio || '',
        monto: parseFloat(recordatorioData.monto || 0),
        tipo: recordatorioData.tipo || 'otro',
        estado: 'pendiente',
        fechaCreacion: new Date().toISOString(),
    };
    
    recordatorios.push(newRecordatorio);
    saveToStorage(STORAGE_KEYS.RECORDATORIOS, recordatorios);
    
    return { success: true, message: 'Recordatorio creado exitosamente' };
}

/**
 * Marca un recordatorio como completado
 * @param {string} id - ID del recordatorio
 * @returns {object} - Resultado
 */
function completeRecordatorio(id) {
    const recordatorios = getFromStorage(STORAGE_KEYS.RECORDATORIOS) || [];
    const recordatorio = recordatorios.find(r => r.idRecordatorio === id);
    
    if (!recordatorio) {
        return { success: false, message: 'Recordatorio no encontrado' };
    }
    
    recordatorio.estado = 'completado';
    saveToStorage(STORAGE_KEYS.RECORDATORIOS, recordatorios);
    
    return { success: true, message: 'Recordatorio completado' };
}

/**
 * Obtiene todos los recordatorios del usuario
 * @returns {array} - Array de recordatorios
 */
function getUserRecordatorios() {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const recordatorios = getFromStorage(STORAGE_KEYS.RECORDATORIOS) || [];
    return recordatorios.filter(r => r.idUsuario === currentUser.idUsuario);
}

// ========================================
// 9. TIPS FINANCIEROS
// ========================================

// Base de datos de tips financieros
const TIPS_DATABASE = [
    {
        id: 1,
        titulo: 'Regla del 50/30/20',
        contenido: 'Distribuye tu ingreso: 50% necesidades básicas, 30% deseos personales, 20% ahorro e inversión.',
        categoria: 'presupuesto',
        dificultad: 'basico',
    },
    {
        id: 2,
        titulo: 'Fondo de Emergencia',
        contenido: 'Ahorra al menos 3-6 meses de gastos como fondo de emergencia antes de invertir.',
        categoria: 'ahorro',
        dificultad: 'basico',
    },
    {
        id: 3,
        titulo: 'Interés Compuesto',
        contenido: 'El interés compuesto es tu mejor aliado. Comienza a invertir lo antes posible, aunque sea poco.',
        categoria: 'inversion',
        dificultad: 'intermedio',
    },
    {
        id: 4,
        titulo: 'Paga Primero tus Deudas',
        contenido: 'Prioriza pagar deudas con tasas de interés altas antes de ahorrar para otros objetivos.',
        categoria: 'deudas',
        dificultad: 'basico',
    },
    {
        id: 5,
        titulo: 'Automatiza tu Ahorro',
        contenido: 'Configura transferencias automáticas a tu cuenta de ahorros justo después de recibir tu salario.',
        categoria: 'ahorro',
        dificultad: 'basico',
    },
    {
        id: 6,
        titulo: 'Diversifica tus Inversiones',
        contenido: 'No pongas todos los huevos en la misma canasta. Diversifica para reducir riesgos.',
        categoria: 'inversion',
        dificultad: 'intermedio',
    },
    {
        id: 7,
        titulo: 'Revisa tus Suscripciones',
        contenido: 'Cancela suscripciones que no uses. Pueden sumar cientos de miles al año.',
        categoria: 'presupuesto',
        dificultad: 'basico',
    },
    {
        id: 8,
        titulo: 'Educación Financiera',
        contenido: 'Lee al menos un libro sobre finanzas personales al año. El conocimiento es poder.',
        categoria: 'basico',
        dificultad: 'basico',
    },
];

/**
 * Obtiene el tip del día basado en la fecha actual
 * @returns {object} - Tip del día
 */
function getTipDelDia() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const tipIndex = dayOfYear % TIPS_DATABASE.length;
    
    return TIPS_DATABASE[tipIndex];
}

/**
 * Muestra el tip del día
 */
function displayTipDelDia() {
    const tip = getTipDelDia();
    
    const tipElement = document.getElementById('tipDelDia');
    if (tipElement) {
        tipElement.textContent = tip.contenido;
    }
    
    const tipTituloElement = document.getElementById('tipDelDiaTitulo');
    if (tipTituloElement) {
        tipTituloElement.textContent = tip.titulo;
    }
    
    const tipContenidoElement = document.getElementById('tipDelDiaContenido');
    if (tipContenidoElement) {
        tipContenidoElement.textContent = tip.contenido;
    }
}

/**
 * Obtiene todos los tips
 * @param {string} categoria - Filtro por categoría (opcional)
 * @returns {array} - Array de tips
 */
function getAllTips(categoria = null) {
    if (!categoria || categoria === 'todos') {
        return TIPS_DATABASE;
    }
    return TIPS_DATABASE.filter(tip => tip.categoria === categoria);
}

// ========================================
// 10. PERFIL DE USUARIO
// ========================================

/**
 * Actualiza la información personal del usuario
 * @param {object} data - Nuevos datos
 * @returns {object} - Resultado
 */
function updateUserInfo(data) {
    const currentUser = getCurrentUser();
    if (!currentUser) return { success: false, message: 'Usuario no autenticado' };
    
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    const userIndex = users.findIndex(u => u.idUsuario === currentUser.idUsuario);
    
    if (userIndex === -1) {
        return { success: false, message: 'Usuario no encontrado' };
    }
    
    users[userIndex] = { ...users[userIndex], ...data };
    saveToStorage(STORAGE_KEYS.USERS, users);
    saveToStorage(STORAGE_KEYS.CURRENT_USER, users[userIndex]);
    
    return { success: true, message: 'Información actualizada' };
}

/**
 * Actualiza el perfil financiero
 * @param {object} data - Datos del perfil
 * @returns {object} - Resultado
 */
function updatePerfilFinanciero(data) {
    const currentUser = getCurrentUser();
    if (!currentUser) return { success: false, message: 'Usuario no autenticado' };
    
    const perfiles = getFromStorage(STORAGE_KEYS.PERFILES) || [];
    const perfilIndex = perfiles.findIndex(p => p.idUsuario === currentUser.idUsuario);
    
    if (perfilIndex === -1) {
        // Crear perfil si no existe
        perfiles.push({
            idPerfil: generateId(),
            idUsuario: currentUser.idUsuario,
            ...data,
            fechaActualizacion: new Date().toISOString(),
        });
    } else {
        perfiles[perfilIndex] = { 
            ...perfiles[perfilIndex], 
            ...data,
            fechaActualizacion: new Date().toISOString(),
        };
    }
    
    saveToStorage(STORAGE_KEYS.PERFILES, perfiles);
    
    return { success: true, message: 'Perfil financiero actualizado' };
}

/**
 * Cambia la contraseña del usuario
 * @param {string} currentPassword - Contraseña actual
 * @param {string} newPassword - Nueva contraseña
 * @returns {object} - Resultado
 */
function changePassword(currentPassword, newPassword) {
    const currentUser = getCurrentUser();
    if (!currentUser) return { success: false, message: 'Usuario no autenticado' };
    
    if (currentUser.password !== currentPassword) {
        return { success: false, message: 'Contraseña actual incorrecta' };
    }
    
    if (!isValidPassword(newPassword)) {
        return { success: false, message: 'La nueva contraseña debe tener al menos 6 caracteres' };
    }
    
    const users = getFromStorage(STORAGE_KEYS.USERS) || [];
    const userIndex = users.findIndex(u => u.idUsuario === currentUser.idUsuario);
    
    users[userIndex].password = newPassword;
    saveToStorage(STORAGE_KEYS.USERS, users);
    
    currentUser.password = newPassword;
    saveToStorage(STORAGE_KEYS.CURRENT_USER, currentUser);
    
    return { success: true, message: 'Contraseña cambiada exitosamente' };
}

// ========================================
// 11. INICIALIZACIÓN Y EVENT LISTENERS
// ========================================

/**
 * Inicializa la aplicación
 */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar storage
    initializeStorage();
    
    // Detectar página actual
    const currentPage = window.location.pathname.split('/').pop();
    
    // ===== LANDING PAGE (index.html) =====
    if (currentPage === 'index.html' || currentPage === '') {
        // Menú hamburguesa
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    }
    
    // ===== LOGIN PAGE =====
    if (currentPage === 'login.html') {
        const loginForm = document.getElementById('loginForm');
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        
        // Toggle password visibility
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', () => {
                const type = passwordInput.type === 'password' ? 'text' : 'password';
                passwordInput.type = type;
                togglePassword.querySelector('i').classList.toggle('fa-eye');
                togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
            });
        }
        
        // Handle login
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                const result = loginUser(email, password);
                
                if (result.success) {
                    document.getElementById('loginSuccess').style.display = 'flex';
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    const errorDiv = document.getElementById('loginError');
                    const errorMessage = document.getElementById('loginErrorMessage');
                    errorDiv.style.display = 'flex';
                    errorMessage.textContent = result.message;
                }
            });
        }
    }
    
    // ===== REGISTRO PAGE =====
    if (currentPage === 'registro.html') {
        let currentStep = 1;
        
        // Toggle password visibility
        const toggleButtons = document.querySelectorAll('.toggle-password');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.previousElementSibling;
                const type = input.type === 'password' ? 'text' : 'password';
                input.type = type;
                btn.querySelector('i').classList.toggle('fa-eye');
                btn.querySelector('i').classList.toggle('fa-eye-slash');
            });
        });
        
        // Password strength indicator
        const passwordInput = document.getElementById('passwordRegistro');
        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                const strength = getPasswordStrength(passwordInput.value);
                const strengthFill = document.getElementById('strengthFill');
                const strengthText = document.getElementById('strengthText');
                
                if (strengthFill && strengthText) {
                    strengthFill.style.width = strength.strength + '%';
                    strengthText.textContent = strength.level;
                    
                    strengthFill.style.background = 
                        strength.strength >= 75 ? '#10b981' :
                        strength.strength >= 50 ? '#f59e0b' : '#ef4444';
                }
            });
        }
        
        // Step navigation
        function goToStep(step) {
            document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.progress-step').forEach(s => s.classList.remove('active'));
            
            document.getElementById('step' + step).classList.add('active');
            document.querySelector(`[data-step="${step}"]`).classList.add('active');
            currentStep = step;
        }
        
        // Step 1 -> Step 2
        document.getElementById('nextStep1')?.addEventListener('click', () => {
            // Validaciones básicas
            if (!document.getElementById('nombre').value) {
                showAlert('Por favor ingresa tu nombre');
                return;
            }
            goToStep(2);
        });
        
        // Step 2 -> Step 1
        document.getElementById('prevStep2')?.addEventListener('click', () => {
            goToStep(1);
        });
        
        // Step 2 -> Step 3
        document.getElementById('nextStep2')?.addEventListener('click', () => {
            const email = document.getElementById('emailRegistro').value;
            const password = document.getElementById('passwordRegistro').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (!isValidEmail(email)) {
                showAlert('Por favor ingresa un email válido');
                return;
            }
            
            if (!isValidPassword(password)) {
                showAlert('La contraseña debe tener al menos 6 caracteres');
                return;
            }
            
            if (password !== confirmPassword) {
                showAlert('Las contraseñas no coinciden');
                return;
            }
            
            // Mostrar resumen
            document.getElementById('summaryNombre').textContent = 
                document.getElementById('nombre').value + ' ' + document.getElementById('apellido').value;
            document.getElementById('summaryIdentificacion').textContent = 
                document.getElementById('tipoIdentificacion').options[document.getElementById('tipoIdentificacion').selectedIndex].text + 
                ' - ' + document.getElementById('numeroIdentificacion').value;
            document.getElementById('summaryTelefono').textContent = document.getElementById('telefono').value;
            document.getElementById('summaryEmail').textContent = email;
            
            goToStep(3);
        });
        
        // Step 3 -> Step 2
        document.getElementById('prevStep3')?.addEventListener('click', () => {
            goToStep(2);
        });
        
        // Handle registration
        const registroForm = document.getElementById('registroForm');
        if (registroForm) {
            registroForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (!document.getElementById('terminos').checked) {
                    showAlert('Debes aceptar los términos y condiciones');
                    return;
                }
                
                const userData = {
                    nombre: document.getElementById('nombre').value,
                    apellido: document.getElementById('apellido').value,
                    correo: document.getElementById('emailRegistro').value,
                    password: document.getElementById('passwordRegistro').value,
                    telefono: document.getElementById('telefono').value,
                    numeroIdentificacion: document.getElementById('numeroIdentificacion').value,
                    tipoIdentificacion: document.getElementById('tipoIdentificacion').value,
                };
                
                const result = registerUser(userData);
                
                if (result.success) {
                    document.getElementById('registroSuccess').style.display = 'flex';
                    // Auto-login y redirección
                    saveToStorage(STORAGE_KEYS.CURRENT_USER, result.user);
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                } else {
                    const errorDiv = document.getElementById('registroError');
                    const errorMessage = document.getElementById('registroErrorMessage');
                    errorDiv.style.display = 'flex';
                    errorMessage.textContent = result.message;
                }
            });
        }
    }
    
    // ===== PÁGINAS DEL DASHBOARD =====
    const dashboardPages = ['dashboard.html', 'movimientos.html', 'metas.html', 'recordatorios.html', 'tips.html', 'perfil.html'];
    
    if (dashboardPages.includes(currentPage)) {
        // Proteger página
        requireAuth();
        
        // Sidebar toggle
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
        }
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.remove('active');
            });
        }
        
        // Dropdowns
        const notificationsBtn = document.getElementById('notificationsBtn');
        const notificationsDropdown = document.getElementById('notificationsDropdown');
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userDropdown = document.getElementById('userDropdown');
        
        if (notificationsBtn && notificationsDropdown) {
            notificationsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationsDropdown.classList.toggle('active');
                if (userDropdown) userDropdown.classList.remove('active');
            });
        }
        
        if (userMenuBtn && userDropdown) {
            userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('active');
                if (notificationsDropdown) notificationsDropdown.classList.remove('active');
            });
        }
        
        // Cerrar dropdowns al hacer click fuera
        document.addEventListener('click', () => {
            if (notificationsDropdown) notificationsDropdown.classList.remove('active');
            if (userDropdown) userDropdown.classList.remove('active');
        });
        
        // Logout
        const logoutButtons = document.querySelectorAll('#logoutBtn, #logoutLink');
        logoutButtons.forEach(btn => {
            btn?.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                    logoutUser();
                }
            });
        });
    }
    
    // ===== DASHBOARD ESPECÍFICO =====
    if (currentPage === 'dashboard.html') {
        renderDashboard();
    }
    
    // ===== MOVIMIENTOS PAGE =====
    if (currentPage === 'movimientos.html') {
        const movimientoModal = document.getElementById('movimientoModal');
        const nuevoMovimientoBtn = document.getElementById('nuevoMovimientoBtn');
        const closeModal = document.getElementById('closeModal');
        const cancelarBtn = document.getElementById('cancelarBtn');
        const movimientoForm = document.getElementById('movimientoForm');
        
        // Abrir modal
        nuevoMovimientoBtn?.addEventListener('click', () => {
            movimientoModal.classList.add('active');
            movimientoForm.reset();
            document.getElementById('modalTitle').textContent = 'Nuevo Movimiento';
            document.getElementById('fecha').value = getTodayDate();
        });
        
        // Cerrar modal
        closeModal?.addEventListener('click', () => {
            movimientoModal.classList.remove('active');
        });
        
        cancelarBtn?.addEventListener('click', () => {
            movimientoModal.classList.remove('active');
        });
        
        // Guardar movimiento
        movimientoForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                tipo: document.querySelector('input[name="tipo"]:checked').value,
                categoria: document.getElementById('categoria').value,
                monto: document.getElementById('monto').value,
                fecha: document.getElementById('fecha').value,
                descripcion: document.getElementById('descripcion').value,
            };
            
            const result = createMovimiento(formData);
            
            if (result.success) {
                showAlert('Movimiento guardado exitosamente', 'success');
                movimientoModal.classList.remove('active');
                renderMovimientos();
            } else {
                showAlert(result.message, 'error');
            }
        });
        
        // Renderizar movimientos
        function renderMovimientos() {
            const movimientos = getUserMovimientos();
            const tbody = document.getElementById('movimientosTableBody');
            
            if (!tbody) return;
            
            if (movimientos.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay movimientos registrados</td></tr>';
                return;
            }
            
            tbody.innerHTML = movimientos.map(m => `
                <tr>
                    <td>${formatDate(m.fecha)}</td>
                    <td><span class="badge ${m.tipoMovimiento === 'ingreso' ? 'bg-success' : 'bg-danger'}">${m.tipoMovimiento}</span></td>
                    <td>${m.categoriaMovimiento}</td>
                    <td>${m.descripcion || '-'}</td>
                    <td class="${m.tipoMovimiento === 'ingreso' ? 'text-success' : 'text-danger'}">
                        ${formatCurrency(m.monto)}
                    </td>
                    <td>
                        <button class="btn-icon" onclick="deleteMovimiento('${m.idMovimiento}')">
                            <i class="fas fa-trash text-danger"></i>
                        </button>
                    </td>
                </tr>
            `).join('');
            
            // Actualizar totales
            const stats = getDashboardStats();
            document.getElementById('totalIngresos').textContent = formatCurrency(stats.ingresos);
            document.getElementById('totalGastos').textContent = formatCurrency(stats.gastos);
            document.getElementById('balance').textContent = formatCurrency(stats.balance);
        }
        
        renderMovimientos();
    }
    
    // Continuar configuración para otras páginas...
    console.log('FinanzApp inicializada correctamente');
});

// Exponer funciones globales necesarias
window.deleteMovimiento = (id) => {
    if (confirm('¿Estás seguro de eliminar este movimiento?')) {
        const result = deleteMovimiento(id);
        if (result.success) {
            window.location.reload();
        }
    }
};

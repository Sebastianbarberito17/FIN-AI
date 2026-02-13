# 💰 FinanzApp - Sistema de Finanzas Personales

## 📋 Descripción del Proyecto

**FinanzApp** es un sistema web completo para la gestión de finanzas personales, desarrollado como proyecto formativo para el SENA (Servicio Nacional de Aprendizaje) en el programa de Análisis y Desarrollo de Software.

## ✨ Características Principales

### 🔐 Autenticación
- Registro de usuarios con validación
- Inicio de sesión seguro
- Gestión de sesiones con LocalStorage
- Formulario multi-paso para registro

### 📊 Dashboard
- Resumen financiero en tiempo real
- Visualización de balance, ingresos y gastos
- Gráficos y estadísticas
- Notificaciones y alertas

### 💸 Movimientos Financieros
- Registro de ingresos y gastos
- Categorización de transacciones
- Filtros y búsqueda
- Cálculo automático de balances

### 🎯 Metas de Ahorro
- Creación de objetivos financieros
- Seguimiento de progreso
- Indicadores visuales
- Sistema de iconos por categoría

### 🔔 Recordatorios
- Alertas para pagos importantes
- Gestión de vencimientos
- Organización por estado

### 💡 Tips Financieros
- Consejo diario automático
- Base de datos de tips educativos
- Categorización por temas
- Niveles de dificultad

### 👤 Perfil de Usuario
- Información personal
- Perfil financiero personalizado
- Cambio de contraseña
- Gestión de preferencias

## 🏗️ Estructura del Proyecto

```
finanzas-personales/
│
├── index.html              # Landing page
├── login.html              # Página de inicio de sesión
├── registro.html           # Página de registro
├── dashboard.html          # Panel principal
├── movimientos.html        # Gestión de movimientos
├── metas.html              # Gestión de metas
├── perfil.html             # Perfil de usuario
├── recordatorios.html      # Gestión de recordatorios
├── tips.html               # Tips financieros
│
├── css/
│   └── styles.css          # Estilos completos (44KB)
│
├── js/
│   └── app.js              # Lógica de la aplicación
│
├── assets/
│   └── images/             # Imágenes y recursos
│
└── README.md               # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS
- **JavaScript (ES6+)**: Lógica de negocio
- **Font Awesome**: Iconos
- **Chart.js**: Gráficos (opcional)

### Almacenamiento
- **LocalStorage**: Persistencia de datos en el navegador

## 📱 Características Técnicas

### HTML5 Semántico
```html
<header>   - Encabezado de página
<nav>      - Navegación
<main>     - Contenido principal
<section>  - Secciones temáticas
<article>  - Contenido independiente
<aside>    - Contenido lateral (sidebar)
<footer>   - Pie de página
```

### CSS Moderno
- Variables CSS (Custom Properties)
- Flexbox para layouts flexibles
- Grid para layouts complejos
- Responsive Design (Mobile First)
- Animaciones y transiciones suaves
- Sistema de colores coherente

### JavaScript
- POO (Programación Orientada a Objetos)
- Funciones modulares y reutilizables
- Event Listeners
- Manipulación del DOM
- LocalStorage API
- Validaciones en tiempo real

## 🚀 Cómo Usar

### 1. Instalación

No requiere instalación de dependencias. Solo necesitas:
1. Un navegador web moderno (Chrome, Firefox, Edge, Safari)
2. Un editor de código (VS Code recomendado)

### 2. Ejecución

**Opción 1: Abrir directamente**
- Doble clic en `index.html`

**Opción 2: Servidor local (Recomendado)**
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con VS Code - Extensión Live Server
Click derecho > Open with Live Server
```

### 3. Primer Uso

1. Abre `index.html` en tu navegador
2. Haz clic en "Registrarse"
3. Completa el formulario de registro (3 pasos)
4. Inicia sesión con tus credenciales
5. ¡Comienza a usar FinanzApp!

## 📖 Guía de Funcionalidades

### Registro de Usuario
```
Paso 1: Información Personal
- Tipo de identificación
- Número de identificación
- Nombre y apellido
- Teléfono

Paso 2: Credenciales
- Correo electrónico
- Contraseña (con indicador de fortaleza)
- Confirmación de contraseña

Paso 3: Confirmación
- Revisión de datos
- Aceptación de términos
```

### Crear un Movimiento
1. Ve a "Movimientos"
2. Click en "Nuevo Movimiento"
3. Selecciona tipo (Ingreso/Gasto)
4. Elige categoría
5. Ingresa monto y fecha
6. Guarda

### Crear una Meta
1. Ve a "Metas de Ahorro"
2. Click en "Nueva Meta"
3. Ingresa nombre y monto objetivo
4. Define fechas
5. Selecciona ícono
6. Guarda

## 🎨 Paleta de Colores

```css
Primario:    #2563eb (Azul)
Secundario:  #10b981 (Verde)
Éxito:       #10b981 (Verde)
Advertencia: #f59e0b (Naranja)
Error:       #ef4444 (Rojo)
Texto:       #1e293b (Gris oscuro)
Fondo:       #f8fafc (Gris claro)
```

## 📋 Modelo de Datos

### Usuario
```javascript
{
    idUsuario: string,
    nombre: string,
    apellido: string,
    correo: string,
    password: string,
    telefono: string,
    numeroIdentificacion: string,
    tipoIdentificacion: number,
    estado: 'activo' | 'inactivo',
    fechaRegistro: Date,
    idRol: number
}
```

### Movimiento Financiero
```javascript
{
    idMovimiento: string,
    idUsuario: string,
    tipoMovimiento: 'ingreso' | 'gasto',
    categoriaMovimiento: string,
    monto: number,
    fecha: Date,
    descripcion: string
}
```

### Meta de Ahorro
```javascript
{
    idMeta: string,
    idUsuario: string,
    nombreMeta: string,
    montoObjetivo: number,
    ahorroActual: number,
    fechaInicio: Date,
    fechaLimite: Date,
    estado: 'en-progreso' | 'completada' | 'pausada',
    icono: string
}
```

## 🔒 Seguridad

⚠️ **IMPORTANTE**: Este proyecto es educativo y NO debe usarse en producción sin las siguientes mejoras:

1. **Contraseñas**: Implementar hashing (bcrypt)
2. **Autenticación**: Usar JWT o OAuth
3. **Backend**: Conectar a servidor seguro
4. **Validaciones**: Server-side validation
5. **HTTPS**: Usar siempre en producción
6. **Sanitización**: Prevenir XSS y SQL Injection

## 🗄️ Conexión a Base de Datos (Futuro)

### Opción 1: MySQL
```javascript
// Ejemplo con Node.js + Express
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'finanzapp'
});

// Crear usuario
app.post('/api/users', async (req, res) => {
    const { nombre, correo, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = 'INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)';
    connection.query(query, [nombre, correo, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ success: true, userId: result.insertId });
    });
});
```

### Opción 2: Firebase
```javascript
// Configuración de Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "finanzapp.firebaseapp.com",
    projectId: "finanzapp",
    // ...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Crear movimiento
async function createMovimiento(data) {
    try {
        const docRef = await addDoc(collection(db, "movimientos"), data);
        console.log("Documento creado con ID: ", docRef.id);
    } catch (e) {
        console.error("Error: ", e);
    }
}
```

## ⌨️ Atajos de VS Code

```
Ctrl + D          - Seleccionar siguiente ocurrencia
Ctrl + Shift + L  - Seleccionar todas las ocurrencias
Alt + Click       - Múltiples cursores
Ctrl + /          - Comentar línea
Ctrl + Shift + F  - Buscar en todos los archivos
Ctrl + P          - Búsqueda rápida de archivos
F2                - Renombrar símbolo
Ctrl + Space      - IntelliSense (autocompletado)
Ctrl + `          - Abrir terminal integrada
```

## 🎓 Conceptos Importantes

### LocalStorage vs SessionStorage
- **LocalStorage**: Persiste hasta que se borra manualmente
- **SessionStorage**: Se borra al cerrar el navegador

### Responsive Design
```css
/* Mobile First */
@media (min-width: 768px) { /* Tablets */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large Desktop */ }
```

### Accesibilidad (a11y)
- Usar etiquetas semánticas
- Labels en todos los inputs
- Alt text en imágenes
- Contraste de colores adecuado
- Navegación por teclado

## ⚠️ Errores Comunes a Evitar

1. **No validar datos**: Siempre valida en frontend Y backend
2. **Contraseñas en texto plano**: Nunca guardes passwords sin hashear
3. **SQL Injection**: Usa prepared statements
4. **XSS**: Sanitiza inputs del usuario
5. **Console.log en producción**: Elimínalos antes de publicar
6. **Código hardcodeado**: Usa variables de entorno
7. **No manejar errores**: Siempre usa try-catch
8. **Callbacks anidados**: Usa async/await

## 📚 Recursos de Aprendizaje

- [MDN Web Docs](https://developer.mozilla.org/) - Documentación oficial
- [CSS Tricks](https://css-tricks.com/) - Trucos y guías CSS
- [JavaScript.info](https://javascript.info/) - Tutorial completo JS
- [FreeCodeCamp](https://www.freecodecamp.org/) - Cursos gratis

## 🤝 Contribuciones

Este es un proyecto educativo. Si deseas mejorarlo:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Agrega mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la Licencia MIT.

## 👨‍💻 Autor

Proyecto desarrollado para el SENA - Análisis y Desarrollo de Software (Tercer Trimestre)

## 🙏 Agradecimientos

- SENA por la formación
- Comunidad de desarrolladores
- Documentación de MDN

---

**¿Preguntas o sugerencias?**
Contacta a tu instructor del SENA o abre un issue en el repositorio.

---

**Versión**: 1.0.0  
**Última actualización**: Febrero 2025

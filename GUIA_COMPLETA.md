# 📚 GUÍA COMPLETA PARA ESTUDIANTES DEL SENA

## 🏷️ ETIQUETAS HTML5 UTILIZADAS Y SU PROPÓSITO

### Estructura del Documento
| Etiqueta | Propósito | Ejemplo |
|----------|-----------|---------|
| `<!DOCTYPE html>` | Declara el tipo de documento HTML5 | Primera línea del archivo |
| `<html>` | Raíz del documento HTML | Contiene todo el contenido |
| `<head>` | Metadatos del documento | Enlaces a CSS, título, etc. |
| `<meta>` | Información sobre el documento | charset, viewport, description |
| `<title>` | Título que aparece en la pestaña | FinanzApp - Dashboard |
| `<link>` | Enlace a recursos externos | CSS, iconos |
| `<script>` | JavaScript inline o externo | Lógica de la aplicación |

### Estructura Semántica
| Etiqueta | Propósito | Dónde se usa |
|----------|-----------|--------------|
| `<header>` | Encabezado de página o sección | Navbar, topbar |
| `<nav>` | Navegación principal | Menú del header, sidebar |
| `<main>` | Contenido principal único | Contenedor del contenido |
| `<section>` | Sección temática | Hero, features, benefits |
| `<article>` | Contenido independiente | Cards, posts |
| `<aside>` | Contenido lateral | Sidebar del dashboard |
| `<footer>` | Pie de página | Copyright, links |

### Contenido de Texto
| Etiqueta | Propósito | Uso |
|----------|-----------|-----|
| `<h1>` a `<h6>` | Encabezados (jerarquía) | Títulos de secciones |
| `<p>` | Párrafo | Texto descriptivo |
| `<span>` | Contenedor inline | Estilos específicos |
| `<div>` | Contenedor block | Agrupación de elementos |
| `<strong>` | Texto importante (negrita) | Énfasis fuerte |
| `<em>` | Texto enfatizado (itálica) | Énfasis |
| `<small>` | Texto pequeño | Notas al pie |
| `<br>` | Salto de línea | Separación de líneas |

### Listas
| Etiqueta | Propósito | Uso |
|----------|-----------|-----|
| `<ul>` | Lista desordenada | Bullets |
| `<ol>` | Lista ordenada | Numerada |
| `<li>` | Elemento de lista | Cada item |

### Enlaces e Imágenes
| Etiqueta | Propósito | Uso |
|----------|-----------|-----|
| `<a>` | Enlace/hipervínculo | Links, botones |
| `<img>` | Imagen | Logos, fotos |

### Formularios
| Etiqueta | Propósito | Uso |
|----------|-----------|-----|
| `<form>` | Contenedor de formulario | Login, registro |
| `<input>` | Campo de entrada | Text, email, password |
| `<label>` | Etiqueta de campo | Descripción del input |
| `<textarea>` | Área de texto multilínea | Descripciones |
| `<select>` | Lista desplegable | Selección de opciones |
| `<option>` | Opción de select | Cada opción |
| `<button>` | Botón | Envío, acciones |

### Tablas (para datos tabulares)
| Etiqueta | Propósito | Uso |
|----------|-----------|-----|
| `<table>` | Contenedor de tabla | Movimientos |
| `<thead>` | Encabezado de tabla | Títulos de columnas |
| `<tbody>` | Cuerpo de tabla | Datos |
| `<tr>` | Fila de tabla | Cada fila |
| `<th>` | Celda de encabezado | Cabeceras |
| `<td>` | Celda de datos | Datos |

---

## 🎯 ESTRUCTURA BASE PROFESIONAL DE UN HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- METADATOS ESENCIALES -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Descripción breve del sitio (SEO)">
    <meta name="keywords" content="palabras, clave, seo">
    <meta name="author" content="Tu Nombre">
    
    <!-- TÍTULO -->
    <title>Título de la Página</title>
    
    <!-- FAVICON (icono en la pestaña) -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    
    <!-- HOJAS DE ESTILO -->
    <link rel="stylesheet" href="css/styles.css">
    
    <!-- FUENTES EXTERNAS (opcional) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    
    <!-- ICONOS (Font Awesome, etc.) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- HEADER: Navegación principal -->
    <header>
        <nav>
            <!-- Menú de navegación -->
        </nav>
    </header>
    
    <!-- MAIN: Contenido principal -->
    <main>
        <section id="seccion-1">
            <!-- Primera sección -->
        </section>
        
        <section id="seccion-2">
            <!-- Segunda sección -->
        </section>
    </main>
    
    <!-- FOOTER: Pie de página -->
    <footer>
        <p>&copy; 2025 Tu Sitio. Todos los derechos reservados.</p>
    </footer>
    
    <!-- SCRIPTS AL FINAL (mejor rendimiento) -->
    <script src="js/app.js"></script>
</body>
</html>
```

---

## ⌨️ ATAJOS DE TECLADO ESENCIALES EN VS CODE

### Edición
```
Ctrl + C          - Copiar línea (sin selección)
Ctrl + X          - Cortar línea (sin selección)
Ctrl + V          - Pegar
Ctrl + Z          - Deshacer
Ctrl + Shift + Z  - Rehacer
Ctrl + D          - Seleccionar siguiente palabra igual
Ctrl + Shift + L  - Seleccionar todas las ocurrencias
Alt + Click       - Múltiples cursores
Ctrl + /          - Comentar/Descomentar línea
Ctrl + Shift + /  - Comentario de bloque
Ctrl + Shift + K  - Eliminar línea
Alt + ↑/↓         - Mover línea arriba/abajo
Shift + Alt + ↑/↓ - Copiar línea arriba/abajo
```

### Navegación
```
Ctrl + P          - Ir a archivo
Ctrl + Shift + P  - Paleta de comandos
Ctrl + G          - Ir a línea
Ctrl + Tab        - Cambiar entre archivos abiertos
Ctrl + B          - Mostrar/Ocultar sidebar
Ctrl + Shift + E  - Explorador de archivos
Ctrl + Shift + F  - Buscar en todos los archivos
Ctrl + Shift + H  - Reemplazar en todos los archivos
```

### Desarrollo
```
Ctrl + Space      - IntelliSense (autocompletado)
Ctrl + .          - Acciones rápidas (Quick Fix)
F2                - Renombrar símbolo
Ctrl + K Ctrl + F - Formatear selección
Shift + Alt + F   - Formatear documento completo
Ctrl + `          - Abrir/Cerrar terminal
Ctrl + Shift + `  - Nueva terminal
F5                - Iniciar debugging
```

### Emmet (Snippets HTML/CSS)
```
!                 - Estructura HTML básica
div.clase         - <div class="clase"></div>
#id               - <div id="id"></div>
ul>li*5           - Lista con 5 items
.container>.row>.col*3  - Estructura anidada
```

---

## 💡 CONSEJOS PARA MEJORAR COMO PROGRAMADOR

### 1. **Práctica Constante**
- Programa TODOS los días, aunque sean 30 minutos
- Resuelve problemas en plataformas como:
  - [HackerRank](https://www.hackerrank.com/)
  - [LeetCode](https://leetcode.com/)
  - [CodeWars](https://www.codewars.com/)

### 2. **Lee Código de Otros**
- Estudia proyectos en GitHub
- Participa en revisiones de código
- Aprende de desarrolladores experimentados

### 3. **Escribe Código Limpio**
- Usa nombres descriptivos para variables y funciones
- Mantén funciones pequeñas (una responsabilidad)
- Comenta solo lo necesario
- Sigue una guía de estilo (Airbnb, Google)

### 4. **Aprende Fundamentos Sólidos**
- No saltes directamente a frameworks
- Domina JavaScript vanilla antes de React
- Entiende CSS antes de usar Tailwind
- Comprende HTML antes de usar plantillas

### 5. **Debugging Efectivo**
- Usa `console.log()` estratégicamente
- Aprende a usar DevTools del navegador
- Lee mensajes de error completos
- Usa breakpoints en debugger

### 6. **Versionamiento**
```bash
# Comandos Git esenciales
git init                    # Iniciar repositorio
git add .                   # Agregar archivos
git commit -m "mensaje"     # Confirmar cambios
git push origin main        # Subir a GitHub
git pull                    # Descargar cambios
git branch nombre           # Crear rama
git checkout nombre         # Cambiar rama
```

### 7. **Documentación**
- Escribe READMEs claros
- Documenta funciones complejas
- Crea diagramas cuando sea necesario
- Mantén comentarios actualizados

### 8. **Comunidad**
- Únete a comunidades de desarrollo
- Asiste a meetups y conferencias
- Contribuye a proyectos open source
- Ayuda a otros en foros (Stack Overflow)

### 9. **Proyectos Personales**
- Construye tu portfolio
- Resuelve problemas reales
- Publica tus proyectos en GitHub
- Despliega aplicaciones (Netlify, Vercel)

### 10. **Nunca Dejes de Aprender**
- La tecnología cambia rápidamente
- Lee blogs técnicos
- Sigue a desarrolladores en Twitter/LinkedIn
- Toma cursos online (Udemy, Platzi, freeCodeCamp)

---

## ⚠️ ERRORES COMUNES QUE DEBES EVITAR

### 1. **No Validar Datos**
❌ Malo:
```javascript
function register(email) {
    // Asumir que el email es válido
    saveUser(email);
}
```

✅ Bueno:
```javascript
function register(email) {
    if (!isValidEmail(email)) {
        throw new Error('Email inválido');
    }
    saveUser(email);
}
```

### 2. **No Manejar Errores**
❌ Malo:
```javascript
const data = JSON.parse(localStorage.getItem('data'));
```

✅ Bueno:
```javascript
try {
    const data = JSON.parse(localStorage.getItem('data'));
} catch (error) {
    console.error('Error al parsear datos:', error);
    return null;
}
```

### 3. **Código Repetido (DRY - Don't Repeat Yourself)**
❌ Malo:
```javascript
const user1 = {
    name: 'Juan',
    age: 25
};

const user2 = {
    name: 'María',
    age: 30
};
```

✅ Bueno:
```javascript
function createUser(name, age) {
    return { name, age };
}

const user1 = createUser('Juan', 25);
const user2 = createUser('María', 30);
```

### 4. **Variables con Nombres Poco Descriptivos**
❌ Malo:
```javascript
const x = 1000;
const y = x * 0.16;
```

✅ Bueno:
```javascript
const precio = 1000;
const impuesto = precio * 0.16;
```

### 5. **No Usar const/let (usar var)**
❌ Malo:
```javascript
var nombre = 'Juan';
var edad = 25;
```

✅ Bueno:
```javascript
const nombre = 'Juan';
let edad = 25;
```

### 6. **Callback Hell**
❌ Malo:
```javascript
getData(function(a) {
    getMoreData(a, function(b) {
        getMoreData(b, function(c) {
            // ...
        });
    });
});
```

✅ Bueno:
```javascript
async function fetchData() {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getMoreData(b);
    return c;
}
```

### 7. **No Sanitizar Inputs del Usuario**
❌ Malo:
```javascript
element.innerHTML = userInput; // ¡Peligro XSS!
```

✅ Bueno:
```javascript
element.textContent = userInput;
// O usa una librería de sanitización
```

### 8. **Olvidar event.preventDefault()**
❌ Malo:
```javascript
form.addEventListener('submit', () => {
    // El formulario se envía y recarga la página
    saveData();
});
```

✅ Bueno:
```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir recarga
    saveData();
});
```

### 9. **No Usar Responsive Design**
❌ Malo:
```css
.container {
    width: 1200px; /* Fijo */
}
```

✅ Bueno:
```css
.container {
    max-width: 1200px;
    width: 100%;
    padding: 0 1rem;
}
```

### 10. **Console.log en Producción**
❌ Malo:
```javascript
console.log('Usuario logueado:', user);
// Dejar esto en producción
```

✅ Bueno:
```javascript
if (process.env.NODE_ENV === 'development') {
    console.log('Usuario logueado:', user);
}
```

---

## 🔧 HERRAMIENTAS ÚTILES

### Extensiones de VS Code Recomendadas
1. **Live Server** - Servidor local con recarga automática
2. **Prettier** - Formateo automático de código
3. **ESLint** - Linting para JavaScript
4. **Auto Rename Tag** - Renombra tags HTML automáticamente
5. **CSS Peek** - Ve estilos CSS desde HTML
6. **GitLens** - Mejoras para Git
7. **Path Intellisense** - Autocompletado de rutas
8. **HTML CSS Support** - Autocompletado CSS en HTML

### Herramientas Online
1. **CodePen** - Editor online para pruebas
2. **Can I Use** - Compatibilidad de navegadores
3. **ColorHunt** - Paletas de colores
4. **Google Fonts** - Fuentes gratuitas
5. **Unsplash** - Imágenes gratis
6. **Font Awesome** - Iconos

---

## 📊 BUENAS PRÁCTICAS DE CSS

### 1. **Metodología BEM**
```css
/* Block__Element--Modifier */
.card { }
.card__title { }
.card__title--highlighted { }
```

### 2. **Variables CSS**
```css
:root {
    --primary-color: #2563eb;
    --spacing-md: 1rem;
}

.button {
    background: var(--primary-color);
    padding: var(--spacing-md);
}
```

### 3. **Mobile First**
```css
/* Estilos base para móvil */
.container {
    width: 100%;
}

/* Tablets */
@media (min-width: 768px) {
    .container {
        width: 750px;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        width: 960px;
    }
}
```

---

## 🎯 CONSEJOS FINALES

1. **Sé Paciente**: Programar es difícil al principio, pero mejora con práctica
2. **Google es tu Amigo**: El 99% de los problemas ya fueron resueltos
3. **No Reinventes la Rueda**: Usa librerías probadas cuando tenga sentido
4. **Pide Ayuda**: No hay preguntas tontas
5. **Comparte Conocimiento**: Enseñar te ayuda a aprender mejor
6. **Toma Descansos**: La productividad no es lineal
7. **Diviértete**: Disfruta el proceso de crear cosas

---

**¡Éxito en tu aprendizaje! 🚀**

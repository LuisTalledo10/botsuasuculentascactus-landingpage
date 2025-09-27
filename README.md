# Botsua Suculentas y Cactus - Landing Page

Una landing page profesional y minimalista para la marca **Botsua Suculentas y Cactus**, especializada en productos artesanales hechos de cemento.

## 🌱 Descripción del Proyecto

Esta landing page está diseñada para mostcar y vender productos artesanales de cemento como macetas, joyeros, bandejas, letras decorativas, packs de regalo y artículos para escritorio.

## 📁 Estructura del Proyecto

```
botsuasuculentascactus-landingpage/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   ├── main.css          # Estilos principales
│   │   └── responsive.css    # Estilos responsivos
│   ├── js/
│   │   ├── products.js       # Base de datos de productos
│   │   ├── cart.js          # Funcionalidad del carrito
│   │   └── main.js          # JavaScript principal
│   └── images/              # Imágenes (logos, productos, etc.)
├── components/              # Componentes reutilizables (preparado para futuro)
└── README.md               # Este archivo
```

## 🚀 Características Principales

### ✅ Diseño y UX
- ✅ Diseño minimalista y profesional
- ✅ Paleta de colores: Blanco (#FFFFFF) y Verde (#3B755F)
- ✅ Tipografía: Poppins de Google Fonts
- ✅ Totalmente responsivo (desktop, tablet, móvil)
- ✅ Animaciones suaves y efectos hover elegantes

### ✅ Funcionalidades Implementadas

#### Navegación
- ✅ Header fijo con navegación suave
- ✅ Menú responsive para móviles
- ✅ Auto-hide del header al hacer scroll
- ✅ Resaltado de sección activa

#### Carrito de Compras
- ✅ Agregar/eliminar productos
- ✅ Ajustar cantidades
- ✅ Cálculo automático de totales
- ✅ Contador dinámico en el header
- ✅ Persistencia en localStorage
- ✅ Notificaciones de acciones

#### Integración WhatsApp
- ✅ Mensaje prellenado con productos y precios
- ✅ Formato profesional del mensaje
- ✅ Número configurable fácilmente

#### Catálogo de Productos
- ✅ 22 productos organizados en 5 categorías:
  - Joyeros y Bandejas (4 productos)
  - Macetas (5 productos)
  - Letras Decorativas (4 productos)
  - Packs de Regalo (4 productos)
  - Para Escritorio (5 productos)
- ✅ Filtrado por categorías
- ✅ Búsqueda de productos
- ✅ Modal de detalles de producto
- ✅ Imágenes con lazy loading

#### Formulario de Contacto
- ✅ Validación en tiempo real
- ✅ Integración opcional con WhatsApp
- ✅ Notificaciones de éxito/error
- ✅ Diseño accesible y responsive

## 🛠️ Configuración

### 1. Configurar WhatsApp
Edita el archivo `assets/js/products.js` y cambia el número de teléfono:

```javascript
const WHATSAPP_CONFIG = {
    phoneNumber: "51999999999", // Cambia por tu número real
    businessName: "Botsua Suculentas y Cactus"
};
```

### 2. Agregar Imágenes
Coloca las imágenes de productos en la carpeta `assets/images/` con los siguientes nombres:

#### Imágenes necesarias:
- `logo.png` - Logo de Botsua
- `hero-bg.jpg` - Imagen de fondo del hero
- `about-us.jpg` - Imagen para la sección "Nosotros"

#### Imágenes de productos (22 imágenes):
**Joyeros y Bandejas:**
- `joyero-circular-pequeno.jpg`
- `bandeja-rectangular-grande.jpg`
- `joyero-compartimentos.jpg`
- `bandeja-ovalada.jpg`

**Macetas:**
- `maceta-cilindrica-mediana.jpg`
- `maceta-cuadrada-grande.jpg`
- `set-3-macetas-redondas.jpg`
- `maceta-triangular.jpg`
- `maceta-colgante.jpg`

**Letras Decorativas:**
- `letra-personalizada-15cm.jpg`
- `palabra-love.jpg`
- `letra-grande-25cm.jpg`
- `set-iniciales-pareja.jpg`

**Packs de Regalo:**
- `pack-suculentas-starter.jpg`
- `pack-organizador-escritorio.jpg`
- `pack-joyeria-completo.jpg`
- `pack-decorativo-hogar.jpg`

**Para Escritorio:**
- `porta-lapices-circular.jpg`
- `organizador-multi-compartimento.jpg`
- `base-telefono.jpg`
- `porta-tarjetas-empresarial.jpg`
- `pisapapeles-decorativo.jpg`

### 3. Personalización de Productos
Edita `assets/js/products.js` para:
- Cambiar nombres de productos
- Actualizar precios
- Modificar descripciones
- Ajustar dimensiones
- Cambiar categorías

## 📱 Uso de la Página

### Para Clientes:
1. **Explorar catálogo**: Navegar por categorías o buscar productos
2. **Ver detalles**: Hacer clic en imágenes para ver detalles completos
3. **Agregar al carrito**: Usar botones "Agregar al carrito"
4. **Gestionar carrito**: Ajustar cantidades en el modal del carrito
5. **Finalizar compra**: Envío automático por WhatsApp con detalles

### Para Administradores:
1. **Gestión de productos**: Editar `products.js` para cambios
2. **Configuración WhatsApp**: Cambiar número en la configuración
3. **Personalización**: Modificar colores, textos y estilos en CSS

## 🎨 Personalización de Diseño

### Colores Principales
Edita las variables CSS en `assets/css/main.css`:

```css
:root {
    --primary-color: #3B755F;     /* Verde principal */
    --primary-light: #4a8f72;     /* Verde claro */
    --primary-dark: #2d5a47;      /* Verde oscuro */
    --white: #ffffff;             /* Blanco */
    /* ... más variables ... */
}
```

### Tipografía
Para cambiar la fuente, edita el enlace de Google Fonts en `index.html` y la variable CSS:

```css
--font-primary: 'Poppins', sans-serif;
```

## 📊 Optimizaciones Implementadas

- ✅ **Performance**: Lazy loading, preload de imágenes críticas
- ✅ **SEO**: Meta tags, estructura semántica
- ✅ **Accesibilidad**: ARIA labels, navegación por teclado
- ✅ **UX**: Smooth scrolling, animaciones suaves, feedback visual
- ✅ **Mobile First**: Diseño responsive con breakpoints optimizados

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Flexbox, Grid, Variables CSS, Animaciones
- **JavaScript ES6+**: Clases, Modules, Local Storage
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía Poppins

## 🚀 Deployment

### Opción 1: Servidor Web Estático
Sube todos los archivos a tu hosting preferido (Netlify, Vercel, GitHub Pages, etc.)

### Opción 2: Servidor Local
```bash
# Usando Python
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server

# Usando PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

## 📝 Lista de Pendientes

### Imágenes Requeridas
- [ ] Logo de Botsua (`logo.png`)
- [ ] Imagen hero (`hero-bg.jpg`)
- [ ] Imagen "Nosotros" (`about-us.jpg`)
- [ ] 22 imágenes de productos (ver lista arriba)

### Configuración
- [ ] Número de WhatsApp real
- [ ] Información de contacto real
- [ ] Enlaces de redes sociales
- [ ] Datos de la empresa

### Opcionales
- [ ] Integración con backend para formulario
- [ ] Sistema de pagos online
- [ ] Panel de administración
- [ ] Analytics y métricas

## 🆘 Soporte

Para dudas o modificaciones, revisa:
1. Comentarios en el código
2. Estructura de archivos
3. Configuraciones en `products.js`
4. Variables CSS en `main.css`

## 📄 Licencia

Proyecto desarrollado específicamente para **Botsua Suculentas y Cactus**.

---

**¡Tu landing page está lista! 🌱**

Solo necesitas agregar las imágenes reales y configurar tu número de WhatsApp para que esté completamente funcional.
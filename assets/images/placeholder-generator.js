// Script para generar imágenes placeholder temporales
// Ejecutar en consola del navegador para descargar placeholders automáticamente

const placeholderImages = {
    // Imágenes principales
    "logo.png": "https://via.placeholder.com/120x40/3B755F/FFFFFF?text=BOTSUA",
    "hero-bg.jpg": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop&auto=format",
    "about-us.jpg": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop&auto=format",
    
    // Joyeros y Bandejas
    "joyero-circular-pequeno.jpg": "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=400&fit=crop&auto=format",
    "bandeja-rectangular-grande.jpg": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&auto=format",
    "joyero-compartimentos.jpg": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&auto=format",
    "bandeja-ovalada.jpg": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&auto=format",
    
    // Macetas
    "maceta-cilindrica-mediana.jpg": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop&auto=format",
    "maceta-cuadrada-grande.jpg": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&auto=format",
    "set-3-macetas-redondas.jpg": "https://images.unsplash.com/photo-1509423350716-97f2360e4df4?w=400&h=400&fit=crop&auto=format",
    "maceta-triangular.jpg": "https://images.unsplash.com/photo-1463725876303-a2b88b5c7b6d?w=400&h=400&fit=crop&auto=format",
    "maceta-colgante.jpg": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop&auto=format",
    
    // Letras Decorativas
    "letra-personalizada-15cm.jpg": "https://via.placeholder.com/400x400/3B755F/FFFFFF?text=A",
    "palabra-love.jpg": "https://via.placeholder.com/400x400/3B755F/FFFFFF?text=LOVE",
    "letra-grande-25cm.jpg": "https://via.placeholder.com/400x400/3B755F/FFFFFF?text=B",
    "set-iniciales-pareja.jpg": "https://via.placeholder.com/400x400/3B755F/FFFFFF?text=M+J",
    
    // Packs de Regalo
    "pack-suculentas-starter.jpg": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&auto=format",
    "pack-organizador-escritorio.jpg": "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=400&fit=crop&auto=format",
    "pack-joyeria-completo.jpg": "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=400&fit=crop&auto=format",
    "pack-decorativo-hogar.jpg": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&auto=format",
    
    // Para Escritorio
    "porta-lapices-circular.jpg": "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=400&fit=crop&auto=format",
    "organizador-multi-compartimento.jpg": "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop&auto=format",
    "base-telefono.jpg": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop&auto=format",
    "porta-tarjetas-empresarial.jpg": "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop&auto=format",
    "pisapapeles-decorativo.jpg": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&auto=format"
};

// Función para descargar una imagen
async function downloadImage(url, filename) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        console.log(`✅ Descargado: ${filename}`);
    } catch (error) {
        console.error(`❌ Error descargando ${filename}:`, error);
    }
}

// Función para descargar todas las imágenes placeholder
async function downloadAllPlaceholders() {
    console.log('🚀 Iniciando descarga de imágenes placeholder...');
    
    let count = 0;
    for (const [filename, url] of Object.entries(placeholderImages)) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Esperar 500ms entre descargas
        await downloadImage(url, filename);
        count++;
        console.log(`📥 Progreso: ${count}/${Object.keys(placeholderImages).length}`);
    }
    
    console.log('✅ ¡Todas las imágenes placeholder han sido descargadas!');
    console.log('📁 Coloca todas las imágenes descargadas en la carpeta: assets/images/');
}

// Ejecutar automáticamente si se llama desde consola
if (typeof window !== 'undefined') {
    console.log('📋 Para descargar todas las imágenes placeholder, ejecuta:');
    console.log('downloadAllPlaceholders()');
    
    // Hacer función global
    window.downloadAllPlaceholders = downloadAllPlaceholders;
    window.placeholderImages = placeholderImages;
}

// Instrucciones detalladas
console.log(`
🖼️  GUÍA DE IMÁGENES PLACEHOLDER PARA BOTSUA

1. DESCARGA AUTOMÁTICA:
   - Abre las herramientas de desarrollo (F12)
   - Ve a la pestaña "Console"
   - Ejecuta: downloadAllPlaceholders()
   - Las imágenes se descargarán automáticamente

2. DESCARGA MANUAL:
   ${Object.entries(placeholderImages).map(([filename, url]) => 
     `   • ${filename}: ${url}`
   ).join('\n   ')}

3. COLOCACIÓN:
   - Mueve todas las imágenes descargadas a: assets/images/
   - Asegúrate de que los nombres coincidan exactamente

4. REEMPLAZO:
   - Estas son imágenes temporales
   - Reemplázalas con tus fotos reales cuando las tengas
   - Mantén los mismos nombres de archivo

¡Una vez colocadas las imágenes, tu página estará lista para funcionar!
`);

// Exportar para uso en Node.js si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { placeholderImages, downloadAllPlaceholders };
}
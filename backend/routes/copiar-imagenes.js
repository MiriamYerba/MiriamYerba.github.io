import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas absolutas correctas desde donde está este archivo
const uploadsPath = path.resolve(__dirname, '../uploads');
const destinoPath = path.resolve(__dirname, '../../img_proyectos');

// Crear carpeta destino si no existe
if (!fs.existsSync(destinoPath)) {
  fs.mkdirSync(destinoPath, { recursive: true });
}

// Eliminar imágenes viejas del destino
fs.readdirSync(destinoPath).forEach(file => {
  fs.unlinkSync(path.join(destinoPath, file));
});

// Copiar imágenes desde uploads
fs.readdirSync(uploadsPath).forEach(file => {
  const src = path.join(uploadsPath, file);
  const dest = path.join(destinoPath, file);
try {
  const stat = fs.lstatSync(src);
  if (stat.isFile()) {
    fs.copyFileSync(src, dest);
    console.log(`✅ Copiado: ${file}`);
  } else {
    console.log(`⛔ No es archivo: ${file}`);
  }
} catch (err) {
  console.error(`❌ Error con ${file}:`, err.message);
}

});

console.log('✅ Imágenes copiadas correctamente a img_proyectos/');
const archivos = fs.readdirSync(uploadsPath);
console.log('🧐 Archivos encontrados en uploads:', archivos);

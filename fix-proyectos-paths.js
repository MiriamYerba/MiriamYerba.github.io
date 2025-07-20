// scripts/fix-proyectos-paths.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, '../backend/data/proyectos.json');

// Leer y parsear JSON
let proyectos = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Corregir rutas en cada proyecto
proyectos = proyectos.map(p => {
  if (Array.isArray(p.imagenes)) {
    p.imagenes = p.imagenes.map(url =>
      url.startsWith('/uploads/') ? url.replace('/uploads/', 'uploads/') : url
    );
  }
  return p;
});

// Guardar el archivo actualizado
fs.writeFileSync(dataPath, JSON.stringify(proyectos, null, 2), 'utf8');
console.log('✅ Rutas corregidas en proyectos.json');

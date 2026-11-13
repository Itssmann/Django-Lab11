# Laboratorio 11 — Comunicación entre componentes en React

Aplicación independiente React + Vite: Biblioteca (Semana 10), Cafetería (Parte 1) y Prestadores (Parte 2). Cambia de sección desde la navegación. El estado permanece al cambiar de sección y se reinicia al recargar.

## Ejecución
Desde Semana11:

```powershell
cd frontend
npm install --cache ../.npm-cache
npm run dev
```

Abre la URL local que imprime Vite. Verificaciones:

```powershell
npm run lint
npm run build
npm run test:e2e
```

Las pruebas de interfaz usan Playwright y Microsoft Edge instalado, en modo headless, con un servidor temporal en 127.0.0.1:5177. No requieren descargar navegadores. Si Node presenta UNABLE_TO_VERIFY_LEAF_SIGNATURE, en este entorno Node 24 funcionó con:
`$env:NODE_USE_SYSTEM_CA='1'` antes de instalar. No se desactivó TLS.

## Aislamiento y conservación
- Origen de la copia: ../Semana10/frontend. Destino: ./frontend.
- Se excluyeron node_modules, dist y .git. No se escribió en Semana10.
- App.jsx, App.css, index.css, datos.js y todos los componentes originales permanecen idénticos a la fuente. Solo main.jsx cambia su entrada a Laboratorio.jsx.
- Se inicializó Git propio en Semana11, sin commit, push ni remoto.
- No se copiaron archivos de Chamba-PE, ni se ejecutaron comandos sobre ese repositorio.
- No existen llamadas a APIs, conexión a Django ni persistencia de datos reales.

## Parte 1: cafetería
Los cinco productos y sus valores exactos fueron proporcionados por el usuario. precio permanece como string; el carrito convierte a número y opera en céntimos para sumar.

| Producto | Precio | Stock |
|---|---:|---:|
| Café americano | 6.50 | 50 |
| Capuchino | 9.00 | 40 |
| Torta de chocolate | 10.50 | 5 |
| Jugo de naranja | 7.00 | 0 |
| Tostada | 4.50 | 10 |

Dos capuchinos y un americano: 2 × 9.00 + 6.50 = **S/ 24.50**.

La siguiente es una correspondencia funcional de los ocho requisitos recibidos; no se pudo verificar la numeración exacta del archivo spec-biblioteca-comunicacion.md, mencionado pero no disponible entre los adjuntos.

| Ejercicio | Implementación |
|---|---|
| 1 | practica/datos.js: catálogo de cinco productos. |
| 2 | Practica.jsx: estado compartido con useState y props descendentes. |
| 3 | Catalogo.jsx: map y claves estables; ProductoCard.jsx: presentación y stock. |
| 4 | onAgregar comunica el producto al padre; actualización inmutable, cantidades y límite de stock. |
| 5 | Carrito.jsx: map, cantidades y total con reduce. |
| 6 | onQuitar reduce una unidad y elimina la fila en cero con filter; onVaciar vacía el carrito. |
| 7 | Buscador.jsx controlado; filter por nombre y mensaje sin resultados. |
| 8 | Aviso.jsx: useEffect, dependencias, duración de 3 segundos y clearTimeout al cambiar el aviso o desmontar. |

Agregar repetidamente reinicia el aviso, incluso si el texto es el mismo. El jugo está deshabilitado y el stock restante se deriva del carrito; quitar y vaciar lo liberan.

## Parte 2: panel de prestadores
Referencia consultada solo en lectura: https://github.com/RXDG2908/Chamba-PE
Su descripción pública orientó la temática y los rubros. Las consultas a prestadores/models.py y prestadores/serializers.py fallaron; **no se afirma equivalencia con el modelo real**.

Esquema provisional autorizado:
- id: número entero, único durante la sesión.
- nombre, rubro, telefono: textos.
- disponible: booleano.

Cinco personas y teléfonos ficticios en components/datosPrestadores.js. Las validaciones son locales asumidas para el laboratorio: nombre de al menos 3 caracteres, rubro del listado, teléfono de 9 dígitos iniciado en 9 y teléfono no repetido. No son reglas verificadas del backend.

| Ejercicio | Evidencia |
|---|---|
| 9 | Árbol y contrato de comunicación debajo. |
| 10 | PanelPrestadores usa useState con cinco registros; listado por props y filas map con key={prestador.id}. |
| 11 | FilaPrestador invoca onAlternar/onEliminar; el padre actualiza con map/filter. |
| 12 | FormularioPrestador controlado, validaciones, onGuardar y limpieza solo después de alta correcta. |
| 13 | Resumen derivado sin useState; búsqueda por nombre/rubro insensible a mayúsculas y tildes; estado vacío; aviso reutiliza useEffect con limpieza. |
| 14 | Pruebas reproducibles en tests/laboratorio.spec.js, lint y build. |

## Árbol y comunicación
Los datos bajan mediante props. Las acciones de los hijos invocan funciones del padre.

```text
Laboratorio (vista)
├── App — Biblioteca original
├── Practica (carrito, busqueda, aviso)
│   ├── Buscador ← busqueda; → onBuscar(texto)
│   ├── Catalogo ← productos, carrito; → onAgregar(id)
│   │   └── ProductoCard ← producto, cantidad; → onAgregar(id)
│   ├── Carrito ← carrito; → onQuitar(id), onVaciar()
│   └── Aviso ← aviso; → onCerrar()
└── PanelPrestadores (prestadores, busqueda, aviso)
    ├── ResumenPrestadores ← prestadores (colección completa)
    ├── BuscadorPrestadores ← busqueda; → onBuscar(texto)
    ├── ListadoPrestadores ← prestadores filtrados
    │   └── FilaPrestador ← prestador; → onAlternar(id), onEliminar(id)
    ├── FormularioPrestador → onGuardar(datos): null o error
    └── AvisoPrestadores ← aviso; → onCerrar()
        └── Aviso (efecto temporal compartido)
```

Los resúmenes no cambian con el filtro; representan todos los registros. No se usa push ni splice para actualizar estado. Los callbacks estables de cierre evitan que escribir en un buscador reinicie el temporizador.

## Archivos
- Entrada modificada: frontend/src/main.jsx.
- Nuevos: Laboratorio.jsx, laboratorio.css, siete archivos en src/practica/, los siete componentes solicitados de prestadores y datosPrestadores.js.
- Pruebas: playwright.config.js y tests/laboratorio.spec.js.
- package.json/package-lock.json: dependencia de pruebas y script test:e2e.
- README raíz: documentación Lab 11. frontend/README.md conserva documentación Lab 10.
- .gitignore excluye dependencias, build, caché y resultados temporales.

## Capturas para el documento Word
1. Biblioteca: catálogo, autores, editoriales, lectores y préstamos originales.
2. Cafetería: cinco productos, jugo sin stock y carrito con dos capuchinos + un americano (S/ 24.50).
3. Cafetería: búsqueda sin resultados y carrito vacío.
4. Prestadores: cinco filas iniciales y estadísticas 5 / 3 / 2.
5. Formulario inválido con mensajes; luego alta válida con aviso y campos limpios.
6. Activar/desactivar y eliminar, mostrando estadísticas actualizadas.
7. Búsqueda por nombre y rubro, y búsqueda sin coincidencias.
8. Panel en ancho móvil.
9. Terminal: lint, build y pruebas.
10. Árbol de componentes y ejemplos de props/callbacks.

## Límites conocidos
El archivo spec-biblioteca-comunicacion.md no estuvo disponible: se implementaron los comportamientos explícitos recibidos, sin afirmar reproducción literal de ese código. El panel no implementa edición, autenticación, almacenamiento ni operaciones del sistema real.

## Resultados de verificación (12/11/2026)
- npm install: completado usando certificados del sistema.
- npm run lint: código 0, sin diagnósticos.
- npm run build: código 0; 44 módulos transformados.
- Playwright/Edge: los cuatro escenarios terminaron con estado ok (cafetería, prestadores, biblioteca/móvil y capturas); cada escenario comprueba ausencia de errores console.error/pageerror.
- Se corrigió la asociación accesible del selector de rubro tras la primera prueba.
- Comparación SHA-256: archivos originales de src idénticos a Semana10, excepto main.jsx por la nueva entrada.
- Capturas generadas en evidencias/: prestadores-escritorio.png, cafeteria-total.png y prestadores-movil.png.
`npm run test:e2e` final: código 0, 4 passed (15.1s). Build final tras ajuste móvil: código 0.

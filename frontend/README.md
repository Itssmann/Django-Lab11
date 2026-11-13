# Laboratorio 11 — Comunicación entre componentes en React

Frontend independiente con tres secciones: Biblioteca conservada de Semana 10, Cafetería en src/practica y panel de prestadores simulado en src/components. No consume APIs ni se conecta al proyecto real Chamba-PE. Los cambios viven en memoria y se pierden al recargar.

## Ejecutar y comprobar

Desde frontend:

```powershell
npm install --cache ../.npm-cache
npm run dev
npm run lint
npm run build
npm run test:e2e
```

Abre la URL que imprime Vite. Las pruebas usan Microsoft Edge instalado y un servidor local en el puerto 5177.

## Parte 1 — src/practica

- datos.js contiene los cinco productos exactos de cafetería, con precio como texto.
- Practica.jsx mantiene carrito, búsqueda y aviso con useState. agregarAlCarrito(producto) recibe el producto completo, suma cantidades sin mutar el arreglo y respeta el stock.
- Catalogo.jsx recibe productos filtrados y carrito; crea ProductoCard mediante map y claves por id.
- ProductoCard.jsx muestra Agotado cuando stock === 0. El botón Agregar invoca onAgregar(producto) y se deshabilita cuando no queda stock.
- Buscador.jsx es controlado: recibe busqueda y comunica el texto con onBuscar.
- Carrito.jsx deriva unidades y total con reduce, sin estados adicionales. Muestra Unidades: n y Total: S/ x.xx. Su useEffect depende de [unidades], actualiza document.title a Carrito (n) — Cafetería y escribe las unidades en consola.
- Quitar invoca onQuitar(id): el padre elimina la línea completa con filter. Vaciar carrito invoca onVaciar().
- Aviso.jsx recibe el mensaje Agregado: <nombre>, lo muestra tres segundos y limpia el temporizador en el efecto.
- Estados vacíos exactos: El carrito está vacío y No hay productos que coincidan.

Dos capuchinos y un americano: 2 × 9.00 + 6.50 = S/ 24.50 y 3 unidades. Quitar Capuchino elimina sus dos unidades: queda un americano, S/ 6.50 y 1 unidad.

Laboratorio mantiene las tres vistas montadas al navegar, por lo que el efecto del título también existe mientras la cafetería está oculta.

### Datos que bajan y avisos que suben

| Padre → hijo | Datos por props | Notificación del hijo al padre |
|---|---|---|
| Practica → Buscador | busqueda | onBuscar(texto) |
| Practica → Catalogo → ProductoCard | productos, carrito; producto y cantidad por tarjeta | onAgregar(producto completo) |
| Practica → Carrito | carrito | onQuitar(id), onVaciar() |
| Practica → Aviso | aviso | onCerrar() al terminar el temporizador |

El hijo no cambia directamente el estado del padre: invoca el callback recibido. El padre actualiza el estado y vuelve a pasar datos a los hijos.

## Parte 2 — Panel de prestadores

PanelPrestadores.jsx mantiene cinco registros ficticios, búsqueda y aviso. Los campos provisionales son id, nombre, rubro, telefono y disponible; no se verificaron los modelos/serializers reales de Chamba-PE. El formulario valida nombre, rubro, formato y duplicidad del teléfono. Permite registrar, activar/desactivar y eliminar; las estadísticas se calculan sin estados derivados. La búsqueda filtra por nombre o rubro y el aviso temporal reutiliza Aviso.jsx.

| Padre → hijo | Datos por props | Notificación del hijo al padre |
|---|---|---|
| PanelPrestadores → ResumenPrestadores | prestadores completos | Ninguna; calcula total y disponibilidad |
| PanelPrestadores → BuscadorPrestadores | busqueda | onBuscar(texto) |
| PanelPrestadores → ListadoPrestadores → FilaPrestador | prestadores filtrados; prestador por fila | onAlternar(id), onEliminar(id) |
| PanelPrestadores → FormularioPrestador | onGuardar como función | onGuardar(datos); el padre devuelve null o error |
| PanelPrestadores → AvisoPrestadores → Aviso | aviso | onCerrar() |

## Biblioteca y aislamiento

App.jsx, datos.js, App.css y los componentes de biblioteca conservan el trabajo anterior: libros, autores, editoriales, lectores y préstamos. La navegación se implementa en Laboratorio.jsx. Este ajuste no modifica la biblioteca ni los componentes del panel.

Semana10 y Chamba-PE son solo lectura. Los archivos del laboratorio están dentro de Semana11. No se hacen commit ni push.

## Pruebas

tests/laboratorio.spec.js comprueba el total S/ 24.50, unidades, título, log, stock agotado, eliminación de la línea completa, vaciado, búsquedas, aviso temporal, validaciones y acciones de prestadores, biblioteca, diseño móvil y ausencia de errores de consola. Las capturas se generan en ../evidencias.
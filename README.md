# Michi Coffee · 猫カフェ

Landing page / One Page de **Michi Coffee**, un café de gatos en Cali con comida japonesa y un pequeño centro de adopción de gatitos rescatados.

Proyecto final de **Laboratorio UX/UI** (Universidad Autónoma de Occidente): diseño en Figma con Atomic Design (desktop 1920 px e iPhone 16) y maquetación responsive en HTML5, CSS3 y JavaScript.

## Estructura

```
├── index.html          → estructura semántica (header, nav, main, section, article, aside, footer, form, dialog)
├── css/styles.css      → tokens de diseño, componentes, versión desktop y versión móvil (media queries)
├── js/main.js          → interacciones (menú, idioma, pestañas, detalles, parallax, formulario, gato)
├── js/modelos-3d.js    → modelos 3D de las comidas con three.js (visor interactivo)
└── img/                → logo, fotos, platos 3D (GIF), gato barista, cursores
```

## Secciones

1. **Header** fijo con navegación por anclas y selector de idioma ES / 日本語. En el computador se encoge a un círculo al bajar; en el celular tiene menú ☰.
2. **Hero** con el logo como titular (`h1`) y una bajada.
3. **Parallax** del local en capas (foto, huellitas y corazones a distintas velocidades).
4. **¿Quiénes somos?** con el gato barista animado (al tocarlo saluda y maúlla).
5. **Promos**: módulo de cards con parallax horizontal (computador) o vertical (celular) y ventana de detalle.
6. **Menú**: pestañas Ramen, Sushi, Bebidas y Postres; cada plato en 3D se puede girar arrastrándolo, y "Ver plato real" abre la foto.
7. **Adopta un michi**: galería en movimiento.
8. **¿Cómo adoptar?**: 4 pasos y la sala de michis.
9. **Solicitud de adopción**: formulario con etiquetas, validación y mensaje de confirmación (maqueta, no envía datos).
10. **Ubicación**: datos y mapa que abre Google Maps.
11. **Footer** con contacto, enlaces y redes.

## Accesibilidad

- Jerarquía de títulos `h1` → `h2` → `h3` sin saltos.
- Textos `alt` descriptivos en todas las imágenes informativas (`alt=""` solo en las decorativas).
- Foco visible en todos los elementos interactivos.
- Formulario con `<label>` en cada campo, `<fieldset>` y `<legend>`, y errores anunciados al lector de pantalla.
- Enlace "Saltar al contenido".
- Pestañas y modelos 3D accesibles con teclado.
- Ventana de detalle con `<dialog>`: se cierra con Esc y devuelve el foco.
- Colores de texto con contraste WCAG AA (revisados en computador y celular).
- Respeta `prefers-reduced-motion`.

## Ver el sitio

Abrir `index.html` en el navegador o visitar la versión publicada en **GitHub Pages**.

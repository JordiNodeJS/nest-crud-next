# Reglas Personalizadas para Next.js 15

Este documento explica cómo utilizar las reglas personalizadas para Next.js 15 definidas en el archivo `next15-custom-rules.json` para mejorar tu flujo de trabajo en el editor Cursor.

## Introducción

Las reglas personalizadas para Next.js 15 están diseñadas para ayudarte a seguir las mejores prácticas de desarrollo con Next.js 15 en este proyecto. Estas reglas cubren aspectos como:

- Estructura del App Router
- Organización de componentes
- Uso apropiado de Server y Client Components
- Importaciones de tipos
- Obtención de datos y estrategias de caché
- Optimización de imágenes y rendimiento
- Accesibilidad

## Cómo Aplicar las Reglas

Para utilizar estas reglas con el editor Cursor, sigue estos pasos:

1. Asegúrate de que el archivo `next15-custom-rules.json` esté en la raíz del proyecto.
2. Configura Cursor para reconocer estas reglas personalizadas:
   - Abre la configuración del editor
   - Busca la sección de "Custom Rules" o "Linting"
   - Agrega la ruta al archivo `next15-custom-rules.json`

## Tipos de Reglas

Las reglas están divididas en diferentes tipos según cuándo y cómo se aplican:

### Always (Siempre)

Estas reglas están siempre activas y se aplican en todo momento. Por ejemplo:
- Verificar que las páginas estén definidas correctamente en el directorio `app/`
- Asegurar que existe un layout raíz para toda la aplicación

### Auto Attached (Auto Adjuntadas)

Estas reglas se aplican automáticamente cuando se trabaja en archivos relevantes. Cubren:
- Organización de componentes en directorios lógicos
- Uso correcto de 'use client' en componentes
- Importaciones de tipos adecuadas
- Prácticas de obtención de datos
- Optimización de imágenes y rendimiento
- Pautas de accesibilidad

## Severidad de las Alertas

Cada regla tiene un nivel de severidad asociado:

- **Error**: Problemas críticos que deben corregirse
- **Warning**: Potenciales problemas o desviaciones de las mejores prácticas
- **Suggestion**: Recomendaciones para mejorar el código

## Ejemplos de Aplicación

### Server vs. Client Components

```tsx
// ❌ Incorrecto: Directiva 'use client' innecesaria
'use client'
export function StaticComponent() {
  return <h1>Hola Mundo</h1>;
}

// ✅ Correcto: Usando 'use client' con hooks
'use client'
export function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Contador: {count}</button>;
}
```

### Importaciones de Tipos

```tsx
// ❌ Incorrecto: Usando espacio de nombres React para tipos
interface ButtonProps {
  onClick: React.MouseEventHandler;
  children: React.ReactNode;
}

// ✅ Correcto: Importaciones nombradas de tipos
import type { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  onClick: MouseEventHandler;
  children: ReactNode;
}
```

### Optimización de Imágenes

```tsx
// ❌ Incorrecto: Uso de etiqueta img nativa
function Avatar() {
  return <img src="/avatar.jpg" width={100} height={100} />;
}

// ✅ Correcto: Uso del componente Image de Next.js
import Image from 'next/image';

function Avatar() {
  return (
    <Image 
      src="/avatar.jpg" 
      width={100} 
      height={100} 
      alt="Avatar del usuario"
      sizes="(max-width: 768px) 100px, 50px"
    />
  );
}
```

## Beneficios

Seguir estas reglas te ayudará a:

1. Mantener un código consistente y de alta calidad
2. Prevenir errores comunes en desarrollo con Next.js
3. Mejorar el rendimiento de tu aplicación
4. Garantizar la accesibilidad para todos los usuarios
5. Facilitar el trabajo en equipo con convenciones claras

Estas reglas están diseñadas específicamente para complementar la estructura y convenciones de este proyecto, siguiendo las mejores prácticas recomendadas en la documentación oficial de Next.js 15. 
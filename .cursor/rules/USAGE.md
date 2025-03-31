# Uso de las Reglas Personalizadas para Next.js 15

Este documento explica cómo utilizar las reglas personalizadas definidas en el archivo `next15-custom-rules.mdc` para mejorar tu flujo de trabajo con Next.js 15 en el editor Cursor.

## Activación de las Reglas

Las reglas personalizadas se activan automáticamente al trabajar en un proyecto Next.js 15 en el editor Cursor. No se requiere configuración adicional, ya que los archivos en la carpeta `.cursor/rules` son reconocidos por el editor.

## Tipos de Reglas

### Reglas "Always"

Estas reglas se aplican siempre, independientemente del contexto. Por ejemplo:

- **app-router-structure**: Garantiza que la estructura de tu aplicación con App Router sea correcta, verificando la existencia y ubicación de páginas y layouts.

### Reglas "Auto Attached"

Estas reglas se aplican automáticamente al trabajar en archivos relevantes:

- **component-organization**: Se activa al trabajar con componentes para asegurar que se organicen en los directorios adecuados.
- **server-client-components**: Verifica el uso correcto de Server Components y Client Components.
- **type-imports**: Asegura que las importaciones de tipos en React se realicen siguiendo las mejores prácticas.
- **data-fetching**: Proporciona sugerencias para la obtención de datos eficiente.
- **image-optimization**: Garantiza el uso óptimo de imágenes en tu aplicación.
- **performance-optimization**: Ayuda a mejorar el rendimiento de tu aplicación.
- **accessibility**: Asegura que tu aplicación sea accesible para todos los usuarios.

## Interpretación de las Alertas

Cuando el editor Cursor encuentra una coincidencia con alguna de las reglas, mostrará una alerta con diferentes niveles de severidad:

- **Error**: Problemas críticos que deben corregirse inmediatamente.
- **Warning**: Potenciales problemas que pueden afectar la calidad del código.
- **Suggestion**: Recomendaciones para mejorar el código que no son urgentes.

Las alertas "positivas" (con `is_positive: true`) son indicadores de buenas prácticas que ya estás siguiendo.

## Ejemplos de Aplicación

### Server Components vs. Client Components

```tsx
// ❌ La regla 'server-client-components' marcará esto como una advertencia
// porque 'use client' es innecesario si no se usan hooks o eventos
'use client'
export function StaticContent() {
  return <p>Este es un contenido estático</p>;
}

// ✅ La regla aprobará esto porque el componente utiliza hooks
'use client'
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Contador: {count}</button>;
}
```

### Optimización de Imágenes

```tsx
// ❌ La regla 'image-optimization' marcará esto como una advertencia
export function Avatar() {
  return <img src="/avatar.jpg" width={100} height={100} />;
}

// ✅ La regla aprobará esto porque usa el componente Image con atributo alt
import Image from 'next/image';

export function Avatar() {
  return (
    <Image 
      src="/avatar.jpg" 
      width={100} 
      height={100} 
      alt="Avatar del usuario"
    />
  );
}
```

## Beneficios de Usar Estas Reglas

1. **Consistencia**: Mantiene un código consistente siguiendo las mejores prácticas de Next.js 15.
2. **Calidad**: Reduce los errores comunes y mejora la calidad general del código.
3. **Rendimiento**: Ayuda a implementar optimizaciones de rendimiento clave.
4. **Accesibilidad**: Garantiza que tu aplicación sea accesible para todos los usuarios.
5. **Aprendizaje**: Sirve como guía de aprendizaje para las mejores prácticas de Next.js 15.

## Personalización

Si necesitas personalizar alguna de estas reglas para adaptar a las necesidades específicas de tu proyecto:

1. Edita el archivo `next15-custom-rules.mdc` en la carpeta `.cursor/rules`.
2. Ajusta los patrones, mensajes o niveles de severidad según sea necesario.
3. Guarda el archivo para que los cambios surtan efecto inmediatamente.

## Referencia rápida de patrones usados en las reglas

Aquí hay una referencia rápida de los patrones regulares usados en las reglas:

- `app/[a-zA-Z0-9-_]*/page\.(tsx|jsx)`: Detecta archivos de página en el App Router
- `'use client'`: Detecta la directiva de Client Component
- `onClick|onChange|onSubmit`: Detecta manejadores de eventos que requieren Client Components
- `import type \{ [a-zA-Z, ]* \} from 'react'`: Detecta importaciones de tipo correctas
- `<Suspense\s*fallback=`: Detecta el uso de Suspense para streaming 


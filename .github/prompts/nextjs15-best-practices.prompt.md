# Next.js 15 Best Practices

This guide outlines best practices for developing the Next.js frontend in this monorepo. It expands upon the structure defined in the [main instructions](../copilot-instructions.md).

## Project Structure

### App Router

- Use the App Router for new features
- Organize routes in the `app/` directory
- Leverage nested layouts for shared UI across routes
- Use route groups `(groupName)` to organize routes without affecting URL structure

### Component Organization

- Separate components into logical directories:
  - `components/ui/` - Reusable UI components
  - `components/features/` - Feature-specific components
  - `components/layouts/` - Layout components

### Server Components vs. Client Components

- Prefer Server Components by default
- Use the `"use client"` directive only when necessary:
  - When using hooks
  - When using browser-only APIs
  - When using event listeners
- Keep client component bundles small

## Inports

La importación de un typo de React debe seguir estas reglas:
Ejemplo:
en vez de:

```typescript
interface FormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel?: () => void;
  formRef?: React.RefObject<HTMLFormElement>;
}
```

Debe ser:

```typescript
import type { RefObject } from "react";
...
interface FormProps {
  ...
  formRef?: RefObject<HTMLFormElement>;
}

```

## Data Fetching

### Server-Side Data Fetching

- Use React Server Components for data fetching
- Implement caching strategies using `cache()`, `revalidatePath()`, and `revalidateTag()`
- Consider SWR or React Query for client-side data management

### API Communication

- Create typed API clients for backend communication
- Use environment variables for API endpoints
- Implement proper error handling for API requests

Example:

```typescript
// Sample API client function
export async function fetchUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    next: { tags: ["users"] }, // For revalidation
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}
```

## Rendering Strategies

### Static vs. Dynamic Rendering

- Prefer static rendering for content that doesn't change often
- Use dynamic rendering for personalized or frequently updated content
- Implement Incremental Static Regeneration (ISR) for content that changes occasionally

### Streaming

- Use streaming for improved user experience
- Implement `<Suspense>` boundaries around data-fetching components
- Break down pages into logical streaming chunks

## Performance Optimization

### Images and Assets

- Use `next/image` for automatic image optimization
- Implement responsive images with appropriate sizes
- Consider using modern formats (WebP, AVIF)

### JavaScript Optimization

- Minimize client-side JavaScript
- Implement code splitting using dynamic imports
- Use tree shaking to eliminate unused code

### Fonts and CSS

- Use `next/font` for optimized font loading and zero layout shift
- Consider CSS-in-JS or Tailwind CSS for styling
- Implement critical CSS techniques

## State Management

- For simple state: Use React Context or useState
- For complex state: Consider Zustand, Jotai, or Redux Toolkit
- Keep state as close as needed to the components that use it

## Testing

- Write unit tests for UI components
- Implement integration tests for page functionality
- Use tools like Playwright for end-to-end testing
- Test on multiple devices and browsers

## Accessibility

- Implement proper semantic HTML
- Ensure keyboard navigation works for all interactive elements
- Maintain appropriate color contrast
- Add ARIA attributes where necessary
- Test with screen readers

## Deployment and CI/CD

- Set up continuous integration for testing
- Implement Vercel or similar platform for previews
- Use environment variables for configuration
- Implement proper error monitoring in production

By following these practices, you'll build a performant, maintainable, and user-friendly Next.js application.

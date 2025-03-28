# NestJS Best Practices

This guide outlines best practices for developing the NestJS backend in this monorepo. It expands upon the structure defined in the [main instructions](../copilot-instructions.md).

## Code Organization

### Modular Structure

- Group functionality into feature modules
- Each module should encapsulate related components (controllers, services, entities)
- Keep the `app.module.ts` clean by delegating to feature modules

### Naming Conventions

- Files should follow the pattern: `name.type.ts` (e.g., `user.controller.ts`, `user.service.ts`)
- Class names should be descriptive and follow PascalCase (e.g., `UserController`, `AuthService`)
- Methods and properties should use camelCase

## API Design

### Controllers

- Keep controllers focused on request handling and route definitions
- Delegate business logic to services
- Use appropriate HTTP methods for operations (GET, POST, PUT, DELETE, etc.)
- Implement proper response status codes

### DTOs

- Create separate DTOs for different operations (create, update, response)
- Use class-validator decorators for validation
- Implement class-transformer for serialization/deserialization
- Example:

  ```typescript
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
  }
  ```

### Error Handling

- Create custom exception filters for consistent error responses
- Use built-in NestJS exceptions (NotFoundException, UnauthorizedException, etc.)
- Log errors appropriately with context information

## Database Practices

### Entities

- Define clear relationships between entities
- Use TypeORM decorators appropriately
- Implement proper indexing for performance
- Example:

  ```typescript
  @Entity()
  export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    username: string;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];
  }
  ```

### Repository Pattern

- Use TypeORM repositories for database operations
- Create custom repository methods for complex queries
- Consider using query builders for dynamic queries

## Authentication & Authorization

- Implement JWT authentication
- Use Guards for protecting routes
- Create role-based access control when needed
- Keep authentication logic in a dedicated module

## Testing

- Write unit tests for services and controllers
- Implement e2e tests for critical API endpoints
- Use test databases for integration tests
- Mock external dependencies

## Performance

- Implement caching for frequently accessed data
- Use lazy loading for modules when appropriate
- Consider implementing pagination for large data sets
- Optimize database queries with proper indexing

By following these practices, you'll maintain a clean, maintainable, and performant NestJS backend.

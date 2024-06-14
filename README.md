# NestJS Course Notes

## Overview
The Course is Introduced by [Laith Academy](https://www.youtube.com/@laithacademy) on Youtube.
The Link to the [Course Video](https://www.youtube.com/watch?v=BiN-xzNkH_0&t=138s)

### Class-Based Structure

- **Class-Based Components**: Most components in NestJS, such as controllers, services, and modules, are defined as classes.

### Controllers

- **Definition**: Controllers handle incoming requests and return responses. They define and create endpoints.
    - **Separation of Concerns**: Controllers should delegate business logic to services and focus on request and response logic only.

### Services

- **Business Logic**: Services encapsulate the business logic of the application.
    - **Dependency Injection**:
        - Define the service class with the `@Injectable` decorator.
        - Add the exported class name to the `providers` array in the `@Module` decorator within the module file.

### Modules

- **Dependency Management**: Modules organize the application structure and manage dependencies between components such as controllers and services.

### Pipes

- **Functionality**: Pipes are used to transform and validate data.
    - **Validation**: Primarily used for validation.
        - **Built-in Validation Pipes**: Pipes like `ParseIntPipe` check for specific data types such as integers.
        - **Data Type Pipes**: There are built-in pipes for various data types.
    - **Enum Validation**: To validate an enum, instantiate the `ParseEnumPipe` and pass the defined enum.

### Using Validation Pipe Middleware

- **Global Pipe Middleware**: To use validation pipe middleware globally, access the `useGlobalPipes` method on the app instance in the main file and pass parameters to it.
    - **Basic Setup**:
    
    ```tsx
    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      app.useGlobalPipes(new ValidationPipe());
      await app.listen(3000);
    }
    ```
    
    - **Whitelist Validation**: To remove all properties not defined in the DTO from the request body (for POST or PUT requests), set `whitelist: true` in the `ValidationPipe` options.
    
    ```tsx
    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      app.useGlobalPipes(new ValidationPipe({
        whitelist: true
      }));
      await app.listen(3000);
    }
    ```
    
    - **Forbid Non-Whitelisted Properties**: Optionally, throw an error for non-whitelisted properties by setting `forbidNonWhitelisted: true`.
    
    ```tsx
    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
      }));
      await app.listen(3000);
    }
    ```

### Data Transfer Objects (DTOs)

- **Purpose**: DTOs are used to validate and transform request data.
    - **Transformation**: DTOs transform data into the required form.
- **Validation**: Use the `class-validator` package, which provides various validators that can be used as decorators to validate DTO properties.

---

These notes summarize the key concepts and best practices for building applications with NestJS. Use them as a reference guide to create well-structured and maintainable NestJS applications.

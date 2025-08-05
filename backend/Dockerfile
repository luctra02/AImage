# Stage 1: Build the application
FROM openjdk:17-jdk-slim AS build
WORKDIR /app

# Copy all files needed for the build
COPY . .

# Make gradlew executable
RUN chmod +x gradlew

# Build the application (skip tests for production build)
RUN ./gradlew build -x test --no-daemon

# Stage 2: Create the final Docker image
FROM openjdk:17-jdk-slim
VOLUME /tmp

# Copy the JAR from the build stage (using wildcard to find the correct JAR)
COPY --from=build /app/build/libs/*.jar app.jar

# Create a non-root user
RUN addgroup --system javauser && adduser --system --ingroup javauser javauser
RUN chown javauser:javauser app.jar
USER javauser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"] 
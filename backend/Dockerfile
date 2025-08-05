# Stage 1: Build the application
FROM openjdk:17-jdk AS build
WORKDIR /app

# Copy Gradle wrapper and build files
COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .

# Make gradlew executable
RUN chmod +x gradlew

# Download dependencies
RUN ./gradlew dependencies --no-daemon

# Copy source code
COPY src src

# Build the application (skip tests for production build)
RUN ./gradlew build -x test --no-daemon

# Stage 2: Create the final Docker image
FROM openjdk:17-jdk
VOLUME /tmp

# Copy the JAR from the build stage
COPY --from=build /app/build/libs/AImageBackend-0.0.1-SNAPSHOT.jar app.jar

# Create a non-root user
RUN addgroup --system javauser && adduser --system --ingroup javauser javauser
RUN chown javauser:javauser app.jar
USER javauser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"] 
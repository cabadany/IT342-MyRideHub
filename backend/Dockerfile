# Use Java 17 as base
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy built JAR from Maven target folder
COPY target/*.jar app.jar

# Run Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
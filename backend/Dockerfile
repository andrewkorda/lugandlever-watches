# syntax=docker/dockerfile:1.4
# --- Stage 1: Build & Layer Extract ---
    FROM eclipse-temurin:21-jdk-alpine AS builder
    WORKDIR /workspace
    
    RUN apk add --no-cache dos2unix
    
    COPY gradlew .
    COPY gradle gradle
    COPY build.gradle settings.gradle ./
    RUN dos2unix gradlew && chmod +x gradlew
    RUN --mount=type=cache,target=/root/.gradle ./gradlew dependencies --no-daemon
    
    COPY src src
    RUN --mount=type=cache,target=/root/.gradle ./gradlew bootJar --no-daemon -x test
    
    WORKDIR /workspace/build/libs
    RUN java -Djarmode=tools -jar $(ls *.jar) extract --layers --launcher --destination /workspace/extracted
    
    # --- Stage 2: Runtime Container ---
    FROM eclipse-temurin:21-jre-alpine AS runner
    WORKDIR /application
    
    RUN addgroup -S appgroup && adduser -S appuser -G appgroup
    USER appuser:appgroup
    
    COPY --from=builder /workspace/extracted/dependencies/ ./
    COPY --from=builder /workspace/extracted/spring-boot-loader/ ./
    COPY --from=builder /workspace/extracted/snapshot-dependencies/ ./
    COPY --from=builder /workspace/extracted/application/ ./
    
    ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0 -XX:InitialRAMPercentage=50.0 -Djava.awt.headless=true"
    EXPOSE 8080
    
    ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS org.springframework.boot.loader.launch.JarLauncher"]
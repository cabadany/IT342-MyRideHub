package com.sia.myridehub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class MyridehubApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyridehubApplication.class, args);
	}

	// ✅ Simple health check endpoint to test if backend responds
	@RestController
	class HealthCheckController {
		@GetMapping("/")
		public String healthCheck() {
			return "✅ MyRideHub backend is up and running!";
		}
	}
}
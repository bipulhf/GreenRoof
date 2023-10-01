package com.bankrupted.greenroof;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@SpringBootApplication
public class GreenRoofApplication {

	public static void main(String[] args) {
		SpringApplication.run(GreenRoofApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry
						.addMapping("/**")
						.allowedMethods("*")
						.allowedHeaders("*")
						.allowCredentials(true)
						.allowedOrigins("https://greenroof.vercel.app/");
			}
		};
	}

}

package com.manhphuong.nestecom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class NestecomApplication {

	public static void main(String[] args) {
		SpringApplication.run(NestecomApplication.class, args);
	}

}

package com.manhphuong.nestecom.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class RedisTestRunner implements CommandLineRunner {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Override
    public void run(String... args) throws Exception {
        try {
            redisTemplate.opsForValue().set("testKey", "Hello Redis!");
            String value = redisTemplate.opsForValue().get("testKey");
            System.out.println("Value from Redis: " + value);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Unable to connect to Redis");
        }
    }
}

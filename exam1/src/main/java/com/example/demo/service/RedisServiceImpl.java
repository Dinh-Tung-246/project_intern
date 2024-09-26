package com.example.demo.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisServiceImpl {
    public final RedisTemplate<String, Object> redisTemplate;


    public RedisServiceImpl(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }


    public String getValue(String key) {
        String value = (String) redisTemplate.opsForValue().get(key);
        return value;
    }


    public void set(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }


    public boolean checkExists(String key, String value) {
        if(redisTemplate.opsForValue().get(key).equals(value.trim())){
            return true;
        }
        else return false;
    }
}

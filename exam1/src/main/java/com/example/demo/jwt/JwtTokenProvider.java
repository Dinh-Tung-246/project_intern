package com.example.demo.jwt;

import com.example.demo.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtTokenProvider {
    private final String JWT_SECRET = "user";
    private final long JWT_EXPIRATION = 6000000L; // 1m = 60000L
    public static String TOKEN_PREFIX = "Bearer "; // tên phân loại token
    public static RedisTemplate template;

    // khởi tạo token
    public String generateToken(User user){
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        return Jwts.builder()
                    .setSubject(user.getUsername())
                    .setIssuedAt(now)
                    .setExpiration(expiryDate)
                    .signWith(SignatureAlgorithm.HS256, JWT_SECRET)
                    .compact();
    }

    // xác thực token
    public boolean isValidToken(String token){
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(JWT_SECRET)
                    .parseClaimsJws(token)
                    .getBody();
            return true;
        } catch (Exception e){
            return false;
        }
    }


    public String getUserIdFromToken(String token){
        Jws<Claims> claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token);

        return claims.getBody().getSubject();
    }
}

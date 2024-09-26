package com.example.demo.exception;

import com.example.demo.jwt.JwtTokenProvider;
import com.example.demo.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppException{
    private String err_cd;
    private String err_msg;
    private String jwt_token;
    private String token_type;
}

package com.example.demo.model;

import lombok.Data;

import java.sql.Date;

@Data // bao gồm cả NoArgsContructor và AllArgsConstructor
public class UserResponse {
    private Integer id;
    private String userName;
    private Date createdate;

    public UserResponse(User u){
        userName = u.getUsername();
        createdate = u.getCreateDate();
        id = u.getId();
    }
}

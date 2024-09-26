package com.example.demo.model;

import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Data // đã bao gồm cả hai anotation @NoArgsConstructor
        // và @AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotBlank(message = "username khong duoc trong")
    @Column(name = "username")
    private String username;

    @NotBlank(message = "password khong duoc trong")
    @Column(name = "password")
    private String password;

    @Column(name = "createdate")
    private Date createDate;

    @ManyToOne
    @JoinColumn(name = "roleid")
    private Role role;
}

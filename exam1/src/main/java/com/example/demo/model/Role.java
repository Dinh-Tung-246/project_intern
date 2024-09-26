package com.example.demo.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@Table(name = "roles")
public class Role {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "namerole")
    private String nameRole;

    @Column(name = "createuser")
    private boolean createUser;

    @Column(name = "updateuser")
    private boolean updateUser;

    @Column(name = "deleteuser")
    private boolean deleteUser;

    @Column(name = "finduser")
    private boolean findUser;

}

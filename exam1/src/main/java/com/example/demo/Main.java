package com.example.demo;

import com.example.demo.model.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.sql.Date;
import java.util.Map;

@Component
@EnableConfigurationProperties
public class Main {
    private final Permission permissions;

    @Autowired
    public Main(Permission permission) {
        this.permissions = permission;
    }

    public void getDemo(){
//        for (Map.Entry<String, String> p : permissions.getPathToPermission().entrySet()){
//            System.out.println(p.getKey() + ":  " + p.getValue());
//        }
//        for (Map.Entry<String, String> p : permissions.getPathToPermissionIgnore().entrySet()){
//            System.out.println(p.getKey() + ":  " + p.getValue());
//        }
        String t = permissions.getPathToPermission().get("/api/inser");
//        if(t.trim().equals("")){
//            System.out.println("1");
//        }
    }


}

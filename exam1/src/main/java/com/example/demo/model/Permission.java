package com.example.demo.model;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Map;

@Data
@Component
@ConfigurationProperties(prefix = "api-permission") // lấy các config có tiền tố là api-permission
public class Permission {
    private Map<String, String> pathToPermission;
    private Map<String, String> pathToPermissionIgnore;

    public Permission() {
    }

    public Permission(Map<String, String> pathToPermission, Map<String, String> pathToPermissionIgnore) {
        this.pathToPermission = pathToPermission;
        this.pathToPermissionIgnore = pathToPermissionIgnore;
    }
}

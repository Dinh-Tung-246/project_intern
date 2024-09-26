package com.example.demo.service;

import com.example.demo.repo.PermissionRepo;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
@EnableConfigurationProperties
public class PermissionService {
    @Autowired
    PermissionRepo permissionRepo;

    public boolean getCheckRoleRequest(HttpServletResponse response, Integer userid, String action) throws Exception {
        if(permissionRepo.getCheckRole(userid, action) == null){
            return unAuthentication(response, 201, "Bạn tuổi gì mà đòi mon men zô đây !!!");
        }
        return true;
    }

    private boolean unAuthentication(HttpServletResponse response, Integer err_cd, String err_msg) throws Exception {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF8");
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("error_code: ",err_cd);
        jsonObject.put("error_message: ",err_msg);
        response.getWriter().write(jsonObject.toString());
        return false;
    }
}

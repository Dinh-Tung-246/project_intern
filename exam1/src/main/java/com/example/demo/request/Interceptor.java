package com.example.demo.request;

import com.example.demo.jwt.JwtTokenProvider;
import com.example.demo.model.Permission;
import com.example.demo.service.PermissionService;
import com.example.demo.service.RedisServiceImpl;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
@EnableConfigurationProperties
public class Interceptor extends HandlerInterceptorAdapter {
    private final JwtTokenProvider sv;
    private final RedisServiceImpl redisService; // @Autowired tương tự với final : khai báo 1 lần và không thể thay đổi giá trị
    private final PermissionService permissionService;
    private final Permission permission;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String requestURI = request.getRequestURI();
        if (requestURI.contains("/login")) {
            return true;
        }
        String jwttoken = request.getHeader("Authorization");
        jwttoken = jwttoken.substring(7); // xóa đi 7 ký tự đầu của tooken là "Bearer "
        Integer userid = Integer.parseInt(redisService.getValue("Authorization").trim()); //tra ra id user
        String pathPermission = permission.getPathToPermission().get(requestURI); // path to api permission
        String pathPermissionIgnore = permission.getPathToPermissionIgnore().get(requestURI); // path to api perimssion ignore

        if (!redisService.checkExists(redisService.getValue("Authorization"), jwttoken.trim())) {
            return unAuthentication(response, 502, "Token is not exists");
        }
        if (!sv.isValidToken(jwttoken)) {
            return unAuthentication(response, 502, "Token is not validation");
        }
        if (pathPermission == null && pathPermissionIgnore != null) {
            return true;
        }
        if (pathPermission != null && pathPermissionIgnore == null) {
            return permissionService.getCheckRoleRequest(response, userid, pathPermission);
        }
        return unAuthentication(response, 503, "URI khong hop le");

//        if(redisService.checkExists(redisService.getValue("Authorization"), jwttoken.trim()) == true){
//            if (sv.isValidToken(jwttoken)){
//                if(pathPermission == null && pathPermissionIgnore != null){return true;}
//                if (pathPermission != null && pathPermissionIgnore == null){
//                    return permissionService.getCheckRoleRequest(response, userid, pathPermission);
//                }
//                return false;
//            }
//            else return unAuthentication(response, 502, "Token is not validation");
//        }
//        else { return unAuthentication(response, 502, "Token is not exists"); }
    }

    private boolean unAuthentication(HttpServletResponse response, Integer err_cd, String err_msg) throws Exception {
        response.setStatus(HttpServletResponse.SC_BAD_GATEWAY);
        response.setContentType("application/json");
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("error_code: ", err_cd);
        jsonObject.put("error_message: ", err_msg);
        response.getWriter().write(jsonObject.toString());
        return false;
    }
    // response.sendError: gửi một mã trạng thái lỗi HTTP và thông báo lỗi về client
    //                      Serlet Container sẽ auto xóa bất kỳ dữ liệu nào đã được gửi tới client trc đó
    //response.setStatus: Chỉ đơn giản đặt mã trạng thái của response mà không có bất kỳ thông báo cụ thể nào
    //                      khi sử dụng cần đảm bảo đã thiết lập nội dung của response một cách thích hợp trước khi gửi về client
}

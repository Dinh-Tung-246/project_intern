package com.example.demo.service;

import com.example.demo.exception.AppException;
import com.example.demo.jwt.JwtTokenProvider;
import com.example.demo.model.User;
import com.example.demo.model.UserResponse;
import com.example.demo.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor // anotation dùng để thêm constructor cho các biến kiểu final(không thể thay đổi giá trị)
public class UserService {
    private final UserRepo repo;

    @Autowired
    RedisServiceImpl redisService;

    public List<UserResponse> findAll(){
        List<UserResponse> ls = new ArrayList<>();
        for(User u: repo.findAll()){
            ls.add(new UserResponse(u));
        }
        return ls;
    }

    public boolean checkUsername(User user){
        for(User u: repo.findAll()){
            if(u.getUsername().equals(user.getUsername())){
                return false;
            }
        }
        return true;
    }

    public AppException checkLogin(User user){
        AppException app = new AppException();
        User user1 = repo.findByUsername(user.getUsername());
        if(user1 == null){
            app.setErr_cd("500");
            app.setErr_msg("Not found User");
            app.setJwt_token("null");
            return app;
        }
        if (!repo.getPassWord(user.getPassword().trim()).equals(user1.getPassword())){
            app.setErr_cd("403");
            app.setErr_msg("Password failed");
            app.setJwt_token("null");
            return app;
        }
        else{
            JwtTokenProvider jwt = new JwtTokenProvider();
            String token = jwt.generateToken(user);
            app.setErr_cd("000");
            app.setErr_msg("login success");
            app.setToken_type("Bearer");
            app.setJwt_token(token);
            redisService.set(user1.getId().toString(), token);
            redisService.set("Authorization",user1.getId().toString());
            return app;
        }
    }

    public AppException insertUser(User user){
        AppException app = new AppException();
        if(checkUsername(user) == false){
            app.setErr_cd("400");
            app.setErr_msg("User exist");
            return app;
        }
        if(user.getPassword().trim().isEmpty()){
                app.setErr_cd("403");
                app.setErr_msg("Password failed");
                return app;
        }
        if(repo.findByRoleId(user.getRole().getId()) == null){
            app.setErr_cd("300");
            app.setErr_msg("Role is not exists");
            return app;
        }
        if(!Character.isLetter(user.getUsername().charAt(0))
                || !Character.isUpperCase(user.getUsername().charAt(0))
                || user.getUsername().trim().length() < 6
        ){
            app.setErr_cd("301");
            app.setErr_msg("Tai khoan bat dau bang ky tu viet hoa va do dai lon hon 5");
            return app;
        }
        if(user.getPassword().trim().length() < 6){
                app.setErr_cd("301");
                app.setErr_msg("Mat khau phải dai hon 5 ky tu");
                return app;
        }
        else {
                app.setErr_cd("000");
                app.setErr_msg("Sign up successfully");
                repo.insertUser(user.getUsername().trim(), user.getPassword().trim(), user.getRole().getId());
                return app;
        }
    }

    public List<UserResponse> FindByUserDate(User user){
        List<UserResponse> l = new ArrayList<>();
        for (User u : repo.findByUD(user.getUsername().trim(), user.getCreateDate())){
            l.add(new UserResponse(u));
        }

        return l;
    }

    public AppException deleteUser(User user){
        AppException app = new AppException();
        if (user.getUsername().trim().isEmpty()){
            app.setErr_cd("403");
            app.setErr_msg("username is not null");
            return app;
        }
        if(repo.deleteByUName(user.getUsername().trim()) == 1){
            app.setErr_cd("000");
            app.setErr_msg("delete user successful");
            return app;
        }
        else {
            app.setErr_cd("500");
            app.setErr_msg("User not exist");
            return app;
        }
    }

    public AppException update(User user){
        AppException app = new AppException();
        if (user.getId() == null){
            app.setErr_cd("400");
            app.setErr_msg("Id not null");
            return app;
        }
        if (user.getUsername().trim().isEmpty() || user.getPassword().trim().isEmpty()){
            app.setErr_cd("403");
            app.setErr_msg("Username or password is not null");
            return app;
        }
        if(!Character.isLetter(user.getUsername().charAt(0))
                || !Character.isUpperCase(user.getUsername().charAt(0))
                || user.getUsername().trim().length() < 6
        ){
            app.setErr_cd("301");
            app.setErr_msg("Tai khoan bat dau bang ky tu viet hoa va do dai lon hon 5");
            return app;
        }
        if(user.getPassword().trim().length() < 6){
            app.setErr_cd("301");
            app.setErr_msg("Mat khau phải dai hon 5 ky tu");
            return app;
        }
        else {
            if(repo.updateById(user.getId(), user.getUsername().trim(), user.getPassword().trim()) == 0){
                app.setErr_cd("500");
                app.setErr_msg("Id not exist or Username is exists");
                return app;
            }
            else {
                app.setErr_cd("000");
                app.setErr_msg("update successful");
                return app;
            }
        }
    }
}

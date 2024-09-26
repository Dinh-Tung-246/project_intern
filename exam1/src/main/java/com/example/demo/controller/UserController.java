package com.example.demo.controller;

import com.example.demo.Main;
import com.example.demo.exception.AppException;
import com.example.demo.model.User;
import com.example.demo.model.UserResponse;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService sv;

    @Autowired
    Main main;

    @GetMapping("/list")
    public List<UserResponse> getAll(){
        return sv.findAll();
    }

    @PostMapping("/login")
    public AppException checkLogin(@Valid @RequestBody User user, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            AppException app = new AppException();
            app.setErr_cd("1000");
            app.setErr_msg("Username and Password not null or empty");
            return app;
        }
        else return sv.checkLogin(user);
    }

    @GetMapping("/insert")
    public AppException insertUser(@Valid @RequestBody User user, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            AppException app = new AppException();
            app.setErr_cd("2000");
            app.setErr_msg("khong duoc de trong cac truong");
            return app;
        }
        return sv.insertUser(user);
    }

    @GetMapping("/search")
    public List<UserResponse> search(@RequestBody User user){return sv.FindByUserDate(user); }

    @GetMapping("/delete")
    public AppException delete(@RequestBody User user){ return sv.deleteUser(user);}

    @GetMapping("/update")
    public AppException update(@RequestBody User user){return sv.update(user);}

    @GetMapping("/demo")
    public void get(){ main.getDemo(); }
}

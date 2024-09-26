package com.example.demo.repo;

import com.example.demo.model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
@Mapper
public interface UserRepo {
     //dung anotition de viet truy van

//    @Select("SELECT id, username, password, createdate FROM users")
//    List<User> findAll();
//
//
//    @Select("SELECT * FROM users \n" +
//            "WHERE username = #{username};")
//    User findByUsername(String username);
//
//
//    @Select("SELECT * FROM users \n" +
//            " WHERE id = #{id};")
//    User findById(Integer id);
//
//
//    @Select("SELECT * FROM users \n" +
//            "WHERE createdate < #{createdate} ")
//    List<User> findByDate(Date createdate);
//
//
//    @Select("SELECT * FROM users \n" +
//            "WHERE username = #{username} \n" +
//            "AND createdate < #{createdate} ")
//    User findByUD(String username, Date createdate);
//
//
//    @Select("SELECT MD5(#{password})")
//    String getPassWord(String password);
//
//
//     @Insert("INSERT INTO users(username, password) \n" +
//             "VALUES (#{username}, MD5(#{password}) );")
//     void insertUser(String username, String password);
//
//     @Delete("DELETE FROM users \n" +
//             "WHERE username = #{username};")
//     void deleteByUName(String username);
//
//     @Update("UPDATE users \n" +
//             "SET username = #{username}, password = MD5(#{password}) \n" +
//             "WHERE id = #{id};")
//     void updateById(Integer id, String username, String password);



    // sử dụng mapper xml để viết truy vấn


     List<User> findAll();

     User findByUsername(String username);

     void insertUser(String username, String password, Integer roleid);

     String getPassWord(String password);

     User findByRoleId(Integer id);

     User findById(Integer id);

     List<User> findByUD(String username, Date createdate);

     int deleteByUName(String username);

     int updateById(Integer id, String username, String password);
}

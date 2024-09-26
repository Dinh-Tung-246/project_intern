package com.example.demo.repo;

import com.example.demo.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface PermissionRepo {
    User getCheckRole(Integer id, String action);
}

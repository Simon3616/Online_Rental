package com.example.staybooking.repository;

import com.example.staybooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository; //预先实现了很多基本功能
import org.springframework.stereotype.Repository; // 直接IMPORT 不需要再自己实现

@Repository
public interface UserRepository extends JpaRepository<User, String> {
 // Spring 使我们不需要使用@override 来继承接口
}
// 写FindBy...这种函数时 Interface可以自动十八name convention类似函数来实现
// 自己写不同逻辑
// public UserRespositoryIMP implements UserRepository{
// @override
//...........
//}
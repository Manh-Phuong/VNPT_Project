package com.manhphuong.nestecom.repository;

import com.manhphuong.nestecom.entity.Role;
import com.manhphuong.nestecom.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
        @Query(value = "select r" +
            " from UserRole ur" +
            " join Role r" +
            " on ur.uuidRole = r.uuidRole" +
            " where ur.uuidUser = :uuidUser"
            , nativeQuery = false)
        List<Role> getListRoleUser(@Param("uuidUser") String uuidUser);

//        @Modifying
//        @Query("update Role u set u.activate = 1")
//        Optional<Role> addRoleUser(@Param("userId") String userId, @Param("roleId") String roleId);
}

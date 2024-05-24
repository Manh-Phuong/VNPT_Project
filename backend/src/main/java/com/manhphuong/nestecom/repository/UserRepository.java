package com.manhphuong.nestecom.repository;

import com.manhphuong.nestecom.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    @Modifying
    @Query("update User u set u.activate = 1 where u.uuidUser = :userId")
    int verifySuccess(@Param("userId") String userId);

    @Modifying
    @Query("update User u set u.activationCode = :activationCode, u.verifyError = 0 where u.uuidUser = :userId")
    int regenerateActivationCode(@Param("userId") String userId, @Param("activationCode") String activationCode);

    @Modifying
    @Query("update User u set u.verifyError = :updateVerifyError where u.uuidUser = :userId")
    int updateVerifyError(@Param("userId") String userId, @Param("updateVerifyError") int updateVerifyError);

    @Modifying
    @Query("update User u set u.lastLogin = :lastLogin where u.uuidUser = :userId")
    int updateLastLogin(@Param("userId") String userId, @Param("lastLogin") Date lastLogin);

    @Query(value = "select u" +
            " from User u" +
            " where u.uuidCart = :uuidCart"
            , nativeQuery = false)
    User findByUuidCart(@Param("uuidCart") String uuidCart);

    @Query(value = "select u" +
            " from User u"
            , nativeQuery = false)
    Page<User> findAllByUuidUser(Pageable page);

    @Query(value = "select u" +
            " from User u" +
            " where u.activate = 0"
            , nativeQuery = false)
    Page<User> listUserUnActive(Pageable page);

    @Query(value = "select u" +
            " from User u" +
            " where u.activate = 1"
            , nativeQuery = false)
    Page<User> listUserActive(Pageable page);

    @Query(value = "select u" +
            " from User u" +
            " where u.activate = -1"
            , nativeQuery = false)
    Page<User> listUserBan(Pageable page);

    @Modifying
    @Query("update User u set u.activate = -1 where u.uuidUser = :userId")
    int banUser(@Param("userId") String userId);

    @Modifying
    @Query("update User u set u.activate = 1  where u.uuidUser = :userId")
    int unbanUser(@Param("userId") String userId);

//    @Modifying
//    @Query(value = "insert into user_role ur (ur.uuid_user, ur.uuid_role) values (:userId, :roleId)", nativeQuery = true)
//    Optional<User> addRoleUser(@Param("userId") String userId, @Param("roleId") String roleId);

    @Modifying
    @Query(value = "INSERT INTO user_role (uuid_user, uuid_role) VALUES (:userId, :roleId)", nativeQuery = true)
    int addRoleUser(@Param("userId") String userId, @Param("roleId") String roleId);

    @Modifying
    @Query("DELETE FROM UserRole ur WHERE ur.uuidUser = :userId AND ur.uuidRole = :roleId")
    int removeRoleUser(@Param("userId") String userId, @Param("roleId") String roleId);


}

package com.manhphuong.nestecom.repository;

import com.manhphuong.nestecom.entity.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAddressRepository  extends JpaRepository<UserAddress, String> {
    @Query(value = "select u" +
            " from UserAddress u" +
            " where u.uuidUser = :uuidUser"
            , nativeQuery = false)
    Optional<UserAddress> findByUuidUser(@Param("uuidUser") String uuidUser);
}

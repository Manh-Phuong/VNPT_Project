package com.manhphuong.nestecom.repository;

import com.manhphuong.nestecom.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, String> {
    @Query(value = "select p" +
            " from Product p" +
            " where p.uuidUser = :uuidUser"
            , nativeQuery = false)
    Page<Product> findAllByUserId(Pageable page, @Param("uuidUser") String uuidUser);

    @Query(value = "select p" +
            " from Product p" +
            " where p.uuidProduct = :uuidProduct and p.publishedDate <= :currentDate"
            , nativeQuery = false)
    Optional<Product> findProductPublic(@Param("uuidProduct") String uuidProduct, @Param("currentDate") Date currentDate);

//        @Modifying
//    @Query("delete from Product f where f.id = :folderId and f.ownerAccount = :ownerAccount")
//    int deleteReallyFolder(@Param("folderId") String folderId, @Param("ownerAccount") String ownerAccount);
}

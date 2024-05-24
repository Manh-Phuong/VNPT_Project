package com.manhphuong.nestecom.entity;

import com.manhphuong.nestecom.common.Common;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product")
public class Product {
    @Id
    @Size(max = 40)
    @Builder.Default
    @Column(name = "uuid_product")
    private String uuidProduct = Common.uuid();
//    private String uuidProduct;

//    @PrePersist
//    public void generateUuid() {
//        if (uuidProduct == null) {
//            uuidProduct = Common.uuid();
//        }
//    }

    @NotNull
    @Size(max = 75)
    @Column(name = "title")
    private String title;

    @Size(max = 100)
    @Column(name = "meta_title")
    private String metaTitle;

    @Column(name = "summary")
    private String summary;

    @NotNull
    @Builder.Default
    @Column(name = "type")
    private short type = 0;

    @NotNull
    @Builder.Default
    @Column(name = "price")
    private double price = 0;

    @NotNull
    @Builder.Default
    @Column(name = "quantity")
    private short quantity = 0;

    @Column(name = "created_date")
    @CreationTimestamp
    private Timestamp createdDate;

    @Column(name = "updated_date")
    @UpdateTimestamp
    private Timestamp updatedDate;

    @Column(name = "published_date")
    private Timestamp publishedDate;

    @Column(name = "description")
    private String description;

//    @NotNull
    @Size(max = 40)
    @Column(name = "uuid_branch")
    private String uuidBranch;

    @NotNull
    @Size(max = 40)
    @Column(name = "uuid_user")
    private String uuidUser;
}

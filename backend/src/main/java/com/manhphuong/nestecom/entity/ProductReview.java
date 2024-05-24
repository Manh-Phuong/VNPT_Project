package com.manhphuong.nestecom.entity;

import com.manhphuong.nestecom.common.Common;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "product_review")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductReview {
    @Id
    @NotNull
    @Size(max = 40)
    @Builder.Default
    @Column(name = "uuid_product_review")
    private String uuidProductReview = Common.uuid();;

    @Size(max = 40)
    @Column(name = "uuid_product")
    private String uuidProduct;

    @Size(max = 40)
    @Column(name = "uuid_parent_product_review")
    private String uuidParentProductReview;

    @Column(name = "comment")
    private String comment;

    @NotNull
    @Size(max = 100)
    @Column(name = "title")
    private String title;

    @NotNull
    @Builder.Default
    @Column(name = "rating")
    private short rating = 0;

    @NotNull
    @Builder.Default
    @Column(name = "published")
    private short published = 0;

    @NotNull
    @Column(name = "created_date")
    private Timestamp createdDate;

    @Column(name = "updated_date")
    private Timestamp updatedDate;
}

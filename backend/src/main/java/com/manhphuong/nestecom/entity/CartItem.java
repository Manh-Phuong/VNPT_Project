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
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "cart_item")
public class CartItem {
    @Id
    @Column(name = "uuid_cart_item")
    @Builder.Default
    private String uuidCartItem = Common.uuid();

    @Column(name = "created_date")
    @CreationTimestamp
    private Timestamp createdDate;

    @Column(name = "updated_date")
    @UpdateTimestamp
    private Timestamp updatedDate;

    @NotNull
    @Size(max = 40)
    @Column(name = "uuid_cart")
    private String uuidCart;

    @Builder.Default
    @Size(max = 40)
    @Column(name = "uuid_product")
    private String uuidProduct = null;

    @Builder.Default
    @NotNull
    @Column(name = "price")
    private double price = 0;

    @Builder.Default
    @NotNull
    @Column(name = "discount")
    private double discount = 0;

    @Builder.Default
    @NotNull
    @Column(name = "quantity")
    private short quantity = 0;

    @Builder.Default
    @NotNull
    @Column(name = "active")
    private short active = 0;

    @Column(name = "content")
    private String content;

    @Column(name = "title_product")
    private String titleProduct;

}

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

@Entity
@Table(name = "product_category")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductCategory {
    @Id
    @NotNull
    @Size(max = 40)
    @Builder.Default
    @Column(name = "uuid_product")
    private String uuidProduct = Common.uuid();;

    @Id
    @NotNull
    @Size(max = 40)
    @Column(name = "uuid_category")
    private String uuidCategory;
}

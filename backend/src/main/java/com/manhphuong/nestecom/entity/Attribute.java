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

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "attribute")
public class Attribute {
    @Id
    @NotNull
    @Size(max = 40)
    @Builder.Default
    @Column(name = "uuid_attribute")
    private String uuidAttribute = Common.uuid();

    @Size(max = 40)
    @Column(name = "key")
    @Builder.Default
    private String key = null;

    @Column(name = "created_date")
    @Builder.Default
    private Timestamp createdDate = null;

    @Column(name = "updated_date")
    @Builder.Default
    private Timestamp updatedDate = null;

}

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

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @NotNull
    @Size(max = 40)
    @Builder.Default
    @Column(name = "uuid_user")
    private String uuidUser = Common.uuid();

    @NotNull
    @Size(max = 40)
    @Builder.Default
    @Column(name = "uuid_cart")
    private String uuidCart = Common.uuid();

    @Size(max = 50)
    @Column(name = "first_name")
    private String firstName;

    @Size(max = 50)
    @Column(name = "middle_name")
    private String middleName;

    @Size(max = 50)
    @Column(name = "last_name")
    private String lastName;

    @Size(max = 15)
    @Column(name = "mobile")
    private String mobile;

    @Size(max = 50)
    @Column(name = "email")
    private String email;

    @Size(max = 200)
    @Column(name = "avatar")
    private String avatar;

    @Column(name = "description")
    private String description;

    @NotNull
    @Size(max = 200)
    @Column(name = "password")
    private String password;

    @NotNull
    @Builder.Default
    @Column(name = "admin")
    private int admin = 0;

//    @NotNull
    @Column(name = "register_date")
    @CreationTimestamp
    private Timestamp registerDate;

    @Column(name = "last_login")
    private Timestamp lastLogin;

    @Builder.Default
    @Column(name = "activate")
    private int activate = 0;

    @Size(max = 25)
    @Column(name = "activation_code")
    private String activationCode;

    @Builder.Default
    @Column(name = "verify_error")
    private int verifyError = 0;
}

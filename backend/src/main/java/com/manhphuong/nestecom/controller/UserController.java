package com.manhphuong.nestecom.controller;

import com.manhphuong.nestecom.common.controller.AbstractResponseController;
import com.manhphuong.nestecom.dto.request.PageDtoRequest;
import com.manhphuong.nestecom.dto.request.user.UpdateRoleUserDtoRequest;
import com.manhphuong.nestecom.dto.request.user.UpdateUserAddressDtoRequest;
import com.manhphuong.nestecom.dto.request.user.UpdateUserInfoDtoRequest;
import com.manhphuong.nestecom.dto.response.user.CreateUserAddressDtoRequest;
import com.manhphuong.nestecom.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/user")
@Slf4j
@AllArgsConstructor
@Tag(name = "User", description = "Quản lý user")
@SecurityRequirement(name = "Authorization")
public class UserController extends AbstractResponseController {
    public final UserService userService;

//    @GetMapping("/admin")
//    public ResponseEntity<?> listUser(@RequestParam @Valid @ModelAttribute PageDtoRequest pageDtoRequest) {
//        return responseEntity(() -> userService.listUser(pageDtoRequest));
//    }

    @GetMapping("/admin")
    public ResponseEntity<?> listUser(@Valid @ModelAttribute PageDtoRequest pageDtoRequest) {
        return responseEntity(() -> userService.listUser(pageDtoRequest));
    }

    @GetMapping("/admin/unactive")
    public ResponseEntity<?> listUserUnActive(@Valid @ModelAttribute PageDtoRequest pageDtoRequest) {
        return responseEntity(() -> userService.listUserUnActive(pageDtoRequest));
    }

    @GetMapping("/admin/active")
    public ResponseEntity<?> listUserActive(@Valid @ModelAttribute PageDtoRequest pageDtoRequest) {
        return responseEntity(() -> userService.listUserActive(pageDtoRequest));
    }

    @GetMapping("/admin/ban")
    public ResponseEntity<?> listUserBan(@Valid @ModelAttribute PageDtoRequest pageDtoRequest) {
        return responseEntity(() -> userService.listUserBan(pageDtoRequest));
    }

    @PostMapping("/admin/ban/{id}")
    public ResponseEntity<?> banUser(@PathVariable(value = "id") @Valid String id) {
        return responseEntity(() -> userService.banUser(id));
    }

    @PostMapping("/admin/unban/{id}")
    public ResponseEntity<?> unbanUser(@PathVariable(value = "id") @Valid String id) {
        return responseEntity(() -> userService.unbanUser(id));
    }

    @DeleteMapping("/admin/del/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable(value = "id") @Valid String id) {
        return responseEntity(() -> {
            userService.deleteUser(id);
            return new HashMap<>();
        });
    }

    @PostMapping("/role")
    public ResponseEntity<?> addRoleUser(@RequestBody @Valid UpdateRoleUserDtoRequest updateCartItemDtoRequest) {
        return responseEntity(() -> userService.addRoleUser(updateCartItemDtoRequest));
    }

    @DeleteMapping("/role")
    public ResponseEntity<?> removeRoleUser(@RequestBody @Valid UpdateRoleUserDtoRequest updateCartItemDtoRequest) {
        return responseEntity(() -> userService.removeRoleUser(updateCartItemDtoRequest));
    }

//    @PostMapping("")
//    public ResponseEntity<?> activeUser(String uuidUser) {
//        return responseEntity(() -> userService.activeUser(uuidUser));
//    }

    @PutMapping()
    public ResponseEntity<?> updateUserInfo(@RequestBody @Valid UpdateUserInfoDtoRequest updateUserInfoDtoRequest) {
        return responseEntity(() -> userService.updateUserInfo(updateUserInfoDtoRequest));
    }

    @GetMapping("/address")
    public ResponseEntity<?> getUserAddress() {
        return responseEntity(() -> userService.getUserAddress());
    }

    @PostMapping("/address")
    public ResponseEntity<?> createUserAddress(@RequestBody @Valid CreateUserAddressDtoRequest createUserAddressDtoRequest) {
        return responseEntity(() -> userService.createUserAddress(createUserAddressDtoRequest));
    }

    @PutMapping("/address")
    public ResponseEntity<?> updateUserAddress(@RequestBody @Valid UpdateUserAddressDtoRequest updateUserAddressDtoRequest) {
        return responseEntity(() -> userService.updateUserAddress(updateUserAddressDtoRequest));
    }


    @DeleteMapping(value = "/address/{id}")
    public ResponseEntity<?> deleteUserAddress(@PathVariable(value = "id") String id) {
        return responseEntity(() -> {
            userService.deleteUserAddress(id);
            return new HashMap<>();
        });
    }


}
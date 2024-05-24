package com.manhphuong.nestecom.service;

import com.manhphuong.nestecom.dto.request.PageDtoRequest;
import com.manhphuong.nestecom.dto.request.user.UpdateRoleUserDtoRequest;
import com.manhphuong.nestecom.dto.request.user.UpdateUserAddressDtoRequest;
import com.manhphuong.nestecom.dto.request.user.UpdateUserInfoDtoRequest;
import com.manhphuong.nestecom.dto.response.PageDtoResponse;
import com.manhphuong.nestecom.dto.response.user.*;

public interface UserService {
    // xem danh sách user - admin
    // ban tài khoán - admin
    // unban tài khoản - admin
    // xóa tài khoản - admin
    // thay đổi quyền user - admin
    // kích hoạt tài khoản
    // cập nhật thông tin user
    // tạo địa chỉ user
    // xem địa chỉ user
    // cập nhật địa chỉ
    // xóa địa chỉ user

    PageDtoResponse<UserListDtoResponse> listUser(PageDtoRequest pageDtoRequest);
    PageDtoResponse<UserListDtoResponse> listUserUnActive(PageDtoRequest pageDtoRequest);
    PageDtoResponse<UserListDtoResponse> listUserActive(PageDtoRequest pageDtoRequest);
    PageDtoResponse<UserListDtoResponse> listUserBan(PageDtoRequest pageDtoRequest);
    UserInfoDtoResponse banUser(String uuidUser);
    UserInfoDtoResponse unbanUser(String uuidUser);
    void deleteUser(String uuidUser);
    UpdateRoleUserDtoResponse addRoleUser(UpdateRoleUserDtoRequest updateCartItemDtoRequest);
    UpdateRoleUserDtoResponse removeRoleUser(UpdateRoleUserDtoRequest updateCartItemDtoRequest);
    UserInfoDtoResponse activeUser(String uuidUser);
    UpdateUserInfoDtoResponse updateUserInfo(UpdateUserInfoDtoRequest updateCartItemDtoRequest);
    UserAddressInfoDtoResponse getUserAddress();
    UserAddressInfoDtoResponse createUserAddress(CreateUserAddressDtoRequest createUserAddressDtoRequest);
    UserAddressInfoDtoResponse updateUserAddress(UpdateUserAddressDtoRequest updateCartItemDtoRequest);
    void deleteUserAddress(String uuidAddress);
}

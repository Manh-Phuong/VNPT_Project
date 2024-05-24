package com.manhphuong.nestecom.service.impl;

import com.manhphuong.nestecom.dto.request.PageDtoRequest;
import com.manhphuong.nestecom.dto.request.user.UpdateRoleUserDtoRequest;
import com.manhphuong.nestecom.dto.request.user.UpdateUserAddressDtoRequest;
import com.manhphuong.nestecom.dto.request.user.UpdateUserInfoDtoRequest;
import com.manhphuong.nestecom.dto.response.PageDtoResponse;
import com.manhphuong.nestecom.dto.response.user.*;
import com.manhphuong.nestecom.entity.User;
import com.manhphuong.nestecom.entity.UserAddress;
import com.manhphuong.nestecom.exception.ApiException;
import com.manhphuong.nestecom.repository.RoleRepository;
import com.manhphuong.nestecom.repository.UserAddressRepository;
import com.manhphuong.nestecom.repository.UserRepository;
import com.manhphuong.nestecom.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserAddressRepository userAddressRepository;

    @Override
    @PreAuthorize("hasAnyAuthority('ROLE_admin')")
    public PageDtoResponse<UserListDtoResponse> listUser(PageDtoRequest pageDtoRequest) {
        Page<User> users = this.userRepository.findAllByUuidUser(PageRequest.of(pageDtoRequest.getPage() - 1, pageDtoRequest.getPageSize(),
                Sort.by("registerDate").descending()));
        return PageDtoResponse.from(pageDtoRequest.getPage(), pageDtoRequest.getPageSize(), users.getTotalElements(),
                users.stream().map(UserListDtoResponse::from).toList());
    }

    @Override
    @PreAuthorize("hasAnyAuthority('ROLE_admin')")
    public PageDtoResponse<UserListDtoResponse> listUserUnActive(PageDtoRequest pageDtoRequest) {
        Page<User> users = this.userRepository.listUserUnActive(PageRequest.of(pageDtoRequest.getPage() - 1, pageDtoRequest.getPageSize(),
                Sort.by("registerDate").descending()));
        return PageDtoResponse.from(pageDtoRequest.getPage(), pageDtoRequest.getPageSize(), users.getTotalElements(),
                users.stream().map(UserListDtoResponse::from).toList());
    }

    @Override
    @PreAuthorize("hasAnyAuthority('ROLE_admin')")
    public PageDtoResponse<UserListDtoResponse> listUserActive(PageDtoRequest pageDtoRequest) {
        Page<User> users = this.userRepository.listUserActive(PageRequest.of(pageDtoRequest.getPage() - 1, pageDtoRequest.getPageSize(),
                Sort.by("registerDate").descending()));
        return PageDtoResponse.from(pageDtoRequest.getPage(), pageDtoRequest.getPageSize(), users.getTotalElements(),
                users.stream().map(UserListDtoResponse::from).toList());
    }

    @Override
    @PreAuthorize("hasAnyAuthority('ROLE_admin')")
    public PageDtoResponse<UserListDtoResponse> listUserBan(PageDtoRequest pageDtoRequest) {
        Page<User> users = this.userRepository.listUserBan(PageRequest.of(pageDtoRequest.getPage() - 1, pageDtoRequest.getPageSize(),
                Sort.by("registerDate").descending()));
        return PageDtoResponse.from(pageDtoRequest.getPage(), pageDtoRequest.getPageSize(), users.getTotalElements(),
                users.stream().map(UserListDtoResponse::from).toList());
    }

    @Override
    @PreAuthorize("hasAnyAuthority('ROLE_admin')")
    @Transactional
    public UserInfoDtoResponse banUser(String uuidUser) {
        int row = this.userRepository.banUser(uuidUser);
        if (row == 0) {
            throw new ApiException("FS-GET-400", HttpStatus.BAD_REQUEST, "ban user failed");
        }
        User user = this.userRepository.findById(uuidUser).orElseThrow(
                () -> new ApiException("FS-GET-404", HttpStatus.NOT_FOUND, "user not found")
        );
        return UserInfoDtoResponse.from(user);
    }

    @Override
    @PreAuthorize("hasAnyAuthority('ROLE_admin')")
    @Transactional
    public UserInfoDtoResponse unbanUser(String uuidUser) {
        int row = this.userRepository.unbanUser(uuidUser);
        if (row == 0) {
            throw new ApiException("U-POST-400", HttpStatus.BAD_REQUEST, "ban user failed");
        }
        User user = this.userRepository.findById(uuidUser).orElseThrow(
                () -> new ApiException("FS-GET-404", HttpStatus.NOT_FOUND, "user not found")
        );
        return UserInfoDtoResponse.from(user);
    }

    @Override
    @PreAuthorize("hasAnyAuthority('ROLE_admin')")
    @Transactional
    public void deleteUser(String uuidUser) {
        User user = this.userRepository.findById(uuidUser).orElseThrow(
                () -> new ApiException("FS-GET-404", HttpStatus.NOT_FOUND, "user not found")
        );
        this.userRepository.deleteById(uuidUser);
    }

    @Override
    @PreAuthorize("hasAnyAuthority('ROLE_admin')")
    @Transactional
    public UpdateRoleUserDtoResponse addRoleUser(UpdateRoleUserDtoRequest updateRoleUserDtoRequest) {
        int row = this.userRepository.addRoleUser(updateRoleUserDtoRequest.getUuidUser(), updateRoleUserDtoRequest.getUuidRole());
        if (row == 0) {
            throw new ApiException("UR-POST-400", HttpStatus.BAD_REQUEST, "add role user failed");
        }
        List<String> roles = roleRepository.getListRoleUser(updateRoleUserDtoRequest.getUuidUser()).stream().map(role -> role.getName()).toList();
        return UpdateRoleUserDtoResponse.from(updateRoleUserDtoRequest.getUuidUser(), roles);
    }

    @Override
    @PreAuthorize("hasAnyAuthority('ROLE_admin')")
    @Transactional
    public UpdateRoleUserDtoResponse removeRoleUser(UpdateRoleUserDtoRequest updateRoleUserDtoRequest) {
        int row = this.userRepository.removeRoleUser(updateRoleUserDtoRequest.getUuidUser(), updateRoleUserDtoRequest.getUuidRole());
        if (row == 0) {
            throw new ApiException("FS-DEL-400", HttpStatus.BAD_REQUEST, "remove role failed");
        }

        List<String> roles = roleRepository.getListRoleUser(updateRoleUserDtoRequest.getUuidUser()).stream().map(role -> role.getName()).toList();
        return UpdateRoleUserDtoResponse.from(updateRoleUserDtoRequest.getUuidUser(), roles);
    }

    @Override
    public UserInfoDtoResponse activeUser(String uuidUser) {
        return null;
    }

    @Override
    @Transactional
    public UpdateUserInfoDtoResponse updateUserInfo(UpdateUserInfoDtoRequest updateUserInfoDtoRequest) {
        // Lấy thông tin người dùng hiện tại
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String uuidUser = authentication.getName();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        // Tìm user dựa trên uuidUser
        User user = this.userRepository.findById(uuidUser).orElseThrow(
                () -> new ApiException("U-404", HttpStatus.NOT_FOUND, "user not found")
        );

        // Kiểm tra xem người dùng hiện tại có quyền admin
        if (!authorities.contains(new SimpleGrantedAuthority("ROLE_admin"))) {
            throw new ApiException("U-UP-401", HttpStatus.UNAUTHORIZED, "Update user failed");
        }

        // Cập nhật thông tin người dùng
        user.setFirstName(updateUserInfoDtoRequest.getFirstName());
        user.setMiddleName(updateUserInfoDtoRequest.getMiddleName());
        user.setLastName(updateUserInfoDtoRequest.getLastName());
        user.setMobile(updateUserInfoDtoRequest.getMobile());
        user.setAvatar(updateUserInfoDtoRequest.getAvatar());
        user.setDescription(updateUserInfoDtoRequest.getDescription());


        System.out.println("authentication " + authentication);
        System.out.println("authorities " + authorities);

        // Lưu thông tin user đã được cập nhật
        this.userRepository.save(user);

        return UpdateUserInfoDtoResponse.from(user);
    }

    @Override
    public UserAddressInfoDtoResponse getUserAddress() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String uuidUser = authentication.getName();
        System.out.println("uuid user getUserAddress: " + uuidUser);

        UserAddress userAddress = this.userAddressRepository.findByUuidUser(uuidUser).orElseThrow(
                () -> new ApiException("UA-UP-401", HttpStatus.UNAUTHORIZED, "address user not found"));
        return UserAddressInfoDtoResponse.from(userAddress);
    }

    @Override
    @Transactional
    public UserAddressInfoDtoResponse createUserAddress(CreateUserAddressDtoRequest createUserAddressDtoRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String uuidUser = authentication.getName();
        System.out.println("uuid user createUserAddress: " + uuidUser);

        UserAddress userAddress = this.userAddressRepository.save(
                UserAddress.builder()
                        .uuidUser(uuidUser)
                        .mobile(createUserAddressDtoRequest.getMobile())
                        .city(createUserAddressDtoRequest.getCity())
                        .street(createUserAddressDtoRequest.getStreet())
                        .district(createUserAddressDtoRequest.getDistrict())
                        .postalCode(createUserAddressDtoRequest.getPostalCode())
                        .build()
        );
        return UserAddressInfoDtoResponse.from(userAddress);
    }

    @Override
    @Transactional
    public UserAddressInfoDtoResponse updateUserAddress(UpdateUserAddressDtoRequest updateUserAddressDtoRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        System.out.println("uuid user createUserAddress: " + currentUser);

        UserAddress userAddress = this.userAddressRepository.findByUuidUser(currentUser).orElseThrow(
                () -> new ApiException("UA-UP-401", HttpStatus.UNAUTHORIZED, "Update user address failed"));

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        if (!authorities.contains(new SimpleGrantedAuthority("ROLE_admin"))) {
            throw new ApiException("U-UP-401", HttpStatus.UNAUTHORIZED, "Update user address failed");
        }

        UserAddress userAddressUpdate = this.userAddressRepository.save(
                UserAddress.builder()
                        .uuidAddress(userAddress.getUuidAddress())
                        .mobile(updateUserAddressDtoRequest.getMobile())
                        .city(updateUserAddressDtoRequest.getCity())
                        .street(updateUserAddressDtoRequest.getStreet())
                        .district(updateUserAddressDtoRequest.getDistrict())
                        .postalCode(updateUserAddressDtoRequest.getPostalCode())
                        .build()
        );
        return UserAddressInfoDtoResponse.from(userAddressUpdate);
    }

    @Override
    @Transactional
    public void deleteUserAddress(String uuidAddress) {
        UserAddress userAddress = this.userAddressRepository.findById(uuidAddress).orElseThrow(
                () -> new ApiException("FS-GET-404", HttpStatus.NOT_FOUND, "user not found")
        );

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = authentication.getName();
        System.out.println("uuid user createUserAddress: " + currentUser);

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        if (!currentUser.equals(userAddress.getUuidUser()) && !authorities.contains(new SimpleGrantedAuthority("ROLE_admin"))) {
            throw new ApiException("U-UP-401", HttpStatus.UNAUTHORIZED, "delete user failed");
        }

        this.userAddressRepository.deleteById(uuidAddress);
    }


}

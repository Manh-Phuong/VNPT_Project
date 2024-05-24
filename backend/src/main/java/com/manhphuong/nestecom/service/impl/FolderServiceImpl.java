//package com.manhphuong.nestecom.service.impl;
//
//import com.manhphuong.nestecom.common.MapperUtils;
//import com.manhphuong.nestecom.dto.request.CreateFolderRequest;
//import com.manhphuong.nestecom.dto.request.PageDtoRequest;
//import com.manhphuong.nestecom.dto.request.UpdateFolderRequest;
//import com.manhphuong.nestecom.dto.response.*;
//import com.manhphuong.nestecom.exception.ApiException;
//import com.manhphuong.nestecom.repository.FolderRepository;
//import com.manhphuong.nestecom.service.FolderService;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Sort;
//import org.springframework.http.HttpStatus;
//import org.springframework.security.access.prepost.PostAuthorize;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.Collection;
//import java.util.List;
//
//@Service
//@Slf4j
//public class FolderServiceImpl implements FolderService {
//    private final FolderRepository folderRepository;
//    private final FormRepository formRepository;
//
//    public FolderServiceImpl(FolderRepository folderRepository, FormRepository formRepository) {
//        this.folderRepository = folderRepository;
//        this.formRepository = formRepository;
//    }
//
//    @Override
//    public PageDtoResponse<FolderListDtoResponse> listFolder(PageDtoRequest pageDtoRequest, String email) {
//        Page<Folder> folders = this.folderRepository.findAllByOwnerAccount(PageRequest.of(pageDtoRequest.getPage() - 1, pageDtoRequest.getPageSize(),
//                Sort.by("id").ascending()), email);
//        return PageDtoResponse.from(pageDtoRequest.getPage(), pageDtoRequest.getPageSize(), folders.getTotalElements(),
//                folders.stream().map(FolderListDtoResponse::from).toList());
//    }
//
//    @Override
//    public FolderDetailDtoResponse getDetailFolder(String id, String email) {
////        List<IFolderListDtoResponse> folderList = folderRepository.getDetailFolderById(id);
//        List<FolderListDtoResponse> folderListDtoResponses = MapperUtils.toDTOs(folderRepository.getDetailFolderById(id, email), FolderListDtoResponse.class);
//        List<Form> formList = formRepository.getDetailFolderById(id);
//
//        return FolderDetailDtoResponse.from(formList, folderListDtoResponses);
//    }
//
//    @Override
//    @PostAuthorize("returnObject.ownerAccount == authentication.name or hasAuthority('ROLE_client_admin')")
//    public FolderInfoDtoResponse getInfoFolder(String id) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        System.out.println("Authentication name: " + auth.getName()); // Log the authentication name
//        // Get the list of roles
//        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
//
//        // Print each role
//        for (GrantedAuthority authority : authorities) {
//            System.out.println("Role: " + authority.getAuthority());
//        }
//        IFolderInfoDtoResponse iFolderInfoDtoResponse = folderRepository.getInfoFolder(id);
//        if (iFolderInfoDtoResponse != null) {
//            return MapperUtils.toDTO(iFolderInfoDtoResponse, FolderInfoDtoResponse.class);
//        } else {
//            throw new ApiException("FS-GET-404", HttpStatus.NOT_FOUND, "GET: info folder not found");
//        }
//    }
//
//    @Override
//    @Transactional
//    public FolderInfoDtoResponse createFolder(CreateFolderRequest createFolderRequest, String email) {
//        Folder folder = folderRepository.save(Folder.builder()
//                .name(createFolderRequest.getName())
//                .ownerAccount(email)
//                .parentId(createFolderRequest.getParentId())
//                .build());
//        return FolderInfoDtoResponse.from(folder);
//    }
//
//    @Override
//    @Transactional
//    public void deleteTempFolder(String id, String email) {
//        Folder folder = folderRepository.findById(id).orElseThrow(
//                () -> new ApiException("FS-DEL-404", HttpStatus.NOT_FOUND, "delete temp folder not found")
//        );
//
//        int rows = folderRepository.deleteTempFolder(id, email);
//
//        if (rows == 0) {
//            throw new ApiException("FS-UP-401", HttpStatus.UNAUTHORIZED, "delete temp folder failed");
//        }
//    }
//
//    @Override
//    @Transactional
//    public void restoreFolder(String id, String email) {
//        Folder folder = folderRepository.findById(id).orElseThrow(
//                () -> new ApiException("FS-DEL-404", HttpStatus.NOT_FOUND, "restore folder not found")
//        );
//
//        int rows = folderRepository.restoreFolder(id, email);
//
//        if (rows == 0) {
//            throw new ApiException("FS-UP-401", HttpStatus.UNAUTHORIZED, "restore temp folder failed");
//        }
//    }
//
//    @Override
//    @Transactional
//    public void deleteReallyFolder(String id, String email) {
//        Folder folder = folderRepository.findById(id).orElseThrow(
//                () -> new ApiException("FS-DEL-404", HttpStatus.NOT_FOUND, "delete really folder not found")
//        );
//
//        int rows = folderRepository.deleteReallyFolder(id, email);
//
//        if (rows == 0) {
//            throw new ApiException("FS-UP-401", HttpStatus.UNAUTHORIZED, "delete really folder failed");
//        }
//    }
//
//    @Override
//    public FolderInfoDtoResponse updateFolder(String id, UpdateFolderRequest updateFolderRequest, String email) {
//        Folder folder = folderRepository.findByIdWithAccount(id, email);
//        if (folder != null) {
//            if (updateFolderRequest.getName() != null && updateFolderRequest.getName().trim().length() != 0) {
//                folder.setName(updateFolderRequest.getName());
//            }
//            if (updateFolderRequest.getDescription() != null && updateFolderRequest.getDescription().trim().length() != 0) {
//                folder.setDescription(updateFolderRequest.getDescription());
//            }
//            if (updateFolderRequest.getIsFavorite() != null) {
//                folder.setIsFavorite(updateFolderRequest.getIsFavorite());
//            }
//        } else {
//            throw new ApiException("FS-UP-404", HttpStatus.NOT_FOUND, "update folder not found");
//        }
//        Folder folderUpdate = folderRepository.save(folder);
//        return FolderInfoDtoResponse.from(folder);
//    }
//
//
////    @Override
////    public void markFavorite(String id, String email) {
////
////    }
//
//}
//

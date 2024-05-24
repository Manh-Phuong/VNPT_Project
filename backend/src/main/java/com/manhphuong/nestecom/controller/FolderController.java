//package com.manhphuong.nestecom.controller;
//
//import com.manhphuong.nestecom.common.Common;
//import com.manhphuong.nestecom.common.controller.AbstractResponseController;
//import com.manhphuong.nestecom.dto.request.CreateFolderRequest;
//import com.manhphuong.nestecom.dto.request.PageDtoRequest;
//import com.manhphuong.nestecom.dto.request.UpdateFolderRequest;
//import com.manhphuong.nestecom.service.FolderService;
//import jakarta.validation.Valid;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//
//@RestController
//@RequestMapping("/api/v1/folder")
//@Slf4j
//public class FolderController extends AbstractResponseController {
//    public final FolderService folderService;
//
//    public FolderController(FolderService folderService) {
//        this.folderService = folderService;
//    }
////
////    @GetMapping()
////    public ResponseEntity<?> listFolder(@RequestBody @Valid PageDtoRequest pageDtoRequest, @RequestHeader("Authorization") String authorizationHeader) {
////        String email = Common.getUserInfoLogin(authorizationHeader).getEmail();
////        return responseEntity(() -> folderService.listFolder(pageDtoRequest, email));
////    }
////
////    @GetMapping(value = "/{id}")
////    public ResponseEntity<?> getDetailFolder(@PathVariable(value = "id") String id, @RequestHeader("Authorization") String authorizationHeader) {
////        String email = Common.getUserInfoLogin(authorizationHeader).getEmail();
////        return responseEntity(() -> {
////            return folderService.getDetailFolder(id, email);
////        });
////    }
//
//    @GetMapping(value = "/info/{id}")
//    public ResponseEntity<?> getInfoFolder(@PathVariable(value = "id") String id) {
//        return responseEntity(() -> folderService.getInfoFolder(id));
//    }
//
////    @PostMapping()
////    public ResponseEntity<?> createFolder(@RequestBody @Valid CreateFolderRequest createFolderRequest, @RequestHeader("Authorization") String authorizationHeader) {
////        String email = Common.getUserInfoLogin(authorizationHeader).getEmail();
////        return responseEntity(() -> folderService.createFolder(createFolderRequest, email));
////    }
////
////    @PatchMapping(value = "/del/{id}")
////    public ResponseEntity<?> deleteTempFolder(@PathVariable(value = "id") String id, @RequestHeader("Authorization") String authorizationHeader) {
////        String email = Common.getUserInfoLogin(authorizationHeader).getEmail();
////        return responseEntity(() -> {
////            folderService.deleteTempFolder(id, email);
////            return new HashMap<>();
////        });
////    }
////
////    @PatchMapping(value = "/restore/{id}")
////    public ResponseEntity<?> restoreFolder(@PathVariable(value = "id") String id, @RequestHeader("Authorization") String authorizationHeader) {
////        String email = Common.getUserInfoLogin(authorizationHeader).getEmail();
////        return responseEntity(() -> {
////            folderService.restoreFolder(id, email);
////            return new HashMap<>();
////        });
////    }
////
////    @DeleteMapping(value = "/{id}")
////    public ResponseEntity<?> deleteReallyFolder(@PathVariable(value = "id") String id, @RequestHeader("Authorization") String authorizationHeader) {
////        String email = Common.getUserInfoLogin(authorizationHeader).getEmail();
////        return responseEntity(() -> {
////            folderService.deleteReallyFolder(id, email);
////            return new HashMap<>();
////        });
////    }
////
////    @PutMapping(value = "/{id}")
////    public ResponseEntity<?> updateFolder(@PathVariable(value = "id") String id, @RequestBody @Valid UpdateFolderRequest updateFolderRequest, @RequestHeader("Authorization") String authorizationHeader) {
////        String email = Common.getUserInfoLogin(authorizationHeader).getEmail();
////        return responseEntity(() -> folderService.updateFolder(id, updateFolderRequest, email));
////    }
//}

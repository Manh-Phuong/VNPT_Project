//package com.manhphuong.nestecom.repository;
//
//import com.manhphuong.nestecom.dto.response.IFolderInfoDtoResponse;
//import com.manhphuong.nestecom.dto.response.IFolderListDtoResponse;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Modifying;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//
//import java.util.List;
//
//public interface FolderRepository extends JpaRepository<Folder, String> {
//    @Query(value = "select f" +
//            " from Folder f" +
//            " where f.parentId = null and f.ownerAccount = :ownerAccount"
//            , nativeQuery = false)
//    Page<Folder> findAllByOwnerAccount(Pageable page, @Param("ownerAccount") String ownerAccount);
////    Page<Folder> findAllByOwnerAccount(Pageable page, @Param("ownerAccount") String ownerAccount);
//    @Query(value = "select f" +
//            " from Folder f" +
//            " where f.id = :folderId and f.ownerAccount = :ownerAccount"
//            , nativeQuery = false)
//    Folder findByIdWithAccount(@Param("folderId") String folderId, @Param("ownerAccount") String ownerAccount);
//    @Query(value = "select f.id as id, f.name as name" +
//            " from Folder f" +
//            " where f.parentId = :parentId and f.ownerAccount = :ownerAccount"
//            , nativeQuery = false)
//    List<IFolderListDtoResponse> getDetailFolderById(@Param("parentId") String parentId, @Param("ownerAccount") String ownerAccount);
//
//    @Query(value = "select f.id as id, f.name as name, f.ownerAccount as ownerAccount, f.parentId, f.isFavorite, f.createdAt, f.updatedAt, f.description" +
//            " from Folder f" +
//            " where f.id = :folderId"
//            , nativeQuery = false)
//    IFolderInfoDtoResponse getInfoFolder(@Param("folderId") String folderId);
//
//    @Modifying
//    @Query("update Folder f set f.isDelete = true where f.id = :folderId and f.ownerAccount = :ownerAccount")
//    int deleteTempFolder(@Param("folderId") String folderId, @Param("ownerAccount") String ownerAccount);
//
//    @Modifying
//    @Query("update Folder f set f.isDelete = false where f.id = :folderId and f.ownerAccount = :ownerAccount")
//    int restoreFolder(@Param("folderId") String folderId, @Param("ownerAccount") String ownerAccount);
//
//    @Modifying
//    @Query("delete from Folder f where f.id = :folderId and f.ownerAccount = :ownerAccount")
//    int deleteReallyFolder(@Param("folderId") String folderId, @Param("ownerAccount") String ownerAccount);
//
////    @Modifying
////    @Query("update Folder f set f.name = :name where f.id = :folderId and f.ownerAccount = :ownerAccount")
////    int updateNameFolder(@Param("folderId") String folderId, @Param("name") String name, @Param("ownerAccount") String ownerAccount);
//}

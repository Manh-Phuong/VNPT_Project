package com.manhphuong.nestecom.repository;

import com.manhphuong.nestecom.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, String> {
}

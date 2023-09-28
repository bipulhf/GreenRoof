package com.bankrupted.greenroof.community.Notification;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationStorageRepository extends JpaRepository<Notification, Long> {

    Optional<Notification> findById(Long id);

    List<Notification> findByUserToIdOrderByCreatedAtDesc(Long id);

    List<Notification> findByUserToIdAndDeliveredFalse(Long id);

}

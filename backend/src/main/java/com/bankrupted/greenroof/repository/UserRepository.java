package com.bankrupted.greenroof.repository;

import com.bankrupted.greenroof.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query(value = "SELECT * FROM users WHERE username LIKE :username%", nativeQuery = true)
    List<User> searchByUsername(String username);
}

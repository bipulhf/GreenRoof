package com.bankrupted.greenroof.user.repository;

import java.util.List;
import java.util.Optional;

import com.bankrupted.greenroof.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

  Optional<User> findByUsername(String username);

  Optional<User> findByEmail(String email);

  @Query(value = "SELECT * FROM users WHERE username LIKE :username%", nativeQuery = true)
  List<User> searchByUsername(String username);

  @Query(value = "SELECT * FROM users WHERE id NOT IN (:userId) ORDER BY RANDOM() LIMIT 7", nativeQuery = true)
  List<User> getRecommendation(List<Long> userId);

  List<User> findTop5ByOrderByScoreDesc();
}

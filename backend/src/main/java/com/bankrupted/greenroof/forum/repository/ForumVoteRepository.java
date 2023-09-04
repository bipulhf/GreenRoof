package com.bankrupted.greenroof.forum.repository;

import com.bankrupted.greenroof.forum.entity.ForumVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ForumVoteRepository extends JpaRepository<ForumVote, Long> {
    void deleteByAnswerId(Long answerId);
    List<ForumVote> findByAnswerId(Long answerId);
    Optional<ForumVote> findByAnswerIdAndVoterId(Long answerId, Long voterId);
    Boolean existsByAnswerIdAndVoterId(Long answerId, Long voterId);
    @Query(value = "SELECT SUM(vote) FROM forum_votes WHERE answer_id=:answerId", nativeQuery = true)
    Integer getTotalVotesOfAnswer(Long answerId);
}

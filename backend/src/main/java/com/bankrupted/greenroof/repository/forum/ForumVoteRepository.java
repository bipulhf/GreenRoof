package com.bankrupted.greenroof.repository.forum;

import com.bankrupted.greenroof.entity.forum.ForumVote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ForumVoteRepository extends JpaRepository<ForumVote, Long> {
    void deleteByAnswerId(Long answerId);
    List<ForumVote> findByAnswerId(Long answerId);
    Optional<ForumVote> findByAnswerIdAndVoterId(Long answerId, Long voterId);
    Boolean existsByAnswerIdAndVoterId(Long answerId, Long voterId);
}

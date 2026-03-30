package com.playlist.playlistmanage.repository;

import com.playlist.playlistmanage.model.RecentlyPlayedModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecentlyPlayedRepository extends JpaRepository<RecentlyPlayedModel, Integer> {

    // Get last 10 played songs
    List<RecentlyPlayedModel> findTop10ByOrderByPlayedAtDesc();
}

package com.playlist.playlistmanage.repository;

import com.playlist.playlistmanage.model.PlaylistModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistRepository extends JpaRepository<PlaylistModel, Integer> {
}

package com.playlist.playlistmanage.repository;

import com.playlist.playlistmanage.model.SongModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SongRepository extends JpaRepository<SongModel, Integer> {

    // Search by title (Binary Search style)
    List<SongModel> findByTitleContainingIgnoreCase(String title);

    // Search by artist
    List<SongModel> findByArtistContainingIgnoreCase(String artist);

    // Filter by mood (for mood-based playlist generator)
    List<SongModel> findByMood(String mood);

    // Filter by genre
    List<SongModel> findByGenre(String genre);

    // Sort by duration
    List<SongModel> findAllByOrderByDurationAsc();

    // Sort by play count (popularity)
    List<SongModel> findAllByOrderByPlayCountDesc();

    // Sort by title (A-Z)
    List<SongModel> findAllByOrderByTitleAsc();

    // Filter by mood AND genre (auto playlist)
    List<SongModel> findByMoodAndGenre(String mood, String genre);
}

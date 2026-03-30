package com.playlist.playlistmanage.service;

import com.playlist.playlistmanage.model.RecentlyPlayedModel;
import com.playlist.playlistmanage.model.SongModel;
import com.playlist.playlistmanage.repository.RecentlyPlayedRepository;
import com.playlist.playlistmanage.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RecentlyPlayedService {

    @Autowired
    private RecentlyPlayedRepository recentlyPlayedRepository;

    @Autowired
    private SongRepository songRepository;

    // Record a song being played
    public RecentlyPlayedModel recordPlay(int sid) {
        SongModel song = songRepository.findById(sid).orElse(null);
        if (song == null) return null;

        // increment play count
        song.setPlayCount(song.getPlayCount() + 1);
        songRepository.save(song);

        RecentlyPlayedModel record = new RecentlyPlayedModel();
        record.setSong(song);
        record.setPlayedAt(LocalDateTime.now());
        return recentlyPlayedRepository.save(record);
    }

    // Get last 10 played songs
    public List<RecentlyPlayedModel> getRecentlyPlayed() {
        return recentlyPlayedRepository.findTop10ByOrderByPlayedAtDesc();
    }
}
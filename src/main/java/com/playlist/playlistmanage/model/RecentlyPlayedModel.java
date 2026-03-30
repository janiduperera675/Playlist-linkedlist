package com.playlist.playlistmanage.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "RecentlyPlayed")
public class RecentlyPlayedModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rid;

    @ManyToOne
    @JoinColumn(name = "sid", referencedColumnName = "sid")
    private SongModel song;

    private LocalDateTime playedAt;

    // --- Getters and Setters ---

    public int getRid() {
        return rid;
    }

    public void setRid(int rid) {
        this.rid = rid;
    }

    public SongModel getSong() {
        return song;
    }

    public void setSong(SongModel song) {
        this.song = song;
    }

    public LocalDateTime getPlayedAt() {
        return playedAt;
    }

    public void setPlayedAt(LocalDateTime playedAt) {
        this.playedAt = playedAt;
    }

    public RecentlyPlayedModel() {}

    public RecentlyPlayedModel(int rid, SongModel song, LocalDateTime playedAt) {
        this.rid = rid;
        this.song = song;
        this.playedAt = playedAt;
    }
}
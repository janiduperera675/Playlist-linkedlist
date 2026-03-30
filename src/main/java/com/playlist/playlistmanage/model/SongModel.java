package com.playlist.playlistmanage.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Song")
public class SongModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sid;

    private String title;
    private String artist;
    private String genre;
    private double duration;  // in minutes
    private String mood;      // Happy / Sad / Chill / Workout
    private int playCount;    // for popularity sorting
    private int position;     // position in doubly linked list

    public int getSid() {
        return sid;
    }

    public void setSid(int sid) {
        this.sid = sid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public double getDuration() {
        return duration;
    }

    public void setDuration(double duration) {
        this.duration = duration;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public int getPlayCount() {
        return playCount;
    }

    public void setPlayCount(int playCount) {
        this.playCount = playCount;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public SongModel() {
    }

    public SongModel(int sid, String title, String artist, String genre, double duration, String mood, int playCount, int position) {
        this.sid = sid;
        this.title = title;
        this.artist = artist;
        this.genre = genre;
        this.duration = duration;
        this.mood = mood;
        this.playCount = playCount;
        this.position = position;
    }
}
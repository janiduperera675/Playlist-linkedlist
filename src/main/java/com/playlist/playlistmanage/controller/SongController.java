package com.playlist.playlistmanage.controller;

import com.playlist.playlistmanage.model.SongModel;
import com.playlist.playlistmanage.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/songs")
public class SongController {

    @Autowired
    private SongService songService;

    @PostMapping("/add")
    public SongModel addSong(@RequestBody SongModel song) {
        return songService.addSong(song);
    }

    @GetMapping("/getAll")
    public List<SongModel> getAllSongs() {
        return songService.getAllSongs();
    }

    @DeleteMapping("/delete/{sid}")
    public String deleteSong(@PathVariable int sid) {
        return songService.deleteSong(sid);
    }

    @PutMapping("/update/{sid}")
    public SongModel updateSong(@PathVariable int sid, @RequestBody SongModel song) {
        return songService.updateSong(sid, song);
    }

    // SEARCH
    @GetMapping("/search/title/{title}")
    public List<SongModel> searchByTitle(@PathVariable String title) {
        return songService.searchByTitle(title);
    }

    @GetMapping("/search/artist/{artist}")
    public List<SongModel> searchByArtist(@PathVariable String artist) {
        return songService.searchByArtist(artist);
    }

    // SORT
    @GetMapping("/sort/title")
    public List<SongModel> sortByTitle() {
        return songService.sortByTitle();
    }

    @GetMapping("/sort/duration")
    public List<SongModel> sortByDuration() {
        return songService.sortByDuration();
    }

    @GetMapping("/sort/popularity")
    public List<SongModel> sortByPopularity() {
        return songService.sortByPopularity();
    }

    // MOOD-BASED PLAYLIST
    @GetMapping("/mood/{mood}")
    public List<SongModel> getByMood(@PathVariable String mood) {
        return songService.getByMood(mood);
    }

    // GENRE FILTER
    @GetMapping("/genre/{genre}")
    public List<SongModel> getByGenre(@PathVariable String genre) {
        return songService.getByGenre(genre);
    }

    // PLAY NEXT / PREVIOUS (Doubly Linked List navigation)
    @GetMapping("/next/{sid}")
    public SongModel playNext(@PathVariable int sid) {
        return songService.playNext(sid);
    }

    @GetMapping("/previous/{sid}")
    public SongModel playPrevious(@PathVariable int sid) {
        return songService.playPrevious(sid);
    }
}
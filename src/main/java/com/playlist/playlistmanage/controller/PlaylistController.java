package com.playlist.playlistmanage.controller;

import com.playlist.playlistmanage.model.PlaylistModel;
import com.playlist.playlistmanage.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/playlists")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;

    @PostMapping("/createplaylist")
    public PlaylistModel createPlaylist(@RequestBody PlaylistModel playlist) {
        return playlistService.createPlaylist(playlist);
    }

    @GetMapping("/getAll")
    public List<PlaylistModel> getAllPlaylists() {
        return playlistService.getAllPlaylists();
    }

    @DeleteMapping("/delete/{pid}")
    public String deletePlaylist(@PathVariable int pid) {
        return playlistService.deletePlaylist(pid);
    }
}

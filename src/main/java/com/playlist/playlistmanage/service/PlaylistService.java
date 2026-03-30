package com.playlist.playlistmanage.service;


import com.playlist.playlistmanage.model.PlaylistModel;
import com.playlist.playlistmanage.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    public PlaylistModel createPlaylist(PlaylistModel playlist) {
        return playlistRepository.save(playlist);
    }

    public List<PlaylistModel> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    public String deletePlaylist(int pid) {
        playlistRepository.deleteById(pid);
        return "Playlist deleted";
    }
}
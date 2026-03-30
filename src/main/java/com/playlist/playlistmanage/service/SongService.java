package com.playlist.playlistmanage.service;

import com.playlist.playlistmanage.model.SongModel;
import com.playlist.playlistmanage.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService {

    @Autowired
    private SongRepository songRepository;

    // ADD SONG (Doubly Linked List — insert at end)
    public SongModel addSong(SongModel song) {
        List<SongModel> all = songRepository.findAll();
        song.setPosition(all.size()); // insert at end of list
        return songRepository.save(song);
    }

    // GET ALL SONGS
    public List<SongModel> getAllSongs() {
        return songRepository.findAll();
    }

    // DELETE SONG
    public String deleteSong(int sid) {
        songRepository.deleteById(sid);
        return "Song deleted successfully";
    }

    // SEARCH BY TITLE
    public List<SongModel> searchByTitle(String title) {
        return songRepository.findByTitleContainingIgnoreCase(title);
    }

    // SEARCH BY ARTIST
    public List<SongModel> searchByArtist(String artist) {
        return songRepository.findByArtistContainingIgnoreCase(artist);
    }

    // SORT BY TITLE (Bubble Sort implemented manually)
    public List<SongModel> sortByTitle() {
        List<SongModel> songs = songRepository.findAll();

        // BUBBLE SORT by title
        int n = songs.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (songs.get(j).getTitle()
                        .compareToIgnoreCase(songs.get(j + 1).getTitle()) > 0) {
                    SongModel temp = songs.get(j);
                    songs.set(j, songs.get(j + 1));
                    songs.set(j + 1, temp);
                }
            }
        }
        return songs;
    }

    // SORT BY DURATION
    public List<SongModel> sortByDuration() {
        return songRepository.findAllByOrderByDurationAsc();
    }

    // SORT BY POPULARITY (play count)
    public List<SongModel> sortByPopularity() {
        return songRepository.findAllByOrderByPlayCountDesc();
    }

    // MOOD-BASED AUTO PLAYLIST GENERATOR
    public List<SongModel> getByMood(String mood) {
        return songRepository.findByMood(mood);
    }

    // GENRE-BASED FILTER
    public List<SongModel> getByGenre(String genre) {
        return songRepository.findByGenre(genre);
    }

    // PLAY NEXT (navigate doubly linked list forward)
    public SongModel playNext(int currentSid) {
        SongModel current = songRepository.findById(currentSid).orElse(null);
        if (current == null) return null;

        List<SongModel> all = songRepository.findAllByOrderByTitleAsc();
        for (int i = 0; i < all.size() - 1; i++) {
            if (all.get(i).getSid() == currentSid) {
                SongModel next = all.get(i + 1);
                // increment play count
                next.setPlayCount(next.getPlayCount() + 1);
                return songRepository.save(next);
            }
        }
        return all.get(0); // loop back to start
    }

    // PLAY PREVIOUS (navigate doubly linked list backward)
    public SongModel playPrevious(int currentSid) {
        List<SongModel> all = songRepository.findAllByOrderByTitleAsc();
        for (int i = 1; i < all.size(); i++) {
            if (all.get(i).getSid() == currentSid) {
                return all.get(i - 1);
            }
        }
        return all.get(all.size() - 1); // loop to last
    }

    // UPDATE SONG
    public SongModel updateSong(int sid, SongModel song) {
        SongModel existing = songRepository.findById(sid).orElse(null);
        if (existing != null) {
            existing.setTitle(song.getTitle());
            existing.setArtist(song.getArtist());
            existing.setGenre(song.getGenre());
            existing.setDuration(song.getDuration());
            existing.setMood(song.getMood());
            return songRepository.save(existing);
        }
        return null;
    }
}
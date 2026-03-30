package com.playlist.playlistmanage.controller;

import com.playlist.playlistmanage.model.RecentlyPlayedModel;
import com.playlist.playlistmanage.service.RecentlyPlayedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/recent")
public class RecentlyPlayedController {

    @Autowired
    private RecentlyPlayedService recentlyPlayedService;

    @PostMapping("/play/{sid}")
    public RecentlyPlayedModel recordPlay(@PathVariable int sid) {
        return recentlyPlayedService.recordPlay(sid);
    }

    @GetMapping("/getRecent")
    public List<RecentlyPlayedModel> getRecentlyPlayed() {
        return recentlyPlayedService.getRecentlyPlayed();
    }
}

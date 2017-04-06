package flatbook.announcement.controller;

import flatbook.announcement.entity.Announcement;
import flatbook.announcement.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/announcement")
public class AnnouncementController {
    @Autowired
    private AnnouncementService announcementService;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public void test() {
       announcementService.test();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Announcement> getAllAnnouncement() {
        return announcementService.getAllAnnouncement();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Announcement getAnnouncementById(@PathVariable("id") Integer id) {
        return announcementService.getAnnouncementById(id);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Announcement createAnnouncement(@RequestBody Announcement announcement) {
        return announcementService.createAnnouncement(announcement);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public Announcement updateAnnouncement(@RequestBody Announcement announcement) {
        return announcementService.updateAnnouncement(announcement);
    }

    @RequestMapping(value = "/{id}/changeVisibility", method = RequestMethod.PUT)
    public Announcement updateVisibility(@PathVariable("id") Integer id) {
        return announcementService.updateVisibility(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Announcement deleteAnnouncement(@PathVariable("id") Integer id) {
        return announcementService.deleteAnnouncement(id);
    }
}




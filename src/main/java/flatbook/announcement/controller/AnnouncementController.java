package flatbook.announcement.controller;

import flatbook.announcement.service.AnnouncementService;
import flatbook.announcement.entity.Announcement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/announcement")
public class AnnouncementController {
    @Autowired
    private AnnouncementService service;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public void test() {
       service.test();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Announcement> getAllAnnouncement() {
        return service.getAllAnnouncement();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Announcement getAnnouncementById(@PathVariable("id") Integer id) {
        return service.getAnnouncementById(id);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Announcement createAnnouncement(@RequestBody Announcement announcement) {
        return service.createAnnouncement(announcement);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public Announcement updateAnnouncement(@RequestBody Announcement announcement) {
        return service.updateAnnouncement(announcement);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Announcement deleteAnnouncement(@PathVariable("id") Integer id) {
        return service.deleteAnnouncement(id);
    }
}

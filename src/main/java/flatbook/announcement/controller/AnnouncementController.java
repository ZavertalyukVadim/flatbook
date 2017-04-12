package flatbook.announcement.controller;

import flatbook.announcement.entity.Announcement;
import flatbook.announcement.entity.Post;
import flatbook.announcement.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/announcement")
public class AnnouncementController {
    private final AnnouncementService announcementService;

    @Autowired
    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping(value = "/all/{page}/{itemsPerPage}")
    public Page<Announcement> getAllAnnouncement(@PathVariable("page") Integer page, @PathVariable("itemsPerPage") Integer itemPerPage) {

        return announcementService.getAllAnnouncement(page, itemPerPage);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Announcement getAnnouncementById(@PathVariable("id") Integer id) {
        return announcementService.getAnnouncementById(id);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public Announcement createAnnouncement(@RequestBody @Valid Post post) {
        return announcementService.createAnnouncement(post);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public Announcement updateAnnouncement(@RequestBody @Valid Post post) {
        return announcementService.updateAnnouncement(post);
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




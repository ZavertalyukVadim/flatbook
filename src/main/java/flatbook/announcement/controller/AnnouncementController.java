package flatbook.announcement.controller;

import flatbook.announcement.entity.Announcement;
import flatbook.announcement.entity.PostDto;
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

    @GetMapping(value = "/{id}")
    public Announcement getAnnouncementById(@PathVariable("id") Integer id) {
        return announcementService.getAnnouncementById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Announcement createAnnouncement(@RequestBody @Valid PostDto postDto) {
        return announcementService.createAnnouncement(postDto);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Announcement updateAnnouncement(@RequestBody @Valid PostDto postDto) {
        return announcementService.updateAnnouncement(postDto);
    }

    @RequestMapping(value = "/{id}/changeVisibility", method = RequestMethod.PUT)
    public Announcement updateVisibility(@PathVariable("id") Integer id) {
        return announcementService.updateVisibility(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Boolean deleteAnnouncement(@PathVariable("id") Integer id) {
        return announcementService.deleteAnnouncement(id);
    }
}




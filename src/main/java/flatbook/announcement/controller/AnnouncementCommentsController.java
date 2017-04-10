package flatbook.announcement.controller;

import flatbook.announcement.entity.AnnouncementComments;
import flatbook.announcement.entity.Comment;
import flatbook.announcement.service.AnnouncementCommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/comment")
public class AnnouncementCommentsController {
    private final AnnouncementCommentsService announcementCommentsService;

    @Autowired
    public AnnouncementCommentsController(AnnouncementCommentsService announcementCommentsService) {
        this.announcementCommentsService = announcementCommentsService;
    }

    @GetMapping(value = "/{id}")
    List<AnnouncementComments> getAllCommentsForPost(@PathVariable("id") Integer id) {
        return announcementCommentsService.getAllCommentsForPost(id);
    }

    @PostMapping
    AnnouncementComments createCommentsToAnnouncement(@RequestBody Comment comment) {
        return announcementCommentsService.createCommentsToAnnouncement(comment);
    }

    @PutMapping
    AnnouncementComments updateComment(@RequestBody Comment comment) {
        return announcementCommentsService.updateComment(comment);
    }

    @DeleteMapping(value = "/{id}")
    AnnouncementComments deleteComments(@PathVariable("id") Integer id) {
        return announcementCommentsService.deleteComments(id);
    }
}

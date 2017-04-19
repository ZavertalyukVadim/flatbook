package flatbook.announcement.controller;

import flatbook.announcement.entity.AnnouncementComments;
import flatbook.announcement.entity.CommentDto;
import flatbook.announcement.service.AnnouncementCommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/comment")
public class AnnouncementCommentsController {
    private final AnnouncementCommentsService announcementCommentsService;

    @Autowired
    public AnnouncementCommentsController(AnnouncementCommentsService announcementCommentsService) {
        this.announcementCommentsService = announcementCommentsService;
    }

    @GetMapping(value = "/{id}")
    public List<AnnouncementComments> getAllCommentsForPost(@PathVariable("id") Integer id) {
        return announcementCommentsService.getAllCommentsForPost(id);
    }

    @PostMapping
    public AnnouncementComments createCommentsToAnnouncement(@RequestBody CommentDto commentDto) {
        return announcementCommentsService.createCommentsToAnnouncement(commentDto);
    }

    @PutMapping
    public AnnouncementComments updateComment(@RequestBody CommentDto commentDto) {
        return announcementCommentsService.updateComment(commentDto);
    }

    @DeleteMapping(value = "/{id}")
    public Boolean deleteComments(@PathVariable("id") Integer id) {
        return announcementCommentsService.deleteComments(id);
    }
}

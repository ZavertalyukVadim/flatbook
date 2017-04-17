package flatbook.announcement.service;

import flatbook.announcement.dao.AnnouncementCommentsDao;
import flatbook.announcement.entity.AnnouncementComments;
import flatbook.announcement.entity.Comment;
import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AnnouncementCommentsService {
    private final AnnouncementCommentsDao announcementCommentsDao;
    private final UserDao userDao;
    private final EmailDao emailDao;

    @Autowired
    public AnnouncementCommentsService(AnnouncementCommentsDao announcementCommentsDao, UserDao userDao, EmailDao emailDao) {
        this.announcementCommentsDao = announcementCommentsDao;
        this.userDao = userDao;
        this.emailDao = emailDao;
    }

    public List<AnnouncementComments> getAllCommentsForPost(Integer id) {
        return announcementCommentsDao.getCommentsToAnnouncementByAnnouncementId(id);
    }

    public AnnouncementComments createCommentsToAnnouncement(Comment comment) {
        AnnouncementComments announcementComments = new AnnouncementComments();
        announcementComments.setAnnouncementId(comment.getAnnouncement_id());
        announcementComments.setUser(getCurrentUser());
        announcementComments.setDateCreate(new Date());
        announcementComments.setText(comment.getText());
        return announcementCommentsDao.save(announcementComments);
    }


    private User getCurrentUser() {
        Email email = emailDao.findOneByContent(getUserEmail());
        return userDao.getUserByEmails(email);
    }

    private String getUserEmail() {
        return getUserDetails().getName();
    }

    private Authentication getUserDetails() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public Boolean deleteComments(Integer id) {
        announcementCommentsDao.delete(id);
        return true;
    }

    public AnnouncementComments updateComment(Comment comment) {
        AnnouncementComments announcementComments = announcementCommentsDao.findOne(comment.getComment_id());
        announcementComments.setText(comment.getText());
        announcementComments.setDateCreate(new Date());
        announcementCommentsDao.save(announcementComments);
        return announcementComments;

    }
}

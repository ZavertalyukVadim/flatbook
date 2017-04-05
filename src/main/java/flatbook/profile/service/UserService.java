package flatbook.profile.service;

import flatbook.announcement.dao.AnnouncementDao;
import flatbook.announcement.entity.Announcement;
import flatbook.profile.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {
    private final UserDao userDao;

    private final AnnouncementDao announcementDao;

    @Autowired
    public UserService(UserDao userDao, AnnouncementDao announcementDao) {
        this.userDao = userDao;
        this.announcementDao = announcementDao;
    }

    public Set<Announcement> getFavoriteAnnouncement(){
        return null;
    }

    public Set<Announcement> getMyAnnouncement(){
        return null;
    }
}

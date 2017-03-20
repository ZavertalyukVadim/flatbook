package flatbook.announcement.service;

import flatbook.announcement.dao.AnnouncementDao;
import flatbook.announcement.entity.Announcement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
public class AnnouncementService {
    @Autowired
    private AnnouncementDao announcementDao;

    public List<Announcement> getAllAnnouncement() {
        List<Announcement> list = announcementDao.findAll();
        list.sort(Comparator.comparing(Announcement::getDate));
        return list;
    }

    public void test() {
        Announcement announcement = new Announcement(123, "ololo", false, new Date());
        announcement.setDate(new Date());
        announcement.setTitle("title1");
        Announcement announcement1 = new Announcement(122, "ololo1", false, new Date());
        announcement1.setDate(new Date());
        announcement1.setTitle("title2");
        Announcement announcement2 = new Announcement(121, "ololo2", false, new Date());
        announcement2.setDate(new Date());
        announcement2.setTitle("title3");
        Announcement announcement3 = new Announcement(120, "ololo3", false, new Date());
        announcement3.setDate(new Date());
        announcement3.setTitle("title4");
        announcementDao.save(announcement);
        announcementDao.save(announcement1);
        announcementDao.save(announcement2);
        announcementDao.save(announcement3);
    }

    public Announcement getAnnouncementById(Integer id) {
        return announcementDao.findOne(id);
    }

    public Announcement updateAnnouncement(Announcement oldAnnouncement) {
        Announcement announcement = announcementDao.findOne(oldAnnouncement.getId());
        announcement.setDescription(oldAnnouncement.getDescription());
        announcement.setVisibility(oldAnnouncement.getVisibility());
        announcement.setPrice(oldAnnouncement.getPrice());
        announcement.setDate(new Date());
        announcement.setTitle(oldAnnouncement.getTitle());
        announcementDao.save(announcement);
        return announcement;
    }

    public Announcement deleteAnnouncement(Integer id) {
        announcementDao.delete(id);
        return null;
    }

    public Announcement createAnnouncement(Announcement announcement) {
        announcement.setDate(new Date());
        announcementDao.save(announcement);
        return announcement;
    }
}

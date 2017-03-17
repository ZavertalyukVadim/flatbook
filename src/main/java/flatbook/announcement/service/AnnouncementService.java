package flatbook.announcement.service;

import flatbook.announcement.dao.AnnouncementDao;
import flatbook.entity.Announcement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnnouncementService {
    @Autowired
    private AnnouncementDao dao;

    public List<Announcement> getAllAnnouncement() {
        return dao.findAll();
    }

    public void test() {
        Announcement announcement = new Announcement(120, "ololo", false);
        Announcement announcement1 = new Announcement(121, "ololo1", false);
        Announcement announcement2 = new Announcement(122, "ololo2", false);
        Announcement announcement3 = new Announcement(123, "ololo3", false);
        dao.save(announcement);
        dao.save(announcement1);
        dao.save(announcement2);
        dao.save(announcement3);
    }

    public Announcement getAnnouncementById(Integer id) {
        return dao.findOne(id);
    }

    public Announcement updateAnnouncement(Announcement oldAnnouncement) {
        Announcement announcement = dao.findOne(oldAnnouncement.getId());
        announcement.setDescription(oldAnnouncement.getDescription());
        announcement.setMarker(oldAnnouncement.getMarker());
        announcement.setPrice(oldAnnouncement.getPrice());
        dao.save(announcement);
        return announcement;
    }

    public Announcement deleteAnnouncement(Integer id) {
        dao.delete(id);
        return null;
    }

    public Announcement createAnnouncement(Announcement announcement) {
        dao.save(announcement);
        return announcement;
    }
}

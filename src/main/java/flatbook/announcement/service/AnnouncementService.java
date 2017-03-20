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
    private AnnouncementDao dao;

    public List<Announcement> getAllAnnouncement() {
        List<Announcement> list = dao.findAll();
        list.sort(Comparator.comparing(Announcement::getDate));
        return list;
    }

    public void test() {
        Announcement announcement = new Announcement(123, "ololo", false, new Date());
        announcement.setDate(new Date());
        Announcement announcement1 = new Announcement(122, "ololo1", false, new Date());
        announcement1.setDate(new Date());
        Announcement announcement2 = new Announcement(121, "ololo2", false, new Date());
        announcement2.setDate(new Date());
        Announcement announcement3 = new Announcement(120, "ololo3", false, new Date());
        announcement3.setDate(new Date());
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
        announcement.setDate(new Date());
        dao.save(announcement);
        return announcement;
    }

    public Announcement deleteAnnouncement(Integer id) {
        dao.delete(id);
        return null;
    }

    public Announcement createAnnouncement(Announcement announcement) {
        announcement.setDate(new Date());
        dao.save(announcement);
        return announcement;
    }
}

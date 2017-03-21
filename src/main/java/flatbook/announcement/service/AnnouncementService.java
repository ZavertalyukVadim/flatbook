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
        list.sort(Comparator.comparing(Announcement::getLastUpdated));
        return list;
    }

    public void test() {
        Announcement announcement = new Announcement(123, "ololo", false, new Date());
        announcement.setLastUpdated(new Date());
        announcement.setTitle("title1");
        announcement.setRooms(1);
        announcement.setLivingPlaces(100);
        Announcement announcement1 = new Announcement(122, "ololo1", false, new Date());
        announcement1.setLastUpdated(new Date());
        announcement1.setTitle("title2");
        announcement1.setRooms(1);
        announcement1.setLivingPlaces(100);
        Announcement announcement2 = new Announcement(121, "ololo2", false, new Date());
        announcement2.setLastUpdated(new Date());
        announcement2.setTitle("title3");
        announcement2.setRooms(1);
        announcement2.setLivingPlaces(100);
        Announcement announcement3 = new Announcement(120, "ololo3", false, new Date());
        announcement3.setLastUpdated(new Date());
        announcement3.setTitle("title4");
        announcement3.setRooms(1);
        announcement3.setLivingPlaces(100);
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
        announcement.setTitle(oldAnnouncement.getTitle());
        announcement.setPrice(oldAnnouncement.getPrice());
        announcement.setDescription(oldAnnouncement.getDescription());
        announcement.setVisibility(oldAnnouncement.getVisibility());
        announcement.setLastUpdated(new Date());
        announcement.setRooms(oldAnnouncement.getRooms());
        announcement.setLivingPlaces(oldAnnouncement.getLivingPlaces());
        announcementDao.save(announcement);
        return announcement;
    }

    public Announcement deleteAnnouncement(Integer id) {
        announcementDao.delete(id);
        return null;
    }

    public Announcement createAnnouncement(Announcement announcement) {
        announcement.setLastUpdated(new Date());
        announcementDao.save(announcement);
        return announcement;
    }
}

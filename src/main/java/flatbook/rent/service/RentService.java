package flatbook.rent.service;


import flatbook.announcement.dao.AnnouncementDao;
import flatbook.announcement.entity.Announcement;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.User;
import flatbook.profile.service.ProfileService;
import flatbook.rent.dao.RentDao;
import flatbook.rent.entity.Rent;
import flatbook.rent.entity.RentAnnouncement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class RentService {

    private final RentDao rentDao;
    private final AnnouncementDao announcementDao;
    private final UserDao userDao;

    private final ProfileService profileService;


    @Autowired
    public RentService(RentDao rentDao, AnnouncementDao announcementDao, UserDao userDao, ProfileService profileService) {
        this.rentDao = rentDao;
        this.announcementDao = announcementDao;
        this.userDao = userDao;
        this.profileService = profileService;
    }

    @Transactional
    public Announcement rent(RentAnnouncement rentAnnouncement) throws Exception {
        Rent newRent = rentAnnouncement.getRent();
        Announcement announcement = rentAnnouncement.getAnnouncement();
        announcement = announcementDao.findOne(announcement.getId());

        if (!isCorrectAnnouncement(announcement)) throw new Exception("Wrong announcement");
        if (isRented(announcement, newRent)) throw new Exception("Current data is rented");

        Rent rent = new Rent();
        rent.setFrom(newRent.getFrom());
        rent.setTo(newRent.getTo());

        rent = rentDao.save(rent);

        User currentUser = profileService.getCurrentUser();
        currentUser.getRents().add(rent);
        userDao.save(currentUser);

        announcement.getRents().add(rent);
        return announcementDao.save(announcement);
    }

    private boolean isCorrectAnnouncement(Announcement announcement) {
        return announcement != null;
    }

    private boolean isRented(Announcement announcement, Rent newRent) {
        return announcement.getRents().stream().anyMatch(rent -> newRent.equals(rent));
    }
}

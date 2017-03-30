package flatbook.announcement.dao;

import flatbook.announcement.entity.Announcement;
import flatbook.announcement.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnouncementDao extends JpaRepository<Announcement, Integer> {

        List<Announcement> getAnnouncementByCityAndRoomsAndLivingPlaces(City city, Integer rooms, Integer livingPlaces);
    List<Announcement> getAnnouncementByCity(City city);
}

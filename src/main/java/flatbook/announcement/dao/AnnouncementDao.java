package flatbook.announcement.dao;

import flatbook.announcement.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementDao extends JpaRepository<Announcement,Integer> {
}

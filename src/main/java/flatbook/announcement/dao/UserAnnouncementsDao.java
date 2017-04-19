package flatbook.announcement.dao;

import flatbook.announcement.entity.UserAnnouncements;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAnnouncementsDao extends JpaRepository<UserAnnouncements,Integer> {

    List<UserAnnouncements> getUserAnnouncementsByUserId(Integer id);
}

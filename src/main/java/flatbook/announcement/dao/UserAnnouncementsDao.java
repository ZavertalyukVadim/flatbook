package flatbook.announcement.dao;

import flatbook.announcement.entity.UserAnnouncements;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface UserAnnouncementsDao extends JpaRepository<UserAnnouncements,Integer> {

    Set<UserAnnouncements> getUserAnnouncementsByUserId(Integer id);
}

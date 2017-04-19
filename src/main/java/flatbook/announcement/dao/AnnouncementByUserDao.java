package flatbook.announcement.dao;

import flatbook.announcement.entity.AnnouncementByUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface AnnouncementByUserDao extends JpaRepository<AnnouncementByUser,Integer> {

    Set<AnnouncementByUser> getAnnouncementIdByUserId(Integer id);
}

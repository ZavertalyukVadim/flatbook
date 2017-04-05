package flatbook.announcement.dao;

import flatbook.announcement.entity.AnnouncementByUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnouncementByUserDao extends JpaRepository<AnnouncementByUser,Integer> {

    List<AnnouncementByUser> getAnnouncementIdByUserId(Integer id);
}

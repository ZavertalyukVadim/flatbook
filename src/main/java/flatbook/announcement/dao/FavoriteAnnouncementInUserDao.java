package flatbook.announcement.dao;

import flatbook.announcement.entity.FavoriteAnnouncements;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteAnnouncementInUserDao extends JpaRepository<FavoriteAnnouncements,Integer> {
    List<FavoriteAnnouncements> getFavoriteAnnouncementInUserByUserId(Integer id);
    Integer deleteFavoriteAnnouncementInUserByAnnouncementIdAndUserId(Integer announcementId, Integer userId);
}

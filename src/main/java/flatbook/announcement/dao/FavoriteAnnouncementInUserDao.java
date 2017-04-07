package flatbook.announcement.dao;

import flatbook.announcement.entity.FavoriteAnnouncementInUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteAnnouncementInUserDao extends JpaRepository<FavoriteAnnouncementInUser,Integer> {
    List<FavoriteAnnouncementInUser> getAnnouncementIdByUserId(Integer id);
    Integer deleteFavoriteAnnouncementInUserByAnnouncementIdAndUserId(Integer announcementId, Integer userId);
}

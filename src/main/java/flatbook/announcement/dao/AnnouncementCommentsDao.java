package flatbook.announcement.dao;

import flatbook.announcement.entity.AnnouncementComments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnouncementCommentsDao extends JpaRepository<AnnouncementComments,Integer>{
    List<AnnouncementComments> getCommentsToAnnouncementByAnnouncementId(Integer id);
}

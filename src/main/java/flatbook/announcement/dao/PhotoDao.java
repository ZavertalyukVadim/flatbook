package flatbook.announcement.dao;

import flatbook.announcement.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotoDao extends JpaRepository<Photo, Integer> {
}

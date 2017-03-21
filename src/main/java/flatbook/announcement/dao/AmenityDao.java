package flatbook.announcement.dao;

import flatbook.announcement.entity.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AmenityDao extends JpaRepository<Amenity, Integer> {
}

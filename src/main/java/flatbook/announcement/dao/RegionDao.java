package flatbook.announcement.dao;

import flatbook.announcement.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionDao extends JpaRepository<Region,Integer>{
}

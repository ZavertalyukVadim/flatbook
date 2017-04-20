package flatbook.announcement.dao;

import flatbook.announcement.entity.City;
import flatbook.announcement.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityDao extends JpaRepository<City,Integer> {
    List<City> getAllCitiesByRegion(Region region);
}

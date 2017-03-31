package flatbook.announcement.dao;

import flatbook.announcement.entity.Country;
import flatbook.announcement.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegionDao extends JpaRepository<Region, Integer> {
    List<Region> getAllRegionsByCountry(Country country);
}

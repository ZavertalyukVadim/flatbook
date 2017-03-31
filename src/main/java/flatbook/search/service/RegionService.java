package flatbook.search.service;

import flatbook.announcement.dao.CountryDao;
import flatbook.announcement.dao.RegionDao;
import flatbook.announcement.entity.Country;
import flatbook.announcement.entity.Region;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegionService {
    private final RegionDao regionDao;

    private final CountryDao countryDao;

    @Autowired
    public RegionService(RegionDao regionDao, CountryDao countryDao) {
        this.regionDao = regionDao;
        this.countryDao = countryDao;
    }

    public List<Region> getAllRegionsByCountry(Integer id) {
        Country country = countryDao.findOne(id);
        return regionDao.getAllRegionsByCountry(country);
    }
}

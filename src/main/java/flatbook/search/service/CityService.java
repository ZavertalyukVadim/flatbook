package flatbook.search.service;

import flatbook.announcement.dao.CityDao;
import flatbook.announcement.dao.RegionDao;
import flatbook.announcement.entity.City;
import flatbook.announcement.entity.Region;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {
    private final CityDao cityDao;

    private final RegionDao regionDao;

    @Autowired
    public CityService(CityDao cityDao, RegionDao regionDao) {
        this.cityDao = cityDao;
        this.regionDao = regionDao;
    }

    public List<City> getAllCitiesByRegion(Integer id) {
        Region region = regionDao.findOne(id);
        return cityDao.getAllCitiesByRegion(region);
    }
}

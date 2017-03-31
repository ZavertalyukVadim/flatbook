package flatbook.search.service;

import flatbook.announcement.dao.CityDao;
import flatbook.announcement.dao.CountryDao;
import flatbook.announcement.dao.RegionDao;
import flatbook.announcement.entity.City;
import flatbook.announcement.entity.Country;
import flatbook.announcement.entity.Region;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {
    private final CountryDao countryDao;

    private final RegionDao regionDao;

    private final CityDao cityDao;

    @Autowired
    public CountryService(CountryDao countryDao, RegionDao regionDao, CityDao cityDao) {
        this.countryDao = countryDao;
        this.regionDao = regionDao;
        this.cityDao = cityDao;
    }

    public List<Country> getAll() {
        return countryDao.findAll();
    }

    public void test() {
        Country country = new Country();
        country.setName("Ukraine");
        countryDao.save(country);
        Country country1 = new Country();
        country1.setName("Ukraine1");
        countryDao.save(country1);
        Country country2 = new Country();
        country2.setName("Ukraine2");
        countryDao.save(country2);
        Country country3 = new Country();
        country3.setName("Ukraine3");
        countryDao.save(country3);
        Region region = new Region();
        region.setName("region");
        region.setCountry(country);
        regionDao.save(region);
        Region region1 = new Region();
        region1.setName("region1");
        region1.setCountry(country);
        regionDao.save(region1);
        Region region2 = new Region();
        region2.setName("region2");
        region2.setCountry(country1);
        regionDao.save(region2);
        Region region3 = new Region();
        region3.setName("region3");
        regionDao.save(region3);
        City city = new City();
        city.setName("city");
        city.setRegion(region);
        cityDao.save(city);
        City city1 = new City();
        city1.setName("city1");
        city1.setRegion(region);
        cityDao.save(city1);
        City city2 = new City();
        city2.setName("city2");
        city2.setRegion(region1);
        cityDao.save(city2);
        City city3 = new City();
        city3.setName("city3");
        cityDao.save(city3);
    }
}

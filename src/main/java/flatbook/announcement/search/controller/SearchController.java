package flatbook.announcement.search.controller;

import flatbook.announcement.entity.City;
import flatbook.announcement.entity.Country;
import flatbook.announcement.entity.Region;
import flatbook.announcement.search.service.CityService;
import flatbook.announcement.search.service.CountryService;
import flatbook.announcement.search.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/search")
public class SearchController {
    private final CountryService countryService;

    private final RegionService regionService;

    private final CityService cityService;

    @Autowired
    public SearchController(CountryService countryService, RegionService regionService, CityService cityService) {
        this.countryService = countryService;
        this.regionService = regionService;
        this.cityService = cityService;
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public void test() {
        countryService.test();
    }

    @RequestMapping(value = "/countries", method = RequestMethod.GET)
    List<Country> getAllCountries() {
        return countryService.getAll();
    }

    @RequestMapping(value = "/regions", method = RequestMethod.GET)
    List<Region> getAllRegions(@RequestParam("country_id") Integer id) {
        return regionService.getAllRegionsByCountry(id);
    }

    @RequestMapping(value = "/cities", method = RequestMethod.GET)
    List<City> getAllCities(@RequestParam("region_id") Integer id) {
        return cityService.getAllCitiesByRegion(id);
    }
}

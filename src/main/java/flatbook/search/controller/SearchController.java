package flatbook.search.controller;

import flatbook.announcement.entity.Announcement;
import flatbook.announcement.entity.City;
import flatbook.announcement.entity.Country;
import flatbook.announcement.entity.Region;
import flatbook.announcement.service.AnnouncementService;
import flatbook.search.service.CityService;
import flatbook.search.service.CountryService;
import flatbook.search.service.RegionService;
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

    private final AnnouncementService announcementService;

    @Autowired
    public SearchController(CountryService countryService, RegionService regionService, CityService cityService, AnnouncementService announcementService) {
        this.countryService = countryService;
        this.regionService = regionService;
        this.cityService = cityService;
        this.announcementService = announcementService;
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

    @RequestMapping(value = "", method = RequestMethod.GET)
    List<Announcement> global(@RequestParam("city_id") Integer cityId,
                              @RequestParam("starting_price") Integer startingPrice,
                              @RequestParam("final_price") Integer finalPrice,
                              @RequestParam("rooms") Integer rooms,
                              @RequestParam("living_places") Integer livingPlaces) {
        return announcementService.getAnnouncementByCityAndRoomsAndLivingPlacesAndPricePerDay(cityId,startingPrice,finalPrice,rooms,livingPlaces);
    }

}

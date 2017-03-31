package flatbook.search.controller;

import flatbook.announcement.entity.*;
import flatbook.announcement.service.AnnouncementService;
import flatbook.search.service.CityService;
import flatbook.search.service.CountryService;
import flatbook.search.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "/regions/{id}", method = RequestMethod.GET)
    List<Region> getAllRegions(@PathVariable("id") Integer id) {
        return regionService.getAllRegionsByCountry(id);
    }

    @RequestMapping(value = "/cities/{id}", method = RequestMethod.GET)
    List<City> getAllCities(@PathVariable("id") Integer id) {
        return cityService.getAllCitiesByRegion(id);
    }

    @PostMapping
    public List<Announcement> search(@RequestBody Search search) {
        return announcementService.getAnnouncementByCityAndRoomsAndLivingPlacesAndPricePerDay(search);
    }

    @PostMapping(value = "/extended")
    public List<Announcement> extendedSearch(@RequestBody Search search,
                                 @RequestBody List<Amenity> amenities) {
        return announcementService.getAnnouncementByCityAndRoomsAndLivingPlacesAndPricePerDayAndAmenities(search,amenities);
    }


}

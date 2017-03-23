package flatbook.announcement.service;

import flatbook.announcement.dao.*;
import flatbook.announcement.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
public class AnnouncementService {
    private final AnnouncementDao announcementDao;

    private final CountryDao countryDao;

    private final RegionDao regionDao;

    private final CityDao cityDao;

    private final AmenityDao amenityDao;

    private final DistrictDao districtDao;

    @Autowired
    public AnnouncementService(AnnouncementDao announcementDao, CountryDao countryDao, RegionDao regionDao, CityDao cityDao, AmenityDao amenityDao, DistrictDao districtDao) {
        this.announcementDao = announcementDao;
        this.countryDao = countryDao;
        this.regionDao = regionDao;
        this.cityDao = cityDao;
        this.amenityDao = amenityDao;
        this.districtDao = districtDao;
    }

    public List<Announcement> getAllAnnouncement() {
        List<Announcement> list = announcementDao.findAll();
        list.sort(Comparator.comparing(Announcement::getLastUpdated));
        return list;
    }
    @Transactional
    public void test() {
        List<Amenity> amenityList = new ArrayList<>();
        Country coutry = new Country();
        coutry.setName("Ukraine");
        countryDao.save(coutry);
        Region region = new Region();
        region.setName("Cherkasy");
        region.setCountry(coutry);
        regionDao.save(region);
        City city = new City();
        city.setName("Cherkasy");
        city.setRegion(region);
        cityDao.save(city);
        District district = new District();
        district.setName("district");
        district.setCity(city);
        districtDao.save(district);
        Amenity amenity = new Amenity();
        amenity.setName("amenity");
        amenityDao.save(amenity);
        Amenity amenity1 = new Amenity();
        amenity1.setName("amenity1");
        amenityDao.save(amenity1);
        Amenity amenity2 = new Amenity();
        amenity2.setName("amenity2");
        amenityDao.save(amenity2);
        amenityList.add(amenity);
        amenityList.add(amenity1);
        amenityList.add(amenity2);
        Announcement announcement = new Announcement(123, "ololo", true, new Date());
        announcement.setPricePerMonth(100);
        announcement.setLastUpdated(new Date());
        announcement.setTitle("title1");
        announcement.setRooms(1);
        announcement.setLivingPlaces(100);
        announcement.setStreet("Shevchenko");
        announcement.setHouseNumber("450");
        announcement.setCountry(coutry);
        announcement.setRegion(region);
        announcement.setCity(city);
        announcement.setDistrict(district);
        announcement.setAmenities(amenityList);
        announcementDao.save(announcement);
        Announcement announcement1 = new Announcement(122, "ololo1", true, new Date());
        announcement1.setPricePerMonth(100);
        announcement1.setLastUpdated(new Date());
        announcement1.setTitle("title2");
        announcement1.setRooms(1);
        announcement1.setLivingPlaces(100);
        Announcement announcement2 = new Announcement(121, "ololo2", true, new Date());
        announcement2.setPricePerMonth(100);
        announcement2.setLastUpdated(new Date());
        announcement2.setTitle("title3");
        announcement2.setRooms(1);
        announcement2.setLivingPlaces(100);
        Announcement announcement3 = new Announcement(120, "ololo3", true, new Date());
        announcement3.setPricePerMonth(100);
        announcement3.setLastUpdated(new Date());
        announcement3.setTitle("title4");
        announcement3.setRooms(1);
        announcement3.setLivingPlaces(100);
        announcementDao.save(announcement1);
        announcementDao.save(announcement2);
        announcementDao.save(announcement3);
    }

    public Announcement getAnnouncementById(Integer id) {
        return announcementDao.findOne(id);
    }

    public Announcement updateAnnouncement(Announcement newAnnouncement) {
        Announcement announcement = announcementDao.findOne(newAnnouncement.getId());
        announcement.setPricePerDay(newAnnouncement.getPricePerDay());
        announcement.setPricePerMonth(newAnnouncement.getPricePerMonth());
        announcement.setTitle(newAnnouncement.getTitle());
        announcement.setDescription(newAnnouncement.getDescription());
        announcement.setCountry(newAnnouncement.getCountry());
        announcement.setRegion(newAnnouncement.getRegion());
        announcement.setCity(newAnnouncement.getCity());
        announcement.setStreet(newAnnouncement.getStreet());
        announcement.setHouseNumber(newAnnouncement.getHouseNumber());
        announcement.setVisibility(newAnnouncement.getVisibility());
        announcement.setLastUpdated(new Date());
        announcement.setRooms(newAnnouncement.getRooms());
        announcement.setLivingPlaces(newAnnouncement.getLivingPlaces());
        announcement.setAmenities(newAnnouncement.getAmenities());
        announcement.setPhotos(newAnnouncement.getPhotos());
        announcement.setPhone(newAnnouncement.getPhone());
        announcement.setEmail(newAnnouncement.getEmail());
        announcement.setDistrict(newAnnouncement.getDistrict());
        announcementDao.save(announcement);
        return announcement;
    }

    public Announcement deleteAnnouncement(Integer id) {
        announcementDao.delete(id);
        return null;
    }

    public Announcement createAnnouncement(Announcement announcement) {
        announcement.setLastUpdated(new Date());
        announcementDao.save(announcement);
        return announcement;
    }

    public Announcement updateVisibility(Integer id) {
        Announcement announcement = announcementDao.findOne(id);
        announcement.setVisibility(!announcement.getVisibility());
        announcementDao.save(announcement);
        return announcement;
    }
}

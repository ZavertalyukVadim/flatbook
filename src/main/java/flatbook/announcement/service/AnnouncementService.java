package flatbook.announcement.service;

import flatbook.announcement.dao.*;
import flatbook.announcement.entity.*;
import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class AnnouncementService {
    private final AnnouncementDao announcementDao;

    private final CountryDao countryDao;

    private final RegionDao regionDao;

    private final CityDao cityDao;

    private final AmenityDao amenityDao;

    private final DistrictDao districtDao;

    private final EmailDao emailDao;

    private final UserDao userDao;

    private final AnnouncementByUserDao announcementByUserDao;

    private final PhotoDao photoDao;


    @Autowired
    public AnnouncementService(AnnouncementDao announcementDao, CountryDao countryDao, RegionDao regionDao, CityDao cityDao, AmenityDao amenityDao, DistrictDao districtDao, EmailDao emailDao, UserDao userDao, AnnouncementByUserDao announcementByUserDao, PhotoDao photoDao) {
        this.announcementDao = announcementDao;
        this.countryDao = countryDao;
        this.regionDao = regionDao;
        this.cityDao = cityDao;
        this.amenityDao = amenityDao;
        this.districtDao = districtDao;
        this.emailDao = emailDao;
        this.userDao = userDao;
        this.announcementByUserDao = announcementByUserDao;
        this.photoDao = photoDao;
    }

    public List<Announcement> getAllAnnouncement() {
        return announcementDao.getAllByVisibilityTrueOrderByLastUpdatedDesc();
    }

    @Transactional
    public void test() {

        Photo photo = new Photo();
        photo.setTitle("photo");
        File file = new File(("src/main/resources/16637656.jpg"));
        Path path = file.toPath();
        try {
            photo.setImage(Files.readAllBytes(path));

        } catch (IOException e) {
            e.printStackTrace();
        }

        Photo photo1 = new Photo();
        photo1.setTitle("photo1");
        File file1 = new File("src/main/resources/16637656.jpg");
        Path path1 = file1.toPath();
        try {
            photo1.setImage(Files.readAllBytes(path1));

        } catch (IOException e) {
            e.printStackTrace();
        }

        Photo photo2 = new Photo();
        File file2 = new File("src/main/resources/qwe.jpg");
        Path path2 = file2.toPath();
        try {
            photo2.setImage(Files.readAllBytes(path2));

        } catch (IOException e) {
            e.printStackTrace();
        }
        photo2.setTitle("photo2");


        photoDao.save(photo1);
        photoDao.save(photo2);
        photoDao.save(photo);

        Set<Photo> photos = new HashSet<>();
        photos.add(photo);
        photos.add(photo1);
        photos.add(photo2);

        Set<Photo> photos1 = new HashSet<>();
        photos1.add(photo);
        photos1.add(photo1);
        photos1.add(photo2);

        Set<Amenity> amenityList = new HashSet<>();
        Country country = new Country();
        country.setName("Ukraine");
        countryDao.save(country);
        Country country1 = new Country();
        country1.setName("Russia");
        countryDao.save(country1);

        Region region = new Region();
        region.setName("Cherkasy");
        region.setCountry(country);
        regionDao.save(region);
        Region region1 = new Region();
        region1.setName("Kiev");
        region1.setCountry(country);
        regionDao.save(region1);
        Region region2 = new Region();
        region2.setName("Moscow");
        region2.setCountry(country1);
        regionDao.save(region2);
        Region region3 = new Region();
        region3.setName("St. Petersburg");
        region3.setCountry(country1);
        regionDao.save(region3);

        City city = new City();
        city.setName("Shpola");
        city.setRegion(region);
        cityDao.save(city);
        City city1 = new City();
        city1.setName("Smila");
        city1.setRegion(region);
        cityDao.save(city1);

        City city2 = new City();
        city2.setName("Brovary");
        city2.setRegion(region1);
        cityDao.save(city2);
        City city3 = new City();
        city3.setName("Borispol");
        city3.setRegion(region1);
        cityDao.save(city3);

        City city4 = new City();
        city4.setName("Klin");
        city4.setRegion(region2);
        cityDao.save(city4);
        City city5 = new City();
        city5.setName("Mytischi");
        city5.setRegion(region2);
        cityDao.save(city5);

        City city6 = new City();
        city6.setName("Petergof");
        city6.setRegion(region3);
        cityDao.save(city6);
        City city7 = new City();
        city7.setName("Gatchina");
        city7.setRegion(region3);
        cityDao.save(city7);


        District district = new District();
        district.setName("district");
        district.setCity(city);
        districtDao.save(district);


        Amenity amenity = new Amenity();
        amenity.setName("WI FI");
        amenityDao.save(amenity);
        Amenity amenity1 = new Amenity();
        amenity1.setName("Iron");
        amenityDao.save(amenity1);
        Amenity amenity2 = new Amenity();
        amenity2.setName("Balcony");
        amenityDao.save(amenity2);
        amenityList.add(amenity);
        amenityList.add(amenity1);
        amenityList.add(amenity2);
        Set<Amenity> amenityList2 = new HashSet<>();
        amenityList2.add(amenity);
        amenityList2.add(amenity1);

        Announcement announcement = new Announcement(123, "ololo", true, new Date());
        announcement.setPricePerMonth(1000);
        announcement.setLastUpdated(new Date());
        announcement.setPricePerDay(100);
        announcement.setTitle("title1");
        announcement.setRooms(1);
        announcement.setLivingPlaces(1);
        announcement.setStreet("Shevchenko");
        announcement.setHouseNumber("450");
        announcement.setCountry(country);
        announcement.setRegion(region);
        announcement.setCity(city);
        announcement.setDistrict(district);
        announcement.setAmenities(amenityList);
        announcement.setPhotos(photos);
        announcementDao.save(announcement);
        for (Photo photoFor : announcement.getPhotos()) {
            photoFor.setAnnouncement(announcement);
            photoDao.save(photoFor);
        }


        Announcement announcement1 = new Announcement(122, "ololo1", true, new Date());
        announcement1.setPricePerMonth(1200);
        announcement1.setLivingPlaces(1);
        announcement1.setLastUpdated(new Date());
        announcement1.setTitle("title2");
        announcement1.setRooms(1);
        announcement1.setCountry(country);
        announcement1.setPricePerDay(100);
        announcement1.setCity(city);
        announcement1.setAmenities(amenityList2);
        announcement1.setRegion(region);

        Announcement announcement2 = new Announcement(121, "ololo2", true, new Date());
        announcement2.setPricePerMonth(1300);
        announcement2.setRegion(region);
        announcement2.setLastUpdated(new Date());
        announcement2.setTitle("title3");
        announcement2.setRooms(1);
        announcement2.setLivingPlaces(1);
        announcement2.setCity(city1);
        announcement2.setPricePerDay(150);
        announcement2.setCountry(country);

        Announcement announcement3 = new Announcement(120, "ololo3", true, new Date());
        announcement3.setPricePerMonth(1400);
        announcement3.setLastUpdated(new Date());
        announcement3.setTitle("title4");
        announcement3.setRooms(1);
        announcement3.setLivingPlaces(1);
        announcement3.setPricePerDay(200);
        announcement3.setCity(city1);
        announcement3.setCountry(country);
        announcement3.setRegion(region);

        Announcement announcement4 = new Announcement(123, "ololo", true, new Date());
        announcement4.setPricePerMonth(1000);
        announcement4.setLastUpdated(new Date());
        announcement4.setTitle("title1");
        announcement4.setRooms(1);
        announcement4.setLivingPlaces(1);
        announcement4.setStreet("Shevchenko");
        announcement4.setHouseNumber("450");
        announcement4.setCountry(country);
        announcement4.setRegion(region1);
        announcement4.setPricePerDay(100);
        announcement4.setCity(city2);
        announcement4.setDistrict(district);
        announcement4.setAmenities(amenityList);

        Announcement announcement5 = new Announcement(122, "ololo1", true, new Date());
        announcement5.setPricePerMonth(1200);
        announcement5.setLivingPlaces(1);
        announcement5.setLastUpdated(new Date());
        announcement5.setTitle("title2");
        announcement5.setRooms(1);
        announcement5.setPricePerDay(100);
        announcement5.setCity(city2);
        announcement5.setCountry(country);
        announcement5.setAmenities(amenityList2);
        announcement5.setRegion(region1);

        Announcement announcement6 = new Announcement(121, "ololo2", true, new Date());
        announcement6.setPricePerMonth(1300);
        announcement6.setLastUpdated(new Date());
        announcement6.setTitle("title3");
        announcement6.setRooms(1);
        announcement6.setLivingPlaces(1);
        announcement6.setCity(city3);
        announcement6.setPricePerDay(150);
        announcement6.setCountry(country);
        announcement6.setRegion(region1);

        Announcement announcement7 = new Announcement(120, "ololo3", true, new Date());
        announcement7.setPricePerMonth(1400);
        announcement7.setLastUpdated(new Date());
        announcement7.setTitle("title4");
        announcement7.setRooms(1);
        announcement7.setLivingPlaces(1);
        announcement7.setPricePerDay(200);
        announcement7.setCity(city3);
        announcement7.setCountry(country);
        announcement7.setRegion(region1);


        Announcement announcement8 = new Announcement(123, "ololo", true, new Date());
        announcement8.setPricePerMonth(1000);
        announcement8.setLastUpdated(new Date());
        announcement8.setTitle("title1");
        announcement8.setRooms(1);
        announcement8.setPricePerDay(100);
        announcement8.setLivingPlaces(1);
        announcement8.setStreet("Shevchenko");
        announcement8.setHouseNumber("450");
        announcement8.setCountry(country1);
        announcement8.setRegion(region2);
        announcement8.setCity(city4);
        announcement8.setDistrict(district);
        announcement8.setAmenities(amenityList);

        Announcement announcement9 = new Announcement(122, "ololo1", true, new Date());
        announcement9.setPricePerMonth(1200);
        announcement9.setLastUpdated(new Date());
        announcement9.setTitle("title2");
        announcement9.setRooms(1);
        announcement9.setPricePerDay(100);
        announcement9.setLivingPlaces(1);
        announcement9.setCity(city4);
        announcement9.setAmenities(amenityList2);
        announcement9.setCountry(country1);
        announcement9.setRegion(region2);

        Announcement announcement10 = new Announcement(121, "ololo2", true, new Date());
        announcement10.setPricePerMonth(1300);
        announcement10.setLastUpdated(new Date());
        announcement10.setTitle("title3");
        announcement10.setRooms(1);
        announcement10.setLivingPlaces(1);
        announcement10.setCity(city5);
        announcement10.setPricePerDay(150);
        announcement10.setCountry(country1);
        announcement10.setRegion(region2);

        Announcement announcement11 = new Announcement(120, "ololo3", true, new Date());
        announcement11.setPricePerMonth(1400);
        announcement11.setLastUpdated(new Date());
        announcement11.setTitle("title4");
        announcement11.setRooms(1);
        announcement11.setLivingPlaces(1);
        announcement11.setPricePerDay(200);
        announcement11.setCity(city5);
        announcement11.setCountry(country1);
        announcement11.setRegion(region2);

        Announcement announcement12 = new Announcement(123, "ololo", true, new Date());
        announcement12.setPricePerMonth(1000);
        announcement12.setLastUpdated(new Date());
        announcement12.setTitle("title1");
        announcement12.setRooms(1);
        announcement12.setLivingPlaces(1);
        announcement12.setStreet("Shevchenko");
        announcement12.setHouseNumber("450");
        announcement12.setCountry(country1);
        announcement12.setRegion(region3);
        announcement12.setPricePerDay(150);
        announcement12.setCity(city6);
        announcement12.setDistrict(district);
        announcement12.setAmenities(amenityList);

        Announcement announcement13 = new Announcement(122, "ololo1", true, new Date());
        announcement13.setPricePerMonth(1200);
        announcement13.setLastUpdated(new Date());
        announcement13.setTitle("title2");
        announcement13.setRooms(1);
        announcement13.setPricePerDay(100);
        announcement13.setLivingPlaces(1);
        announcement13.setCity(city6);
        announcement13.setAmenities(amenityList2);
        announcement13.setCountry(country1);
        announcement13.setRegion(region3);

        Announcement announcement14 = new Announcement(121, "ololo2", true, new Date());
        announcement14.setPricePerMonth(1300);
        announcement14.setLastUpdated(new Date());
        announcement14.setTitle("title3");
        announcement14.setRooms(1);
        announcement14.setLivingPlaces(1);
        announcement14.setCity(city7);
        announcement14.setPricePerDay(150);
        announcement14.setCountry(country1);
        announcement14.setRegion(region3);

        Announcement announcement15 = new Announcement(120, "ololo3", true, new Date());
        announcement15.setPricePerMonth(1400);
        announcement15.setLastUpdated(new Date());
        announcement15.setTitle("title4");
        announcement15.setRooms(1);
        announcement15.setLivingPlaces(1);
        announcement15.setPricePerDay(200);
        announcement15.setCity(city7);
        announcement15.setCountry(country1);
        announcement15.setRegion(region3);

        announcementDao.save(announcement);
        announcementDao.save(announcement1);
        announcementDao.save(announcement2);
        announcementDao.save(announcement3);
        announcementDao.save(announcement4);
        announcementDao.save(announcement5);
        announcementDao.save(announcement6);
        announcementDao.save(announcement7);
        announcementDao.save(announcement8);
        announcementDao.save(announcement9);
        announcementDao.save(announcement10);
        announcementDao.save(announcement11);
        announcementDao.save(announcement12);
        announcementDao.save(announcement13);
        announcementDao.save(announcement14);
        announcementDao.save(announcement15);
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
        announcement.setUser(getCurrentUser());
        announcement.setDistrict(newAnnouncement.getDistrict());
        announcementDao.save(announcement);
        return announcement;
    }

    public Announcement deleteAnnouncement(Integer id) {
        announcementDao.delete(id);
        return null;
    }

    @Transactional
    public Announcement createAnnouncement(Announcement announcement) {
        announcement.setLastUpdated(new Date());
        announcement.setUser(getCurrentUser());
        Announcement savedAnnouncement = saveAnnouncement(announcement);
        AnnouncementByUser announcementByUser = new AnnouncementByUser();
        announcementByUser.setUserId(getCurrentUser().getId());
        announcementByUser.setAnnouncementId(savedAnnouncement.getId());
        announcementByUserDao.save(announcementByUser);
        return announcement;
    }

    private Announcement saveAnnouncement(Announcement announcement) {
        announcement.setLastUpdated(new Date());

        return announcementDao.save(announcement);
    }

    public Announcement updateVisibility(Integer id) {
        Announcement announcement = announcementDao.findOne(id);
        announcement.setVisibility(!announcement.getVisibility());
        announcementDao.save(announcement);
        return announcement;
    }

    @Transactional
    public List<Announcement> getAnnouncementBySmallSearch(Search search) {
        City city = cityDao.findOne(search.getCityId());
        return (search.getPrice() == Price.PRICE_PER_DAY)
                ? announcementDao.getAnnouncementPerDay(city, search)
                : announcementDao.getAnnouncementPerMonth(city, search);
    }

    @Transactional
    public List<Announcement> getAnnouncementByExtendedSearch(ExtendSearch extendSearch) {
        City city = cityDao.findOne(extendSearch.getCityId());
        return (extendSearch.getPrice() == Price.PRICE_PER_DAY)
                ? announcementDao.getAnnouncementPerDayWithAmenities(city, extendSearch)
                : announcementDao.getAnnouncementPerMonthWithAmenities(city, extendSearch);

    }

    public MaxPrice getMaxPriceOnWorldPerDay() {
        Announcement announcementForPerDay = announcementDao.findTopByOrderByPricePerDayDesc();
        Announcement announcementForPerMonth = announcementDao.findTopByOrderByPricePerMonthDesc();
        return new MaxPrice(announcementForPerDay.getPricePerDay(), announcementForPerMonth.getPricePerMonth());
    }

    public MaxPrice getMaxPriceOnCountry(Integer id) {
        Country country = countryDao.findOne(id);
        List<Announcement> announcementForPerDay = announcementDao.getAnnouncementByCountryOrderByPricePerDayDesc(country);
        int topPricePerDay = announcementForPerDay.get(0).getPricePerDay();
        List<Announcement> announcementForPerMoth = announcementDao.getAnnouncementByCountryOrderByPricePerMonthDesc(country);
        int topPricePerMonth = announcementForPerMoth.get(0).getPricePerMonth();
        return new MaxPrice(topPricePerDay, topPricePerMonth);
    }

    public MaxPrice getMaxPriceOnRegion(Integer id) {
        Region region = regionDao.findOne(id);
        List<Announcement> announcementForPerDay = announcementDao.getAnnouncementByRegionOrderByPricePerDayDesc(region);
        int topPricePerDay = announcementForPerDay.get(0).getPricePerDay();
        List<Announcement> announcementForPerMonth = announcementDao.getAnnouncementByRegionOrderByPricePerMonthDesc(region);
        int topPricePerMonth = announcementForPerMonth.get(0).getPricePerMonth();
        return new MaxPrice(topPricePerDay, topPricePerMonth);
    }

    public MaxPrice getMaxPriceOnCity(Integer id) {
        City city = cityDao.findOne(id);
        List<Announcement> announcementForPerDay = announcementDao.getAnnouncementByCityOrderByPricePerDayDesc(city);
        int topPricePerDay = announcementForPerDay.get(0).getPricePerDay();
        List<Announcement> announcementForPerMonth = announcementDao.getAnnouncementByCityOrderByPricePerMonthDesc(city);
        int topPricePerMonth = announcementForPerMonth.get(0).getPricePerMonth();
        return new MaxPrice(topPricePerDay, topPricePerMonth);
    }

    private User getCurrentUser() {
        Email email = emailDao.findOneByContent(getUserEmail());
        return userDao.getUserByEmails(email);
    }

    private String getUserEmail() {
        return getUserDetails().getName();
    }

    private Authentication getUserDetails() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}

package flatbook.announcement.service;

import flatbook.announcement.dao.*;
import flatbook.announcement.entity.*;
import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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

    private final UserAnnouncementsDao userAnnouncementsDao;

    private final PhotoDao photoDao;

    private final FavoriteAnnouncementInUserDao favoriteAnnouncementInUserDao;

    @Autowired
    public AnnouncementService(AnnouncementDao announcementDao, CountryDao countryDao, RegionDao regionDao, CityDao cityDao, AmenityDao amenityDao, DistrictDao districtDao, EmailDao emailDao, UserDao userDao, UserAnnouncementsDao userAnnouncementsDao, PhotoDao photoDao, FavoriteAnnouncementInUserDao favoriteAnnouncementInUserDao) {
        this.announcementDao = announcementDao;
        this.countryDao = countryDao;
        this.regionDao = regionDao;
        this.cityDao = cityDao;
        this.amenityDao = amenityDao;
        this.districtDao = districtDao;
        this.emailDao = emailDao;
        this.userDao = userDao;
        this.userAnnouncementsDao = userAnnouncementsDao;
        this.photoDao = photoDao;
        this.favoriteAnnouncementInUserDao = favoriteAnnouncementInUserDao;
    }

    public Page<Announcement> getAllAnnouncement(int page, int itemsPerPage) {
        PageRequest pageRequest = new PageRequest(page, itemsPerPage);
        Page<Announcement> announcements = announcementDao.getAllByVisibilityTrueOrderByLastUpdatedDesc(pageRequest);

        try {
            List<Integer> listAnnouncementId = getListAnnouncementIdWhichLikedCurrentUser();
            for (Announcement announcement : announcements) {
                if (getCurrentUser().isEnabled()) {
                    if (listAnnouncementId.contains(announcement.getId())) {
                        announcement.setLiked(true);
                    }
                }
            }
        } catch (Exception ignored) {

        }

        return announcements;
    }

    private List<Integer> getListAnnouncementIdWhichLikedCurrentUser() {
        List<Integer> listAnnouncementId = new ArrayList<>();
        List<FavoriteAnnouncementInUser> announcementByUser = favoriteAnnouncementInUserDao.getFavoriteAnnouncementInUserByUserId(getCurrentUser().getId());
        for (FavoriteAnnouncementInUser favoriteAnnouncementInUser : announcementByUser) {
            listAnnouncementId.add(favoriteAnnouncementInUser.getAnnouncementId());
        }
        return listAnnouncementId;
    }

    public Announcement getAnnouncementById(Integer id) {
        List<Integer> listAnnouncementId = getListAnnouncementIdWhichLikedCurrentUser();
        Announcement announcement = announcementDao.findOne(id);
        if (listAnnouncementId.contains(announcement.getId())) {
            announcement.setLiked(true);
        }

        return announcement;
    }

    public Announcement updateAnnouncement(Post post) {
        City city = cityDao.findOne(post.getCityId());
        Announcement announcement = announcementDao.findOne(post.getAnnouncementId());
        Set<Photo> photos = new HashSet<>();
        for (Integer photo : post.getPhotos()) {
            photos.add(photoDao.findOne(photo));
        }
        announcement.setTitle(post.getTitle());
        announcement.setDescription(post.getDescription());
        announcement.setRooms(post.getRooms());
        announcement.setStreet(post.getStreet());
        announcement.setLivingPlaces(post.getLivingPlaces());
        announcement.setPhotos(photos);
        if (post.getPriceType() == Price.PRICE_PER_DAY) {
            announcement.setPricePerDay(post.getPriceValue());
        } else {

            announcement.setPricePerMonth(post.getPriceValue());
        }
        announcement.setAmenities(post.getAmenities());
        announcement.setLastUpdated(new Date());
        announcement.setCity(city);
        announcement.setRegion(city.getRegion());
        announcement.setCountry(city.getRegion().getCountry());
        announcement.setUser(getCurrentUser());
        return announcementDao.save(announcement);
    }

    public Boolean deleteAnnouncement(Integer id) {
        announcementDao.delete(id);
        return true;
    }

    public Announcement createAnnouncement(Post post) {
        City city = cityDao.findOne(post.getCityId());

        Announcement announcement = new Announcement();
        Set<Photo> photos = new HashSet<>();
        for (Integer photo : post.getPhotos()) {
            photos.add(photoDao.findOne(photo));
        }
        announcement.setTitle(post.getTitle());
        announcement.setDescription(post.getDescription());
        announcement.setRooms(post.getRooms());
        announcement.setStreet(post.getStreet());
        announcement.setLivingPlaces(post.getLivingPlaces());
        announcement.setPhotos(photos);
        if (post.getPriceType() == Price.PRICE_PER_DAY) {
            announcement.setPricePerDay(post.getPriceValue());
        } else {

            announcement.setPricePerMonth(post.getPriceValue());
        }
        announcement.setAmenities(post.getAmenities());
        announcement.setLastUpdated(new Date());
        announcement.setCity(city);
        announcement.setRegion(city.getRegion());
        announcement.setCountry(city.getRegion().getCountry());
        announcement.setUser(getCurrentUser());
        announcement.setLastUpdated(new Date());
        Announcement savedAnnouncement = announcementDao.save(announcement);
        for (Photo photo : savedAnnouncement.getPhotos()) {
            photo.setAnnouncement(savedAnnouncement);
            photoDao.save(photo);
        }
        UserAnnouncements userAnnouncements = new UserAnnouncements();
        userAnnouncements.setUserId(getCurrentUser().getId());
        userAnnouncements.setAnnouncementId(savedAnnouncement.getId());
        userAnnouncementsDao.save(userAnnouncements);
        return announcementDao.findOne(savedAnnouncement.getId());
    }

    public Announcement updateVisibility(Integer id) {
        Announcement announcement = announcementDao.findOne(id);
        announcement.setVisibility(!announcement.getVisibility());
        announcementDao.save(announcement);
        return announcement;
    }

    public Page<Announcement> getAnnouncementBySmallSearch(Search search) {
        PageRequest pageRequest = new PageRequest(search.getPageNum(), search.getItemsPerPage());
        Page<Announcement> announcementPage = (search.getPrice() == Price.PRICE_PER_DAY)
                ? announcementDao.getAnnouncementPerDay(search, pageRequest)
                : announcementDao.getAnnouncementPerMonth(search, pageRequest);
        List<Integer> listAnnouncementId = getListAnnouncementIdWhichLikedCurrentUser();
        for (Announcement announcement : announcementPage) {
            if (listAnnouncementId.contains(announcement.getId())) {
                announcement.setLiked(true);
            }
        }
        return announcementPage;
    }

    public Page<Announcement> getAnnouncementByExtendedSearch(ExtendSearch extendSearch) {
        if (!containsAmenities(extendSearch)) {
            Search search = new Search(extendSearch.getCityId(), extendSearch.getStartingPrice(), extendSearch.getFinalPrice(), extendSearch.getPrice(),
                    extendSearch.getRooms(), extendSearch.getLivingPlaces());
            search.setPageNum(extendSearch.getPageNum());
            search.setItemsPerPage(extendSearch.getItemsPerPage());
            search.setStartDate(extendSearch.getStartDate());
            search.setEndDate(extendSearch.getEndDate());
            return getAnnouncementBySmallSearch(search);
        }

        PageRequest pageRequest = new PageRequest(extendSearch.getPageNum(), extendSearch.getItemsPerPage());
        Page<Announcement> announcementPage = (extendSearch.getPrice() == Price.PRICE_PER_DAY)
                ? announcementDao.getAnnouncementPerDayWithAmenities(extendSearch, pageRequest)
                : announcementDao.getAnnouncementPerMonthWithAmenities(extendSearch, pageRequest);
        List<Integer> listAnnouncementId = getListAnnouncementIdWhichLikedCurrentUser();
        for (Announcement announcement : announcementPage) {
            if (listAnnouncementId.contains(announcement.getId())) {
                announcement.setLiked(true);
            }
        }
        return announcementPage;
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
        Email email = emailDao.findOneByContentAndIsPrimaryTrue(getUserEmail());
        return userDao.getUserByEmails(email);
    }

    private String getUserEmail() {
        return getUserDetails().getName();
    }

    private Authentication getUserDetails() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    private boolean containsAmenities(ExtendSearch extendSearch) {
        return extendSearch.getAmenities().size() != 0;
    }
}

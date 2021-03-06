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
        chackedLikedAnnouncement(announcements);
        return announcements;
    }

    private List<Integer> getListAnnouncementIdWhichLikedCurrentUser() {
        List<Integer> listAnnouncementId = new ArrayList<>();
        List<FavoriteAnnouncements> announcementByUser = favoriteAnnouncementInUserDao.getFavoriteAnnouncementInUserByUserId(getCurrentUser().getId());
        for (FavoriteAnnouncements favoriteAnnouncements : announcementByUser) {
            listAnnouncementId.add(favoriteAnnouncements.getAnnouncementId());
        }
        return listAnnouncementId;
    }

    public Announcement getAnnouncementById(Integer id) {
        Announcement announcement = announcementDao.findOne(id);
        chacked(announcement);
        return announcement;
    }

    private void chacked(Announcement announcement) {
        try {
            List<Integer> listAnnouncementId = getListAnnouncementIdWhichLikedCurrentUser();

            if (listAnnouncementId.contains(announcement.getId())) {
                announcement.setLiked(true);
            }
        }
        catch (Exception ignored){}
    }

    public Announcement updateAnnouncement(PostDto postDto) {
        City city = cityDao.findOne(postDto.getCityId());
        Announcement announcement = announcementDao.findOne(postDto.getAnnouncementId());
        Set<Photo> photos = new HashSet<>();
        for (Integer photo : postDto.getPhotos()) {
            photos.add(photoDao.findOne(photo));
        }
        announcement.setTitle(postDto.getTitle());
        announcement.setDescription(postDto.getDescription());
        announcement.setRooms(postDto.getRooms());
        announcement.setStreet(postDto.getStreet());
        announcement.setLivingPlaces(postDto.getLivingPlaces());
        announcement.setPhotos(photos);
        if (postDto.getPriceType() == PriceType.PRICE_PER_DAY) {
            announcement.setPricePerDay(postDto.getPriceValue());
        } else {

            announcement.setPricePerMonth(postDto.getPriceValue());
        }
        announcement.setAmenities(postDto.getAmenities());
        announcement.setLastUpdated(new Date());
        announcement.setCity(city);
        announcement.setRegion(city.getRegion());
        announcement.setCountry(city.getRegion().getCountry());
        announcement.setUser(getCurrentUser());
        Announcement savedAnnouncement =  announcementDao.save(announcement);
        for (Photo photo : savedAnnouncement.getPhotos()) {
            photo.setAnnouncement(savedAnnouncement);
            photoDao.save(photo);
        }
        return announcementDao.findOne(savedAnnouncement.getId());
    }

    public Boolean deleteAnnouncement(Integer id) {
        announcementDao.delete(id);
        return true;
    }

    public Announcement createAnnouncement(PostDto postDto) {
        City city = cityDao.findOne(postDto.getCityId());

        Announcement announcement = new Announcement();
        Set<Photo> photos = new HashSet<>();
        for (Integer photo : postDto.getPhotos()) {
            photos.add(photoDao.findOne(photo));
        }
        announcement.setTitle(postDto.getTitle());
        announcement.setDescription(postDto.getDescription());
        announcement.setRooms(postDto.getRooms());
        announcement.setStreet(postDto.getStreet());
        announcement.setLivingPlaces(postDto.getLivingPlaces());
        announcement.setPhotos(photos);
        if (postDto.getPriceType() == PriceType.PRICE_PER_DAY) {
            announcement.setPricePerDay(postDto.getPriceValue());
        } else {

            announcement.setPricePerMonth(postDto.getPriceValue());
        }
        announcement.setAmenities(postDto.getAmenities());
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
        return announcementDao.findOne(savedAnnouncement.getId());
    }

    public Announcement updateVisibility(Integer id) {
        Announcement announcement = announcementDao.findOne(id);
        announcement.setVisibility(!announcement.getVisibility());
        announcementDao.save(announcement);
        return announcement;
    }

    @Transactional
    public Page<Announcement> getAnnouncementBySmallSearch(Search search) {
        PageRequest pageRequest = new PageRequest(search.getPageNum(), search.getItemsPerPage());

        search.setEndLocalDate(search.getEndLocalDate());
        search.setStartLocalDate(search.getStartLocalDate());

        Page<Announcement> announcementPage = (search.getPriceType() == PriceType.PRICE_PER_DAY)
                ? announcementDao.getAnnouncementPerDay(search, pageRequest)
                : announcementDao.getAnnouncementPerMonth(search, pageRequest);
        chackedLikedAnnouncement(announcementPage);
        return announcementPage;
    }

    private void chackedLikedAnnouncement(Page<Announcement> announcementPage) {
        try {
            List<Integer> listAnnouncementId = getListAnnouncementIdWhichLikedCurrentUser();
            for (Announcement announcement : announcementPage) {
                if (listAnnouncementId.contains(announcement.getId())) {
                    announcement.setLiked(true);
                }
            }
        }
        catch (Exception e){

        }
    }

    public Page<Announcement> getAnnouncementByExtendedSearch(ExtendSearch extendSearch) {
        if (!containsAmenities(extendSearch)) {
            Search search = new Search(extendSearch.getCityId(), extendSearch.getStartingPrice(), extendSearch.getFinalPrice(), extendSearch.getPriceType(),
                    extendSearch.getRooms(), extendSearch.getLivingPlaces());
            search.setPageNum(extendSearch.getPageNum());
            search.setItemsPerPage(extendSearch.getItemsPerPage());

            search.setStartDate(extendSearch.getStartDate());
            search.setEndDate(extendSearch.getEndDate());

            return getAnnouncementBySmallSearch(search);
        }

        extendSearch.setStartLocalDate(extendSearch.getStartLocalDate());
        extendSearch.setEndLocalDate(extendSearch.getEndLocalDate());

        PageRequest pageRequest = new PageRequest(extendSearch.getPageNum(), extendSearch.getItemsPerPage());
        Page<Announcement> announcementPage = (extendSearch.getPriceType() == PriceType.PRICE_PER_DAY)
                ? announcementDao.getAnnouncementPerDayWithAmenities(extendSearch, pageRequest)
                : announcementDao.getAnnouncementPerMonthWithAmenities(extendSearch, pageRequest);
        List<Integer> listAnnouncementId = getListAnnouncementIdWhichLikedCurrentUser();
        try {


            for (Announcement announcement : announcementPage) {
                if (listAnnouncementId.contains(announcement.getId())) {
                    announcement.setLiked(true);
                }
            }
        }
        catch (Exception ignored){

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

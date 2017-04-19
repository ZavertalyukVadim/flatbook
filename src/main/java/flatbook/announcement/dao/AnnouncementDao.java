package flatbook.announcement.dao;

import flatbook.announcement.entity.*;
import flatbook.chat.dto.UserWithId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnnouncementDao extends JpaRepository<Announcement, Integer> {

    @Query("SELECT a FROM Announcement a where a.city.id = :#{#search.cityId} " +
            "and  a.rooms=:#{#search.rooms} " +
            "and a.visibility = true " +
            "and a.livingPlaces=:#{#search.livingPlaces} " +
            "and a.pricePerDay between :#{#search.startingPrice} and :#{#search.finalPrice} " +
            "and 0 in (select count(rent) from Rent rent where a.id=rent.announcementsId " +
            "and not (:#{#search.endDate} <= rent.from or :#{#search.endDate} >= rent.to))")
    Page<Announcement> getAnnouncementPerDay(@Param("search") Search search, Pageable pageable);

    @Query("SELECT a FROM Announcement a where a.city.id = :#{#search.cityId} " +
            "and  a.rooms=:#{#search.rooms} " +
            "and a.visibility = true " +
            "and a.livingPlaces=:#{#search.livingPlaces} " +
            "and a.pricePerMonth between :#{#search.startingPrice} and :#{#search.finalPrice} " +
            "and 0 in (select count(rent) from Rent rent where a.id=rent.announcementsId " +
            "and not (:#{#search.endDate} <= rent.from or :#{#search.endDate} >= rent.to))")
    Page<Announcement> getAnnouncementPerMonth(@Param("search") Search search, Pageable pageable);

    @Query(value = "SELECT a FROM Announcement a INNER JOIN a.amenities amenities where a.city.id = :#{#search.cityId} " +
            "and a.rooms=:#{#search.rooms} " +
            "and a.visibility = true " +
            "and a.livingPlaces=:#{#search.livingPlaces} " +
            "and amenities in :#{#search.amenities} " +
            "and a.pricePerDay between :#{#search.startingPrice} and :#{#search.finalPrice} " +
            "and 0 in (select count(rent) from Rent rent where a.id=rent.announcementsId " +
            "and not (:#{#search.endDate} <= rent.from or :#{#search.endDate} >= rent.to))" +
            " group by a")
    Page<Announcement> getAnnouncementPerDayWithAmenities(@Param("search") ExtendSearch search, Pageable pageRequest);

    @Query("SELECT a FROM Announcement a INNER JOIN  a.amenities amenities where a.city.id = :#{#search.cityId} " +
            "and a.rooms = :#{#search.rooms} " +
            "and a.visibility = true " +
            "and a.livingPlaces = :#{#search.livingPlaces} " +
            "and amenities in  :#{#search.amenities} " +
            "and a.pricePerMonth between :#{#search.startingPrice} and :#{#search.finalPrice} " +
            "and 0 in (select count(rent) from Rent rent where a.id=rent.announcementsId " +
            "and not (:#{#search.endDate} <= rent.from or :#{#search.endDate} >= rent.to))" +
            "group by a")
    Page<Announcement> getAnnouncementPerMonthWithAmenities(@Param("search") ExtendSearch search, Pageable pageable);

    @Query("SELECT distinct m.announcementId FROM Message m where m.senderId=:#{#userIdPar.id} or m.receiverId=:#{#userIdPar.id} ")
    List<Integer> getChatsAnnouncements(@Param("userIdPar") UserWithId userIdPar);

    Announcement findTopByOrderByPricePerDayDesc();

    Announcement findTopByOrderByPricePerMonthDesc();

    List<Announcement> getAnnouncementByCountryOrderByPricePerDayDesc(Country country);

    List<Announcement> getAnnouncementByCountryOrderByPricePerMonthDesc(Country country);

    List<Announcement> getAnnouncementByRegionOrderByPricePerDayDesc(Region region);

    List<Announcement> getAnnouncementByRegionOrderByPricePerMonthDesc(Region region);

    List<Announcement> getAnnouncementByCityOrderByPricePerDayDesc(City city);

    List<Announcement> getAnnouncementByCityOrderByPricePerMonthDesc(City city);

    Page<Announcement> getAllByVisibilityTrueOrderByLastUpdatedDesc(Pageable pageable);


}

package flatbook.announcement.dao;

import flatbook.announcement.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnnouncementDao extends JpaRepository<Announcement, Integer> {

    @Query("SELECT a FROM Announcement a where a.city = :#{#city} " +
            "and  a.rooms=:#{#search.rooms} " +
            "and a.livingPlaces=:#{#search.livingPlaces} " +
            "and a.pricePerDay between :#{#search.startingPrice} " +
            "and :#{#search.finalPrice}")
    List<Announcement> getAnnouncementPerDay(@Param("city") City city,@Param("search") Search search);

    @Query("SELECT a FROM Announcement a where a.city = :#{#city} " +
            "and  a.rooms=:#{#search.rooms} " +
            "and a.livingPlaces=:#{#search.livingPlaces} " +
            "and a.pricePerMonth between :#{#search.startingPrice} " +
            "and :#{#search.finalPrice}")
    List<Announcement> getAnnouncementPerMonth(@Param("city") City city,@Param("search") Search search);

    @Query("SELECT a FROM Announcement a where a.city = :#{#city} " +
            "and  a.rooms=:#{#search.rooms} " +
            "and a.livingPlaces=:#{#search.livingPlaces} " +
            "and a.pricePerDay between :#{#search.startingPrice} " +
            "and :#{#search.finalPrice} " +
            "and a.amenities  = :#{#search.amenities}")
    List<Announcement> getAnnouncementPerDayWithAmenities(@Param("city") City city,@Param("search") ExtendSearch search);

    @Query("SELECT a FROM Announcement a where a.city = :#{#city} " +
            "and  a.rooms=:#{#search.rooms} " +
            "and a.livingPlaces=:#{#search.livingPlaces} " +
            "and a.pricePerMonth between :#{#search.startingPrice} " +
            "and :#{#search.finalPrice} " +
            "and  a.amenities  = :#{#search.amenities}")
    List<Announcement> getAnnouncementPerMonthWithAmenities(@Param("city") City city,@Param("search") ExtendSearch search);

}

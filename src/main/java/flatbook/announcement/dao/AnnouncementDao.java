package flatbook.announcement.dao;

import flatbook.announcement.entity.Announcement;
import flatbook.announcement.entity.City;
import flatbook.announcement.entity.ExtendSearch;
import flatbook.announcement.entity.Search;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnnouncementDao extends JpaRepository<Announcement, Integer> {

    @Query("SELECT a FROM Announcement a where a.city = :#{#city} " +
            "and  a.rooms=:#{#search.rooms} " +
            "and a.livingPlaces=:#{#search.livingPlaces} " +
            "and a.pricePerDay between :#{#search.startingPrice} and :#{#search.finalPrice}")
    List<Announcement> getAnnouncementPerDay(@Param("city") City city,@Param("search") Search search);

    @Query("SELECT a FROM Announcement a where a.city = :#{#city} " +
            "and  a.rooms=:#{#search.rooms} " +
            "and a.livingPlaces=:#{#search.livingPlaces} " +
            "and a.pricePerMonth between :#{#search.startingPrice} and :#{#search.finalPrice}")
    List<Announcement> getAnnouncementPerMonth(@Param("city") City city,@Param("search") Search search);

    @Query("SELECT a FROM Announcement a  left outer join a.amenities amenities where a.city = :#{#city} " +
            "and a.rooms=:#{#search.rooms} " +
            "and a.livingPlaces=:#{#search.livingPlaces} " +
            "and amenities in :#{#search.amenities} "+
            "and a.pricePerDay between :#{#search.startingPrice} and :#{#search.finalPrice}     ")
    List<Announcement> getAnnouncementPerDayWithAmenities(@Param("city") City city,@Param("search") ExtendSearch search);

    @Query("SELECT a FROM Announcement a left outer join a.amenities amenities where a.city = :#{#city} " +
            "and a.rooms = :#{#search.rooms} " +
            "and a.livingPlaces = :#{#search.livingPlaces} " +
            "and amenities in  :#{#search.amenities} "+
            "and a.pricePerMonth between :#{#search.startingPrice} and :#{#search.finalPrice} ")
    List<Announcement> getAnnouncementPerMonthWithAmenities(@Param("city") City city,@Param("search") ExtendSearch search);
}

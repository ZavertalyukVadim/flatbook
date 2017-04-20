package flatbook.rent.dao;

import flatbook.rent.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface RentDao extends JpaRepository<Rent, Integer> {
    List<Rent> getAllByUserId(Integer userId);

//    @Query(value = "select count(rent.announcementsId) from Rent rent " +
//    "where (not (:#{#startP} < rent. or new.`from` >= rents.`to`)) and new.`announcement_id`=rents.`announcement_id`");



    @Query(value = "select count(rent.announcementsId) from Rent rent where " +
            "(not " +
            ":#{#endP} < rent.from or :#{#startP} >= rent.to " +
            ") " +
            "and :#{#announcementId}=rent.announcementsId")
    Integer getCount(@Param("startP") LocalDate startP, @Param("endP") LocalDate endP, @Param("announcementId") Integer announcementId);
}

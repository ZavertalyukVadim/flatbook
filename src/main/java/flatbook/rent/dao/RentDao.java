package flatbook.rent.dao;

import flatbook.rent.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RentDao extends JpaRepository<Rent, Integer> {
    List<Rent> getAllByUserId(Integer userId);
}

package flatbook.rent.dao;

import flatbook.rent.entity.Rent;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RentDao extends JpaRepository<Rent, Integer> {
}

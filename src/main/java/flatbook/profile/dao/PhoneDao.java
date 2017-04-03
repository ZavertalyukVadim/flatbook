package flatbook.profile.dao;

import flatbook.profile.entity.Phone;
import org.springframework.data.repository.CrudRepository;

public interface PhoneDao extends CrudRepository<Phone, Integer> {
    Phone findOneByNumber(String number);
}

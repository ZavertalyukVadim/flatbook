package flatbook.profile.dao;

import flatbook.profile.entity.Email;
import org.springframework.data.repository.CrudRepository;

public interface EmailDao extends CrudRepository<Email, Integer> {
    Email findOneByAddress(String address);
}

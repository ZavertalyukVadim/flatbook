package flatbook.profile.dao;

import flatbook.profile.entity.Email;
import org.springframework.data.repository.CrudRepository;

public interface EmailDao extends CrudRepository<Email, Integer> {
    Email findOneByContent(String content);
    Email findOneByContentAndIsPrimaryTrue(String content);
    Email findOneByContentAndIsPrimaryTrueAndActivatedTrue(String content);
    Email getEmailByIsPrimaryTrue();
}

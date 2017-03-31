package flatbook.profile.dao;

import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Integer > {
    User getUserByEmails(Email email);
}

package flatbook.profile.dao;

import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserDao extends JpaRepository<User, Integer > {
    User getUserByEmails(Email email);

    User getUserByEmails(Set<Email> email);
}

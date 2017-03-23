package flatbook.profile.service;

import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.Phone;
import flatbook.profile.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private EmailDao emailDao;

    public User createUser(User user) {
        userDao.save(user);
        return user;
    }

    public User getUserById(Integer id) {
        return userDao.findOne(id);
    }

    public User deleteUser(Integer id) {
        userDao.delete(id);
        return null;
    }

    public Email SetPrimaryEmail(User user, Email email) {
    }

    public Email addEmail(User user, Email email) {
        return null;
    }

    public Email getEmailById(Integer id) {
        return null;
    }

    public Email getPrimaryEmail(User user) {
        return null;
    }

    public List<Email> getAllEmails(User user) {
        return null;
    }

    public void setPhoneAsPrimary(User user, Phone phone) {

    }

    public Phone getPrimaryPhone(User user) {
        return null;
    }

    public Phone getAllPhones(User user) {
        return null;
    }
}

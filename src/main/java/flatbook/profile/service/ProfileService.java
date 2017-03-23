package flatbook.profile.service;

import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.Phone;
import flatbook.profile.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.function.UnaryOperator;

@Service
public class ProfileService {

    private final UserDao userDao;
    private final EmailDao emailDao;

    @Autowired
    public ProfileService(UserDao userDao, EmailDao emailDao) {
        this.userDao = userDao;
        this.emailDao = emailDao;
    }

    public User createUser(User user) {
        userDao.save(user);
        return user;
    }

    public void update(User user) {
        user.getEmails();
    }

    public User getUserById(Integer id) {
        return userDao.findOne(id);
    }

    public User deleteUser(Integer id) {
        userDao.delete(id);
        return null;
    }

    public void updatePrimaryEmail(User user, Email email) {
        if (isEmailExists(email)) setOwnersPrimaryEmail(user, email);
    }

    public Email addEmail(Integer userId, Email email) throws Exception {
        if (!userDao.exists(userId)) throw new Exception("Unknown user");

        User user = userDao.findOne(userId);
        List<Email> emails = user.getEmails();
        if (emails.contains(email)) return email;

        Email existingEmail = emailDao.findOneByAddress(email.getAddress());
        if (existingEmail == null) throw new Exception("Email is used by another user");

        emailDao.save(email);
        emails.add(email);
        userDao.save(user);

        return email;
    }

    public Email setEmailAsPrimary(Integer userId, Email email) throws Exception {
        if (!userDao.exists(userId)) throw new Exception("Unknown user");

        User user = userDao.findOne(userId);
        List<Email> emails = user.getEmails();

        if (!emails.contains(email)) throw new Exception("User is not the owner of email");

        Email primary = emails.stream().filter(email1 -> email1.getPrimary()).findFirst().get();
        if (primary.getAddress().equals(email.getAddress())) return email;

        primary.setPrimary(false);
        Email newPrimaryEmail = emails.stream().filter(email12 -> email12.equals(email12)).findFirst().get();
        newPrimaryEmail.setPrimary(true);

        userDao.save(user);

        return newPrimaryEmail;
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

    private void setOwnersPrimaryEmail(User user, Email email) {
        if (isUserEmailOwner(user, email)) makeEmailPrimary(email);
    }

    private void makeEmailPrimary(Email email) {
        if (!isEmailPrimary(email)) email.setPrimary(true);
    }

    private boolean isEmailExists(Email email) {
        return emailDao.exists(email.getId());
    }

    private boolean isUserEmailOwner(User user, Email email) {
        return user.getEmails().contains(email);
    }

    private boolean isEmailPrimary(Email email) {
        return email.getPrimary();
    }
}

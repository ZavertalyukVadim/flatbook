package flatbook.profile.service;

import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.ImageDao;
import flatbook.profile.dao.PhoneDao;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.Image;
import flatbook.profile.entity.Phone;
import flatbook.profile.entity.User;
import flatbook.profile.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

@Service
public class ProfileService {

    private final UserDao userDao;
    private final EmailDao emailDao;
    private final PhoneDao phoneDao;
    private final ImageDao imageDao;

    private final EntityManager entityManager;

    @Autowired
    public ProfileService(UserDao userDao, EmailDao emailDao, PhoneDao phoneDao, EntityManager entityManager, ImageDao imageDao) {
        this.userDao = userDao;
        this.emailDao = emailDao;
        this.phoneDao = phoneDao;
        this.entityManager = entityManager;
        this.imageDao = imageDao;
    }

    @Transactional
    public User createUser(User user) throws Exception {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        List<Email> emails = user.getEmails();
        if (emails.size() != 1) throw new Exception("Allowed only one primary email");

        Email primary = emailDao.findOneByAddress(emails.get(0).getAddress());
        if (primary != null) throw new Exception("email is exist");

        Set<Phone> phones = user.getPhones();
        if (phones.size() != 1) throw new Exception("Allowed only one primary phone");

        Phone primaryPhone = phoneDao.findOneByNumber(phones.iterator().next().getNumber());
        if (primaryPhone != null) throw new Exception("email is exist");

        user.setEmails(null);
        user.setPhones(null);

        User savingUser = userDao.save(user);

        Email newPrimary = emails.get(0);
        newPrimary.setUser(savingUser);
        emailDao.save(newPrimary);

        Phone newPrimaryPhone = phones.iterator().next();
        newPrimaryPhone.setPhonesUser(savingUser);
        phoneDao.save(newPrimaryPhone);

        return getUserById(savingUser.getId());
    }

    public User deleteUser(String password) throws Exception {
        if (!isCorrectPassword(password)) throw new Exception("Uncorrect password");

        User currentUser = getCurrentUser();
        userDao.delete(currentUser);

        return null;
    }

    public User update(User user) {
        if (!isUserEqualsToSecurityUser(user)) return null;

        User oldUser = userDao.findOne(user.getId());
        if (!oldUser.equals(user)) return null;

        return userDao.save(oldUser);
    }

    public User getCurrentUser() {
        Email email = emailDao.findOneByAddress(getUserEmail());

        return email.getUser();
    }

    public User getUserById(Integer id) {
        return userDao.findOne(id);
    }

    @Transactional
    public Email deleteEmail(Email email) throws Exception {
        if (!isUserContainsEmail(getCurrentUser(), email)) throw new Exception("User contains no email");

        Email dbEmail = emailDao.findOneByAddress(email.getAddress());
        if (dbEmail.getPrimary()) throw new Exception("Cannot delete primary email");

        User currentUser = getCurrentUser();

        List<Email> emails = getCurrentUser().getEmails();
        int index = emails.lastIndexOf(email);
        emails.remove(index);
        userDao.save(currentUser);

        dbEmail.setUser(null);

        entityManager.remove(dbEmail);
        Email deleted = emailDao.findOneByAddress(dbEmail.getAddress());
        return null;
    }

    @Transactional
    public Phone deletePhone(Phone phone) throws Exception {
        if (!isUserContainsPhone(getCurrentUser(), phone)) throw new Exception("User contains no email");

        Phone dbPhone = phoneDao.findOneByNumber(phone.getNumber());
        if (dbPhone.getPrimary()) throw new Exception("Cannot delete primary phone");

        User currentUser = getCurrentUser();

        Set<Phone> phones = getCurrentUser().getPhones();
        Phone foundedPhone = phones.stream().filter(currentPhone -> currentPhone.equals(phone)).findFirst().get();

        phones.remove(foundedPhone);
        userDao.save(currentUser);

        dbPhone.setPhonesUser(null);

        entityManager.remove(dbPhone);
        return null;
    }

    @Transactional
    public void addImage(MultipartFile multipartFile) throws Exception {
        String fileName = multipartFile.getOriginalFilename();
        if (!FileUtil.isImage(fileName)) throw new Exception("File is not image file");

        byte[] imageBytes = FileUtil.multipartToBytes(multipartFile);
        Image imageEntity = new Image();

        User currentUser = getCurrentUser();

        imageEntity.setUser(currentUser);
        imageEntity.setPhoto(imageBytes);
        imageDao.save(imageEntity);

        currentUser.setImage(imageEntity);
        userDao.save(currentUser);
    }

    public byte[] getImage() throws Exception {
        return getCurrentUser().getImage().getPhoto();
    }

    @Transactional
    public Email addEmail(Email email) throws Exception {

        String userEmail = getCurrentUserPrimaryEmail();
        if (!isUserNameExist(userEmail)) throw new Exception("Unknown user");

        User user = emailDao.findOneByAddress(userEmail).getUser();
        if (user == null) throw new Exception("Unknown user");

        if (isUserContainsEmail(user, email)) return email;

        Email existingEmail = emailDao.findOneByAddress(email.getAddress());
        if (existingEmail != null) throw new Exception("Email is used");

        email.setPrimary(false);
        email.setUser(user);
        emailDao.save(email);

        return email;
    }

    @Transactional
    public Phone addPhone(Phone phone) throws Exception {

        String userEmail = getCurrentUserPrimaryEmail();
        if (!isUserNameExist(userEmail)) throw new Exception("Unknown user");

        User user = emailDao.findOneByAddress(userEmail).getUser();
        if (user == null) throw new Exception("Unknown user");

        if (isUserContainsPhone(user, phone)) return phone;

        Phone existingPhone = phoneDao.findOneByNumber(phone.getNumber());
        if (existingPhone != null) throw new Exception("Phone is used");

        phone.setPrimary(false);
        phone.setPhonesUser(user);
        phoneDao.save(phone);

        return phone;
    }

    @Transactional
    public Email setEmailAsPrimary(Email email) throws Exception {
        User user = getCurrentUser();
        if (!user.getEmails().contains(email)) throw new Exception("User contains no email");

        Email oldPrimaryEmail = emailDao.findOneByAddress(getUserEmail());
        if (oldPrimaryEmail.equals(email)) return email;

        oldPrimaryEmail.setPrimary(false);
        emailDao.save(oldPrimaryEmail);

        Email newPrimary = emailDao.findOneByAddress(email.getAddress());
        newPrimary.setPrimary(true);
        emailDao.save(newPrimary);

        return newPrimary;
    }

    public Email getPrimaryEmail() throws Exception {
        Email primary = getCurrentUser().getEmails().stream().filter(email -> email.getPrimary()).findFirst().get();
        if (primary == null) throw new Exception("There is no primary email");

        return primary;
    }

    public List<Email> getAllEmails() {
        return getCurrentUser().getEmails();
    }

    public Phone setPhoneAsPrimary(Phone phone) throws Exception {
        User user = getCurrentUser();
        if (!user.getPhones().stream().anyMatch(currentPhone -> phone.equals(currentPhone)))
            throw new Exception("User contains no phone");

        Phone oldPrimaryPhone = phoneDao.findOneByNumber(getPrimaryPhone().getNumber());
        if (oldPrimaryPhone.equals(phone)) return phone;

        oldPrimaryPhone.setPrimary(false);
        phoneDao.save(oldPrimaryPhone);

        Phone newPrimary = phoneDao.findOneByNumber(phone.getNumber());
        newPrimary.setPrimary(true);
        phoneDao.save(newPrimary);

        return newPrimary;
    }

    public Phone getPrimaryPhone() throws Exception {
        Phone primary = getCurrentUser().getPhones().stream().filter(phone -> phone.getPrimary()).findFirst().get();
        if (primary == null) throw new Exception("There is no primary phone");

        return primary;
    }

    public Set<Phone> getAllPhones() {
        return getCurrentUser().getPhones();
    }

    private void setOwnersPrimaryEmail(User user, Email email) {
        if (isUserEmailOwner(user, email)) makeEmailPrimary(email);
    }

    private String getCurrentUserPrimaryEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
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

    private boolean isUserNameExist(String userName) throws Exception {
        return userName != null && !userName.isEmpty();
    }

    private boolean isUserContainsEmail(User user, Email email) {
        List<Email> emails = user.getEmails();

        return emails.stream().anyMatch(currentEmail -> {
            String currentAddress = currentEmail.getAddress();
            String newAddress = email.getAddress();

            return currentAddress.equals(newAddress);
        });
    }

    private boolean isUserContainsPhone(User user, Phone phone) {
        Set<Phone> phones = user.getPhones();

        return phones.stream().anyMatch(currenttPhone -> {
            String currentNumber = currenttPhone.getNumber();
            String newNumber = phone.getNumber();

            return currentNumber.equals(newNumber);
        });
    }

    private boolean isUserEqualsToSecurityUser(User user) {
        String securityPrimaryEmail = getCurrentUserPrimaryEmail();

//        return user.getPrimaryEmail().equals(securityPrimaryEmail);
//
        return false;
    }

    private boolean isEmailUsed(Email email) {
        Email existingEmail = emailDao.findOneByAddress(email.getAddress());
        return existingEmail != null;
    }

    private boolean isUserExist(User user) {
        if (user == null) return false;
        if (user.getEmails() == null) return false;

        return false;
    }

    private boolean isCorrectPassword(String password) throws Exception {

        String userName = getUserDetails().getName();
        String hashedPassword = emailDao.findOneByAddress(userName).getUser().getPassword();

        return BCrypt.checkpw(password, hashedPassword);
    }

    private String getUserEmail() {
        return getUserDetails().getName();
    }

    private Authentication getUserDetails() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}

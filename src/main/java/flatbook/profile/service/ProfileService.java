package flatbook.profile.service;

import flatbook.announcement.dao.AnnouncementByUserDao;
import flatbook.announcement.dao.AnnouncementDao;
import flatbook.announcement.dao.FavoriteAnnouncementInUserDao;
import flatbook.announcement.entity.Announcement;
import flatbook.announcement.entity.AnnouncementByUser;
import flatbook.announcement.entity.FavoriteAnnouncementInUser;
import flatbook.profile.dao.*;
import flatbook.profile.entity.*;
import flatbook.profile.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProfileService {

    private final UserDao userDao;
    private final EmailDao emailDao;
    private final PhoneDao phoneDao;
    private final ImageDao imageDao;
    private final AnnouncementByUserDao announcementByUserDao;
    private final EntityManager entityManager;
    private final AnnouncementDao announcementDao;
    private final FavoriteAnnouncementInUserDao favoriteAnnouncementInUserDao;
    private final RoleDao roleDao;

    @Autowired
    public ProfileService(UserDao userDao, EmailDao emailDao, PhoneDao phoneDao, EntityManager entityManager, ImageDao imageDao, AnnouncementByUserDao announcementByUserDao, AnnouncementDao announcementDao, FavoriteAnnouncementInUserDao favoriteAnnouncementInUserDao, RoleDao roleDao) {
        this.userDao = userDao;
        this.emailDao = emailDao;
        this.phoneDao = phoneDao;
        this.entityManager = entityManager;
        this.imageDao = imageDao;
        this.announcementByUserDao = announcementByUserDao;
        this.announcementDao = announcementDao;
        this.favoriteAnnouncementInUserDao = favoriteAnnouncementInUserDao;
        this.roleDao = roleDao;
    }

    @Transactional
    public User createUser(User user) throws Exception {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        Set<Email> emails = user.getEmails();
        if (emails.size() != 1) throw new Exception("Allowed only one primary email");

        Email primary = emailDao.findOneByContent(emails.iterator().next().getContent());
        if (primary != null) throw new Exception("email is exist");

        Set<Phone> phones = user.getPhones();
        if (phones.size() != 1) throw new Exception("Allowed only one primary phone");

        Phone primaryPhone = phoneDao.findOneByContent(phones.iterator().next().getContent());
        if (primaryPhone != null) throw new Exception("email is exist");

        user.setEmails(null);
        user.setPhones(null);

        Set<Role> roles = new HashSet<>();
        Role role = new Role("USER");
        roles.add(role);

        roleDao.save(role);
        user.setRoles(roles);
        User savingUser = userDao.save(user);
        role.setUser(savingUser);
        roleDao.save(role);
        Email newPrimary = emails.iterator().next();
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

    @Transactional
    public User update(User user) throws Exception {
        if (!user.getEmails().stream().anyMatch(email -> {
            Email primary = null;
            try {
                primary = getPrimaryEmail();
            } catch (Exception e) {
                e.printStackTrace();
            }

            return email.equals(primary) && email.getPrimary();

        })) throw new Exception("You can`t change primary email");

        Set<Email> emailsSet = user.getEmails();

        User oldUser = userDao.findOne(user.getId());
        if (!getCurrentUser().equals(oldUser)) throw new Exception("User is not current user");

        oldUser.setEmails(emailsSet);
        oldUser.setFirstName(user.getFirstName());
        oldUser.setLastName(user.getLastName());
        oldUser.setPhones(user.getPhones());

        for (Email email1 : emailsSet) email1.setUser(oldUser);
        for (Phone phone : oldUser.getPhones()) phone.setPhonesUser(oldUser);

        return userDao.save(oldUser);
    }

    @Secured("ROLE_USER")
    public User getCurrentUser() {
        Email email = emailDao.findOneByContent(getUserEmail());
        User user = email.getUser();

        return user;
    }

    public User getUserById(Integer id) {
        return userDao.findOne(id);
    }

    @Transactional
    public Email deleteEmail(Email email) throws Exception {
        if (!isUserContainsEmail(getCurrentUser(), email)) throw new Exception("User contains no email");

        Email dbEmail = emailDao.findOneByContent(email.getContent());
        if (dbEmail.getPrimary()) throw new Exception("Cannot delete primary email");

        User currentUser = getCurrentUser();

        Set<Email> emails = getCurrentUser().getEmails();
        emails.remove(email);
        userDao.save(currentUser);

        dbEmail.setUser(null);

        entityManager.remove(dbEmail);
        Email deleted = emailDao.findOneByContent(dbEmail.getContent());
        return null;
    }

    @Transactional
    public Phone deletePhone(Phone phone) throws Exception {
        if (!isUserContainsPhone(getCurrentUser(), phone)) throw new Exception("User contains no email");

        Phone dbPhone = phoneDao.findOneByContent(phone.getContent());
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
    public Integer addImage(MultipartFile multipartFile) throws Exception {
        String fileName = multipartFile.getOriginalFilename();
        if (!FileUtil.isImage(fileName)) throw new Exception("File is not image file");

        byte[] imageBytes = FileUtil.multipartToBytes(multipartFile);
        Image imageEntity = new Image();

        User currentUser = getCurrentUser();

        imageEntity.setUser(currentUser);
        imageEntity.setPhoto(imageBytes);
        imageDao.save(imageEntity);

        currentUser.setImage(imageDao.save(imageEntity));
        userDao.save(currentUser);

        return imageEntity.getId();
    }

    public byte[] getImage() throws Exception {
        byte[] photo = null;
        try {
            photo= getCurrentUser().getImage().getPhoto();
        }
        catch (Exception e){

        }
        return photo;
    }

    public byte[] getImageById(Integer id) throws Exception {
        return imageDao.findOne(id).getPhoto();
    }

    @Transactional
    public Email addEmail(Email email) throws Exception {

        String userEmail = getCurrentUserPrimaryEmail();
        if (!isUserNameExist(userEmail)) throw new Exception("Unknown user");

        User user = emailDao.findOneByContent(userEmail).getUser();
        if (user == null) throw new Exception("Unknown user");

        if (isUserContainsEmail(user, email)) return email;

        Email existingEmail = emailDao.findOneByContent(email.getContent());
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

        User user = emailDao.findOneByContent(userEmail).getUser();
        if (user == null) throw new Exception("Unknown user");

        if (isUserContainsPhone(user, phone)) return phone;

        Phone existingPhone = phoneDao.findOneByContent(phone.getContent());
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

        Email oldPrimaryEmail = emailDao.findOneByContent(getUserEmail());
        if (oldPrimaryEmail.equals(email)) return email;

        oldPrimaryEmail.setPrimary(false);
        emailDao.save(oldPrimaryEmail);

        Email newPrimary = emailDao.findOneByContent(email.getContent());
        newPrimary.setPrimary(true);
        emailDao.save(newPrimary);

        return newPrimary;
    }

    public Email getPrimaryEmail() throws Exception {
        Email primary = getCurrentUser().getEmails().stream().filter(Email::getPrimary).findFirst().get();
        if (primary == null) throw new Exception("There is no primary email");

        return primary;
    }

    public Set<Email> getAllEmails() {
        return getCurrentUser().getEmails();
    }

    public Phone setPhoneAsPrimary(Phone phone) throws Exception {
        User user = getCurrentUser();
        if (!user.getPhones().stream().anyMatch(currentPhone -> phone.equals(currentPhone)))
            throw new Exception("User contains no phone");

        Phone oldPrimaryPhone = phoneDao.findOneByContent(getPrimaryPhone().getContent());
        if (oldPrimaryPhone.equals(phone)) return phone;

        oldPrimaryPhone.setPrimary(false);
        phoneDao.save(oldPrimaryPhone);

        Phone newPrimary = phoneDao.findOneByContent(phone.getContent());
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
        Set<Email> emails = user.getEmails();

        return emails.stream().anyMatch(currentEmail -> {
            String currentAddress = currentEmail.getContent();
            String newAddress = email.getContent();

            return currentAddress.equals(newAddress);
        });
    }

    private boolean isUserContainsPhone(User user, Phone phone) {
        Set<Phone> phones = user.getPhones();

        return phones.stream().anyMatch(currenttPhone -> {
            String currentNumber = currenttPhone.getContent();
            String newNumber = phone.getContent();

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
        Email existingEmail = emailDao.findOneByContent(email.getContent());
        return existingEmail != null;
    }

    private boolean isUserExist(User user) {
        if (user == null) return false;
        if (user.getEmails() == null) return false;

        return false;
    }

    private boolean isCorrectPassword(String password) throws Exception {

        String userName = getUserDetails().getName();
        String hashedPassword = emailDao.findOneByContent(userName).getUser().getPassword();

        return BCrypt.checkpw(password, hashedPassword);
    }

    private String getUserEmail() {
        return getUserDetails().getName();
    }

    private Authentication getUserDetails() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public List<Announcement> getAnnouncementsByUser() {
        List<Announcement> announcements = new ArrayList<>();
        List<AnnouncementByUser> announcementByUser = announcementByUserDao.getAnnouncementIdByUserId(getCurrentUser().getId());
        for (AnnouncementByUser i : announcementByUser) {
            announcements.add(announcementDao.getAnnouncementById(i.getAnnouncementId()));
        }
        return announcements;
    }

    public List<Announcement> getLikedAnnouncementsByUser() {
        List<Announcement> announcements = new ArrayList<>();
        List<FavoriteAnnouncementInUser> announcementByUser = favoriteAnnouncementInUserDao.getAnnouncementIdByUserId(getCurrentUser().getId());
        for (FavoriteAnnouncementInUser i : announcementByUser) {
            announcements.add(announcementDao.getAnnouncementById(i.getAnnouncementId()));
        }
        return announcements;
    }

    @org.springframework.transaction.annotation.Transactional
    public void removeFromFavorite(Integer announcementId) {
        favoriteAnnouncementInUserDao.deleteFavoriteAnnouncementInUserByAnnouncementIdAndUserId(announcementId, getCurrentUser().getId());
    }

    public void markFavorite(Integer id) {
        FavoriteAnnouncementInUser favoriteAnnouncementInUser = new FavoriteAnnouncementInUser();
        favoriteAnnouncementInUser.setUser(getCurrentUser());
        favoriteAnnouncementInUser.setAnnouncementId(id);
        favoriteAnnouncementInUserDao.save(favoriteAnnouncementInUser);
    }

    public Integer getIdPhoto() {
            return getCurrentUser().getImage().getId();

    }
}

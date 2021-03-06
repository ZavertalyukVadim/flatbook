package flatbook.profile.service;

import flatbook.announcement.dao.AnnouncementDao;
import flatbook.announcement.dao.FavoriteAnnouncementInUserDao;
import flatbook.announcement.dao.UserAnnouncementsDao;
import flatbook.announcement.entity.Announcement;
import flatbook.announcement.entity.FavoriteAnnouncements;
import flatbook.announcement.entity.UserAnnouncements;
import flatbook.config.MailClient;
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
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProfileService {

    private final UserDao userDao;
    private final EmailDao emailDao;
    private final PhoneDao phoneDao;
    private final ImageDao imageDao;
    private final UserAnnouncementsDao userAnnouncementsDao;
    private final EntityManager entityManager;
    private final AnnouncementDao announcementDao;
    private final FavoriteAnnouncementInUserDao favoriteAnnouncementInUserDao;
    private final RoleDao roleDao;
    private final MailClient mailClient;

    @Autowired
    public ProfileService(UserDao userDao, EmailDao emailDao, PhoneDao phoneDao, EntityManager entityManager, ImageDao imageDao, UserAnnouncementsDao userAnnouncementsDao, AnnouncementDao announcementDao, FavoriteAnnouncementInUserDao favoriteAnnouncementInUserDao, RoleDao roleDao, MailClient mailClient) {
        this.userDao = userDao;
        this.emailDao = emailDao;
        this.phoneDao = phoneDao;
        this.entityManager = entityManager;
        this.imageDao = imageDao;
        this.userAnnouncementsDao = userAnnouncementsDao;
        this.announcementDao = announcementDao;
        this.favoriteAnnouncementInUserDao = favoriteAnnouncementInUserDao;
        this.roleDao = roleDao;
        this.mailClient = mailClient;
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
        Email email = emailDao.save(newPrimary);

        Phone newPrimaryPhone = phones.iterator().next();
        newPrimaryPhone.setPhonesUser(savingUser);
        phoneDao.save(newPrimaryPhone);

        mailClient.activateEmail(email);
        return getUserById(savingUser.getId());
    }

    public User deleteUser(String password) throws Exception {
        if (!isCorrectPassword(password)) throw new Exception("Uncorrect password");

        User currentUser = getCurrentUser();
        userDao.delete(currentUser);

        return null;
    }

    public User update(User user) throws Exception {
        User oldUser = userDao.findOne(user.getId());
        if (!isUserEqualsCurrentUser(oldUser)) throw new Exception("User is not current user");
        if (!isPrimaryEmailPermanent(user)) throw new Exception("Primary can`t be changed email is changed");

        user.getPhones().forEach(phone -> {
            phone.setPhonesUser(oldUser);
            phoneDao.save(phone);
        });
        user.getEmails().forEach(email -> {
            email.setUser(oldUser);
            emailDao.save(email);
        });

        oldUser.setFirstName(user.getFirstName());
        oldUser.setLastName(user.getLastName());
        userDao.save(oldUser);

        Set<Email> uselessEmails = oldUser.getEmails().stream().filter(email ->
                !email.getPrimary() && user.getEmails().stream().noneMatch(email1 ->
                        email1.equals(email))).collect(Collectors.toSet());

        Set<Phone> uselessPhones = oldUser.getPhones().stream().filter(phone ->
                user.getPhones().stream().noneMatch(phone1 ->
                        phone1.equals(phone))).collect(Collectors.toSet());


        uselessEmails.forEach(email -> emailDao.delete(email));
        uselessPhones.forEach(phone -> phoneDao.delete(phone));


        User user1 = userDao.findOne(user.getId());

        user.getEmails().forEach(email -> {
            email.setUser(user1);
        });
        user.getPhones().forEach(phone -> {
            phone.setPhonesUser(user1);
        });

        user.getEmails().forEach(email -> {
            emailDao.save(email);
        });
        user.getPhones().forEach(phone -> phoneDao.save(phone));

        entityManager.clear();
        return userDao.findOne(user.getId());
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
        try {
            User currentUser = getCurrentUser();

            imageEntity.setUser(currentUser);
            imageEntity.setPhoto(imageBytes);
            imageDao.save(imageEntity);

            currentUser.setImage(imageDao.save(imageEntity));
            userDao.save(currentUser);
        } catch (Exception e) {
            return null;
        }

        return imageEntity.getId();
    }

    public byte[] getImage() throws Exception {
        byte[] photo = null;
        try {
            photo = getCurrentUser().getImage().getPhoto();
        } catch (Exception e) {

        }
        return photo;
    }

    public byte[] getImageByIdUser(Integer id) throws Exception {
        return imageDao.getImageByUser(userDao.findOne(id)).getPhoto();
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
        return getUserPrimaryEmail(getCurrentUser());
    }

    private String getContentPrimaryEmail() {
        return getUserDetails().getName();
    }

    private Email getUserPrimaryEmail(User user) throws Exception {
        Optional<Email> primary = user.getEmails().stream().filter(Email::getPrimary).findFirst();
        if (!primary.isPresent()) throw new Exception("There is no primary email");

        return primary.get();
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

    private String getCurrentUserPrimaryEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    private void makeEmailPrimary(Email email) {
        if (!isEmailPrimary(email)) email.setPrimary(true);
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

    private boolean isEmailUsed(Email email) {
        Email existingEmail = emailDao.findOneByContent(email.getContent());
        return existingEmail != null;
    }

    private boolean isUserExist(User user) {
        if (user == null) return false;
        if (user.getEmails() == null) return false;

        return false;
    }

    private boolean isUserEqualsCurrentUser(User user) throws Exception {
        String primaryEmail = getContentPrimaryEmail();

        return user.getEmails().stream().anyMatch(email -> email.getContent().equals(primaryEmail));
    }

    private boolean isCorrectPassword(String password) throws Exception {

        String userName = getUserDetails().getName();
        String hashedPassword = emailDao.findOneByContent(userName).getUser().getPassword();

        return BCrypt.checkpw(password, hashedPassword);
    }

    private boolean isPrimaryEmailPermanent(User user) {
        String primaryEmail = getContentPrimaryEmail();
        Set<Email> emails = user.getEmails();

        Stream<Email> emailsStream = emails.stream();

        return emails.stream().anyMatch(email -> email.getContent().equals(primaryEmail) && email.getPrimary()) &&
                emails.stream().filter(email -> email.getPrimary()).count() == 1;
    }

    private String getUserEmail() {
        return getUserDetails().getName();
    }

    private Authentication getUserDetails() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public List<Announcement> getAnnouncementsByUser() {
        List<Announcement> announcements = new ArrayList<>();
        List<Integer> listAnnouncementId = getListAnnouncementIdWhichLikedCurrentUser();
        List<UserAnnouncements> userAnnouncements = userAnnouncementsDao.getUserAnnouncementsByUserId(getCurrentUser().getId());
        for (UserAnnouncements i : userAnnouncements) {
            Announcement announcement = announcementDao.findOne(i.getAnnouncementId());
            if (listAnnouncementId.contains(announcement.getId())) {
                announcement.setLiked(true);
            } else {
                announcement.setLiked(false);
            }
            announcements.add(announcement);
        }
        announcements.sort(Comparator.comparing(Announcement::getLastUpdated).reversed());

        return announcements;
    }

    private List<Integer> getListAnnouncementIdWhichLikedCurrentUser() {
        List<Integer> listAnnouncementId = new ArrayList<>();
        List<FavoriteAnnouncements> announcementByUser = favoriteAnnouncementInUserDao.getFavoriteAnnouncementInUserByUserId(getCurrentUser().getId());
        for (FavoriteAnnouncements favoriteAnnouncements : announcementByUser) {
            listAnnouncementId.add(favoriteAnnouncements.getAnnouncementId());
        }
        return listAnnouncementId;
    }


    public List<Announcement> getLikedAnnouncementsByUser() {
        List<Announcement> announcements = new ArrayList<>();
        List<Integer> listAnnouncementId = getListAnnouncementIdWhichLikedCurrentUser();
        List<FavoriteAnnouncements> announcementByUser = favoriteAnnouncementInUserDao.getFavoriteAnnouncementInUserByUserId(getCurrentUser().getId());
        for (FavoriteAnnouncements i : announcementByUser) {
            Announcement announcement = announcementDao.findOne(i.getAnnouncementId());
            if (listAnnouncementId.contains(announcement.getId())) {
                announcement.setLiked(true);
            } else {
                announcement.setLiked(false);
            }
            announcements.add(announcement);
        }
        return announcements;
    }

    @org.springframework.transaction.annotation.Transactional
    public Boolean removeFromFavorite(Integer announcementId) {
        favoriteAnnouncementInUserDao.deleteFavoriteAnnouncementInUserByAnnouncementIdAndUserId(announcementId, getCurrentUser().getId());
        return true;
    }

    public Boolean markFavorite(Integer id) {
        FavoriteAnnouncements favoriteAnnouncements = new FavoriteAnnouncements();
        favoriteAnnouncements.setUser(getCurrentUser());
        favoriteAnnouncements.setAnnouncementId(id);
        favoriteAnnouncementInUserDao.save(favoriteAnnouncements);
        return true;
    }

    public Integer getIdPhoto() {
        return getCurrentUser().getImage().getId();

    }
}

package flatbook.profile.service;

import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.PhoneDao;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.Phone;
import flatbook.profile.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.function.Consumer;

@Service
public class ProfileService {

    private final UserDao userDao;
    private final EmailDao emailDao;
    private final PhoneDao phoneDao;

    @Autowired
    public ProfileService(UserDao userDao, EmailDao emailDao, PhoneDao phoneDao) {
        this.userDao = userDao;
        this.emailDao = emailDao;
        this.phoneDao = phoneDao;
    }

    @Transactional
    public User createUser(User user) throws Exception {
        if ( isUserExist(user) ) throw new Exception("User has been already exist");

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        userDao.save(user);

        return user;
    }

    public User delete(User user) throws Exception {
        if (!isUserEqualsToSecurityUser(user)) return user;

        userDao.delete(user);
        return null;
    }

    public User update(User user) {
        if (!isUserEqualsToSecurityUser(user)) return null;

        User oldUser = userDao.findOne(user.getId());
        if (!oldUser.equals(user)) return null;

        return userDao.save(oldUser);
    }

    public User getUserById(Integer id) {
        return userDao.findOne(id);
    }

    public void updatePrimaryEmail(User user, Email email) {
        if (isEmailExists(email)) setOwnersPrimaryEmail(user, email);
    }

    @Transactional
    public Email addEmail(Integer userId, Email email) throws Exception {

        String userEmail = getCurrentUserPrimaryEmail();
        if (!isUserNameExist(userEmail)) throw new Exception("Unknown user");

        User user = userDao.findOne(userId);
        if (!userDao.exists(userId)) throw new Exception("Unknown user");

        if (!isUserEmailOwner(user, email)) throw new Exception("User is not email owner");

        if (isUserContainsEmail(user, email)) return email;

        Email existingEmail = emailDao.findOneByAddress(email.getAddress());
        if (existingEmail == null) throw new Exception("Email is used by another user");

        if (isEmailUsed(email)) throw new Exception("Email is used");

        emailDao.save(email);

        List<Email> emails = user.getEmails();
        emails.add(email);
        user.setEmails(emails);

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

    public Email getPrimaryEmail() throws Exception {
        String currentUserPrimaryEmai = getCurrentUserPrimaryEmail();
        Email email = emailDao.findOneByAddress(getCurrentUserPrimaryEmail());
        if (email == null) throw new Exception("There is no primary email");

        return email;
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

    private boolean isUserEqualsToSecurityUser(User user) {
        String securityPrimaryEmail = getCurrentUserPrimaryEmail();

        return user.getPrimaryEmail().equals(securityPrimaryEmail);
    }

    private boolean isEmailUsed(Email email) {
        Email existingEmail = emailDao.findOneByAddress(email.getAddress());
        return existingEmail != null;
    }

    private boolean isUserExist(User user) {
        if (user == null) return false;
        if (user.getEmails() == null) return false;

        return user.getEmails().stream().anyMatch(email ->
            emailDao.findOneByAddress(email.getAddress()) != null);
    }

    public void test() {
        Email email = new Email();
        email.setPrimary(true);
        User user = new User();
    }

    public void logOut() throws Exception {
        if (!isAuthentificated()) {
            System.out.println("Something is going wrong");
            throw new Exception("You have been not logged yet");
        }

        SecurityContextHolder.getContext().setAuthentication(null);
    }

    public User logIn(User user) throws Exception {
        Email email = user.getPrimaryEmail();
        String password = user.getPassword();

        if (! (isCorrectEmail(email, user) && isCorrentPassword(password, user))) throw new Exception("credentials are wrong");

        UserDetails userDetails = new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                GrantedAuthority[] grantedAuthorities = {(GrantedAuthority) () -> "USER"};
                return Arrays.asList(grantedAuthorities);
            }

            @Override
            public String getPassword() {
                return user.getPassword();
            }

            @Override
            public String getUsername() {
                return user.getPrimaryEmail().getAddress();

            }

            @Override
            public boolean isAccountNonExpired() {
                return false;
            }

            @Override
            public boolean isAccountNonLocked() {
                return false;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                return false;
            }

            @Override
            public boolean isEnabled() {
                return true;
            }
        };
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                userDetails, userDetails.getPassword(), userDetails.getAuthorities()));

        return user;
    }

    private boolean isAuthentificated() {
        return  SecurityContextHolder.getContext().getAuthentication() != null && SecurityContextHolder.getContext().getAuthentication().isAuthenticated();
    }


    private boolean isCorrectEmail(Email email, User user) {
        return email != null && email.getAddress() != null;
    }

    private boolean isCorrentPassword(String password, User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);

        return password != null && !password.isEmpty() && hashedPassword.equals(user.getPassword());
    }
}

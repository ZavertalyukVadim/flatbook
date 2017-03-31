package flatbook.profile.service;

import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;

@Service
public class LoggingService {

    private final EmailDao emailDao;
    private final UserDao userDao;

    @Autowired
    public LoggingService(EmailDao emailDao, UserDao userDao) {
        this.emailDao = emailDao;
        this.userDao = userDao;
    }

    public void test() {

    }

    public User logIn(String address, String password) throws Exception {
        Email email = emailDao.findOneByAddress(address);
//        User user = email.getUser();
//        Email primaryEmail = user.getPrimaryEmail();
//
//        if (!isCorrectCredentials(user, email, password)) throw new Exception("uncorrected credentials");
//
//        return authenticate(user);
        return null;
    }

    public void signUp(User user) {

    }

    public void logOut() throws Exception {
        if (!isAuthenticated()) throw new Exception("You have been not logged yet");

        SecurityContextHolder.getContext().setAuthentication(null);
    }

    private User authenticate(User user) {
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
//                return user.getPrimaryEmail().getAddress();
                return "daskflja";
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

    private boolean isAuthenticated() {
        return  SecurityContextHolder.getContext().getAuthentication() != null && SecurityContextHolder.getContext().getAuthentication().isAuthenticated();
    }

    private boolean isCorrectCredentials(User user, Email email, String password) {
        return isCorrectEmail(email, user) && isCorrectPassword(password, user);
    }

    private boolean isCorrectEmail(Email email, User user) {
        return email != null && email.getAddress() != null;
    }

    private boolean isCorrectPassword(String password, User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);

        return password != null && !password.isEmpty() && hashedPassword.equals(user.getPassword());
    }
}

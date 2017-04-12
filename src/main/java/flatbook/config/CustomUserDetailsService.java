package flatbook.config;

import flatbook.announcement.entity.Role;
import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.HashSet;
import java.util.Set;

@Configuration
public class CustomUserDetailsService {
    private final EmailDao emailDao;

    @Autowired
    public CustomUserDetailsService(EmailDao emailDao) {
        this.emailDao = emailDao;
    }

    @Autowired
    public void authenticationManager(AuthenticationManagerBuilder builder, UserDao userDao) throws Exception {
        if (userDao.count() == 0) {
            Set<Email> emailSet = new HashSet<>();
            Email email = new Email();
            email.setPrimary(true);
            email.setContent("hello@gmail.com");
            emailSet.add(email);
            Set<Role> roles = new HashSet<>();
            Role role = new Role("USER");
            roles.add(role);
            User user = new User(emailSet, "password", roles);
            email.setUser(user);
            userDao.save(user);
            emailDao.save(email);
        }
        builder.userDetailsService(userDetailsService(userDao));
    }

    private UserDetailsService userDetailsService(final UserDao userDao) {
        Email email = emailDao.findOneByContent("hello@gmail.com");
//        return username -> new CustomUserDetails(userDao.getUserByEmails(emailDao.findOneByContent(username)));
        return username -> new CustomUserDetails(userDao.getUserByEmails(email));
    }
}

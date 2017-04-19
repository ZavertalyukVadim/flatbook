package flatbook.config;

import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class CustomUserDetailsService {
    private final EmailDao emailDao;

    @Autowired
    public CustomUserDetailsService(EmailDao emailDao) {
        this.emailDao = emailDao;
    }

    @Autowired
    public void authenticationManager(AuthenticationManagerBuilder builder, UserDao userDao) throws Exception {

        builder.userDetailsService(userDetailsService(userDao)).passwordEncoder(new BCryptPasswordEncoder());
    }
        private UserDetailsService userDetailsService(final UserDao userDao) {
        return username -> new CustomUserDetails(userDao.getUserByEmails(emailDao.findOneByContentAndIsPrimaryTrueAndActivatedTrue(username)));
    }
}

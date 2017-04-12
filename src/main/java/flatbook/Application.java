package flatbook;

import flatbook.announcement.entity.Role;
import flatbook.config.CustomUserDetails;
import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@EnableSwagger2
@EnableResourceServer
@EnableSpringDataWebSupport
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }

    @Autowired
    private EmailDao emailDao;

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
        Set<Email> emailSet = new HashSet<>();
        Email email = emailDao.findOneByContent("hello@gmail.com");

        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + userDao.getUserByEmails(email));

        return username -> new CustomUserDetails(userDao.getUserByEmails(email));
    }
}

package flatbook.config;

import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.RoleDao;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.Role;
import flatbook.profile.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionSignUp;

import java.util.HashSet;
import java.util.Set;
@Configuration
public class FacebookConnectionSignup implements ConnectionSignUp {
    private final UserDao userDao;

    private final EmailDao emailDao;
    private final RoleDao roleDao;

    @Autowired
    public FacebookConnectionSignup(UserDao userDao, EmailDao emailDao, RoleDao roleDao) {
        this.userDao = userDao;
        this.emailDao = emailDao;
        this.roleDao = roleDao;
    }

    @Override
    public String execute(Connection<?> connection) {
        System.out.println("signup === ");
        Role role = new Role("USER");
        Set<Role>  roles = new HashSet<>();
        roles.add(roleDao.save(role));
        User user = new User();
        Set<Email> emails = new HashSet<>();
        emails.add(emailDao.findOneByContentAndIsPrimaryTrue(connection.getDisplayName()));
        user.setEmails(emails);
        user.setPassword("ololo");
        user.setRoles(roles);
        userDao.save(user);
        return user.getUsername();
    }
}

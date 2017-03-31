package flatbook.profile.service;


import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import javax.xml.soap.Detail;
import java.util.ArrayList;
import java.util.List;

public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private EmailDao emailDao;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Email email = emailDao.findOneByAddress(s);
        User user = email.getUser();
        if (!isCorrectCredentials(user, email)) throw new UsernameNotFoundException("invalid user");

        return getUserDetails(user, email);
    }

    private UserDetails getUserDetails(User user, Email email) {
        String password = user.getPassword();
        String userName = email.getAddress();

        return new org.springframework.security.core.userdetails.User(userName, password, true, true, true, true, getGrantedAuthorities());
    }

    private List<GrantedAuthority> getGrantedAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add((GrantedAuthority) () -> "ROLE_USER");

        return authorities;
    }

    private boolean isCorrectCredentials(User user, Email email) {
        return isCorrectUser(user) && isCorrectEmail(email);
    }

    private boolean isCorrectUser(User user) {
        return user != null;
    }

    private boolean isCorrectEmail(Email email) {
        return email != null && email.getPrimary();
    }
}

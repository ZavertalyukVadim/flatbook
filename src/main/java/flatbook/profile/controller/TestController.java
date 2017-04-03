package flatbook.profile.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/mylogout")
public class TestController {

    @PostMapping
    public void crypt(HttpServletRequest request) throws ServletException {

        request.getSession().invalidate();
        request.logout();
        System.out.println("Hello world");

        SecurityContextHolder.getContext().setAuthentication(null);

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        String password = "asdfgh";
        String encodedPassword = bCryptPasswordEncoder.encode(password);
        System.out.println(encodedPassword);
    }
}

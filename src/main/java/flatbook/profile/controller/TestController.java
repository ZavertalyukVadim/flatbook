package flatbook.profile.controller;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "profile/testcontroller")
public class TestController {

    @PostMapping
    public void crypt() {

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        String password = "qwerty12345";
        String encodedPassword = bCryptPasswordEncoder.encode(password);
    }
}

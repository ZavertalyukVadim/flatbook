package flatbook.common;

import flatbook.profile.entity.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @RequestMapping(value = "logged", method = RequestMethod.GET)
    public Boolean isAuthenticated() {
        return SecurityUtils.isAuthenticated();
    }

    @RequestMapping(value = "getUser", method = RequestMethod.GET)
    public User getUser() {
        return SecurityUtils.getAuthenticatedUser();
    }
}

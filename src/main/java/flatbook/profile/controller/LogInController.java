package flatbook.profile.controller;

import flatbook.profile.entity.User;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "profile/login")
public class LogInController {

    @Autowired
    private ProfileService profileService;

    @RequestMapping(method = RequestMethod.POST)
    public User user(@RequestBody User user) throws Exception {
        return profileService.logIn(user);
    }
}

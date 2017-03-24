package flatbook.profile.controller;

import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/profile/logout")
public class LogOutController {

    private final ProfileService profileService;

    @Autowired
    public LogOutController( ProfileService profileService) {
        this.profileService = profileService;
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void logout() throws Exception {
        profileService.logOut();
    }
}

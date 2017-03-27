package flatbook.profile.controller;

import flatbook.profile.service.LoggingService;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import sun.java2d.cmm.Profile;

@RestController
@RequestMapping(value = "/profile/logout")
public class LogOutController {

    private final LoggingService loggingService;

    @Autowired
    public LogOutController(LoggingService loggingService) {
        this.loggingService = loggingService;
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void logout() throws Exception {
        loggingService.logOut();
    }
}

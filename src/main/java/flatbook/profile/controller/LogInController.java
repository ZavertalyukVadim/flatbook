package flatbook.profile.controller;

import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import flatbook.profile.service.LoggingService;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/profile/login")
public class LogInController {

    @Autowired
    private LoggingService loggingService;

    @RequestMapping(method = RequestMethod.POST)
    public User user(@RequestParam String email, @RequestParam String password) throws Exception {
        return loggingService.logIn(email, password);
    }


    @RequestMapping(method = RequestMethod.PUT)
    public void test() {

    }
}

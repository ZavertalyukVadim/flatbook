package flatbook.profile.controller;

import flatbook.profile.entity.User;
import flatbook.profile.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController(value = "/user")
public class UserController {

    @Autowired
    private UserService profileService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public User createUser(@RequestBody User user) {
        return profileService.createUser(user);
    }

    @RequestMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        return profileService.getUserById(id);
    }
}

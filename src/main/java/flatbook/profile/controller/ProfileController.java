package flatbook.profile.controller;

import flatbook.profile.entity.Email;
import flatbook.profile.entity.Phone;
import flatbook.profile.entity.User;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController(value = "/profile")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public User createUser(@RequestParam Phone primaryPhone, @RequestParam Email primaryEmail, @RequestBody User user) {
        return profileService.createUser(user, primaryEmail, primaryPhone);
    }

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    public User deleteUser(@RequestBody User user) throws Exception {
        return profileService.delete(user);
    }

    @RequestMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        return profileService.getUserById(id);
    }

    @RequestMapping(value = "/primaryemail", method = RequestMethod.POST)
    public Email update(@RequestBody User user) {
        profileService.update(user);
        return null;
    }
}

package flatbook.profile.controller;

import flatbook.profile.entity.Phone;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "profile/phone")
public class PhoneController {
    private final ProfileService profileService;

    @Autowired
    public PhoneController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @RequestMapping("/add")
    public Phone addPhone(@RequestBody Phone phone) {
        return null;
    }

//    @RequestMapping
    public Phone setPhoneAsPrimary(@RequestBody Phone phone) {
        return null;
    }
}

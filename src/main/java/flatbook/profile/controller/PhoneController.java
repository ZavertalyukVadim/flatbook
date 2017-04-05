package flatbook.profile.controller;

import flatbook.profile.entity.Phone;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping(value = "/api/profile/phone")
public class PhoneController {
    private final ProfileService profileService;

    @Autowired
    public PhoneController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping(value = "/add")
    public Phone addPhone(@RequestBody Phone phone) throws Exception {
        return profileService.addPhone(phone);
    }

    @DeleteMapping(value = "")
    public Phone deletePhone(@RequestBody Phone phone) throws Exception {
        return profileService.deletePhone(phone);
    }

    @GetMapping(value = "/primary")
    public Phone getPrimaryPhone() throws Exception {
        return profileService.getPrimaryPhone();
    }

    @Secured("ROLE_USER")
    @PutMapping(value = "/primary")
    public Phone setPhoneAsPrimary(@RequestBody Phone phone) throws Exception {
       return profileService.setPhoneAsPrimary(phone);
    }

    @GetMapping(value = "")
    public Set<Phone> getPhones() {
        return profileService.getAllPhones();
    }
}

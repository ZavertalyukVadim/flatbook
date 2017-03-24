package flatbook.profile.controller;

import flatbook.profile.entity.Email;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController(value = "profile/email")
public class EmailContoller {

    private final ProfileService profileService;

    @Autowired
    public EmailContoller(ProfileService profileService) {
        this.profileService = profileService;
    }

    @RequestMapping(value = "add/{id}", method = RequestMethod.POST)
    public Email addEmail(@PathVariable Integer id, @RequestBody Email email) throws Exception {
        return profileService.addEmail(id, email);
    }

    @RequestMapping(value = "primary/{id}", method = RequestMethod.PUT)
    public Email setEmailAsPrimary(@PathVariable Integer id, @RequestBody Email email) throws Exception {
        return profileService.setEmailAsPrimary(id, email);
    }
}


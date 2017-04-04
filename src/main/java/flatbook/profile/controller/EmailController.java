package flatbook.profile.controller;

import flatbook.profile.entity.Email;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/profile/email")
public class EmailController {

    private final ProfileService profileService;

    @Autowired
    public EmailController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @Secured("ROLE_USER")
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public Email addEmail(@RequestBody Email email) throws Exception {
        return profileService.addEmail(email);
    }

    @Secured("ROLE_USER")
    @DeleteMapping(value = "")
    public Email deleteEmail(@RequestBody Email email) throws Exception {
        return profileService.deleteEmail(email);
    }

    @Secured("ROLE_USER")
    @RequestMapping(value = "/primary", method = RequestMethod.GET)
    public Email getPrimaryEmail() throws Exception {
        return profileService.getPrimaryEmail();
    }

    @Secured("ROLE_USER")
    @PutMapping(value = "/primary")
    public Email setEmailAsPrimary(@RequestBody Email email) throws Exception {
        return profileService.setEmailAsPrimary(email);
    }

    @Secured("ROLE_USER")
    @GetMapping
    public Set<Email> getEmails() {
        return profileService.getAllEmails();
    }
}


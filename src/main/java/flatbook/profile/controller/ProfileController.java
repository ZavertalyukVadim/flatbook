package flatbook.profile.controller;

import flatbook.announcement.entity.FileBucket;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.InputStream;

@RestController
@RequestMapping(value = "/profile")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) throws Exception {
        return profileService.createUser(user);
    }

    @Secured("ROLE_USER")
    @DeleteMapping
    public void deleteCurrentUser(@RequestBody String password, HttpServletRequest request, HttpServletResponse response) throws Exception {
        profileService.deleteUser(password);
        request.logout();
    }

    @Secured("ROLE_USER")
    @GetMapping
    public User getCurrentUser() {
        return profileService.getCurrentUser();
    }

    @GetMapping(value = "/{id}")
    public User getUserById(@PathVariable Integer id) {
        return profileService.getUserById(id);
    }

    @RequestMapping(value = "/primaryemail", method = RequestMethod.POST)
    public Email update(@RequestBody User user) {
        profileService.update(user);
        return null;
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public void test() {

    }

    @PostMapping(value = "/photo")
    @Secured("ROLE_USER")
    public void addPhoto(@RequestParam("image") MultipartFile image) throws Exception {
        profileService.addImage(image);
    }

    @GetMapping(value = "/photo")
    @Secured("ROLE_USER")
    public void getPhoto(HttpServletResponse response) throws Exception {
        response.setContentType("image/jpeg");
        response.setHeader("Content-Disposition", "attachment; filename=\"somefile.pdf\"");
        response.getOutputStream().write(profileService.getImage());
        response.getOutputStream().flush();
    }
}

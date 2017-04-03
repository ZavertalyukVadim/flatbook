package flatbook.profile.controller;

import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;

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
    public void addPhoto(HttpServletRequest request) {
        Collections.list(request.getAttributeNames()).forEach(it -> System.out.println(it));
        Collections.list(request.getParameterNames()).forEach(it -> System.out.println(it));
        Collections.list(request.getHeaderNames()).forEach(it -> System.out.println(it));

        String title = request.getParameter("title");


        System.out.println("It works");
        System.out.println("It works!");
    }

    @PostMapping(value = "/photo1")
    public void addPhoto(@RequestParam("password") String password) {
        System.out.println("photo 1  works");
        System.out.println("photo 1 works");
    }
}

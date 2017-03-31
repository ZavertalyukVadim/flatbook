package flatbook.profile.controller;

import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
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

    @RequestMapping(value = "", method = RequestMethod.DELETE)
    public User deleteUser(@RequestBody User user) throws Exception {
        return profileService.delete(user);
    }

//    @GetMapping(value = "/{id}")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User getUserById(@PathVariable Integer id) {
        User user = profileService.getUserById(id);

        return user;
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
    public void addPhoto(@RequestParam("file") MultipartFile[] submissions) {
        System.out.println("photo 1  works");
        System.out.println("photo 1 works");
    }
}

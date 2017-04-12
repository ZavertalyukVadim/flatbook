package flatbook.profile.controller;

import flatbook.announcement.entity.Announcement;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(value = "/api/profile")
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
    public Email update(@RequestBody User user) throws Exception {
        profileService.update(user);
        return null;
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
        response.getOutputStream().write(profileService.getImage());
        response.getOutputStream().flush();
    }

    @PostMapping(value = "/{id}/favorite")
    public void addAnnouncementToFavorite(@PathVariable("id") Integer id){
        profileService.markFavorite(id);
    }

    @DeleteMapping(value = "/{id}/removeFromFavorite")
    public void removeFromFavorite(@PathVariable("id") Integer id){
        profileService.removeFromFavorite(id);
    }

    @GetMapping(value = "/favorites")
    public List<Announcement> getLikedAnnouncementsByUser(){
        return profileService.getLikedAnnouncementsByUser();
    }


    @GetMapping(value = "/announcements")
    public List<Announcement> getAnnouncementsByUser(){
        return profileService.getAnnouncementsByUser();
    }

    @PutMapping(value = "")
    public User updateUser(@RequestBody User user) throws Exception {
        return profileService.update(user);
    }

    @GetMapping(value = "/issigned")
    @Secured("ROLE_USER")
    public void isSignedIn() throws Exception {
    }
}

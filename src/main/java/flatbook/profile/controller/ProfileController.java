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
    public Integer addPhoto(@RequestParam("image") MultipartFile image) throws Exception {
        return profileService.addImage(image);
    }

    @GetMapping(value = "/photo")
    @Secured("ROLE_USER")
    public Integer getPhoto(HttpServletResponse response) throws Exception {
        Integer photoId = null;
        try {
            photoId =  profileService.getIdPhoto();
        } catch (Exception e) {

            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
        return photoId;
    }

    @GetMapping(value = "/photo/{id}")
    @Secured("ROLE_USER")
    public void getPhotoById(@PathVariable Integer id, HttpServletResponse response) throws Exception {
        response.setContentType("image/jpeg");
        response.getOutputStream().write(profileService.getImageById(id));
        response.getOutputStream().flush();
    }

    @PostMapping(value = "/{id}/favorite")
    public Boolean addAnnouncementToFavorite(@PathVariable("id") Integer id) {
        return profileService.markFavorite(id);
    }

    @DeleteMapping(value = "/{id}/removeFromFavorite")
    public Boolean removeFromFavorite(@PathVariable("id") Integer id) {
       return profileService.removeFromFavorite(id);
    }

    @PostMapping(value = "/favorites")
    public List<Announcement> getLikedAnnouncementsByUser() {
        return profileService.getLikedAnnouncementsByUser();
    }


    @GetMapping(value = "/announcements")
    public List<Announcement> getAnnouncementsByUser() {
        return profileService.getAnnouncementsByUser();
    }

    @PutMapping
    public User updateUser(@RequestBody User user) throws Exception {
        return profileService.update(user);
    }

    @GetMapping(value = "/issigned")
    @Secured("ROLE_USER")
    public void isSignedIn() throws Exception {
    }
}

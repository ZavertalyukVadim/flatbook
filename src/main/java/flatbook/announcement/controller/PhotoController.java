package flatbook.announcement.controller;

import flatbook.announcement.entity.Photo;
import flatbook.announcement.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/api/photo")
public class PhotoController {
    private final PhotoService photoService;
    private final String FORMAT_FOR_UPLOAD_IMAGE = "image/jpeg";

    @Autowired
    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Photo> getAllPhoto() {
        return photoService.getAllPhoto();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public void getPhotoById(@PathVariable("id") Integer id, HttpServletResponse response) {
        try {
            Photo photo = photoService.getPhotoById(id);
            response.setContentType(FORMAT_FOR_UPLOAD_IMAGE);
            response.getOutputStream().write(photo.getImage());
            response.getOutputStream().flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostMapping
    public Integer createPhoto(@RequestParam("image") MultipartFile image) {
        return photoService.createPhoto(image).getId();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Photo updatePhoto(@RequestBody Photo photo) {
        return photoService.updatePhoto(photo);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Photo deletePhoto(@PathVariable("id") Integer id) {
        return photoService.deletePhoto(id);
    }
}

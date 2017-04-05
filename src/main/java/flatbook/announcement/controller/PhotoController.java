package flatbook.announcement.controller;

import flatbook.announcement.entity.FileBucket;
import flatbook.announcement.entity.Photo;
import flatbook.announcement.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/photo")
public class PhotoController {
    @Autowired
    private PhotoService photoService;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public void test() {
        photoService.test();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Photo> getAllPhoto() {
        return photoService.getAllPhoto();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Photo getPhotoById(@PathVariable("id") Integer id) {
        return photoService.getPhotoById(id);
    }

    @RequestMapping(value = "", method = RequestMethod.POST,headers = "content-type=multipart/form-data")
    public Photo createPhoto(@RequestBody FileBucket photo) {
        return photoService.createPhoto(photo);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public Photo updatePhoto(@RequestBody Photo photo) {
        return photoService.updatePhoto(photo);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Photo deletePhoto(@PathVariable("id") Integer id) {
        return photoService.deletePhoto(id);
    }
}

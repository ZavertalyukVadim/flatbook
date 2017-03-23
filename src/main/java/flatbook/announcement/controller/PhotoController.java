package flatbook.announcement.controller;

import flatbook.announcement.entity.Photo;
import flatbook.announcement.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/photo")
public class PhotoController {
    @Autowired
    private PhotoService photoService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Photo> getAllPhoto() {
        return photoService.getAllPhoto();
    }

    @RequestMapping(value = "/one", method = RequestMethod.POST, headers = "content-type!=multipart/form-data")
    @ResponseBody
    public Photo getPhotoById(@RequestBody Photo photo) {
        return photoService.createPhoto(photo);
//        return photoService.getPhotoById(id);
    }

//    @RequestMapping(value = "", method = RequestMethod.POST)
//    public Photo createPhoto(@RequestBody Photo photo,
//                             @RequestParam(value = "pic", defaultValue = "") CommonsMultipartFile pic) {
//        return photoService.createPhoto(photo, pic);
//    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public Photo updatePhoto(@RequestBody Photo photo) {
        return photoService.updatePhoto(photo);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Photo deletePhoto(@PathVariable("id") Integer id) {
        return photoService.deletePhoto(id);
    }
}

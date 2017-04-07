package flatbook.announcement.service;

import flatbook.announcement.dao.PhotoDao;
import flatbook.announcement.entity.Photo;
import flatbook.profile.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class PhotoService {
    @Autowired
    private PhotoDao photoDao;

    public List<Photo> getAllPhoto() {
        return photoDao.findAll();
    }

    public Photo getPhotoById(Integer id) {
        return photoDao.findOne(id);
    }

    public Photo createPhoto(MultipartFile multipartFile) {
        String fileName = multipartFile.getOriginalFilename();
        Photo photo = new Photo();
        photo.setTitle(fileName);
        try {
            photo.setImage(FileUtil.multipartToBytes(multipartFile));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return photoDao.save(photo);
    }

    public Photo deletePhoto(Integer id) {
        photoDao.delete(id);
        return null;
    }

    public Photo updatePhoto(Photo newPhoto) {
        Photo photo = photoDao.findOne(newPhoto.getId());
        photo.setTitle(newPhoto.getTitle());
        photo.setImage(newPhoto.getImage());
        return photo;
    }
}

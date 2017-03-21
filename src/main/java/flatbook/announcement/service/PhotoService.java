package flatbook.announcement.service;

import flatbook.announcement.dao.PhotoDao;
import flatbook.announcement.entity.Photo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Photo createPhoto(Photo photo) {
        photoDao.save(photo);
        return photo;
    }

    public Photo deletePhoto(Integer id) {
        photoDao.delete(id);
        return null;
    }

    public Photo updatePhoto(Photo newPhoto) {
        Photo photo = photoDao.findOne(newPhoto.getId());
        photo.setTitle(newPhoto.getTitle());
        photo.setImage(newPhoto.getImage());
        photo.setDefaultImage(newPhoto.getDefaultImage());
        return photo;
    }
}

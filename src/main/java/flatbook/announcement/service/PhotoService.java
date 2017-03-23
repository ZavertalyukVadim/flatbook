package flatbook.announcement.service;

import flatbook.announcement.dao.PhotoDao;
import flatbook.announcement.entity.Photo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class PhotoService {
    @Autowired
    private PhotoDao photoDao;

    public List<Photo> getAllPhoto() {
        test();
        return photoDao.findAll();
    }

    private void test() {
        Photo photo = new Photo();
        photo.setTitle("photo");
        photoDao.save(photo);
        Photo photo1 = new Photo();
        photo1.setTitle("photo1");
        photoDao.save(photo1);
        Photo photo2 = new Photo();
        photo2.setTitle("photo2");
        photoDao.save(photo2);
    }

    public Photo getPhotoById(Integer id) {
        return photoDao.findOne(id);
    }

    public void createPhoto(MultipartFile image) {
        Photo photo = new Photo();
        photo.setTitle("MYPHOTO");
        if (!image.isEmpty()) {
            try {
                byte[] bytes = image.getBytes();
                photo.setImage(bytes);
            } catch (Exception ignored) {
            }
        }
        photoDao.save(photo);

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

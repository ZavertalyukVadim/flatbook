package flatbook.profile.dao;

import flatbook.profile.entity.Image;
import flatbook.profile.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface ImageDao extends CrudRepository<Image, Integer> {
    Image getImageByUser(User one);
}

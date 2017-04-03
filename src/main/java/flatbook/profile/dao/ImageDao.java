package flatbook.profile.dao;

import flatbook.profile.entity.Image;
import org.springframework.data.repository.CrudRepository;

public interface ImageDao extends CrudRepository<Image, Integer> {}

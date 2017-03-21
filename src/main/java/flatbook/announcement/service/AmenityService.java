package flatbook.announcement.service;

import flatbook.announcement.dao.AmenityDao;
import flatbook.announcement.entity.Amenity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AmenityService {
    @Autowired
    private AmenityDao amenityDao;

    public List<Amenity> getAllAmenity() {
        return amenityDao.findAll();
    }
}

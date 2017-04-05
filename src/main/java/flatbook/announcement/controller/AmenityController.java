package flatbook.announcement.controller;

import flatbook.announcement.entity.Amenity;
import flatbook.announcement.service.AmenityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/amenity")
public class AmenityController {
    @Autowired
    private AmenityService amenityService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Amenity> getAllAnnouncement() {
        return amenityService.getAllAmenity();
    }
}

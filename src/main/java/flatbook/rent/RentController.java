package flatbook.rent;

import flatbook.announcement.entity.Announcement;
import flatbook.rent.entity.RentAnnouncement;
import flatbook.rent.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/rent")
public class RentController {

    private final RentService rentService;

    @Autowired
    public RentController(RentService rentService) {
        this.rentService = rentService;
    }

    @PostMapping
    public Announcement rent(@RequestBody RentAnnouncement rentAnnouncement) throws Exception {
        return rentService.rent(rentAnnouncement);
    }
}

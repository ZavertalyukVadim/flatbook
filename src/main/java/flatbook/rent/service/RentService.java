package flatbook.rent.service;

import flatbook.profile.entity.User;
import flatbook.profile.service.ProfileService;
import flatbook.rent.dao.RentDao;
import flatbook.rent.entity.Rent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentService {

    private final RentDao rentDao;
    private final ProfileService profileService;

    @Autowired
    public RentService(RentDao rentDao, ProfileService profileService) {
        this.rentDao = rentDao;
        this.profileService = profileService;
    }


    public List<Rent> getCurrentUserRents() {
        User user = profileService.getCurrentUser();
        Integer userId = user.getId();

        return rentDao.getAllByUserId(userId);
    }

    public void addRent() {

    }
}

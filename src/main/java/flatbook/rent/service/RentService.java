package flatbook.rent.service;

import flatbook.profile.entity.User;
import flatbook.profile.service.ProfileService;
import flatbook.rent.dao.RentDao;
import flatbook.rent.entity.Rent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Calendar;
import java.util.Date;
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

    @Transactional
    public Rent rent(Rent rent) throws Exception {
        normalizeRent(rent);

        if (!isCorrectRent(rent)) throw new Exception("Uncorrected rent");

        User user = profileService.getCurrentUser();
        Integer currentUserId = user.getId();

        rent.setUserId(currentUserId);

        return rentDao.save(rent);
    }

    private boolean isCorrectRent(Rent rent) throws Exception {
        Date from = rent.getFrom();
        Date to = rent.getTo();
        Date now = normalizeDate(new Date());

        return from.getTime() >= now.getTime() && from.getTime() < to.getTime();
    }

    private void normalizeRent(Rent rent) {
        Date from = rent.getFrom();
        Date to = rent.getTo();

        from = normalizeDate(from);
        to = normalizeDate(to);

        rent.setFrom(from);
        rent.setTo(to);
    }

    private Date normalizeDate(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH);
        int date_ = calendar.get(Calendar.DATE);

        calendar.set(year, month, date_, 0, 0, 0);

        return calendar.getTime();
    }
}

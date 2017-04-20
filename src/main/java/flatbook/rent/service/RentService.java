package flatbook.rent.service;

import flatbook.config.MailClient;
import flatbook.profile.entity.User;
import flatbook.profile.service.ProfileService;
import flatbook.rent.dao.RentDao;
import flatbook.rent.dto.RentDto;
import flatbook.rent.entity.Rent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class RentService {

    private final RentDao rentDao;
    private final ProfileService profileService;
    private final MailClient mailClient;

    @Autowired
    public RentService(RentDao rentDao, ProfileService profileService, MailClient mailClient) {
        this.rentDao = rentDao;
        this.profileService = profileService;
        this.mailClient = mailClient;
    }


    public List<Rent> getCurrentUserRents() {
        User user = profileService.getCurrentUser();
        Integer userId = user.getId();

        List<Rent> rents = rentDao.getAllByUserId(userId);
        rents.forEach(rent -> {
            LocalDate from = rent.getFrom();
            LocalDate to = rent.getTo();
            rent.setFrom(LocalDate.of(from.getYear(), from.getMonth(), from.getDayOfMonth()));
            rent.setTo(LocalDate.of(to.getYear(), to.getMonth(), to.getDayOfMonth()));
        });

        return rents;
    }

    @Transactional
    public Rent rent(RentDto rentDto) throws Exception {
        Rent rent = new Rent();

        rent.setFrom(LocalDate.of(rentDto.getFromYear(), rentDto.getFromMonth(), rentDto.getFromDate()));
        rent.setTo(LocalDate.of(rentDto.getToYear(), rentDto.getToMonth(), rentDto.getToDate()));

        rent.setUserId(profileService.getCurrentUser().getId());
        rent.setAnnouncementsId(rentDto.getAnnouncement_id());

        normalizeRent(rent);

        if (!isCorrectRent(rent)) throw new Exception("Uncorrected rent");
        if (isBookedRent(rent)) throw new Exception("Rent is booked");

        rent.setFrom(LocalDate.of(rent.getFrom().getYear(), rent.getFrom().getMonth(), rent.getFrom().getDayOfMonth() + 1));
        rent.setTo(LocalDate.of(rent.getTo().getYear(), rent.getTo().getMonth(), rent.getTo().getDayOfMonth() + 1));

        User user = profileService.getCurrentUser();
        Integer currentUserId = user.getId();

        rent.setUserId(currentUserId);
        Rent savedRent = rentDao.save(rent);
        mailClient.prepareAndSend(rent);
        return savedRent;
    }

    private boolean isCorrectRent(Rent rent) throws Exception {
        LocalDate from = rent.getFrom();
        LocalDate to = rent.getTo();
        LocalDate now = LocalDate.now();

        return ( from.isAfter(now) || from.isEqual(now) ) && from.isBefore(to);
    }

    private boolean isBookedRent(Rent rent) {
        return rentDao.getCount(rent.getFrom(), rent.getTo(), rent.getAnnouncementsId()) != 0;
    }

    private void normalizeRent(Rent rent) {
        rent.setFrom(normalizeDate(rent.getFrom()));
        rent.setTo(normalizeDate(rent.getTo()));
//        Date from = rent.getFrom();
//        Date to = rent.getTo();
//
//        from = normalizeDate(from);
//        to = normalizeDate(to);
//
//        rent.setFrom(from);
//        rent.setTo(to);
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

    private LocalDate normalizeDate(LocalDate localDate) {
        return LocalDate.of(localDate.getYear(), localDate.getMonth(), localDate.getDayOfMonth());
    }
}

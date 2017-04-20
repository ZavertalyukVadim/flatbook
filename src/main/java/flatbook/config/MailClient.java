package flatbook.config;

import flatbook.announcement.dao.AnnouncementDao;
import flatbook.announcement.entity.Announcement;
import flatbook.profile.dao.EmailDao;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
import flatbook.rent.entity.Rent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;

@Configuration
public class MailClient {
    private JavaMailSender mailSender;
    private final UserDao userDao;
    private final EmailDao emailDao;
    private final AnnouncementDao announcementDao;

    @Autowired
    public MailClient(JavaMailSender mailSender, UserDao userDao, EmailDao emailDao, AnnouncementDao announcementDao) {
        this.mailSender = mailSender;
        this.userDao = userDao;
        this.emailDao = emailDao;
        this.announcementDao = announcementDao;
    }

    public void prepareAndSend(Email email) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setTo(email.getContent());
            messageHelper.setSubject("Registration");
            String prefLink = "<a href=https://flatrent.herokuapp.com/api/activatedEmail/";
            Integer link = email.getId();
            String sufLink = ">click!</a>";
            String fullLink = prefLink + link + sufLink;
            messageHelper.setText("Welcome to Flatrent!<br>" +
                    "<br>" +
                    "Please, save this message. Your personal information:<br>" +
                    "----------------------------<br>" +
                    "Dear " + email.getUser().getFirstName() + " " + email.getUser().getLastName() +
                    "<br>" +
                    "----------------------------<br>" +
                    "<br>" +
                    "Your account is still inactive, and can’t sign. To activate - please go to following link:<br>" +
                    "<br>" +
                    "" + fullLink +
                    "<br>" +
                    "<br>" +
                    "If it is not your account – please, ignore this message.<br>" +
                    "<br>" +
                    "Please, do not forget your password:  it stores in our base in encrypted way, so we can’t send it anymore. However, If you forget your password, please request new, wich must be activated the same way, as your account.<br>" +
                    "<br>" +
                    "Thanks for registering Flatrent!", true);
        };
        try {
            mailSender.send(messagePreparator);
        } catch (MailException e) {
            e.printStackTrace();
        }
    }

    public void prepareAndSend(Rent rent) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            User user = userDao.findOne(rent.getUserId());
            Announcement announcement = announcementDao.findOne(rent.getAnnouncementsId());

            String primaryEmail = null;
            for (Email email : announcement.getUser().getEmails()) {
                if (email.getPrimary()) {
                    primaryEmail = email.getContent();
                }
            }
            messageHelper.setTo(primaryEmail);
            messageHelper.setSubject("Booking");
            messageHelper.setText("Your apartmant booked " + announcement.getTitle());
        };
        try {
            mailSender.send(messagePreparator);
        } catch (MailException e) {
            e.printStackTrace();
        }
    }
}
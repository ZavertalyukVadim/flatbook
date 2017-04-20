package flatbook.config;

import flatbook.profile.entity.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;

@Configuration
public class MailClient {
    private JavaMailSender mailSender;

    @Autowired
    public MailClient(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void prepareAndSend(Email email) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom("zavertal.v@gmail.com");
            messageHelper.setTo(email.getContent());
            messageHelper.setSubject("Registration");
            String prefLink = "<a href=https://flatrent.herokuapp.com/api/activatedEmail/";
            Integer link = email.getId();
            String sufLink=">click!</a>";
            String fullLink = prefLink+link+sufLink;
            messageHelper.setText("Hello dear. You registration on Flatbook. If it's you click and work with this app -  "+fullLink + " to continue authorization.", true);
        };
        try {
            mailSender.send(messagePreparator);
        } catch (MailException e) {
            e.printStackTrace();
        }
    }

}
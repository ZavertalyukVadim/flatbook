package flatbook.config;

import flatbook.profile.entity.Email;
import flatbook.profile.entity.User;
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

    public void prepareAndSend(User recipient) {
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            try {
                String primaryEmail = null;
                for (Email email : recipient.getEmails()) {
                    primaryEmail = email.getContent();
                }
            } catch (Exception ignored) {

            }
            messageHelper.setFrom("zavertal.v@gmail.com");
//            messageHelper.setTo(primaryEmail);
            messageHelper.setTo("zavertalyuk.v@gmail.com");
            messageHelper.setSubject("Registration");
            String prefLink = "<a href='http://localhost:8080/api/login/";
            String link ="zavertalyuk.v@gmail.com" ;
            String sufLink=">click!</a>";
            String fullLink = prefLink+link+sufLink;
            messageHelper.setText("Hello dear " + recipient.getFirstName() + " " + recipient.getLastName() + " You registration on Flatbook. If it's you click and work with this app -  "+fullLink + " to continue authorization.", true);
        };
        try {
            mailSender.send(messagePreparator);
        } catch (MailException e) {
            e.printStackTrace();
        }
    }

}
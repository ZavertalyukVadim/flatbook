package flatbook.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Configuration
public class MailClient {
    private JavaMailSender mailSender;

    @Autowired
    public MailClient(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void prepareAndSend(String recipient, String text) {

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("zavertalyuk.v@gmail.com");
            message.setSubject(recipient);
            message.setText(text);

            mailSender.send(message);
        } catch (MailException exception) {
            exception.printStackTrace();
        }
//        MimeMessagePreparator messagePreparator = mimeMessage -> {
//            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
//            messageHelper.setFrom("zavertal.v@gmail.com");
//            messageHelper.setTo(recipient);
//            messageHelper.setSubject("Sample mail subject");
//            messageHelper.setText(message);
//        };
//        try {
//            mailSender.send(messagePreparator);
//        } catch (MailException e) {
//            e.printStackTrace();
//        }
    }

}
package flatbook.profile.service;

import flatbook.profile.dao.EmailDao;
import flatbook.profile.entity.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final EmailDao emailDao;

    @Autowired
    public EmailService(EmailDao emailDao) {
        this.emailDao = emailDao;
    }

    public void activateEmail(Integer id) {
        Email email = emailDao.findOne(id);
        email.setActivated(true);
        emailDao.save(email);
    }
}

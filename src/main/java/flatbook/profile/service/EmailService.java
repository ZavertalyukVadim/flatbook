package flatbook.profile.service;

import flatbook.profile.dao.EmailDao;
import flatbook.profile.entity.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private EmailDao emailDao;

    public Email createEmail(Email email) {
        return emailDao.save(email);
    }

    public Email updateEmail(Email email) {
        return emailDao.save(email);
    }

    public Email deleteEmail(Email email) throws Exception {
        if (email.getPrimary()) throw new Exception("Email is primary");

        emailDao.delete(email);
        return null;
    }
}

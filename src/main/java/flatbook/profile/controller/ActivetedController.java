package flatbook.profile.controller;

import flatbook.profile.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping(value = "/api/activatedEmail")
public class ActivetedController {
    private final EmailService emailService;

    @Autowired
    public ActivetedController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping(value = "/{id}")
    public void activateEmail(@PathVariable("id") Integer id, HttpServletResponse httpServletResponse) {
        emailService.activateEmail(id);
        try {
            httpServletResponse.sendRedirect("/signin");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

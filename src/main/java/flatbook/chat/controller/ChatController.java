package flatbook.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {


    @MessageMapping(value = "/hello")
    @SendTo(value = "/topic/greeting")
    public String greeting(String message) {
        return "it. works. hell yeah!";
    }
}



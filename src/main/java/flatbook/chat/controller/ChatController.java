package flatbook.chat.controller;

import flatbook.chat.dto.PageMessage;
import flatbook.chat.entity.Message;
import flatbook.chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/chat")
public class ChatController {

    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping(value = "/send")
    public Message sendMessage(Message message) throws Exception {
        return chatService.sendMessage(message);
    }

    @PostMapping
    public Page<Message> getMessages(@RequestBody PageMessage pageMessage) {
        return chatService.getMessages(pageMessage);
    }

    @DeleteMapping
    public void deleteMessage() {

    }
}



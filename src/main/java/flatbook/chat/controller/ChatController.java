package flatbook.chat.controller;

import flatbook.chat.dto.PageMessage;
import flatbook.chat.entity.Message;
import flatbook.chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/chat")
public class ChatController {

    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping(value = "/send")
    public Message sendMessage(@RequestBody Message message) throws Exception {
        return chatService.sendMessage(message);
    }

    @PostMapping(value = "/{pageNum}/{itemsPerPage}")
    public Page<Message> getMessages(@PathVariable("pageNum") Integer page, @PathVariable("itemsPerPage") Integer itemsPerPage, @RequestBody PageMessage pageMessage) {
        pageMessage.setItemsPerPage(itemsPerPage);
        pageMessage.setPageNum(page);

        return chatService.getMessages(pageMessage);
    }

    @GetMapping("/chats")
    public List<Integer> getChatsAnnouncement() {
        return chatService.getChatsAnnouncements();
    }
}



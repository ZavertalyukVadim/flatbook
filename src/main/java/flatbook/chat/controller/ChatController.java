package flatbook.chat.controller;

import flatbook.chat.dto.ChatDto;
import flatbook.chat.dto.PageMessage;
import flatbook.chat.dto.ResponseMessageDto;
import flatbook.chat.entity.Message;
import flatbook.chat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping(value = "/{pageNum}/{itemsPerPage}/{announcementId}/{receiverId}")
    public ResponseMessageDto getMessages(@PathVariable("pageNum") Integer page,
                                       @PathVariable("itemsPerPage") Integer itemsPerPage,
                                       @PathVariable("announcementId") Integer announcementId,
                                       @PathVariable("receiverId") Integer receiverId) {
        PageMessage pageMessage = new PageMessage();

        pageMessage.setPageNum(page);
        pageMessage.setItemsPerPage(itemsPerPage);
        pageMessage.setAnnouncementId(announcementId);
        pageMessage.setReceiverId(receiverId);

        ResponseMessageDto responseMessageDto = new ResponseMessageDto();
        responseMessageDto.setMessage(chatService.getMessages(pageMessage));

        return responseMessageDto;
    }

    @GetMapping("/chats")
    public List<ChatDto> getChatsAnnouncement() {
        return chatService.getChatsAnnouncements();
    }
}



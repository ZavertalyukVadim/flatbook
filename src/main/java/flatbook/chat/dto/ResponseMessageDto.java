package flatbook.chat.dto;


import org.springframework.data.domain.Page;

public class ResponseMessageDto {
    public Page<MessageDto> getMessage() {
        return message;
    }

    public void setMessage(Page<MessageDto> message) {
        this.message = message;
    }

    private Page<MessageDto> message;
}

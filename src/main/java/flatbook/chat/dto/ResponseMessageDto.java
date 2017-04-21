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

    public CommunicatorsPageDto getCommunicatorsPageDto() {
        return communicatorsPageDto;
    }

    public void setCommunicatorsPageDto(CommunicatorsPageDto communicatorsPageDto) {
        this.communicatorsPageDto = communicatorsPageDto;
    }

    private CommunicatorsPageDto communicatorsPageDto;
}

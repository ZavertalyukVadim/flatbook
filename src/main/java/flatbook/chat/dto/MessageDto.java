package flatbook.chat.dto;

import flatbook.chat.entity.Message;

public class MessageDto {
    private Boolean my;
    private Message message;

    public Boolean getMy() {
        return my;
    }

    public void setMy(Boolean my) {
        this.my = my;
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }
}

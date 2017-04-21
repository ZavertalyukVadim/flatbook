package flatbook.chat.dto;

/**
 * Created by USER on 4/21/2017.
 */
public class ChatDto {
    private Integer senderId;
    private Integer receiverId;

    private Integer announcementId;

    public Integer getSenderId() {
        return senderId;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    public Integer getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Integer receiverId) {
        this.receiverId = receiverId;
    }

    public Integer getAnnouncementId() {
        return announcementId;
    }

    public void setAnnouncementId(Integer announcementId) {
        this.announcementId = announcementId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ChatDto chatDto = (ChatDto) o;

        if (senderId != null ? !senderId.equals(chatDto.senderId) : chatDto.senderId != null) return false;
        if (receiverId != null ? !receiverId.equals(chatDto.receiverId) : chatDto.receiverId != null) return false;
        return announcementId != null ? announcementId.equals(chatDto.announcementId) : chatDto.announcementId == null;
    }
}

package flatbook.chat.dto;


import flatbook.profile.entity.User;
import org.springframework.data.domain.Page;

public class CommunicatorsPageDto {
    private Page<MessageDto> messageDtoPage;

    private User me;
    private User you;

    public Page<MessageDto> getMessageDtoPage() {
        return messageDtoPage;
    }

    public void setMessageDtoPage(Page<MessageDto> messageDtoPage) {
        this.messageDtoPage = messageDtoPage;
    }

    public User getMe() {
        return me;
    }

    public void setMe(User me) {
        this.me = me;
    }

    public User getYou() {
        return you;
    }

    public void setYou(User you) {
        this.you = you;
    }
}

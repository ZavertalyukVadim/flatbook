package flatbook.chat.service;

import flatbook.announcement.dao.AnnouncementDao;
import flatbook.announcement.entity.Announcement;
import flatbook.chat.dao.MessageDao;
import flatbook.chat.dto.PageMessage;
import flatbook.chat.entity.Message;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.Date;

@Service
public class ChatService {
    private final MessageDao messageDao;
    private final AnnouncementDao announcementDao;
    private final EntityManager entityManager;


    private final ProfileService profileService;

    @Autowired
    public ChatService(MessageDao messageDao, AnnouncementDao announcementDao, EntityManager entityManager, ProfileService profileService) {
        this.messageDao = messageDao;
        this.announcementDao = announcementDao;
        this.entityManager = entityManager;
        this.profileService = profileService;
    }

    public Message sendMessage(Message message) throws Exception {
        message.setSenderId(profileService.getCurrentUser().getId());
        message.setLocalDatetime(new Date());
        return messageDao.save(message);
    }

    public Page<Message> getMessages(PageMessage pageMessage) {
        PageRequest pageRequest = new PageRequest(pageMessage.getPageNum(), pageMessage.getItemsPerPage());
        pageMessage.setSenderId(profileService.getCurrentUser().getId());

        entityManager.clear();
        Announcement announcement = announcementDao.findOne(pageMessage.getAnnouncementId());
        pageMessage.setReceiverId(announcementDao.findOne(pageMessage.getAnnouncementId()).getUser().getId());

        Page<Message> messages =  messageDao.getMessages(pageMessage, pageRequest);

        return messages;
    }

    private boolean senderIsReceiver(Message message) {
        return message.getReceiverId() == message.getSenderId();
    }
}

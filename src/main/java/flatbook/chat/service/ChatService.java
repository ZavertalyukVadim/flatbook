package flatbook.chat.service;

import flatbook.announcement.dao.AnnouncementDao;
import flatbook.announcement.entity.Announcement;
import flatbook.chat.dao.MessageDao;
import flatbook.chat.dto.*;
import flatbook.chat.entity.Message;
import flatbook.profile.dao.UserDao;
import flatbook.profile.entity.User;
import flatbook.profile.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
public class ChatService {
    private final MessageDao messageDao;
    private final AnnouncementDao announcementDao;
    private final EntityManager entityManager;
    private final UserDao userDao;


    private final ProfileService profileService;

    @Autowired
    public ChatService(MessageDao messageDao, AnnouncementDao announcementDao, EntityManager entityManager, UserDao userDao, ProfileService profileService) {
        this.messageDao = messageDao;
        this.announcementDao = announcementDao;
        this.entityManager = entityManager;
        this.userDao = userDao;
        this.profileService = profileService;
    }

    public Message sendMessage(Message message) throws Exception {
        message.setLocalDatetime(new Date());

        if (isCustomerSender(message)) return sendMessageToOwner(message);

        return sendMessageToCustomer(message);
    }

    public Message sendMessageToOwner(Message message) {
        Integer announcementId = message.getAnnouncementId();

        Integer senderId = profileService.getCurrentUser().getId();
        Integer receiverId = announcementDao.findOne(announcementId).getUser().getId();

        message.setSenderId(senderId);
        message.setReceiverId(receiverId);

        return messageDao.save(message);
    }

    public Message sendMessageToCustomer(Message message) {
        Integer announcementId = message.getAnnouncementId();

        Integer senderId = profileService.getCurrentUser().getId();
        message.setSenderId(senderId);

        return messageDao.save(message);
    }

    public CommunicatorsPageDto getMessages(PageMessage pageMessage) {
        PageRequest pageRequest = new PageRequest(pageMessage.getPageNum(), pageMessage.getItemsPerPage());

        Integer senderId = profileService.getCurrentUser().getId();
        Integer receiverId = pageMessage.getReceiverId();

        pageMessage.setSenderId(senderId);
        pageMessage.setReceiverId(receiverId);

        Page<Message> messages = messageDao.getMessages(pageMessage, pageRequest);

        Page<MessageDto> messagesResult =  markMyMessages(messages);
        return setCommunicators(messagesResult, messages);
    }

    private CommunicatorsPageDto setCommunicators(Page<MessageDto> dtoPage, Page<Message> messagePage) {
        User me = profileService.getCurrentUser();
        User you = null;

        for (Message message: messagePage.getContent()) {
            Integer possibleYou = messagePage.getContent().get(0).getReceiverId();
            if (me.getId() == possibleYou) continue;
                you = userDao.findOne(possibleYou);
        }

        CommunicatorsPageDto communicatorsPageDto = new CommunicatorsPageDto();

        communicatorsPageDto.setMe(me);
        communicatorsPageDto.setYou(you);
        communicatorsPageDto.setMessageDtoPage(dtoPage);

        return communicatorsPageDto;
    }

    public void getChats(PageMessage pageMessage) {

    }

    private boolean senderIsReceiver(Message message) {
        return message.getReceiverId() == message.getSenderId();
    }

    public List<ChatDto> getChatsAnnouncements() {
        List<ChatDto> chatDtos = new ArrayList<>();

        List<Object[]> objects = announcementDao.getChatsAnnouncements(new UserWithId(profileService.getCurrentUser().getId()));
        objects.forEach(objects1 -> {
            ChatDto chatDto = new ChatDto();

            chatDto.setAnnouncementId((Integer) objects1[0]);

            Integer currentUserId = profileService.getCurrentUser().getId();

            Integer firstSender = (Integer) objects1[1];
            Integer secondSender = (Integer) objects1[2];

            if(currentUserId == firstSender) {
                chatDto.setSenderId(firstSender);
                chatDto.setReceiverId(secondSender);
            } else {
                chatDto.setSenderId(secondSender);
                chatDto.setReceiverId(firstSender);
            }


//            chatDto.setSenderId((Integer) objects1[1]);
//            chatDto.setReceiverId((Integer) objects1[2]);

            chatDtos.add(chatDto);
        });


        return chatDtos;
    }

    public Message response(ResponseMessage responseMessage) {
        Integer receiverId = responseMessage.getReceiverId();
        if (isValidReceiver(receiverId));

        Message message = new Message();
        return null;
    }

    private Page<MessageDto> markMyMessages(Page<Message> messagePage) {
        return new Page() {
            @Override
            public int getTotalPages() {
                return messagePage.getTotalPages();
            }

            @Override
            public long getTotalElements() {
                return messagePage.getTotalElements();
            }

            @Override
            public Page map(Converter converter) {
                return null;
            }

            @Override
            public int getNumber() {
                return messagePage.getNumber();
            }

            @Override
            public int getSize() {
                return messagePage.getSize();
            }

            @Override
            public int getNumberOfElements() {
                return messagePage.getNumberOfElements();
            }

            @Override
            public List getContent() {
                List<MessageDto> massegesDto = new ArrayList<>();
                messagePage.forEach(message -> {
                    MessageDto messageDto = new MessageDto();
                    messageDto.setMessage(message);

                    if (isCurrentUserSender(message)) messageDto.setMy(true);

                        massegesDto.add(messageDto);
                });

                return massegesDto;
            }

            @Override
            public boolean hasContent() {
                return false;
            }

            @Override
            public Sort getSort() {
                return null;
            }

            @Override
            public boolean isFirst() {
                return messagePage.isFirst();
            }

            @Override
            public boolean isLast() {
                return messagePage.isLast();
            }

            @Override
            public boolean hasNext() {
                return false;
            }

            @Override
            public boolean hasPrevious() {
                return false;
            }

            @Override
            public Pageable nextPageable() {
                return null;
            }

            @Override
            public Pageable previousPageable() {
                return null;
            }

            @Override
            public Iterator iterator() {
                return null;
            }
        };
    }

    private boolean isCurrentUserSender(Message message) {
        return profileService.getCurrentUser().getId() == message.getSenderId();
    }

    private boolean isValidReceiver(Integer receiver) {
        return false;
    }

    private boolean isCustomerSender(Message message) {
        Integer announcementId = message.getAnnouncementId();
        Announcement announcement = announcementDao.findOne(announcementId);

        User announcementOwner = announcement.getUser();
        User currentUser = profileService.getCurrentUser();

        return !(announcementOwner.getId() == currentUser.getId());
    }
}

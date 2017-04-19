package flatbook.chat.dao;

import flatbook.chat.dto.PageMessage;
import flatbook.chat.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface MessageDao extends JpaRepository<Message, Integer> {
    @Query("SELECT message FROM Message message where message.announcementId = :#{#pageMessage.announcementId} " +
            "and " +
            "(" +
            "(message.senderId=:#{#pageMessage.senderId} " +
            "and message.receiverId=:#{#pageMessage.receiverId}) " +
            "or " +
            "(message.senderId = :#{#pageMessage.receiverId} and message.receiverId=:#{#pageMessage.senderId})" +
            ")")
    Page<Message> getMessages(@Param("pageMessage") PageMessage pageMessage, Pageable pageable);
}

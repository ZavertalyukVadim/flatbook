package flatbook.announcement.entity;

import javax.persistence.*;

@Entity
@Table(name = "users_announcements")
public class UserAnnouncements {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "user_id", nullable = false)
    private Integer userId;


    @JoinColumn(name = "announcement_id")
    private Integer announcementId;


    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getAnnouncementId() {
        return announcementId;
    }

    public void setAnnouncementId(Integer announcementId) {
        this.announcementId = announcementId;
    }

    @Override
    public String toString() {
        return "UserAnnouncements{" +
                "id=" + id +
                ", userId=" + userId +
                ", announcementId=" + announcementId +
                '}';
    }
}

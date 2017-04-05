package flatbook.announcement.entity;

import javax.persistence.*;

@Entity
@Table(name = "favorite_announcement_in_user")
public class FavoriteAnnouncementInUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_announcement_in_user_id", nullable = false)
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
}

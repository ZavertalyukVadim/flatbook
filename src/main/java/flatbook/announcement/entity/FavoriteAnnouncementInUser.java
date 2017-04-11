package flatbook.announcement.entity;

import flatbook.profile.entity.User;

import javax.persistence.*;

@Entity
@Table(name = "favorites_announcements_in_user")
public class FavoriteAnnouncementInUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    private User user;


    @JoinColumn(name = "announcement_id")
    private Integer announcementId;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getAnnouncementId() {
        return announcementId;
    }

    public void setAnnouncementId(Integer announcementId) {
        this.announcementId = announcementId;
    }
}

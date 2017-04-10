package flatbook.announcement.entity;

import flatbook.profile.entity.User;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "announcement_comments")
public class AnnouncementComments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    private User user;

    @Column(name = "text")
    private String text;

    @Column(name = "date_create")
    private Date dateCreate;

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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getDateCreate() {
        return dateCreate;
    }

    public void setDateCreate(Date dateCreate) {
        this.dateCreate = dateCreate;
    }

    public Integer getAnnouncementId() {
        return announcementId;
    }

    public void setAnnouncementId(Integer announcementId) {
        this.announcementId = announcementId;
    }

}

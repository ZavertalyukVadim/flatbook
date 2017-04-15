package flatbook.rent.entity;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "rents")
public class Rent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "`from`")
    private Date from;

    @Column(name = "`to`")
    private Date to;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "announcement_id")
    private Integer announcementsId;

    public Date getFrom() {
        return from;
    }

    public void setFrom(Date from) {
        this.from = from;
    }

    public Date getTo() {
        return to;
    }

    public void setTo(Date to) {
        this.to = to;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getAnnouncementsId() {
        return announcementsId;
    }

    public void setAnnouncementsId(Integer announcementsId) {
        this.announcementsId = announcementsId;
    }
}

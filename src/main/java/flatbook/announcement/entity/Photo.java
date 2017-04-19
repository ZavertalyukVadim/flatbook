package flatbook.announcement.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "photos")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnore
    @Column(name = "image", columnDefinition = "MEDIUMBLOB")
    private byte[] image;

    @Column(name = "title")
    private String title;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "announcements_photos", joinColumns = {
            @JoinColumn(name = "photo_id")},
            inverseJoinColumns = {@JoinColumn(name = "announcement_id")})
    private Announcement announcement;

    public Photo() {
    }

    public Integer getId() {
        return id;
    }

    public Announcement getAnnouncement() {
        return announcement;
    }

    public void setAnnouncement(Announcement announcement) {
        this.announcement = announcement;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}

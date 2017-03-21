package flatbook.announcement.entity;

import javax.persistence.*;

@Entity
@Table(name = "photo")
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id", nullable = false)
    private Integer id;

    @Column(name = "link")
    private String link;

    @Column(name = "default_image")
    private Boolean defaultImage;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "announcements_photos", joinColumns = {
            @JoinColumn(name = "announcement_id", nullable = false)},
            inverseJoinColumns = {@JoinColumn(name = "photo_id",
                    nullable = false)})
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

    public Boolean getDefaultImage() {
        return defaultImage;
    }

    public void setDefaultImage(Boolean defaultImage) {
        this.defaultImage = defaultImage;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

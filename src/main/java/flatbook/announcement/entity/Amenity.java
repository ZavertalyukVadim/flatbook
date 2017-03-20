package flatbook.announcement.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "amenity")
public class Amenity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "amenity_id", nullable = false)
    private Integer id;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "announcements_amenities", joinColumns = {
            @JoinColumn(name = "announcement_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "amenity_id",
                    nullable = false, updatable = false)})
    private List<Announcement> announcements = new ArrayList<>();

    public Amenity() {
    }

    public List<Announcement> getAnnouncements() {
        return announcements;
    }

    public void setAnnouncements(List<Announcement> announcements) {
        this.announcements = announcements;
    }
}

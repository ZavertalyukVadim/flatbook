package flatbook.announcement.entity;

import javax.persistence.*;

@Entity
@Table(name = "photo")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id", nullable = false)
    private Integer id;

}

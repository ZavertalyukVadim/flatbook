package flatbook.profile.entity;

import javax.persistence.*;

@Entity
@Table(name = "image")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id", nullable = false)
    private Integer id;

    @Column(name = "photo")
    private byte[] image;
}

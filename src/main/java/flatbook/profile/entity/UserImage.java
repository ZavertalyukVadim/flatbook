package flatbook.profile.entity;

import javax.persistence.*;

@Entity
@Table(name = "users_images")
public class UserImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
}

package flatbook.profile.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "user_id", fetch = FetchType.LAZY)
    private List<Email> emails;

    @OneToMany(mappedBy = "user_id", fetch = FetchType.LAZY)
    private List<Phone> phones;
}

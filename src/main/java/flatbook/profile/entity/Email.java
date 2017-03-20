package flatbook.profile.entity;

import javax.persistence.*;

@Entity
@Table(name = "emails")
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "primary")
    private Boolean primary;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    private User user;
}

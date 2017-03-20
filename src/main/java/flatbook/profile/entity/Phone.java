package flatbook.profile.entity;

import javax.persistence.*;

@Entity
@Table(name = "phones")
public class Phone {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "number")
    private String number;

    @Column(name = "primary")
    private Boolean primary;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    private User user;
}

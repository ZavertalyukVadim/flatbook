package flatbook.profile.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import javax.validation.constraints.Pattern;

@Entity
@Table(name = "phones")
public class Phone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "content")
    @Pattern(regexp = "(^[+][\\d]{1,2}[\\d]{10}$)|(^[\\d]{10})$")
    private String content;

    @Column(name = "is_primary", nullable = false)
    private Boolean isPrimary = false;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User phonesUser;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getPrimary() {
        return isPrimary;
    }

    public void setPrimary(Boolean primary) {
        isPrimary = primary;
    }

    @Override
    public boolean equals(Object o) {
        Phone phone = (Phone) o;
        return this.content.equals(phone.getContent());

    }

    public User getPhonesUser() {
        return phonesUser;
    }

    public void setPhonesUser(User phonesUser) {
        this.phonesUser = phonesUser;
    }
}

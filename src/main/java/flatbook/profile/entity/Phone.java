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

    @Column(name = "number")
    @Pattern(regexp = "(^[+][\\d]{1,2}[\\d]{10}$)|(^[\\d]{10})$")
    private String number;

    @Column(name = "is_primary", nullable = false)
    private Boolean isPrimary;

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

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
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
        if (this.number.equals(phone.getNumber())) {
            return true;
        }

        return false;
    }

    public User getPhonesUser() {
        return phonesUser;
    }

    public void setPhonesUser(User phonesUser) {
        this.phonesUser = phonesUser;
    }
}

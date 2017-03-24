package flatbook.profile.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "user_name", unique = true)
    private String userName;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "email_id", nullable = false, unique = true)
    @Size(min = 1)
    private List<Email> emails;

    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "phone_id", nullable = false, unique = true)
    @Size(min = 1)
    private List<Phone> phones;


    public Email getPrimaryEmail() {
        List<Email> emailes = getEmails();
        return emailes.stream().filter(email -> email.getPrimary()).findFirst().get();
    }

    public Phone getPrimaryPhone() {
        List<Phone> phones = getPhones();
        return phones.stream().filter(phone -> phone.getPrimary()).findFirst().get();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Email> getEmails() {
        return emails;
    }

    public void setEmails(List<Email> emails) {
        this.emails = emails;
    }

    public List<Phone> getPhones() {
        return phones;
    }

    public void setPhones(List<Phone> phones) {
        this.phones = phones;
    }
}

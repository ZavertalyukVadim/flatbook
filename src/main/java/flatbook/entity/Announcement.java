package flatbook.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name ="announcement")
public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "announcement_id", nullable = false)
    private Integer id;

    @Column(name = "price")
    private Integer price;

    @Column(name = "description")
    private String description;

    @Column(name = "marker")
    private Boolean marker;

    @Column(name = "date")
    private Date date;

    public Announcement() {
    }

    public Announcement(Integer price, String description, Boolean marker, Date date) {
        this.price = price;
        this.description = description;
        this.marker = marker;
        this.date = date;
    }

    public Integer getId() {
        return id;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getMarker() {
        return marker;
    }

    public void setMarker(Boolean marker) {
        this.marker = marker;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}

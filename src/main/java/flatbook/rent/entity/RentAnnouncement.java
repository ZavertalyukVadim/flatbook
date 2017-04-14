package flatbook.rent.entity;


import flatbook.announcement.entity.Announcement;

public class RentAnnouncement {
    private Rent rent;
    private Announcement announcement;

    public RentAnnouncement(Rent rent, Announcement announcement) {
        this.rent = rent;
        this.announcement = announcement;
    }

    public RentAnnouncement() {}

    public Rent getRent() {
        return rent;
    }

    public void setRent(Rent rent) {
        this.rent = rent;
    }

    public Announcement getAnnouncement() {
        return announcement;
    }

    public void setAnnouncement(Announcement announcement) {
        this.announcement = announcement;
    }
}

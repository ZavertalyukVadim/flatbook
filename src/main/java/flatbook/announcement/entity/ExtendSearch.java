package flatbook.announcement.entity;

import java.util.List;

public class ExtendSearch {
    private Integer cityId;
    private Integer startingPrice;
    private Integer finalPrice;
    private Price price;
    private Integer rooms;
    private Integer livingPlaces;
    private List<Amenity> amenities;

    public Integer getCityId() {
        return cityId;
    }

    public Integer getStartingPrice() {
        return startingPrice;
    }

    public Integer getFinalPrice() {
        return finalPrice;
    }

    public Price getPrice() {
        return price;
    }

    public Integer getRooms() {
        return rooms;
    }
    public Integer getLivingPlaces() {
        return livingPlaces;
    }

    public ExtendSearch() {
    }

    public ExtendSearch(List<Amenity> amenities) {
        this.amenities = amenities;
    }

    public List<Amenity> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<Amenity> amenities) {
        this.amenities = amenities;
    }
}

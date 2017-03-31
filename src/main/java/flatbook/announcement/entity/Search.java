package flatbook.announcement.entity;


public class Search {

    private Integer cityId;
    private Integer startingPrice;
    private Integer finalPrice;
    private Price price;
    private Integer rooms;
    private Integer livingPlaces;

    public Search() {
    }

    public Search(Integer cityId, Integer startingPrice, Integer finalPrice, Price price, Integer rooms, Integer livingPlaces) {
        this.cityId = cityId;
        this.startingPrice = startingPrice;
        this.finalPrice = finalPrice;
        this.price = price;
        this.rooms = rooms;
        this.livingPlaces = livingPlaces;
    }

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
}

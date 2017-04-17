package flatbook.announcement.entity;

import java.util.Date;
import java.util.List;

public class ExtendSearch {
    private int pageNum;
    private int itemsPerPage;
    private Integer cityId;
    private Integer startingPrice;
    private Integer finalPrice;
    private Price price;
    private Integer rooms;
    private Integer livingPlaces;
    private List<Amenity> amenities;
    private Date startDate;
    private Date endDate;

    public ExtendSearch() {
    }

    public ExtendSearch(Integer cityId, Integer startingPrice, Integer finalPrice, Price price, Integer rooms, Integer livingPlaces, List<Amenity> amenities) {
        this.cityId = cityId;
        this.startingPrice = startingPrice;
        this.finalPrice = finalPrice;
        this.price = price;
        this.rooms = rooms;
        this.livingPlaces = livingPlaces;
        this.amenities = amenities;
    }

    public Integer getCityId() {
        return cityId;
    }

    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }

    public Integer getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(Integer startingPrice) {
        this.startingPrice = startingPrice;
    }

    public Integer getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(Integer finalPrice) {
        this.finalPrice = finalPrice;
    }

    public Price getPrice() {
        return price;
    }

    public void setPrice(Price price) {
        this.price = price;
    }

    public Integer getRooms() {
        return rooms;
    }

    public void setRooms(Integer rooms) {
        this.rooms = rooms;
    }

    public Integer getLivingPlaces() {
        return livingPlaces;
    }

    public void setLivingPlaces(Integer livingPlaces) {
        this.livingPlaces = livingPlaces;
    }

    public List<Amenity> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<Amenity> amenities) {
        this.amenities = amenities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ExtendSearch that = (ExtendSearch) o;

        if (cityId != null ? !cityId.equals(that.cityId) : that.cityId != null) return false;
        if (startingPrice != null ? !startingPrice.equals(that.startingPrice) : that.startingPrice != null)
            return false;
        if (finalPrice != null ? !finalPrice.equals(that.finalPrice) : that.finalPrice != null) return false;
        if (price != that.price) return false;
        if (rooms != null ? !rooms.equals(that.rooms) : that.rooms != null) return false;
        if (livingPlaces != null ? !livingPlaces.equals(that.livingPlaces) : that.livingPlaces != null) return false;
        return amenities != null ? amenities.equals(that.amenities) : that.amenities == null;
    }

    @Override
    public int hashCode() {
        int result = cityId != null ? cityId.hashCode() : 0;
        result = 31 * result + (startingPrice != null ? startingPrice.hashCode() : 0);
        result = 31 * result + (finalPrice != null ? finalPrice.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (rooms != null ? rooms.hashCode() : 0);
        result = 31 * result + (livingPlaces != null ? livingPlaces.hashCode() : 0);
        result = 31 * result + (amenities != null ? amenities.hashCode() : 0);
        return result;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getItemsPerPage() {
        return itemsPerPage;
    }

    public void setItemsPerPage(int imtesPerPage) {
        this.itemsPerPage = imtesPerPage;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Date getStartDate() {
        return startDate;
    }
}

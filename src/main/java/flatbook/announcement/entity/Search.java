package flatbook.announcement.entity;


import java.util.Date;

public class Search {

    private int pageNum;
    private int itemsPerPage;

    private Integer cityId;
    private Integer startingPrice;
    private Integer finalPrice;
    private Price price;
    private Integer rooms;
    private Integer livingPlaces;

    private Date startDate;
    private Date endDate;

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

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getItemsPerPage() {
        return itemsPerPage;
    }

    public void setItemsPerPage(int itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
    }

    public Date getStartDate() {
        return startDate;
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
}

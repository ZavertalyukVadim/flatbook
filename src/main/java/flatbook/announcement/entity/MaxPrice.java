package flatbook.announcement.entity;

public class MaxPrice {
    private Integer pricePerDay;
    private Integer pricePerMonth;

    public MaxPrice() {
    }

    public MaxPrice(Integer pricePerDay, Integer pricePerMonth) {
        this.pricePerDay = pricePerDay;
        this.pricePerMonth = pricePerMonth;
    }

    public Integer getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(Integer pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public Integer getPricePerMonth() {
        return pricePerMonth;
    }

    public void setPricePerMonth(Integer pricePerMonth) {
        this.pricePerMonth = pricePerMonth;
    }
}

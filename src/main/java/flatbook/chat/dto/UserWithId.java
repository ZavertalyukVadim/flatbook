package flatbook.chat.dto;

public class UserWithId {
    private Integer id;


    public UserWithId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}

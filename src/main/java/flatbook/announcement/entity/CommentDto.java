package flatbook.announcement.entity;


public class CommentDto {
    private Integer comment_id;
    private String text;
    private Integer announcement_id;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getAnnouncement_id() {
        return announcement_id;
    }

    public void setAnnouncement_id(Integer announcement_id) {
        this.announcement_id = announcement_id;
    }

    public Integer getComment_id() {
        return comment_id;
    }

    public void setComment_id(Integer comment_id) {
        this.comment_id = comment_id;
    }
}

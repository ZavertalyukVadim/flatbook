package flatbook.profile.entity;

import javax.persistence.*;

@Entity
@Table(name = "tests")
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @Column(name = "exampl")
    private String exampl;


    public String getExampl() {
        return exampl;
    }

    public void setExampl(String exampl) {
        this.exampl = exampl;
    }
}

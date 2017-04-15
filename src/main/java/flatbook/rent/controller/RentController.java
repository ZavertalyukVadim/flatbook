package flatbook.rent.controller;

import flatbook.rent.entity.Rent;
import flatbook.rent.entity.RentRequestBody;
import flatbook.rent.service.RentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/rent")
public class RentController {

    @Autowired
    private RentService rentService;

    @GetMapping
    public List<Rent> getRents() {
        return rentService.getCurrentUserRents();
    }

    @PostMapping
    public void rent(@RequestBody RentRequestBody rentRequestBody) {

    }
}

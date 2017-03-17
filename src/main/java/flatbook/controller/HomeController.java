package flatbook.controller;

import flatbook.entity.TestEntity;
import flatbook.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {

    @Autowired
    private TestService service;

    @RequestMapping(value = "/")
    @ResponseBody
    List<TestEntity> test(){
        return service.testEntities();
    }
}

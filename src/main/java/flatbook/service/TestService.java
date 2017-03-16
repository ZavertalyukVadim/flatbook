package flatbook.service;

import flatbook.dao.TestDao;
import flatbook.entity.TestEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {
    @Autowired
    private TestDao dao;

    public List<TestEntity> testEntities(){
        TestEntity entity = new TestEntity();
        entity.setId(100);
        dao.save(entity);
        return dao.findAll();
    }
}

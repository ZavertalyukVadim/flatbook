package flatbook.announcement.search.service;

import flatbook.announcement.dao.CountryDao;
import flatbook.announcement.entity.Country;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {
    @Autowired
    private CountryDao countryDao;

    public List<Country> getAll() {
        return countryDao.findAll();
    }
}

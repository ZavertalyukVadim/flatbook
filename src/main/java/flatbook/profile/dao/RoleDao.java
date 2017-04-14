package flatbook.profile.dao;


import flatbook.profile.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDao extends JpaRepository<Role,Integer>{
}

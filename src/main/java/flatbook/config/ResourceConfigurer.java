package flatbook.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.bind.annotation.CrossOrigin;


@EnableResourceServer
@Configuration
@CrossOrigin
public class ResourceConfigurer extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/").and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/search/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/search/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/announcement/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/announcement").permitAll()
                .antMatchers(HttpMethod.GET, "/api/profile/photo/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/profile/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/announcement").access("hasRole('ROLE_USER')")
                .antMatchers(HttpMethod.DELETE, "/api/announcement/**").access("hasRole('ROLE_USER')")
                .antMatchers(HttpMethod.PUT, "/api/announcement").access("hasRole('ROLE_USER')")
                .antMatchers(HttpMethod.POST, "/api/chat/**").permitAll()
                .antMatchers(HttpMethod.GET,"/api/profile/**").permitAll()
                .antMatchers("/api/profile").access("hasRole('ROLE_USER')")
                .antMatchers("/api/profile/**").access("hasRole('ROLE_USER')")
                .antMatchers("/api/profile").access("hasRole('ROLE_USER')")
                .antMatchers("/**").permitAll();
    }

}
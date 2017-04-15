package flatbook.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.social.connect.ConnectionFactoryLocator;
import org.springframework.social.connect.UsersConnectionRepository;
import org.springframework.social.connect.mem.InMemoryUsersConnectionRepository;
import org.springframework.social.connect.web.ProviderSignInController;
import org.springframework.web.bind.annotation.CrossOrigin;

@EnableResourceServer
@Configuration
@CrossOrigin
public class ResourceConfigurer extends ResourceServerConfigurerAdapter {
    @Autowired
    private ConnectionFactoryLocator connectionFactoryLocator;

    @Autowired
    private UsersConnectionRepository usersConnectionRepository;

    @Autowired
    private FacebookConnectionSignup facebookConnectionSignup;


    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/announcement").access("hasRole('ROLE_USER')")
                .antMatchers(HttpMethod.DELETE, "/api/announcement/**").access("hasRole('ROLE_USER')")
                .antMatchers(HttpMethod.PUT, "/api/announcement").access("hasRole('ROLE_USER')")
                .antMatchers(HttpMethod.GET, "/api/announcement").permitAll()
                .antMatchers(HttpMethod.POST, "/api/profile").permitAll()
                .antMatchers( "/api/profile").access("hasRole('ROLE_USER')")
                .antMatchers( "/api/profile/**").access("hasRole('ROLE_USER')")
                .antMatchers("/api/profile").access("hasRole('ROLE_USER')")
                .antMatchers("/**").permitAll().and();
    }

    @Bean
    public ProviderSignInController providerSignInController() {
        ((InMemoryUsersConnectionRepository) usersConnectionRepository).setConnectionSignUp(facebookConnectionSignup);
        return new ProviderSignInController(connectionFactoryLocator, usersConnectionRepository, new FacebookSignInAdapter());
    }
}
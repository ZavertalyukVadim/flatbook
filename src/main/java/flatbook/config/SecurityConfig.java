package flatbook.config;

import flatbook.profile.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService()).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic();
        http.csrf().disable();
        http.formLogin()
                .usernameParameter("Username")
                .passwordParameter("Password");
        http.logout().invalidateHttpSession(true).logoutSuccessUrl("/");
        http.authorizeRequests()
//                .antMatchers("/announcement").authenticated()
                .antMatchers("/profile/**").authenticated()
                .antMatchers("/**").permitAll();
        http.exceptionHandling()
                .authenticationEntryPoint(unauthorizedEntryPoint());
    }

    @Bean
    public AuthenticationEntryPoint unauthorizedEntryPoint() {
        return (request, response, authException)
                -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailService();
    }
}

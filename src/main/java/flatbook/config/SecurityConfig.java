package flatbook.config;

import flatbook.profile.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserDetailService userDetailsService;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder builder) throws Exception {
        builder
                .userDetailsService(userDetailsService)
                .passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic()
            .and()
                .csrf().disable()
                .formLogin()
                .loginProcessingUrl("/api/login")
                .defaultSuccessUrl("/", true)
                .usernameParameter("Username")
                .passwordParameter("Password")
            .and()
                .logout()
                .logoutUrl("/api/logout")
                .invalidateHttpSession(true)
                .logoutSuccessUrl("/");
        http
                .authorizeRequests()
//                .antMatchers("/announcement").authenticated()
                .antMatchers("/api/profile/**").authenticated()
                .antMatchers("/**").permitAll();
        http.exceptionHandling()
                .authenticationEntryPoint(unauthorizedEntryPoint());
    }

    @Bean
    public AuthenticationEntryPoint unauthorizedEntryPoint() {
        return (request, response, authException)
                -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }
}

//package flatbook.config;
//
//import flatbook.profile.service.CustomUserDetailService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.AuthenticationEntryPoint;
//import org.springframework.security.web.session.SessionManagementFilter;
//
//import javax.servlet.http.HttpServletResponse;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//    private final CustomUserDetailService userDetailsService;
////    private final CustomUsernamePasswordAuthenticationProvider customUsernamePasswordAuthenticationProvider;
//
//    @Autowired
//    public SecurityConfig(CustomUserDetailService userDetailsService) {
//        this.userDetailsService = userDetailsService;
////        this.customUsernamePasswordAuthenticationProvider = customUsernamePasswordAuthenticationProvider;
//    }
//
//    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder builder) throws Exception {
//        builder
//                .userDetailsService(userDetailsService)
//                .passwordEncoder(new BCryptPasswordEncoder());
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//            .httpBasic().and()
//            .addFilterBefore(new CORSFilter(), SessionManagementFilter.class)
//            .csrf().disable()
//            .formLogin().permitAll()
//            .loginProcessingUrl("/api/login")
//            .defaultSuccessUrl("/", true)
//            .usernameParameter("username")
//            .passwordParameter("password")
//            .failureForwardUrl("/")
//        .and()
//            .logout().permitAll()
//            .logoutUrl("/api/logout")
//            .invalidateHttpSession(true)
//            .logoutSuccessUrl("/")
//        .and()
//            .authorizeRequests()
////                .antMatchers("/announcement").authenticated()
//            .antMatchers("/api/profile/**").authenticated()
//            .antMatchers("/**").permitAll()
//        .and()
//            .exceptionHandling()
//            .authenticationEntryPoint(unauthorizedEntryPoint());
//    }
//
//    @Bean
//    public AuthenticationEntryPoint unauthorizedEntryPoint() {
//        return (request, response, authException)
//                -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
//    }
//
////    @Override
////    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
////        auth.authenticationProvider(customUsernamePasswordAuthenticationProvider);
////    }
//}

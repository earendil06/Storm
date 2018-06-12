package com.pastorm.stormapi;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;

//@Component
//@Order(Ordered.HIGHEST_PRECEDENCE)
public class CORSFilter /*implements Filter */{

    /*@Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", "*");
        //response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
        //response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
    }

    @Override
    public void init(FilterConfig filterConfig) {}

    @Override
    public void destroy() {}*/

}
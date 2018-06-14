package com.pastorm.stormapi.configuration;

import com.pastorm.accessors.Accessor;
import com.pastorm.accessors.LocalAccessor;
import com.pastorm.accessors.ServerAccessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class AccessorConfiguration {

    @Bean
    @Profile("production")
    public Accessor serverAccessor() {
        return new ServerAccessor();
    }

    @Bean
    @Profile("dev")
    public Accessor localAccessor() {
        return new LocalAccessor();
    }
}

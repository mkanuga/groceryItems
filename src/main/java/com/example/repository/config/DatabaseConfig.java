package com.example.repository.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.util.Properties;

import javax.sql.DataSource;


/**
 * @author root
 *
 */
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = DatabaseConfig.REPOSITORY_PACKAGE,
        entityManagerFactoryRef = DatabaseConfig.ENTITY_MANAGER_FACTORY
)
public class DatabaseConfig {
    public static final String REPOSITORY_PACKAGE = "com.example.repository";
    public static final String ENTITY_MANAGER_FACTORY = "entityManagerFactory";
    public static final String PERSISTENCE_UNIT_NAME = "groceryPersistenceUnit";
    public static final String TRANSACTION_MANAGER = "transactionManager";

    private Logger logger = LoggerFactory.getLogger(getClass());
    
    @Value("${spring.datasource.driverClassName}")
    private String dbDriver;

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;  

    @Value("${spring.jpa.dbDialect}")
    private String dbDialect;


    @Bean
    DataSource dataSource() {
        logger.info("Configuring Database datasource.");
        final Properties props = new Properties();
        props.put("driverClassName", dbDriver);
        props.put("jdbcUrl", dbUrl);
        props.put("username", dbUsername);
        props.put("password", dbPassword);
        HikariConfig hc = new HikariConfig(props);
        return new HikariDataSource(hc);       
        
    }

    @Bean
    LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
        factoryBean.setDataSource(dataSource());
        factoryBean.setJpaVendorAdapter(getJpaVendorAdapter());
        factoryBean.setPersistenceUnitName(PERSISTENCE_UNIT_NAME);
        factoryBean.setPackagesToScan(REPOSITORY_PACKAGE + ".entity");

        return factoryBean;
    }

    /*
     * Provider specific adapter.
     */
    @Bean
    public JpaVendorAdapter getJpaVendorAdapter() {
        HibernateJpaVendorAdapter jpaVendorAdapter = new HibernateJpaVendorAdapter();
        setJpaProperties(jpaVendorAdapter);

        return jpaVendorAdapter;
    }

    @Bean
    PlatformTransactionManager transactionManager() {
        return new JpaTransactionManager(entityManagerFactory().getObject());
    }

    @Bean
    public PersistenceExceptionTranslationPostProcessor exceptionTranslation(){
        return new PersistenceExceptionTranslationPostProcessor();
    }

    /*
     * Specify any provider specific properties.
     *
     * @param jpaVendorAdapter
     */
    private void setJpaProperties(HibernateJpaVendorAdapter jpaVendorAdapter) {
        jpaVendorAdapter.setGenerateDdl(false);
        jpaVendorAdapter.setShowSql(true);
        jpaVendorAdapter.getJpaPropertyMap().put("hibernate.default_schema", "public");
        jpaVendorAdapter.setDatabasePlatform(dbDialect);
        
    }

}

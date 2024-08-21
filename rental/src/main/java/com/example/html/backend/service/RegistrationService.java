package com.example.html.backend.service;

import com.example.html.backend.entity.RegistrationEntity;
import com.example.html.backend.pojo.RegistrationPojo;
import java.util.List;
import java.util.Optional;

public interface RegistrationService {
    void saveData(RegistrationPojo registrationPojo);
    RegistrationPojo findUserByEmail(String email);
    boolean authenticateUser(String email, String password);
    List<RegistrationEntity> getAllRegistrations();
    Optional<RegistrationEntity> getRegistrationsById(Integer id);
    void deleteRegistration(Integer id);
}

//package com.example.html.backend.controller;
//
//import com.example.html.backend.pojo.RegistrationPojo;
//import com.example.html.backend.service.RegistrationService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/login")
//@RequiredArgsConstructor
//public class LoginController {
//
//
//    private final RegistrationService registrationService;
//    @PostMapping("/authenticate")
//    public ResponseEntity<String> authenticateUser(@RequestBody RegistrationPojo loginRequest) {
//        //for admin
//        String adminUsername = "admin@gmail.com";
//        String adminPassword = "Admin@123";
//
//        if (loginRequest.getEmail().equals(adminUsername) && loginRequest.getPassword().equals(adminPassword)) {
//            return ResponseEntity.ok("Admin login successful!");
//        }
//
//        RegistrationPojo user = registrationService.findUserByEmail(loginRequest.getEmail());
//        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
//            return ResponseEntity.ok("Login successful!");
//        }
//
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
//
//    }
//}
//

package com.example.html.backend.controller;

import com.example.html.backend.pojo.RegistrationPojo;
import com.example.html.backend.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final RegistrationService registrationService;

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, Object>> authenticateUser(@RequestBody RegistrationPojo loginRequest) {
        Map<String, Object> response = new HashMap<>();

        // For admin login
        String adminUsername = "admin@gmail.com";
        String adminPassword = "Admin@123";

        if (loginRequest.getEmail().equals(adminUsername) && loginRequest.getPassword().equals(adminPassword)) {
            response.put("message", "Admin login successful!");
            return ResponseEntity.ok(response);
        }

        // For regular user login
        RegistrationPojo user = registrationService.findUserByEmail(loginRequest.getEmail());
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            response.put("userId", user.getId()); // Include userId in response
            response.put("message", "Login successful!");
            return ResponseEntity.ok(response);
        }

        // If authentication fails
        response.put("message", "Invalid username or password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

}


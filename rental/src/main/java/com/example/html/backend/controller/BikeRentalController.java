package com.example.html.backend.controller;

import com.example.html.backend.entity.BikeRentalEntity;
import com.example.html.backend.pojo.BikeRentalPojo;
import com.example.html.backend.service.BikeRentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bikes")
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://127.0.0.1:5173")
public class BikeRentalController {

    private final BikeRentalService bikeRentalService;

    @PostMapping("/add")
    public void rentBike( @ModelAttribute BikeRentalPojo bikeRental) throws IOException {
        bikeRentalService.saveBikeRental(bikeRental);
    }

    @PutMapping("/bike/{id}")
    public ResponseEntity<String> updateBag(@ModelAttribute @PathVariable("id") Integer id, @ModelAttribute BikeRentalPojo bikeRentalPojo) {
        try {
            bikeRentalPojo.setId(id);
            bikeRentalService.updateBike(bikeRentalPojo);
            return ResponseEntity.ok("Bike updated successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error updating bike: " + e.getMessage());
        }
    }

    @GetMapping("/addlist")
    public List<BikeRentalEntity> getAllBikeRentals() {
        return bikeRentalService.getAllBikeRentals();
    }

    @GetMapping("/addlist/{id}")
    public Optional<BikeRentalEntity> getBikeRentalById(@PathVariable Integer id) {
        return bikeRentalService.getBikeRentalById(id);
    }

    @DeleteMapping("/addlist/{id}")
    public void deleteBikeRental(@PathVariable Integer id) {
        bikeRentalService.deleteBikeRental(id);
    }
}

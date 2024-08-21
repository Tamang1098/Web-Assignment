package com.example.html.backend.controller;

import com.example.html.backend.entity.BikeBookingEntity;
import com.example.html.backend.pojo.BikeBookingPojo;
import com.example.html.backend.service.BikeBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bike")
@RequiredArgsConstructor
public class BikeBookingController {
    private final BikeBookingService bikeBookingService;

    @PostMapping("/bikebooking")
    public ResponseEntity<Void> bookBike(@RequestBody BikeBookingPojo bikeBook) {
        bikeBookingService.saveBikeBooking(bikeBook);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // Return 201 Created
    }

    @GetMapping("/rentals")
    public ResponseEntity<List<BikeBookingEntity>> getAllBikeBooking() {
        List<BikeBookingEntity> bookings = bikeBookingService.getAllBikeBooking();
        return ResponseEntity.ok(bookings); // Return 200 OK with list of bookings
    }

    @GetMapping("/rentals/{id}")
    public ResponseEntity<BikeBookingEntity> getBikeBookingById(@PathVariable Integer id) {
        Optional<BikeBookingEntity> booking = bikeBookingService.getBikeBookingById(id);
        return booking.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build()); // Return 404 Not Found if not present
    }

    @DeleteMapping("/rentals/{id}")
    public ResponseEntity<Void> deleteBikeBooking(@PathVariable Integer id) {
        if (bikeBookingService.getBikeBookingById(id).isPresent()) {
            bikeBookingService.deleteBikeBooking(id);
            return ResponseEntity.noContent().build(); // Return 204 No Content if successfully deleted
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 Not Found if not present
        }
    }
}

package com.example.html.backend.service;

import com.example.html.backend.entity.BikeBookingEntity;
import com.example.html.backend.pojo.BikeBookingPojo;
import java.util.List;
import java.util.Optional;

public interface BikeBookingService {
    void saveBikeBooking(BikeBookingPojo bikeBookingPojo);
    List<BikeBookingEntity> getAllBikeBooking();
    Optional<BikeBookingEntity> getBikeBookingById(Integer id);
    void deleteBikeBooking(Integer id);
}

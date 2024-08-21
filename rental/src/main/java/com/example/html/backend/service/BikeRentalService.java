package com.example.html.backend.service;

import com.example.html.backend.entity.BikeRentalEntity;
import com.example.html.backend.pojo.BikeRentalPojo;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface BikeRentalService {
    void saveBikeRental(BikeRentalPojo bikeRentalPojo) throws IOException;
    void updateBike(BikeRentalPojo bikeRentalPojo) throws IOException;
    List<BikeRentalEntity> getAllBikeRentals();
    Optional<BikeRentalEntity> getBikeRentalById(Integer id);
    void deleteBikeRental(Integer id);
}

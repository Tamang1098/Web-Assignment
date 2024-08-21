package com.example.html.backend.pojo;

import java.time.LocalDateTime;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BikeBookingPojo {
    private Integer id;
    private Integer bikeId;
    private Integer userId;
    private LocalDateTime rentalStartdateTime;
    private LocalDateTime rentalEnddateTime;
    private Double totalAmount;
}

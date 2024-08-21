package com.example.html.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "Bike Booking")
@Getter
@Setter
public class BikeBookingEntity {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "parameter_setup_seq_gen")
    @SequenceGenerator(name = "parameter_setup_seq_gen", sequenceName = "parameters_setup_seq", allocationSize = 1)
    @Id
    private Integer id;

    @Column(name = "rental_start_date_time")
    private LocalDateTime rentalStartdateTime;


    @Column(name = "rental_end_date_time")
    private LocalDateTime rentalEnddateTime;

    @Column(name="total_amount")
    private Double totalAmount;


//    @ManyToOne(fetch = FetchType.LAZY)
     @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Bike_Id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "foreign_key_bike_details_id"))
    private BikeRentalEntity Bike_Adding;

//    @ManyToOne(fetch = FetchType.LAZY)
     @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "User_Id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "foreign_key_user_details_id"))
    private RegistrationEntity Registration;
}

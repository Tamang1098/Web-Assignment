package com.example.html.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "Bike_Adding")
@Getter
@Setter
public class BikeRentalEntity {
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bike_seq_gen")
    @SequenceGenerator(name = "bike_seq_gen", sequenceName = "bike_seq", allocationSize = 1)
    @Id
    private Integer id;

    @Column(name = "bike_brand")
    private String bikeBrand;

    @Column(name = "Seat")
    private Integer seat;

    @Column(name = "Price")
    private Integer price;

    @Column(name = "bikeimage")
    private String bikeImage;

}

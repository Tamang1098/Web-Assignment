package com.example.html.backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BikeRentalPojo {
    private Integer id;
    private String bikeBrand;
    private Integer seat;
    private Integer price;
    private MultipartFile bikeImage;
}

package com.example.html.backend.pojo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerFeedbackPojo {
    private Integer id;
    private String suggestions;
    private String rate_Website;
    private String convenience;
}

package com.example.perfumeshop.dto.review;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Data
public class ReviewRequest {

    private Long perfumeId;

    @NotBlank(message = "Please check your name")
    private String author;

    @NotBlank(message = "Please check the message")
    private String message;

    @Min(value = 1, message = "Choose perfume rating")
    private Integer rating;
}

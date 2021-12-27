package com.example.perfumeshop.dto.perfume;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class PerfumeRequest {

    private Long id;
    private String filename;

    @NotBlank(message = "Please check perfume name")
    @Length(max = 255)
    private String perfumeTitle;

    @NotBlank(message = "Please check perfume category")
    @Length(max = 255)
    private String perfumer;

    @NotNull(message = "Please check the production date")
    private Integer year;

    @NotBlank(message = "Please check the place of manufacture")
    @Length(max = 255)
    private String country;

    @NotBlank(message = "Please check the gender of the perfume")
    @Length(max = 255)
    private String perfumeGender;

    @NotNull(message = "Please check product price")
    private Integer price;

    @NotBlank(message = "Please check the volume")
    @Length(max = 255)
    private String volume;

    @NotBlank(message = "Please check the type of perfume")
    @Length(max = 255)
    private String type;
}
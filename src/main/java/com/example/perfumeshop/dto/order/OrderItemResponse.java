package com.example.perfumeshop.dto.order;

import com.example.perfumeshop.dto.perfume.PerfumeResponse;
import lombok.Data;

@Data
public class OrderItemResponse {

    private Long id;
    private Long amount;
    private Long quantity;
    private PerfumeResponse perfume;
}

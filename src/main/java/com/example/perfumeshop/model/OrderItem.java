package com.example.perfumeshop.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_item_seq")
    @SequenceGenerator(name = "order_item_seq", sequenceName = "order_item_seq", initialValue = 12, allocationSize = 1)
    private Long id;
    private Long amount;
    private Long quantity;

    @OneToOne
    private Perfume perfume;
}

package com.example.perfumeshop.service.impl;

import com.example.perfumeshop.model.Order;
import com.example.perfumeshop.model.OrderItem;
import com.example.perfumeshop.model.Perfume;
import com.example.perfumeshop.repository.OrderItemRepository;
import com.example.perfumeshop.repository.OrderRepository;
import com.example.perfumeshop.repository.PerfumeRepository;
import com.example.perfumeshop.service.OrderService;
import com.example.perfumeshop.service.email.MailSender;
import graphql.schema.DataFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final PerfumeRepository perfumeRepository;
    private final MailSender mailSender;

    @Override
    public List<Order> findAll() {
        return orderRepository.findAllByOrderByIdAsc();
    }

    @Override
    public DataFetcher<List<Order>> getAllOrdersByQuery() {
        return dataFetchingEnvironment -> orderRepository.findAllByOrderByIdAsc();
    }

    @Override
    public DataFetcher<List<Order>> getUserOrdersByEmailQuery() {
        return dataFetchingEnvironment -> {
            String email = dataFetchingEnvironment.getArgument("email").toString();
            return orderRepository.findOrderByEmail(email);
        };
    }

    @Override
    public List<Order> findOrderByEmail(String email) {
        return orderRepository.findOrderByEmail(email);
    }

    @Override
    @Transactional
    public Order postOrder(Order validOrder, Map<Long, Long> perfumesId) {
        Order order = new Order();
        List<OrderItem> orderItemList = new ArrayList<>();

        for (Map.Entry<Long, Long> entry : perfumesId.entrySet()) {
            Perfume perfume = perfumeRepository.findById(entry.getKey()).get();
            OrderItem orderItem = new OrderItem();
            orderItem.setPerfume(perfume);
            orderItem.setAmount((perfume.getPrice() * entry.getValue()));
            orderItem.setQuantity(entry.getValue());
            orderItemList.add(orderItem);
            orderItemRepository.save(orderItem);
        }
        order.getOrderItems().addAll(orderItemList);
        order.setTotalPrice(validOrder.getTotalPrice());
        order.setFirstName(validOrder.getFirstName());
        order.setLastName(validOrder.getLastName());
        order.setCity(validOrder.getCity());
        order.setAddress(validOrder.getAddress());
        order.setPostIndex(validOrder.getPostIndex());
        order.setEmail(validOrder.getEmail());
        order.setPhoneNumber(validOrder.getPhoneNumber());
        orderRepository.save(order);

        String subject = "Order #" + order.getId();
        String template = "order-template";
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("order", order);
        mailSender.sendMessageHtml(order.getEmail(), subject, template, attributes);
        return order;
    }

    @Override
    @Transactional
    public List<Order> deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId).get();
        order.getOrderItems().forEach(orderItem -> orderItemRepository.deleteById(orderItem.getId()));
        orderRepository.delete(order);
        return orderRepository.findAllByOrderByIdAsc();
    }
}
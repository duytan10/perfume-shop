package com.example.perfumeshop.mapper;

import com.example.perfumeshop.dto.RegistrationRequest;
import com.example.perfumeshop.dto.perfume.PerfumeResponse;
import com.example.perfumeshop.dto.review.ReviewRequest;
import com.example.perfumeshop.dto.user.UserRequest;
import com.example.perfumeshop.dto.user.UserResponse;
import com.example.perfumeshop.model.Review;
import com.example.perfumeshop.model.User;
import com.example.perfumeshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final ModelMapper modelMapper;
    private final PerfumeMapper perfumeMapper;
    private final UserService userService;

    private User convertToEntity(UserRequest userRequest) {
        return modelMapper.map(userRequest, User.class);
    }

    User convertToEntity(RegistrationRequest registrationRequest) {
        return modelMapper.map(registrationRequest, User.class);
    }

    private Review convertToEntity(ReviewRequest reviewRequest) {
        return modelMapper.map(reviewRequest, Review.class);
    }

    UserResponse convertToResponseDto(User user) {
        return modelMapper.map(user, UserResponse.class);
    }

    public UserResponse findUserById(Long userId) {
        return convertToResponseDto(userService.findUserById(userId));
    }

    public UserResponse findUserByEmail(String email) {
        return convertToResponseDto(userService.findUserByEmail(email));
    }

    public List<PerfumeResponse> getCart(List<Long> perfumesIds) {
        return perfumeMapper.convertListToResponseDto(userService.getCart(perfumesIds));
    }

    public List<UserResponse> findAllUsers() {
        return userService.findAllUsers()
                .stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }

    public UserResponse updateProfile(String email, UserRequest userRequest) {
        return convertToResponseDto(userService.updateProfile(email, convertToEntity(userRequest)));
    }

    public PerfumeResponse addReviewToPerfume(ReviewRequest reviewRequest, Long perfumeId) {
        return perfumeMapper.convertToResponseDto(userService.addReviewToPerfume(convertToEntity(reviewRequest), perfumeId));
    }
}
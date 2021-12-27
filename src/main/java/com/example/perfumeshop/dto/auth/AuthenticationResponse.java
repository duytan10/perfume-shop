package com.example.perfumeshop.dto.auth;

import lombok.Data;

@Data
public class AuthenticationResponse {

    private String email;
    private String token;
    private String userRole;
}

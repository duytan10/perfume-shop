package com.example.perfumeshop.service;

import com.example.perfumeshop.model.User;
import com.example.perfumeshop.security.oauth2.OAuth2UserInfo;

import java.util.Map;

public interface AuthenticationService {

    Map<String, String> login(String email);

    boolean registerUser(User user);

    User registerOauth2User(String provider, OAuth2UserInfo oAuth2UserInfo);

    User updateOauth2User(User user, String provider, OAuth2UserInfo oAuth2UserInfo);

    boolean activateUser(String code);

    User findByPasswordResetCode(String code);

    boolean sendPasswordResetCode(String email);

    String passwordReset(String email, String password);
}

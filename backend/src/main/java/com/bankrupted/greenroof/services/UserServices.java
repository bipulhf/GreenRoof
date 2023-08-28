package com.bankrupted.greenroof.services;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import com.bankrupted.greenroof.entity.User;
import com.bankrupted.greenroof.repository.UserRepository;

@Service
public class UserServices {

    private final UserRepository userRepository;

    public UserServices(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(User user) {
        LocalDate currentTime = LocalDate.now();
        user.setCreatedAt(currentTime);
        userRepository.save(user);
    }

    public void createUser(String firstName, String lastName, String email, String username, String password,
            String city,
            byte[] profilePhoto) {
        LocalDate currentTime = LocalDate.now();
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setUsername(username);
        user.setPassword(password);
        user.setCity(city);
        user.setProfilePhoto(profilePhoto);
        user.setCreatedAt(currentTime);
        userRepository.save(user);
    }

}

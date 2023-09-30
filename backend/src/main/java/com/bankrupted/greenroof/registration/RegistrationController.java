package com.bankrupted.greenroof.registration;

import com.bankrupted.greenroof.registration.event.RegistrationCompleteEvent;
import com.bankrupted.greenroof.registration.event.listener.RegistrationCompleteEventListener;
import com.bankrupted.greenroof.registration.password.PasswordRequestUtil;
import com.bankrupted.greenroof.security.token.VerificationToken;
import com.bankrupted.greenroof.security.token.repository.VerificationTokenRepository;
import com.bankrupted.greenroof.user.entity.RoleType;
import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.user.service.UserService;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/registration")
public class RegistrationController {

    private final UserService userService;
    private final ApplicationEventPublisher publisher;
    private final VerificationTokenRepository tokenRepository;
    private final RegistrationCompleteEventListener eventListener;
    private final HttpServletRequest servletRequest;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest registrationRequest,
            final HttpServletRequest request) {
        registrationRequest.setRole(RoleType.USER);
        registrationRequest.setProfilePhoto("https://res.cloudinary.com/du7dquv4j/image/upload/v1695749251/dnt0mj8ahslxiksglnxv.png");
        User user = userService.registerUser(registrationRequest);

        publisher.publishEvent(new RegistrationCompleteEvent(user,
                applicationUrl(request)));
        return new ResponseEntity<>("Registration Success!  Please, check your email for to complete your registration",
                HttpStatus.CREATED);
    }

    @GetMapping("/verifyEmail")
    public ResponseEntity<?> sendVerificationToken(@RequestParam("token") String token) {

        String url = applicationUrl(servletRequest) + "/api/v1/registration/resend-verification-token?token="
                + token;
        
        VerificationToken theToken = tokenRepository.findByToken(token);
        if (theToken.getUser().isEnabled()) {
            return new ResponseEntity<>("This account has already been verified, please, login.", HttpStatus.CONFLICT);
        }
        String verificationResult = userService.validateToken(token);
        if (verificationResult.equalsIgnoreCase("valid")) {
            return new ResponseEntity<>("Email verified successfully. Now you can login to your account",
                    HttpStatus.CREATED);
        }
        return new ResponseEntity<>(
                "Invalid verification link, <a href=\"" + url + "\"> Get a new verification link. </a>",
                HttpStatus.FORBIDDEN);
    }

    @GetMapping("/resend-verification-token")
    public ResponseEntity<?> resendVerificationToken(@RequestParam("token") String oldToken,
            final HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        VerificationToken verificationToken = userService.generateNewVerificationToken(oldToken);
        User theUser = verificationToken.getUser();
        resendRegistrationVerificationTokenEmail(theUser, applicationUrl(request), verificationToken);
        return new ResponseEntity<>("A new verification link has been sent to your email," +
                " please, check to activate your account", HttpStatus.OK);
    }

    private void resendRegistrationVerificationTokenEmail(User theUser, String applicationUrl,
            VerificationToken verificationToken) throws MessagingException, UnsupportedEncodingException {
        String url = applicationUrl + "/api/v1/registration/verifyEmail?token=" + verificationToken.getToken();
        eventListener.sendVerificationEmail(url);
    }

    @PostMapping("/password-reset-request")
    public ResponseEntity<?> resetPasswordRequest(@RequestBody PasswordRequestUtil passwordRequestUtil,
            final HttpServletRequest servletRequest)
            throws MessagingException, UnsupportedEncodingException {

        Optional<User> user = userService.findByEmail(passwordRequestUtil.getEmail());
        String passwordResetUrl = "";
        if (user.isPresent()) {
            String passwordResetToken = UUID.randomUUID().toString();
            userService.createPasswordResetTokenForUser(user.get(), passwordResetToken);
            passwordResetUrl = passwordResetEmailLink(user.get(), applicationUrl(servletRequest), passwordResetToken);
        }
        return new ResponseEntity<>(passwordResetUrl, HttpStatus.CREATED);
    }

    private String passwordResetEmailLink(User user, String applicationUrl,
            String passwordToken) throws MessagingException, UnsupportedEncodingException {
        String url = applicationUrl + "/reset-password?token=" + passwordToken;
        eventListener.sendPasswordResetVerificationEmail(user, url);

        return url;
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordRequestUtil passwordRequestUtil,
            @RequestParam("token") String token) {
        String tokenVerificationResult = userService.validatePasswordResetToken(token);
        if (!tokenVerificationResult.equalsIgnoreCase("valid")) {
            return new ResponseEntity<>("Invalid token password reset token", HttpStatus.FORBIDDEN);
        }
        Optional<User> theUser = Optional.ofNullable(userService.findUserByPasswordToken(token));
        if (theUser.isPresent()) {
            userService.changePassword(theUser.get(), passwordRequestUtil.getNewPassword());
            return new ResponseEntity<>("Password has been reset successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Invalid password reset token", HttpStatus.FORBIDDEN);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordRequestUtil requestUtil) {
        User user = userService.findByEmail(requestUtil.getEmail()).get();
        if (!userService.oldPasswordIsValid(user, requestUtil.getOldPassword())) {
            return new ResponseEntity<>("Incorrect old password", HttpStatus.FORBIDDEN);
        }
        userService.changePassword(user, requestUtil.getNewPassword());
        return new ResponseEntity<>("Password changed successfully", HttpStatus.CREATED);
    }

    public String applicationUrl(HttpServletRequest request) {
        return "http://localhost:5173" + request.getContextPath();
    }
}

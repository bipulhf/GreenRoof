package com.bankrupted.greenroof.registration;

import com.bankrupted.greenroof.event.RegistrationCompleteEvent;
import com.bankrupted.greenroof.event.listener.RegistrationCompleteEventListener;
import com.bankrupted.greenroof.registration.password.PasswordRequestUtil;
import com.bankrupted.greenroof.token.VerificationToken;
import com.bankrupted.greenroof.token.VerificationTokenRepository;
import com.bankrupted.greenroof.user.User;
import com.bankrupted.greenroof.user.UserService;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/registration/")
public class RegistrationController {

    private final UserService userService;
    private final ApplicationEventPublisher publisher;
    private final VerificationTokenRepository tokenRepository;
    private final RegistrationCompleteEventListener eventListener;
    private final HttpServletRequest servletRequest;

    @PostMapping("/register")
    public String registerUser(@RequestBody RegistrationRequest registrationRequest, final HttpServletRequest request) {
        User user = userService.registerUser(registrationRequest);

        publisher.publishEvent(new RegistrationCompleteEvent(user,
                applicationUrl(request)));
        return "Registration Success!  Please, check your email for to complete your registration";
    }

    @GetMapping("/verifyEmail")
    public String sendVerificationToken(@RequestParam("token") String token) {

        String url = applicationUrl(servletRequest) + "/api/v1/registration/resend-verification-token?token="
                + token;

        VerificationToken theToken = tokenRepository.findByToken(token);
        if (theToken.getUser().isEnabled()) {
            return "This account has already been verified, please, login.";
        }
        String verificationResult = userService.validateToken(token);
        if (verificationResult.equalsIgnoreCase("valid")) {
            return "Email verified successfully. Now you can login to your account";
        }
        return "Invalid verification link, <a href=\"" + url + "\"> Get a new verification link. </a>";
    }

    @GetMapping("/resend-verification-token")
    public String resendVerificationToken(@RequestParam("token") String oldToken,
            final HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        VerificationToken verificationToken = userService.generateNewVerificationToken(oldToken);
        User theUser = verificationToken.getUser();
        resendRegistrationVerificationTokenEmail(theUser, applicationUrl(request), verificationToken);
        return "A new verification link has been sent to your email," +
                " please, check to activate your account";
    }

    private void resendRegistrationVerificationTokenEmail(User theUser, String applicationUrl,
            VerificationToken verificationToken) throws MessagingException, UnsupportedEncodingException {
        String url = applicationUrl + "/api/v1/registration/verifyEmail?token=" + verificationToken.getToken();
        eventListener.sendVerificationEmail(url);
    }

    @PostMapping("/password-reset-request")
    public String resetPasswordRequest(@RequestBody PasswordRequestUtil passwordRequestUtil,
            final HttpServletRequest servletRequest)
            throws MessagingException, UnsupportedEncodingException {

        Optional<User> user = userService.findByEmail(passwordRequestUtil.getEmail());
        String passwordResetUrl = "";
        if (user.isPresent()) {
            String passwordResetToken = UUID.randomUUID().toString();
            userService.createPasswordResetTokenForUser(user.get(), passwordResetToken);
            passwordResetUrl = passwordResetEmailLink(user.get(), applicationUrl(servletRequest), passwordResetToken);
        }
        return passwordResetUrl;
    }

    private String passwordResetEmailLink(User user, String applicationUrl,
            String passwordToken) throws MessagingException, UnsupportedEncodingException {
        String url = applicationUrl + "/api/v1/registration/reset-password?token=" + passwordToken;
        eventListener.sendPasswordResetVerificationEmail(url);

        return url;
    }

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody PasswordRequestUtil passwordRequestUtil,
            @RequestParam("token") String token) {
        String tokenVerificationResult = userService.validatePasswordResetToken(token);
        if (!tokenVerificationResult.equalsIgnoreCase("valid")) {
            return "Invalid token password reset token";
        }
        Optional<User> theUser = Optional.ofNullable(userService.findUserByPasswordToken(token));
        if (theUser.isPresent()) {
            userService.changePassword(theUser.get(), passwordRequestUtil.getNewPassword());
            return "Password has been reset successfully";
        }
        return "Invalid password reset token";
    }

    @PostMapping("/change-password")
    public String changePassword(@RequestBody PasswordRequestUtil requestUtil) {
        User user = userService.findByEmail(requestUtil.getEmail()).get();
        if (!userService.oldPasswordIsValid(user, requestUtil.getOldPassword())) {
            return "Incorrect old password";
        }
        userService.changePassword(user, requestUtil.getNewPassword());
        return "Password changed successfully";
    }

    public String applicationUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":"
                + request.getServerPort() + request.getContextPath();
    }
}

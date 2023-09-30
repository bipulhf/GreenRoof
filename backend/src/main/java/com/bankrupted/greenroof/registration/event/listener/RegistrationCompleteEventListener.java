package com.bankrupted.greenroof.registration.event.listener;

import com.bankrupted.greenroof.registration.event.RegistrationCompleteEvent;
import com.bankrupted.greenroof.user.entity.User;
import com.bankrupted.greenroof.user.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {
    private final UserService userService;
    private final JavaMailSender mailSender;
    private User theUser;

    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        // 1. Get the newly registered user
        theUser = event.getUser();
        // 2. Create a verification token for the user
        String verificationToken = UUID.randomUUID().toString();
        // 3. Save the verification token for the user
        userService.saveUserVerificationToken(theUser, verificationToken);
        // 4 Build the verification url to be sent to the user
        String url = event.getApplicationUrl() + "/login?verifyEmail=" + verificationToken;
        // 5. Send the email.
        try {
            sendVerificationEmail(url);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        log.info("Click the link to verify your registration :  {}", url);
    }

    public void sendVerificationEmail(String url) throws MessagingException, UnsupportedEncodingException {
        String subject = "GreenRoof: Email Verification";
        String senderName = "GreenRoof";
        String mailContent = "<p> Hi, " + theUser.getFirstName() + "! </p>" +
                "<p>Thank you for registering with us. " + "" +
                "Please, follow the link below to complete your registration.</p>" +
                "<a href=\"" + url + "\">Verify your email to activate your account</a>" +
                "<p> Thank You! <br> GreenRoof";
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom("bankrupted.greenroof@gmail.com", senderName);
        messageHelper.setTo(theUser.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message);
    }

    public void sendPasswordResetVerificationEmail(User user, String url)
            throws MessagingException, UnsupportedEncodingException {
        String subject = "GreenRoof: Password Reset Request Verification";
        String senderName = "GreenRoof";
        String mailContent = "<p> Hi, " + user.getFirstName() + "! </p>" +
                "<p><b> A Password reset request was sent to us by you.</b>" + "" +
                "Please, follow the link below to reset your password.</p>" +
                "<a href=\"" + url + "\">Reset password</a>" +
                "<p> GreenRoof";
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom("bankrupted.greenroof@gmail.com", senderName);
        messageHelper.setTo(user.getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message);
    }
}
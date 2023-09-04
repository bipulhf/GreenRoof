package com.bankrupted.greenroof.registration.mail;

import com.bankrupted.greenroof.event.RegistrationCompleteEvent;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.io.UnsupportedEncodingException;

@RequiredArgsConstructor
public class RegistrationMailSender {
    private final JavaMailSender mailSender;
    private final RegistrationCompleteEvent event;

    public void sendVerificationEmail(String url) throws MessagingException, UnsupportedEncodingException {

        String subject = "Email Verification";
        String senderName = "GreenRoof";
        String mailContent = "<p> Hi, " + event.getUser().getFirstName() + ", </p>" +
                "<p>Thank you for registering with us." + "" +
                "Please, follow the link below to complete your registration.</p>" +
                "<a href=\"" + url + "\">Verify your email to activate your account</a>" +
                "<p> Thank you <br> GreenRoof";
        MimeMessage message = mailSender.createMimeMessage();
        var messageHelper = new MimeMessageHelper(message);
        messageHelper.setFrom("bankrupted.greenroof@gmail.com", senderName);
        messageHelper.setTo(event.getUser().getEmail());
        messageHelper.setSubject(subject);
        messageHelper.setText(mailContent, true);
        mailSender.send(message);
    }
}

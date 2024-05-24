package com.manhphuong.nestecom.service;

import com.manhphuong.nestecom.model.MailStructure;

public interface MailService {
    void sendEmail(String receiveEmail, MailStructure mailStructure);
}

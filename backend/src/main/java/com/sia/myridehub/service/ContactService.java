package com.sia.myridehub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sia.myridehub.exception.ResourceNotFoundException;
import com.sia.myridehub.model.ContactMessage;
import com.sia.myridehub.model.dto.ContactRequestDto;
import com.sia.myridehub.repository.ContactRepository;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public ContactMessage saveContactMessage(ContactRequestDto requestDto) {
        ContactMessage contactMessage = new ContactMessage();
        contactMessage.setFullName(requestDto.getFullName());
        contactMessage.setEmail(requestDto.getEmail());
        contactMessage.setMessage(requestDto.getMessage());
        return contactRepository.save(contactMessage);
    }

    public List<ContactMessage> getAllContactMessages() {
        return contactRepository.findAll();
    }

    public ContactMessage getContactMessageById(Long id) {
        return contactRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Contact message not found with id: " + id));
    }

    public void deleteContactMessage(Long id) {
        ContactMessage message = getContactMessageById(id);
        contactRepository.delete(message);
    }
}
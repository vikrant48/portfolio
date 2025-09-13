import { Injectable } from '@angular/core';

export interface ContactMessage {
  name: string;
  email: string;
  mobile?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly formspreeUrl = 'https://formspree.io/f/xzzvwndg';

  constructor() {}

  /**
   * Submit a new contact message to Google Sheets via Formspree
   * @param messageData The contact form data
   * @returns Promise<boolean> indicating success
   */
  async submitMessage(messageData: ContactMessage): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('name', messageData.name);
      formData.append('email', messageData.email);
      formData.append('mobile', messageData.mobile || '');
      formData.append('message', messageData.message);
      formData.append('timestamp', new Date().toLocaleString());
      formData.append('source', 'Angular Portfolio');

      const response = await fetch(this.formspreeUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Message sent to Google Sheets successfully');
        return true;
      } else {
        const errorData = await response.json();
        console.error('Formspree error:', errorData);
        return false;
      }
    } catch (error) {
      console.error('Message submission error:', error);
      return false;
    }
  }

  /**
   * Alternative method using fetch with form-encoded data
   * @param messageData The contact form data
   * @returns Promise<boolean> indicating success
   */
  async submitMessageFormEncoded(messageData: ContactMessage): Promise<boolean> {
    try {
      const params = new URLSearchParams();
      params.append('name', messageData.name);
      params.append('email', messageData.email);
      params.append('mobile', messageData.mobile || '');
      params.append('message', messageData.message);
      params.append('timestamp', new Date().toLocaleString());
      params.append('source', 'Angular Portfolio');

      const response = await fetch(this.formspreeUrl, {
        method: 'POST',
        body: params,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.ok) {
        console.log('Message sent to Google Sheets successfully (form-encoded)');
        return true;
      } else {
        const errorData = await response.json();
        console.error('Formspree error (form-encoded):', errorData);
        return false;
      }
    } catch (error) {
      console.error('Message submission error (form-encoded):', error);
      return false;
    }
  }
}
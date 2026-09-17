import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../../services/ai.service';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    provider?: string;
    statusMessage?: string;
}

@Component({
    selector: 'app-ai-chat',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './ai-chat.component.html',
    styleUrl: './ai-chat.component.css'
})
export class AiChatComponent {
    @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

    isOpen = false;
    userInput = '';
    isLoading = false;
    messages: Message[] = [
        { role: 'assistant', content: "Hi! I'm Vikrant's AI Assistant. Ask me anything about his skills, projects, or experience!" }
    ];

    constructor(private aiService: AiService) { }


    toggleChat() {
        this.isOpen = !this.isOpen;
        if (!this.isOpen) {
            // Reset chat when closed
            this.messages = [
                { role: 'assistant', content: "Hi! I'm Vikrant's AI Assistant. Ask me anything about his skills, projects, or experience!" }
            ];
        }
    }

    sendMessage() {
        if (!this.userInput.trim() || this.isLoading) return;

        const userMsg = this.userInput.trim();
        this.messages.push({ role: 'user', content: userMsg });
        this.userInput = '';
        this.isLoading = true;
        this.scrollToBottom();

        this.aiService.sendMessage(this.messages).subscribe({
            next: (response) => {
                const assistantMsg = response.choices[0].message.content;
                this.messages.push({
                    role: 'assistant',
                    content: assistantMsg,
                    provider: response.provider,
                    statusMessage: response.statusMessage
                });
                this.isLoading = false;
                this.scrollToBottom();
            },
            error: (err) => {
                console.error('AI Error:', err);
                this.messages.push({
                    role: 'assistant',
                    content: 'Sorry, I encountered an error connecting to the AI Assistant. Please check your backend connection or API key settings.'
                });
                this.isLoading = false;
                this.scrollToBottom();
            }
        });
    }

    private scrollToBottom(): void {
        setTimeout(() => {
            try {
                this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
            } catch (err) { }
        }, 100);
    }
}

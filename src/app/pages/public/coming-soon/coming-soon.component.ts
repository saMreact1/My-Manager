import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('1s 0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class ComingSoonComponent implements OnInit {
  messages = [
    'Building something magical...',
    'Real-time task updates...',
    'Better productivity, powered by Angular.',
  ];
  currentMessage = '';
  messageIndex = 0;

  countdown: any = {};

  ngOnInit(): void {
    this.animateTyping();
    this.startCountdown(new Date('2025-07-01T00:00:00'));
  }

  animateTyping() {
    this.currentMessage = '';
    const fullText = this.messages[this.messageIndex];
    let i = 0;

    const interval = setInterval(() => {
      this.currentMessage += fullText[i];
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          this.messageIndex = (this.messageIndex + 1) % this.messages.length;
          this.animateTyping();
        }, 2000);
      }
    }, 50);
  }

  startCountdown(launchDate: Date) {
    setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      this.countdown = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    }, 1000);
  }
}

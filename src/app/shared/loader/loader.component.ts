import { ChangeDetectorRef, Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../core/loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  // loading$ = this.loaderService.loading$
  loading = false;
  apiCallSubscription!: Subscription;

  constructor(
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const cssRule = 'color: #E70000;' +
      'font-size: 17px;' +
      'text-align: center' +
      'font-weight: bold;' +
      'text-shadow: 1px 1px 5px #E70000);' +
      'filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);';
    setTimeout(console.info.bind(console, '%cX-Path Teller (ADELEKE SAMUEL)', cssRule), 0);

    setTimeout(() => {
      this.apiCallSubscription = this.loaderService.isLoading.subscribe((isLoading: boolean) => {
        this.loading = isLoading;
        if (isLoading) {
          this.disableUserInput();
        } else {
          this.enableUserInput();
        }
      });
    }, 0);
  }

  // Disable keyboard and mouse events
  @HostListener('keydown', ['$event'])
  @HostListener('mousedown', ['$event'])

  disableInputEvents(event: KeyboardEvent | MouseEvent) {
    if (this.loading) {
      event.preventDefault();
      event.stopPropagation();
      this.cdRef.detectChanges();
    }
  }

  disableUserInput() {
    // Add a class to the document body to prevent scrolling
    document.body.classList.add('no-scroll');
  }

  enableUserInput() {
    // Remove the class to enable scrolling again
    document.body.classList.remove('no-scroll');
  }

  ngOnDestroy() {
     // Check if the subscription is defined before unsubscribing
     if (this.apiCallSubscription) {
      this.apiCallSubscription.unsubscribe();
    }
  }
}

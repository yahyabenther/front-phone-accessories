import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.component.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('phone-accessories');
}
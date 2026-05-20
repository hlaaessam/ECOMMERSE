import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss',
})
export class NotfoundComponent {
  // Floating particles data — randomised positions, delays, sizes
  particles = Array.from({ length: 18 }, (_, i) => ({
    delay: `${(i * 0.35).toFixed(2)}s`,
    x: `${Math.floor((i * 37 + 11) % 80)}`,
    size: `${4 + (i % 5)}`,
  }));
}

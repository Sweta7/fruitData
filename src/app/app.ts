import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FruitList } from './fruit-list/fruit-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FruitList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'fruitData';
}

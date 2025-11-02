import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../modules/header/header';
import { Footer } from '../../modules/footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,Header,Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}

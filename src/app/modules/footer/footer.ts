import { Component } from '@angular/core';
import { NgFor } from '@angular/common'; 

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor],                
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  year: number = new Date().getFullYear();

  social = [
    { name: 'Instagram', href: 'https://instagram.com/huellitas', icon: 'instagram' },
    { name: 'Facebook',  href: 'https://facebook.com/huellitas',  icon: 'facebook'  },
    { name: 'TikTok',    href: 'https://www.tiktok.com/@huellitas', icon: 'tiktok'  }
  ];
}

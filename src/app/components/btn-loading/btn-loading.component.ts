import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn-loading.component.html',
  styleUrl: './btn-loading.component.css'
})
export class BtnLoadingComponent implements OnInit {
  @Input('loading') loading: boolean = false;
  @Input('btnClass') btnClass: string = '';
  @Input('loadingText') loadingText = 'Please wait';
  @Input('type') type: 'button' | 'submit' = 'submit';

  constructor() { }

  ngOnInit(): void {

  }
}

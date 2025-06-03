import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fruit-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fruit-list.html',
  styleUrls: ['./fruit-list.css'],
})
export class FruitList implements OnInit {
  fruitList: any[] = [];
  selectedFruits: number[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getFruitData();
  }

  getFruitData() {
    this.http
      .get<any[]>('https://www.fruityvice.com/api/fruit/all')
      .subscribe((data) => {
        this.fruitList = data;
        console.log('Fruit data loaded:', data);
        console.log('Length:', this.fruitList.length);
        this.cdr.detectChanges();
      });
  }

  toggleSelection(fruitId: number) {
    const index = this.selectedFruits.indexOf(fruitId);
    if (index === -1) {
      this.selectedFruits.push(fruitId);
    } else {
      this.selectedFruits.splice(index, 1);
    }
    console.log('Selected fruits:', this.selectedFruits);
  }

  saveSelectedFruits() {
    if (this.selectedFruits.length === 0) {
      alert('Please select at least one fruit');
      return;
    }

    const selectedFruitData = this.fruitList.filter((fruit) =>
      this.selectedFruits.includes(fruit.id)
    );

    const blob = new Blob([JSON.stringify(selectedFruitData, null, 2)], {
      type: 'application/json',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'selected-fruits.json';
    link.click();
    URL.revokeObjectURL(link.href);
  }
}

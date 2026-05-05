import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Brand } from '../../models/Brand.model';
import { BrandService } from '../../services/brand-service';
@Component({
  selector: 'app-brand-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './brand-component.html',
  styleUrl: './brand-component.scss',
})
export class BrandComponent  implements OnInit {
  brands: Brand[] = [];
  selected: Brand | null = null;
  form: Brand = { name: '' };
  isEditing = false;
  showForm = false;
 
  constructor(private brandService: BrandService) {}
 
  ngOnInit(): void {
    this.loadAll();
  }
 
  loadAll(): void {
    this.brandService.getAll().subscribe(data => this.brands = data);
  }
 
  openForm(): void {
    this.showForm = true;
  }
 
  edit(brand: Brand): void {
    this.isEditing = true;
    this.form = { ...brand };
    this.selected = brand;
    this.showForm = true;
  }
 
  save(): void {
    if (!this.form.name.trim()) return;
    if (this.isEditing && this.selected?.id) {
      this.brandService.update(this.selected.id, this.form).subscribe(() => {
        this.loadAll();
        this.reset();
      });
    } else {
      this.brandService.create(this.form).subscribe(() => {
        this.loadAll();
        this.reset();
      });
    }
  }
 
  delete(id: number): void {
    if (confirm('Delete this brand?')) {
      this.brandService.delete(id).subscribe(() => this.loadAll());
    }
  }
 
  reset(): void {
    this.form = { name: '' };
    this.isEditing = false;
    this.selected = null;
    this.showForm = false;
  }
}

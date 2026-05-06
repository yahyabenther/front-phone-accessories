import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Brand } from '../../models/Brand.model';
import { BrandService } from '../../services/brand-service';

@Component({
  selector: 'app-brand-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './brand-component.html',
  styleUrl: './brand-component.scss',
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];

  showForm = false;
  submitted = false;

  message = '';
  messageType: 'success' | 'error' | '' = '';

  brandToDelete: Brand | null = null;
  selected: Brand | null = null;

  form: Brand = {
    name: ''
  };

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.brandService.getAll().subscribe({
      next: data => this.brands = data,
      error: () => this.showMessage('Failed to load brands', 'error')
    });
  }

  openForm(): void {
    this.showForm = true;
    this.submitted = false;
    this.brandToDelete = null;
    this.selected = null;
    this.form = {
      name: ''
    };
  }

  edit(brand: Brand): void {
    this.showForm = true;
    this.submitted = false;
    this.brandToDelete = null;
    this.selected = brand;
    this.form = { ...brand };
  }

  reset(): void {
    this.showForm = false;
    this.submitted = false;
    this.selected = null;
    this.form = {
      name: ''
    };
  }

  save(): void {
    this.submitted = true;

    if (!this.form.name.trim()) {
      return;
    }

    const payload: Brand = {
      name: this.form.name.trim()
    };

    if (this.form.id) {
      this.brandService.update(this.form.id, payload).subscribe({
        next: () => {
          this.showMessage('Brand updated successfully', 'success');
          this.reset();
          this.loadAll();
        },
        error: () => this.showMessage('Failed to update brand', 'error')
      });
    } else {
      this.brandService.create(payload).subscribe({
        next: () => {
          this.showMessage('Brand added successfully', 'success');
          this.reset();
          this.loadAll();
        },
        error: () => this.showMessage('Failed to add brand', 'error')
      });
    }
  }

  openDeleteModal(brand: Brand): void {
    this.brandToDelete = brand;
  }

  cancelDelete(): void {
    this.brandToDelete = null;
  }

  confirmDelete(): void {
    if (!this.brandToDelete?.id) return;

    this.brandService.delete(this.brandToDelete.id).subscribe({
      next: () => {
        this.showMessage('Brand deleted successfully', 'success');
        this.brandToDelete = null;
        this.loadAll();
      },
      error: () => this.showMessage('Failed to delete brand', 'error')
    });
  }

  showMessage(text: string, type: 'success' | 'error'): void {
    this.message = text;
    this.messageType = type;

    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 4000);
  }
}
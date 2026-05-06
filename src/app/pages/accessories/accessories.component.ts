import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Accessory } from '../../models/accessory.model';
import { Category } from '../../models/category.model';
import { Brand } from '../../models/Brand.model';

import { AccessoryService } from '../../services/accessory.service';
import { CategoryService } from '../../services/category.service';
import { BrandService } from '../../services/brand-service';

@Component({
  selector: 'app-accessories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accessories.component.html',
  styleUrl: './accessories.component.scss'
})
export class AccessoriesComponent implements OnInit {

  accessories: Accessory[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];

  showForm = false;
  submitted = false;

  message = '';
  messageType: 'success' | 'error' | '' = '';

  selectedCategoryId = 0;
  selectedBrandId = 0;

  filterCategoryId = 0;
  filterBrandId = 0;

  accessoryToDelete: Accessory | null = null;

  form: Accessory = {
    name: '',
    price: 0,
    stock: 0
  };

  constructor(
    private accessoryService: AccessoryService,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.loadAccessories();
    this.loadCategories();
    this.loadBrands();
  }

  loadAccessories(): void {
    this.accessoryService.getAll().subscribe({
      next: data => this.accessories = data,
      error: () => this.showMessage('Failed to load accessories', 'error')
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: data => this.categories = data,
      error: () => this.showMessage('Failed to load categories', 'error')
    });
  }

  loadBrands(): void {
    this.brandService.getAll().subscribe({
      next: data => this.brands = data,
      error: () => this.showMessage('Failed to load brands', 'error')
    });
  }

  applyFilter(): void {
    const categoryId = this.filterCategoryId || undefined;
    const brandId = this.filterBrandId || undefined;

    this.accessoryService.filter(categoryId, brandId).subscribe({
      next: data => this.accessories = data,
      error: () => this.showMessage('Failed to filter accessories', 'error')
    });
  }

  resetFilter(): void {
    this.filterCategoryId = 0;
    this.filterBrandId = 0;
    this.loadAccessories();
  }

  openAddForm(): void {
    this.showForm = true;
    this.submitted = false;
    this.accessoryToDelete = null;
    this.selectedCategoryId = 0;
    this.selectedBrandId = 0;

    this.form = {
      name: '',
      price: 0,
      stock: 0
    };
  }

  onEdit(accessory: Accessory): void {
    this.showForm = true;
    this.submitted = false;
    this.accessoryToDelete = null;

    this.form = { ...accessory };
    this.selectedCategoryId = accessory.category?.id || 0;
    this.selectedBrandId = accessory.brand?.id || 0;
  }

  onCancel(): void {
    this.showForm = false;
    this.submitted = false;
    this.selectedCategoryId = 0;
    this.selectedBrandId = 0;

    this.form = {
      name: '',
      price: 0,
      stock: 0
    };
  }

  onSave(): void {
    this.submitted = true;

    if (
      !this.form.name.trim() ||
      this.form.price < 0 ||
      this.form.stock < 0 ||
      !this.selectedCategoryId ||
      !this.selectedBrandId
    ) {
      return;
    }

    const payload: Accessory = {
      name: this.form.name.trim(),
      price: this.form.price,
      stock: this.form.stock,
      category: { id: this.selectedCategoryId, name: '' },
      brand: { id: this.selectedBrandId, name: '' }
    };

    if (this.form.id) {
      this.accessoryService.update(
        this.form.id,
        payload,
        this.selectedCategoryId,
        this.selectedBrandId
      ).subscribe({
        next: () => {
          this.showMessage('Accessory updated successfully', 'success');
          this.onCancel();
          this.applyFilter();
        },
        error: () => this.showMessage('Failed to update accessory', 'error')
      });
    } else {
      this.accessoryService.create(payload).subscribe({
        next: () => {
          this.showMessage('Accessory added successfully', 'success');
          this.onCancel();
          this.applyFilter();
        },
        error: () => this.showMessage('Failed to add accessory', 'error')
      });
    }
  }

  openDeleteModal(accessory: Accessory): void {
    this.accessoryToDelete = accessory;
  }

  cancelDelete(): void {
    this.accessoryToDelete = null;
  }

  confirmDelete(): void {
    if (!this.accessoryToDelete?.id) return;

    this.accessoryService.delete(this.accessoryToDelete.id).subscribe({
      next: () => {
        this.showMessage('Accessory deleted successfully', 'success');
        this.accessoryToDelete = null;
        this.applyFilter();
      },
      error: () => this.showMessage('Failed to delete accessory', 'error')
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
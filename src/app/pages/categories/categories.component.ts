import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  showForm = false;
  submitted = false;

  message = '';
  messageType: 'success' | 'error' | '' = '';

  categoryToDelete: Category | null = null;

  form: Category = {
    name: '',
    description: ''
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: data => this.categories = data,
      error: () => this.showMessage('Failed to load categories', 'error')
    });
  }

  openAddForm(): void {
    this.showForm = true;
    this.submitted = false;
    this.categoryToDelete = null;

    this.form = {
      name: '',
      description: ''
    };
  }

  onEdit(category: Category): void {
    this.showForm = true;
    this.submitted = false;
    this.categoryToDelete = null;

    this.form = { ...category };
  }

  onCancel(): void {
    this.showForm = false;
    this.submitted = false;

    this.form = {
      name: '',
      description: ''
    };
  }

  onSave(): void {
    this.submitted = true;

    if (!this.form.name.trim()) {
      return;
    }

    const payload: Category = {
      name: this.form.name.trim(),
      description: this.form.description?.trim() || ''
    };

    if (this.form.id) {
      this.categoryService.update(this.form.id, payload).subscribe({
        next: () => {
          this.showMessage('Category updated successfully', 'success');
          this.onCancel();
          this.loadCategories();
        },
        error: () => this.showMessage('Failed to update category', 'error')
      });
    } else {
      this.categoryService.create(payload).subscribe({
        next: () => {
          this.showMessage('Category added successfully', 'success');
          this.onCancel();
          this.loadCategories();
        },
        error: () => this.showMessage('Failed to add category', 'error')
      });
    }
  }

  openDeleteModal(category: Category): void {
    this.categoryToDelete = category;
  }

  cancelDelete(): void {
    this.categoryToDelete = null;
  }

  confirmDelete(): void {
    if (!this.categoryToDelete?.id) return;

    this.categoryService.delete(this.categoryToDelete.id).subscribe({
      next: () => {
        this.showMessage('Category deleted successfully', 'success');
        this.categoryToDelete = null;
        this.loadCategories();
      },
      error: () => this.showMessage('Failed to delete category', 'error')
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
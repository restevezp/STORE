import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})


export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
     },
      error => {
        console.log(error);
      }
    );
  }


  updateCategory(category: Category): void {
    const { id, ...categoryToUpdate } = category;

    if (id !== undefined) {
      this.categoryService.updateCategory({ id, ...categoryToUpdate }).subscribe(
        updatedCategory => {
          const index = this.categories.findIndex(c => c.id === updatedCategory.id);
          if (index !== -1) {
            this.categories[index] = updatedCategory;
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  deleteCategory(category: Category): void {
    if (category.id !== undefined) {
      this.categoryService.deleteCategory(category.id).subscribe(
        () => {
          this.categories = this.categories.filter(c => c.id !== category.id);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  mode: 'NEW' | 'UPDATE' = 'NEW';
  categoryId?: number;
  //category?: Category;
  category: Category = new Category(undefined, '', '');

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {


    const entryParam: string = this.route.snapshot.paramMap.get('categoryId') ?? 'new';
    if (entryParam !== 'new') {
      this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
      this.mode = 'UPDATE';
      this.getCategoryById(this.categoryId!);
    } else {
      this.mode = 'NEW';
      this.initializeCategory();
    }
  }

  public saveCategory(): void {
    if (this.mode === 'NEW') {
      this.insertCategory();
    }

    if (this.mode === 'UPDATE') {
      this.updateCategory();
    }
  }

  private insertCategory(): void {
    this.categoryService.insertCategory(this.category!).subscribe({
      next: (categoryInserted) => {
        console.log('Categoría insertada correctamente');
        console.log(categoryInserted);
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  private updateCategory(): void {
    this.categoryService.updateCategory(this.category!).subscribe({
      next: (categoryUpdated) => {
        console.log('Categoría modificada correctamente');
        console.log(categoryUpdated);
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }




  public includeImageInCategory(event: any): void {
    const inputFile = event.target as HTMLInputElement;
    const file: File | null = inputFile.files?.item(0) ?? null;


    this.readFileAsString(file!).then(
      (result) => {
        const imageType: string = this.getImageType(result);
        console.log(imageType);
        const imageBase64: string = this.getImageBase64(result);
        console.log(imageBase64);

        this.category!.image = imageBase64;

      },
      (error) => {
        console.log("No se pudo cargar la imagen")
      })




  }

  private getImageType(imageString: string): string {
    const imageStringParts: string[] = imageString.split(",");
    if (imageStringParts.length == 2) {
      return imageStringParts[0];
    } else {
      return "";
    }
  }

  private getImageBase64(imageString: string): string {
    const imageStringParts: string[] = imageString.split(",");
    if (imageStringParts.length == 2) {
      return imageStringParts[1];
    } else {
      return "";
    }
  }


  private readFileAsString(file: File) {
    return new Promise<string>(function(resolve, reject) {
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = function() {
        resolve(this.result as string)
      }
    })
  }













  private getCategoryById(categoryId: number) {
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (categoryRequest) => {
        this.category = {
          id: categoryRequest.id,
          name: categoryRequest.name,
          description: categoryRequest.description,
          image: categoryRequest.image,
          // asigna otros campos si es necesario
        };
      },
      error: (err) => {
        this.handleError(err);
      }
    });


    // this.categoryService.getCategoryById(categoryId).subscribe({
   //   next: (categoryRequest) => {
   //     this.category = categoryRequest;
   //   },
   //   error: (err) => {
   //     this.handleError(err);
   //   }
   // });
  }

  private initializeCategory(): void {
    this.category = new Category(undefined, '', '');
  }

  private handleError(err: any): void {
    // ToDo
  }
}

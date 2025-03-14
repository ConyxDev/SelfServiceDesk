import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../pages/order-page/interface';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(categories: Category[], category?: Category): Category {
    if (!category) {
      throw new Error('no category')
    }
    const selectedCategory = categories.find((c) => c.uuid === category.uuid)
    if (!selectedCategory) {
      throw new Error('category not found')
    }
    return selectedCategory
  }

}

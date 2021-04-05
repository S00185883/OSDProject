import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { shareReplay } from 'rxjs/operators'
import { uuid } from './uuid';
import { ListsService } from './lists.service';
import{List}from 'src/app/list'
@Injectable({
  providedIn: 'root'
})
export class StoreService {



  constructor(private listsServices: ListsService) {
    this.fetchAll()
  }

  private readonly _lists = new BehaviorSubject<List[]>([]);

  readonly lists$ = this._lists.asObservable();


  readonly completedLists$ = this.lists$.pipe(
    map(lists => lists.filter(list => list.isCompleted))
  )

  readonly uncompletedLists$ = this.lists$.pipe(
    map(lists => lists.filter(list => !list.isCompleted))
  )

  get lists(): List[] {
    return this._lists.getValue();
  }


  // assigning a value to this.lists will push it onto the observable 
  // and down to all of its subsribers (ex: this.lists = [])
  set lists(val: List[]) {
    this._lists.next(val);
  }

  async addlist(ingredient: string) {

    if (ingredient && ingredient.length) {
      const tmpId = uuid();
      const tmplist = { id: tmpId, ingredient, isCompleted: false };
      this.lists = [
        ...this.lists,
        tmplist
      ];

      try {
        const list = await this.listsServices
          .create({ ingredient, isCompleted: false })
          .toPromise();

        // we swap the local tmp record with the record from the server (id must be updated)
        const index = this.lists.indexOf(this.lists.find(t => t.id === tmpId));
        this.lists[index] = {
          ...list
        }
        this.lists = [...this.lists];
      } catch (e) {
        // is server sends back an error, we revert the changes
        console.error(e);
        this.removelist(tmpId, false);
      }

    }

  }

  async removelist(id: string, serverRemove = true) {
    // optimistic update
    const list = this.lists.find(t => t.id === id);
    this.lists = this.lists.filter(list => list.id !== id);

    if (serverRemove) {
      try {
        await this.listsServices.remove(id).toPromise();
      } catch (e) {
        console.error(e);
        this.lists = [...this.lists, list];
      }

    }

  }

  async setCompleted(id: string, isCompleted: boolean) {
    let list = this.lists.find(list => list.id === id);

    if (list) {
      // optimistic update
      const index = this.lists.indexOf(list);

      this.lists[index] = {
        ...list,
        isCompleted
      }

      this.lists = [...this.lists];

      try {
        await this.listsServices
          .setCompleted(id, isCompleted)
          .toPromise();

      } catch (e) {

        console.error(e);
        this.lists[index] = {
          ...list,
          isCompleted: !isCompleted
        }
      }
    }
  }


  async fetchAll() {
    this.lists = await this.listsServices.index().toPromise();
  }

}
import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

// {
  //   state: 'home',
  //   name: 'HOME',
  //   type: 'link',
  //   icon: 'explore'
  // },

const MENUITEMS = [
  {
    state: 'report',
    name: 'REPORTS',
    type: 'link',
    icon: 'content_copy'
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
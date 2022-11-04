export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  name: string;
  icon: string;
  link: string[];
}
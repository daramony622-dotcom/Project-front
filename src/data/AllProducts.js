import { hoodies } from "./hoodies";
import { jeans } from "./jeans";
import { Shirt } from "./shirts";
import { Shoes } from "./shoes";

const productGroups = [
  { category: "Hoodies", items: hoodies },
  { category: "Jackets", items: jeans },
  { category: "Shirts", items: Shirt },
  { category: "Shoes", items: Shoes },
];

export const Allproducts = productGroups.flatMap(({ category, items }) =>
  items.map((item) => ({
    ...item,
    sourceId: item.id,
    menuId: `${category.toLowerCase()}-${item.id}`,
    category,
  })),
);

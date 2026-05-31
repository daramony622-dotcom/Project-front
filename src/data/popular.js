import grayjean from "../assets/images/grayjean.png";
import Suku from "../assets/images/Suku.png";
import Jojo from "../assets/images/Jojo.png";
import Hood from "../assets/images/Hood.png";

const popularProducts = [
	{
		id: 1,
		sourceId: 3,
		menuId: "jackets-3",
		category: "Jackets",
		name: "Gray Denim Jacket",
		img: grayjean,
		description:
			"A trendy gray denim jacket with a relaxed fit and casual style.",
		price: 19.99,
	},
	{
		id: 2,
		sourceId: 6,
		menuId: "shirts-6",
		category: "Shirts",
		name: "Girl Shirt",
		img: Suku,
		description: "A beautiful shirt for girls, perfect for any occasion.",
		price: 12.5,
	},
	{
		id: 3,
		sourceId: 7,
		menuId: "shirts-7",
		category: "Shirts",
		name: "Jojo Shirt",
		img: Jojo,
		description: "A beautiful shirt for girls, perfect for any occasion.",
		price: 12.5,
	},
	{
		id: 4,
		sourceId: 2,
		menuId: "hoodies-2",
		category: "Hoodies",
		name: "Hoodies Sweet",
		img: Hood,
		description: "Soft, stylish hoodie perfect for relaxing or heading out.",
		price: 14.65,
	},
];

export const PopularProducs = popularProducts;

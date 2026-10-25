import type { MenuCategory, MenuItem } from "@/types";
import { images } from "./images";

export const menuCategories: MenuCategory[] = [
  {
    id: "catch",
    label: "Catch of the Day & Lagoon Crab",
    shortLabel: "Catch & Crab",
  },
  {
    id: "curry",
    label: "Signature Rice & Curry",
    shortLabel: "Rice & Curry",
  },
  {
    id: "plant",
    label: "Vegan & Vegetarian",
    shortLabel: "Plant-based",
  },
  {
    id: "breakfast",
    label: "Breakfast & Sambal",
    shortLabel: "Breakfast",
  },
  {
    id: "drinks",
    label: "Cocktails & Ginger Tea",
    shortLabel: "Drinks",
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "crab-curry",
    name: "Puttalam Lagoon Crab Curry",
    description:
      "Sweet lagoon crab simmered in a clay pot with roasted Ceylon spices and coconut milk, cracked at the table and served with rice, daal and garden curries.",
    category: "catch",
    tags: ["Signature", "Catch of the day", "Made to order"],
    image: images.crabCurryFeast,
    note: "The crab comes from the lagoon; the recipe is Nissansala's.",
  },
  {
    id: "fish-of-the-day",
    name: "Fish of the Day, Grilled",
    description:
      "The morning's catch, landed on the beach in front of you, grilled simply with lime, garlic and island herbs.",
    category: "catch",
    tags: ["Catch of the day", "Made to order"],
    image: images.grilledFishPlatter,
    note: "Ask what came in today.",
  },
  {
    id: "lagoon-prawns",
    name: "Grilled Prawns, Crab & Fish",
    description:
      "A sharing platter from the morning boats: jumbo prawns, lagoon crab and the morning's fish, char-grilled with lime and served with yellow rice and golden roast potatoes.",
    category: "catch",
    tags: ["Signature", "Catch of the day", "Made to order"],
    image: images.mixedSeafoodPlatter,
    note: "Best shared as the sun goes down.",
  },
  {
    id: "squid-shellfish",
    name: "Squid & Shellfish",
    description:
      "Whatever the boats bring in—squid, cuttlefish or shellfish—cleaned fresh and cooked to order with garlic, chilli and curry leaves.",
    category: "catch",
    tags: ["Catch of the day", "Made to order"],
    image: images.squidShellfishPlatter,
    note: "Availability changes with the tide.",
  },
  {
    id: "rice-curry-table",
    name: "Nissansala's Rice & Curry Table",
    description:
      "The full spread: sweet-and-sour pineapple curry, potato, pumpkin, aubergine, daal, green beans, sliced cabbage, garlic rice, salad and popadoms.",
    category: "curry",
    tags: ["Signature", "Vegetarian", "Made to order"],
    image: images.riceAndCurryPlate,
    note: "The table the reviews keep coming back to.",
  },
  {
    id: "pineapple-curry",
    name: "Sweet-and-Sour Pineapple Curry",
    description:
      "Pineapple slow-cooked with Ceylon spices, coconut milk and a gentle sweetness—the dish guests ask for by name.",
    category: "curry",
    tags: ["Signature", "Vegan"],
    image: images.dinnerFeastNight,
    note: "A house signature.",
  },
  {
    id: "garden-curries",
    name: "Aubergine, Pumpkin & Potato Curries",
    description:
      "Three garden curries, each tempered separately with mustard seed, curry leaf and roasted spice. Order them together or alongside the crab.",
    category: "curry",
    tags: ["Vegan", "Vegetarian"],
    image: images.curryBanquetNight,
    note: "The selection changes with the garden and the season.",
  },
  {
    id: "daal-beans-cabbage",
    name: "Daal, Beans, Cabbage & Popadoms",
    description:
      "Creamy daal, green beans, sliced cabbage and crisp popadoms—the quiet supporting cast that makes the rice-and-curry table complete.",
    category: "curry",
    tags: ["Vegan", "Vegetarian"],
    image: images.daalBeansCabbage,
  },
  {
    id: "vegan-curry-table",
    name: "The Vegan Curry Table",
    description:
      "Nissansala's full plant-based spread, built from the garden and the spice box: pumpkin, aubergine, potato, daal, beans, cabbage, coconut sambal and rice.",
    category: "plant",
    tags: ["Vegan", "Vegetarian", "Signature"],
    image: images.dinnerTableEvening,
    note: "No meat, no compromise.",
  },
  {
    id: "coconut-sambal",
    name: "Coconut Sambal",
    description:
      "Fresh grated coconut, chilli, lime and curry leaf—made each morning and served with breakfast and curry.",
    category: "plant",
    tags: ["Vegan", "House made"],
    image: images.coconutSambalPlate,
  },
  {
    id: "buffalo-curd",
    name: "Buffalo Curd & Coconut Honey",
    description:
      "Cool buffalo curd, thick coconut honey and a little jaggery—the dessert guests remember from the first spoon.",
    category: "plant",
    tags: ["Vegetarian", "House made"],
    image: images.buffaloCurdBreakfast,
    note: "A classic Sri Lankan finish.",
  },
  {
    id: "island-breakfast",
    name: "Island Breakfast",
    description:
      "Crisp-edged hoppers, yellow egg curry, fiery lunu miris, lentil vadai, rolled pancakes and sweet pani pol—served with fresh fruit, juice and coffee on the sand.",
    category: "breakfast",
    tags: ["Vegetarian", "House made"],
    image: images.sriLankanBreakfast,
    note: "Breakfast is included with select room options.",
  },
  {
    id: "breakfast-by-sea",
    name: "Breakfast by the Sea",
    description:
      "A slower morning: a platter of watermelon, papaya, pineapple, banana and lime, fresh juice, eggs or hoppers, and espresso or ginger tea while the boats come home.",
    category: "breakfast",
    tags: ["Vegetarian", "Cooling"],
    image: images.tropicalFruitPlatter,
    note: "Start early if you are heading out with the dolphins.",
  },
  {
    id: "fermented-cocktail",
    name: "Homemade Fermented Fruit Cocktail",
    description:
      "Maduka's father ferments the fruit himself, then mixes a house cocktail that is bright, cold and stronger than it looks.",
    category: "drinks",
    tags: ["House made", "Sunset"],
    image: images.beachCocktail,
    note: "A family recipe, made in small batches.",
  },
  {
    id: "ginger-tea",
    name: "Espresso, Ginger Tea & Fresh Juice",
    description:
      "Freshly pulled espresso, hot ginger tea, Sri Lankan coffee and fresh lime—the drinks that keep long lunches and dolphin mornings company.",
    category: "drinks",
    tags: ["Vegetarian", "Cooling"],
    image: images.breakfastOnTheSand,
    note: "Fresh juices are squeezed to order.",
  },
  {
    id: "cold-beer",
    name: "Cold Beer at Sunset",
    description:
      "A cold local beer in an ice bucket on the sand while the boats return and the string lights come on. The simplest sunset on the coast.",
    category: "drinks",
    tags: ["Sunset"],
    image: images.beachBeerBucket,
    note: "Bar items are charged separately.",
  },
];

export const menuHighlights = [
  {
    title: "Vegetarian & vegan",
    copy: "Every vegetable curry is cooked fresh with coconut milk, local herbs and ground spice. Tell Nissansala what you need when you pre-order.",
    icon: "leaf" as const,
  },
  {
    title: "Flowers & incense",
    copy: "For a special evening, the family sets a table on the sand with fresh tropical flowers, incense and the sound of the boats coming home.",
    icon: "flower" as const,
  },
  {
    title: "The hammock wait",
    copy: "Everything is cooked from scratch from 2 PM. If your table is not quite ready, there is a hammock under the palms.",
    icon: "hammock" as const,
  },
];

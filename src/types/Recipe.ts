export type Recipe = {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  caloriesPerServing?: number;
  cookTimeMinutes?: number;
  cuisine?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  ingredients?: string[];
  instructions?: string[];
  mealType?: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  prepTimeMinutes?: number;
  tags?: string[];
};

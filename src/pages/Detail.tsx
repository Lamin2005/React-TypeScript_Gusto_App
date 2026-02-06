import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Recipe } from "../types/Recipe";

function Detail() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { id } = useParams();

  useEffect(() => {
    try {
      const fetchRecipes = async () => {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        const data = await response.json();

        setRecipe(data);
      };
      fetchRecipes();
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  });

  return (
    <section className="max-w-3xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-2xl">
      {recipe ? (
        <div>
          <h1 className="text-3xl font-extrabold mb-4 text-gray-800 tracking-tight">
            {recipe.name}
          </h1>

          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-72 object-cover rounded-xl shadow-md mb-6"
          />

          <div className="flex gap-5 mb-4 text-gray-700">
            <p className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm">
              🍽 Cuisine:{" "}
              <span className="font-semibold">{recipe.cuisine}</span>
            </p>

            {recipe.difficulty && (
              <p className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-sm">
                🎯 Difficulty:{" "}
                <span className="font-semibold">{recipe.difficulty}</span>
              </p>
            )}
          </div>

          {recipe.ingredients && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                🧂 Ingredients
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe.instructions && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                👨‍🍳 Instructions
              </h2>
              <ol className="list-decimal pl-6 space-y-2">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="flex items-center gap-4 mt-4">
            <p className="text-gray-800 font-medium">
              ⭐ Rating:{" "}
              <span className="font-bold text-yellow-600">{recipe.rating}</span>
            </p>

            <p className="text-gray-800">
              📝 Reviews:{" "}
              <span className="font-semibold">{recipe.reviewCount}</span>
            </p>
          </div>

          <Link
            to="/"
            className="inline-block mt-6 px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      ) : (
        <p className="text-center text-gray-500 animate-pulse">
          Loading recipe details...
        </p>
      )}
    </section>
  );
}

export default Detail;

import { useEffect } from "react";
import { useState } from "react";
import type { Recipe } from "../types/Recipe";

function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  useEffect(() => {
    try {
      const fetchRecipes = async () => {
        const response = await fetch(
          `https://dummyjson.com/recipes?limit=${recipesPerPage}&skip=${(currentPage - 1) * recipesPerPage}`,
        );
        const data = await response.json();

        setRecipes(data.recipes);
      };
      fetchRecipes();
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, [currentPage]);

  console.log(recipes);

  return (
    <section className="p-5">
      {recipes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
                  <p className="text-gray-500 text-sm">
                    {" "}
                    {recipe.rating} stars ({recipe.reviewCount} reviews)
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-5">
            <button
              className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Prev
            </button>

            <span className="px-4 py-2">Page {currentPage}</span>

            <button
              className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
              onClick={() => setCurrentPage((prev) => prev == 9 ?  prev : prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">Loading recipes...</p>
      )}
    </section>
  );
}

export default Home;

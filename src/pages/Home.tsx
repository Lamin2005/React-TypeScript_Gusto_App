import { useEffect } from "react";
import { useState } from "react";
import type { Recipe } from "../types/Recipe";
import { Link } from "react-router-dom";

function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const recipesPerPage = 6;

  const totalPages = Math.ceil(totalRecipes / recipesPerPage);

  useEffect(() => {
    const fetchRecipes = async () => {
      const skip = (currentPage - 1) * recipesPerPage;
      const isSearching = query.trim() !== "";

      const url = isSearching
        ? `https://dummyjson.com/recipes/search?q=${query}&limit=${recipesPerPage}&skip=${skip}`
        : `https://dummyjson.com/recipes?limit=${recipesPerPage}&skip=${skip}`;

      const response = await fetch(url);
      const data = await response.json();

      const resultRecipes = data.recipes || data.results;

      setRecipes(resultRecipes);
      setTotalRecipes(data.total);
    };

    fetchRecipes();
  }, [currentPage, query]);

  console.log(recipes);

  const handleSearch = (search: string) => {
    setQuery(search);
    setCurrentPage(1);
  };

  return (
    <section className="p-5">
      {recipes.length > 0 ? (
        <>
          <div className="w-full flex justify-center mt-3 mb-5">
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-md border w-full max-w-md">
              <input
                type="text"
                placeholder="Search recipes..."
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                onClick={() => handleSearch(searchText)}
              >
                {" "}
                Search{" "}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Link to={`/recipes/${recipe.id}`}>
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
              </Link>
            ))}
          </div>

          <div className="flex gap-3 mt-5">
            <button
              className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Prev
            </button>

            <span className="px-4 py-2">
              Page {currentPage} / {totalPages}
            </span>

            <button
              className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">Loading recipes ...</p>
      )}
    </section>
  );
}

export default Home;

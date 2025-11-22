import { useState } from "react";
import Spinner from "./Spinner";
import Recipe from "./Recipe";
import { sendIngredient } from "../recipe.js"; // this now calls POST /get-recipe

function GetRecipe({ onSubmit }) {
  return (
    <form
      className="get-recipe"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <h4>هل انت جاهز لوصفة جديدة؟</h4>
        <p>سنقوم باعداد وصفة جديدة من المكونات المتوفرة</p>
      </div>
      <button type="submit">الحصول علي وصفة</button>
    </form>
  );
}

function WaitRecipe() {
  return (
    <div className="get-recipe">
      <div>
        <h4>اختيار رائع للمكونات</h4>
        <p>نقوم بالعمل علي تجهيز وصفة مميزة لك, برجاء الانتظار...</p>
      </div>
      <Spinner />
    </div>
  );
}

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");

  const ingredientsList = ingredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  async function sendIngredientList() {
    setLoading(true);
    const r = await sendIngredient(ingredients); // sends POST with { items: [...] }
    setRecipe(r); // store the recipe in state
    setLoading(false);
  }

  function addGredient(formData) {
    const newIngredient = formData.get("ingredient");
    if (newIngredient && !ingredients.includes(newIngredient))
      setIngredients((ingredients) => [...ingredients, newIngredient]);
  }

  return (
    <main>
      {/* Ingredient input form */}
      <form
        className="add"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          addGredient(formData);
          e.target.reset();
        }}
      >
        <input type="text" placeholder="مثال. صلصة حارة" name="ingredient" />
        <button type="submit">اضافة مكون</button>
      </form>

      {/* Ingredient list */}
      {ingredients.length > 0 && (
        <div className="body">
          <h2>المكونات المتوفرة</h2>
          <ul className="ing-list">{ingredientsList}</ul>
        </div>
      )}

      {/* Get recipe button */}
      {ingredients.length > 2 && !loading && (
        <GetRecipe onSubmit={sendIngredientList} />
      )}

      {/* Loading + recipe */}
      {loading && <WaitRecipe />}
      {recipe && !loading && <Recipe recipe={recipe} />}
    </main>
  );
}

import axios from "axios";

export async function sendIngredient(ingredients) {
  try {
    const res = await axios.post(
      "https://chief-ai-production.up.railway.app/get-recipe",
      {
        items: ingredients,   // MUST match the backend model
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.recipe;

  } catch (error) {
    console.error("Error sending ingredients", error);
    return "⚠️ حدث خطأ أثناء ارسال المكونات";
  }
}

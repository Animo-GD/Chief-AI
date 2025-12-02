import axios from "axios";

export async function sendIngredient(ingredients) {
  try {
    const res = await axios.post("https://chief-ai-production.up.railway.app/get-recipe", {
      items: ingredients,
    });
    return res.data.recipe; // return recipe string
  } catch (error) {
    console.error("Error sending ingredients", error);
    return "⚠️ حدث خطأ أثناء ارسال المكونات";
  }
}

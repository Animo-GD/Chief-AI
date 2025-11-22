import axios from "axios";

export async function sendIngredient(ingredients) {
  try {
    const res = await axios.post("http://127.0.0.1:8000/get-recipe", {
      items: ingredients,
    });
    return res.data.recipe; // return recipe string
  } catch (error) {
    console.error("Error sending ingredients", error);
    return "⚠️ حدث خطأ أثناء ارسال المكونات";
  }
}

import { supabase } from "./supabase"; // Make sure path matches

export async function saveGameProgress(gameName, shellsEarned) {
  try {
    // 1. Check who is playing (Get logged-in parent)
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("No parent logged in.");

    // 2. Find their linked child profile
    const { data: childData, error: childError } = await supabase
      .from("children")
      .select("id")
      .eq("parent_id", user.id)
      .single();

    if (childError || !childData) throw new Error("Child profile missing.");

    // 3. Deposit the shells into the progress table!
    const { error: insertError } = await supabase
      .from("progress")
      .insert([
        {
          child_id: childData.id.toString(), // Your DB uses varchar for this
          game: gameName,
          shells: shellsEarned
        }
      ]);

    if (insertError) throw insertError;

    console.log(`Successfully saved ${shellsEarned} shells for ${gameName}!`);
    return { success: true };
    
  } catch (error) {
    console.error("Failed to save progress:", error.message);
    return { success: false, error: error.message };
  }
}
export const processAuthorImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch("https://booktailor.com/api/remove-background", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to process author image.");
    }

    const data = await response.json();
    return data.data.processed_url; // URL обробленого зображення
  } catch (error) {
    console.error("Error processing author image:", error);
    throw error;
  }
};

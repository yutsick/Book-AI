export const drawTemplate1 = async (ctx, canvas, data) => {
  const { selectedTopic, authorName, authorImage } = data;
  console.log("Canvas size:", canvas.width, canvas.height);
  console.log("Data received:", data);
  
  // Фон
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Текст
  ctx.font = "bold 40px Arial";
  ctx.fillStyle = "#2b2b2b";
  ctx.textAlign = "center";
  ctx.fillText(selectedTopic || "Default Title", canvas.width / 2, 200);

  ctx.font = "italic 30px Times New Roman";
  ctx.fillStyle = "#555";
  ctx.fillText(authorName || "Default Author", canvas.width / 2, 400);

  // Зображення
  if (authorImage) {
    const img = new Image();
    img.src = authorImage instanceof File ? URL.createObjectURL(authorImage) : authorImage;

    await new Promise((resolve, reject) => {
      img.onload = () => {
        ctx.drawImage(img, 150, 500, 300, 300);
        resolve();
      };
      img.onerror = () => reject(`Failed to load image: ${img.src}`);
    });
  }
};

export const drawTemplate2 = async (ctx, canvas, data) => {
  const { selectedTopic, subtitle, authorName, authorImage } = data;

  // Завантаження фону
  const background = new Image();
  background.src = `/templates/template2_front.png`;

  await new Promise((resolve, reject) => {
    background.onload = resolve;
    background.onerror = () => reject(`Failed to load background image: ${background.src}`);
  });


  // Малювання фону
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Тема книги
  ctx.font = "bold 32px 'Comic Sans MS'";
  ctx.fillStyle = "#293887";
  ctx.textAlign = "center";
  ctx.fillText(selectedTopic || "Default Title", canvas.width / 2, 80);

  // Підзаголовок
  ctx.font = "italic 20px 'Comic Sans MS'";
  ctx.fillStyle = "#293887";
  ctx.fillText(subtitle || "Default Subtitle", canvas.width / 2, 120);

  // Зображення автора
  if (authorImage) {
    const img = new Image();
    img.src = authorImage instanceof File ? URL.createObjectURL(authorImage) : authorImage;

    await new Promise((resolve, reject) => {
      img.onload = () => {
        
       
        
        // Малювання зображення
        const imgX = canvas.width / 2 - 150;
        const imgY = 150;
        const imgWidth = 300;
        const imgHeight = 300;

        // Нахил
        ctx.save();
        ctx.translate(imgX + imgWidth / 2, imgY + imgHeight / 2);
        ctx.rotate((-10 * Math.PI) / 180);
        ctx.translate(-(imgX + imgWidth / 2), -(imgY + imgHeight / 2));

        // Малюємо білий фон для ефекту полароїда
        ctx.fillStyle = "#fff";
        ctx.fillRect(imgX - 10, imgY - 10, imgWidth + 20, imgHeight + 20);
        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);

        ctx.restore();
        resolve();
      };
      img.onerror = () => reject(`Failed to load author image: ${img.src}`);
    });
  }

  // Ім'я автора
  ctx.font = "24px 'Comic Sans MS'";
  ctx.fillStyle = "#293887";
  ctx.textAlign = "center";
  ctx.fillText(authorName || "Default Author", canvas.width / 2, 480);

  // Приклеєні елементи
  ctx.fillStyle = "#d1a9a0"; // Колір стрічки
  ctx.fillRect(canvas.width / 2 - 200, 140, 80, 30); // Лівий верхній кут
  ctx.fillRect(canvas.width / 2 + 120, 140, 80, 30); // Правий верхній кут

  
};

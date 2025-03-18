const DB_NAME = "BookTailorDB";
const STORE_NAME = "images";

// Відкриваємо IndexedDB
const openDB = (STORE_NAME = "images") => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("❌ IndexedDB error");
  });
};

// Збереження зображення в IndexedDB
export const saveImageToDB = async (key, imageFile) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.put(imageFile, key);
  return transaction.complete;
};

// Отримання зображення
export const getImageFromDB = async (key) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject("❌ Error reading IndexedDB");
  });
};

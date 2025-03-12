const updateDraft = async (fieldName, value) => {
  const draftUUID = localStorage.getItem("draftUUID");
  if (!draftUUID) return;

  const payload = {
    uuid: draftUUID,
     [fieldName]: value ,
  };


  try {
    const response = await fetch("https://api.booktailor.com/update-draft", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const res = await response.json();
    if (res.status !== "success") {
      console.error("API Error:", res.message);
    }
  } catch (error) {
    console.error("API call failed:", error);
  }
};

export default updateDraft;

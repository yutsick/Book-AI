import React from "react";

const CoverHTML = ({ topic, subtitle, authorName, authorImage }) => {
  return (
    <div
      id="cover-template"
      style={{
        width: "600px",
        height: "800px",
        background: "#fefaf2",
        position: "relative",
        fontFamily: "'Comic Sans MS', sans-serif",
      }}
    >
      {/* Лінії блокнота */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#d6cfc5",
              position: "absolute",
              top: `${50 * i}px`,
            }}
          ></div>
        ))}
      </div>

      {/* Тема книги */}
      <h1
        style={{
          textAlign: "center",
          color: "#293887",
          fontSize: "32px",
          marginTop: "50px",
        }}
      >
        {topic || "Default Title"}
      </h1>

      {/* Підзаголовок */}
      <p
        style={{
          textAlign: "center",
          color: "#293887",
          fontStyle: "italic",
          fontSize: "20px",
          marginTop: "10px",
        }}
      >
        {subtitle || "Default Subtitle"}
      </p>

      {/* Зображення автора */}
      <div
        style={{
          position: "absolute",
          top: "200px",
          left: "150px",
          width: "300px",
          height: "300px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transform: "rotate(-10deg)",
        }}
      >
        <img
          src={authorImage || "default-author.jpg"}
          alt="Author"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Ім'я автора */}
      <p
        style={{
          textAlign: "center",
          color: "#293887",
          fontSize: "24px",
          marginTop: "550px",
        }}
      >
        {authorName || "Default Author"}
      </p>
    </div>
  );
};

export default CoverHTML;

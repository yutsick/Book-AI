"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import updateDraft from "@/utils/draftUpdater";
import { debounce } from "lodash";

const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const getStoredValue = (key, defaultValue = null) => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      try {
        return saved ? JSON.parse(saved) : defaultValue;
      } catch (error) {
        return defaultValue;
      }
    }
    return defaultValue;
  };

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState("");
  const [generatedBooks, setGeneratedBooks] = useState([]);

  const [genreUpdated, setGenreUpdated] = useState(false);
  const [topicUpdated, setTopicUpdated] = useState(false);

  const debouncedUpdateGenre = useRef(debounce((value) => {
    updateDraft("genre", value);
  }, 500)).current;

  const debouncedUpdateTitle = useRef(debounce((value) => {
    updateDraft("title", value);
  }, 500)).current;

  const debouncedUpdateSubtitle = useRef(debounce((value) => {
    updateDraft("subtitle", value);
  }, 500)).current;

  // Завантаження зі сховища тільки раз при монтуванні
  useEffect(() => {
    setSelectedGenre(getStoredValue("selectedGenre", null));
    setSelectedTopic(getStoredValue("selectedTopic", ""));
    setSelectedSubTopic(getStoredValue("selectedSubTopic", ""));
  }, []);

  // Збереження у сховище тільки після першого завантаження
  useEffect(() => {
    if (selectedGenre !== null) {
      localStorage.setItem("selectedGenre", JSON.stringify(selectedGenre));
      debouncedUpdateGenre(selectedGenre);
    }
  }, [selectedGenre]);

  useEffect(() => {
    if (selectedTopic !== "") {
      localStorage.setItem("selectedTopic", JSON.stringify(selectedTopic));
      debouncedUpdateTitle(selectedTopic);
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (selectedSubTopic !== "") {
      localStorage.setItem("selectedSubTopic", JSON.stringify(selectedSubTopic));
      debouncedUpdateSubtitle(selectedSubTopic);
    }
  }, [selectedSubTopic]);

  useEffect(() => {
    setGenreUpdated(true);
  }, [selectedGenre]);

  useEffect(() => {
    setTopicUpdated(true);
  }, [selectedTopic]);

  useEffect(() => {
    return () => {
      debouncedUpdateGenre.cancel();
      debouncedUpdateTitle.cancel();
      debouncedUpdateSubtitle.cancel();
    };
  }, []);

  return (
    <GenreContext.Provider
      value={{
        selectedGenre,
        setSelectedGenre,
        selectedTopic,
        setSelectedTopic,
        selectedSubTopic,
        setSelectedSubTopic,
        generatedBooks,
        setGeneratedBooks,
        genreUpdated,
        setGenreUpdated,
        topicUpdated,
        setTopicUpdated,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
};

export const useGenre = () => {
  const context = useContext(GenreContext);
  if (!context) {
    throw new Error("useGenre must be used within a GenreProvider");
  }
  return context;
};

export default GenreContext;

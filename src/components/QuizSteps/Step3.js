import React, { useEffect, useState, useContext } from "react";
// import CustomSelect from "@/components/FormsElements/CustomSelect";
import config from "../../../config";
import CustomModalSelect from "@/components/FormsElements/ModalSelect";
import CustomText from "@/components/FormsElements/CustomText";
import CreateBookContext from "@/contexts/CreateBookContext";

import ProgressTracker from "@/components/ProgressTracker/ProgressTracker";

function Step3({ setIsButtonDisabled, setProgressStep, textError }) {

  const {questionsUrl} = config;
  const [questions, setQuestions] = useState(null);

  const { authorName, questionsAndAnswers, addQuestionAndAnswer, removeQuestion } = useContext(CreateBookContext);

  const author = authorName.trim();


    useEffect(() => {
      fetch(questionsUrl)
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data);
        })
        .catch((error) => {
          console.error("Error fetching questions data:", error);
        });
    }, [questionsUrl]);


  useEffect(() => {
    setProgressStep(3);
  }, [setProgressStep]);


  useEffect(() => {
    setIsButtonDisabled(questionsAndAnswers.filter(el => el.answer.length !== 0).length === 0);
    return () => {
      setIsButtonDisabled(false);
    };
  }, [questionsAndAnswers, setIsButtonDisabled]);




  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);


  // const questions = [
  //   {
  //     value: "1",
  //     label: `What does ${author} do?`,
  //     example: "She works as a machine learning engineer at DataCore AI, a company focused on predictive analytics tools for the healthcare industry. Her job revolves around designing algorithms that help doctors make better decisions using patient data.",
  //     tip: "Include the role, company name, industry focus, and a specific project or achievement",
  //     isDisabled: false,
  //   },
  //   {
  //     value: "2",
  //     label: `Where does ${author} live?`,
  //     example: false,
  //     tip: false,
  //     isDisabled: false,
  //   },
  //   {
  //     value: "3",
  //     label: `What are ${author}’s hobbies?`,
  //     example: false,
  //     tip: false,
  //     isDisabled: false,
  //   },
  //   {
  //     value: "4",
  //     label: `Who is ${author}’s family?`,
  //     example: "Mom: Karen Dawson (female, 52) is a history teacher at the local high school. She spends her weekends gardening, especially taking care of her orchids, and watching NCIS. She loves trying to figure out the cases before the characters do.",
  //     tip: "Specify the relationship, name, age, and gender. Add details like job, interests, or hobbies for a personal touch.",
  //     isDisabled: false,
  //   },
  //   {
  //     value: "5",
  //     label: `What are ${author}’s backstories?`,
  //     example: false,
  //     tip: "Share stories about childhood, major life events, memorable moments, or challenges.",
  //     isDisabled: false,
  //   },
  //   {
  //     value: "6",
  //     label: `What’s one thing ${author} really good at?`,
  //     example: false,
  //     tip: false,
  //     isDisabled: false,
  //   },
  //   {
  //     value: "7",
  //     label: `What’s a topic ${author} can talk about for hours without getting bored?`,
  //     example: false,
  //     tip: false,
  //     isDisabled: false,
  //   },
  //   {
  //     value: "8",
  //     label: `What’s something ${author} hilariously bad at?`,
  //     example: false,
  //     tip: false,
  //     isDisabled: false,
  //   },
  //   {
  //     value: "9",
  //     label: `Does ${author} have any funny habits or routines?`,
  //     example: false,
  //     tip: false,
  //     isDisabled: false,
  //   },
  //   {
  //     value: "10",
  //     label: `What’s ${author}’s biggest dream or goal?`,
  //     example: false,
  //     tip: false,
  //     isDisabled: false,
  //   },
  //   {
  //     value: "11",
  //     label: `What are ${author}’s favorite places?`,
  //     example: false,
  //     tip: "Describe what the place is like and how you spend your time there.",
  //     isDisabled: false,
  //   },
  //   {
  //     value: "12",
  //     label: `Who are ${author}’s best friends?`,
  //     example: "Sarah Thompson (30, female) is a graphic designer at a marketing agency. She enjoys hiking and photography. They have been friends since college and often catch up over coffee.",
  //     tip: "Include each friend's name, age, and gender. Add details like job, interests, or hobbies for a personal touch.",
  //     isDisabled: false,
  //   },
  //   {
  //     value: "13",
  //     label: `Who are ${author}’s colleagues?`,
  //     example: false,
  //     tip: "Include their name, gender, and role.",
  //     isDisabled: false,
  //   },
  // ];

  // const handleQuestionSelectChange = (option) => {
  //   if (!questionsAndAnswers.some((qa) => qa.question === option.label)) {
  //     addQuestionAndAnswer(option.label, "");
  //   }
  // };

  const handleQuestionSelectChange = (option) => {
    if (!questionsAndAnswers.some((qa) => qa.value === option.value)) {
      addQuestionAndAnswer(option.value, ""); 
    }
  };
  

  const handleDelete = (value) => {
    removeQuestion(value);
  };
  

  const optionsWithDisabled = questions
  ? questions.map((question) => ({
      ...question,
      label: question.label.replace("{author}", authorName || "you"),
      isDisabled: questionsAndAnswers.some((qa) => qa.value === question.value),
    }))
  : [];



  const weightConfig = {
    "1": { levels: [{ words: 20, score: 4 }, { words: 10, score: 3 }, { words: 1, score: 2 }] },
    "2": { levels: [{ words: 1, score: 1 }] },
    "3": { levels: [{ words: 10, score: 4 }, { words: 5, score: 3 }, { words: 1, score: 2 }] },
    "4": { levels: [{ words: 40, score: 3 }, { words: 20, score: 2 }, { words: 10, score: 1 }] },
    "5": { levels: [{ words: 30, score: 2 }, { words: 15, score: 2 }, { words: 5, score: 1 }] },
    "6": { levels: [{ words: 5, score: 2 }, { words: 1, score: 1 }] },
    "7": { levels: [{ words: 10, score: 4 }, { words: 5, score: 3 }, { words: 1, score: 2 }] },
    "8": { levels: [{ words: 5, score: 2 }, { words: 1, score: 1 }] },
    "9": { levels: [{ words: 1, score: 1 }] },
    "10": { levels: [{ words: 1, score: 1 }] },
    "11": { levels: [{ words: 5, score: 2 }, { words: 1, score: 1 }] },
    "12": { levels: [{ words: 20, score: 3 }, { words: 10, score: 2 }, { words: 5, score: 1 }] },
    "13": { levels: [{ words: 20, score: 3 }, { words: 10, score: 2 }, { words: 5, score: 1 }] }
  };


  const calculateScore = (answers = []) => {

    let score = 0;
    let answeredQuestions = 0;

    answers.forEach(({ value, answer }) => {
      if (!value || !answer) return;

      const wordCount = countWords(answer);

      if (wordCount > 0) {
        answeredQuestions++;
        
        const questionEntry = questions ? questions.find(q => q.value === value) : null;

        if (!questionEntry) return;

        const weight = weightConfig[questionEntry.value] || { levels: [{ words: 1, score: 1 }] };

        let questionScore = 0;

        for (let i = 0; i < weight.levels.length; i++) {
          if (wordCount >= weight.levels[i].words) {
            questionScore = weight.levels[i].score;
            break;
          }
        }

        score += questionScore;
      }
    });

    return { score, answeredQuestions };
  };




  const countWords = (text) => {
    const trimmedText = text.trim();
    if (trimmedText.length === 0) return 0;

    const words = trimmedText.split(/\s+/);
    return words.length;
  };




  let qualityLevel = "Empty bar";
  if (score >= 13 && answeredQuestions >= 6) qualityLevel = "Excellent";
  else if (score >= 9 && answeredQuestions >= 5) qualityLevel = "Good";
  else if (score >= 5 && answeredQuestions >= 3) qualityLevel = "OK";
  else if (score >= 1 && answeredQuestions >= 1) qualityLevel = "Basic";

  const handleInputChange = (question, newAnswer) => {
    setAnswers(prevAnswers => {
      const updatedAnswers = prevAnswers ? [...prevAnswers] : [];

      const existingIndex = updatedAnswers.findIndex(qa => qa.question === question);
      if (existingIndex !== -1) {
        updatedAnswers[existingIndex].answer = newAnswer;
      } else {
        updatedAnswers.push({ question, answer: newAnswer });
      }

      return updatedAnswers;
    });

    addQuestionAndAnswer(question, newAnswer);
  };





  useEffect(() => {
    if (!questionsAndAnswers || questionsAndAnswers.length === 0) {
      setScore(0);
      setAnsweredQuestions(0);
      return;
    }

    const { 
      score: newScore, 
      answeredQuestions: newAnsweredQuestions 
    } = calculateScore(questionsAndAnswers);

    setScore(newScore);
    setAnsweredQuestions(newAnsweredQuestions);

  }, [questionsAndAnswers, questions]);




  return (
    <div className="w-full ">
      <div className="mt-4 md:mt-2 md:mx-6">
        <div className="field-title">Tell us about {authorName}</div>
        <div className="field-desc mt-2">
          Each question you answer brings us closer to creating something truly special
        </div>
        {/* <div className="mt-8">
          {questionsAndAnswers.map(({ question, answer }) => (
            <CustomText
              setIsButtonDisabled={setIsButtonDisabled}
              key={question}
              label={question}
              placeholder="Type your answer here..."
              value={answer}
              onChange={(newAnswer) => handleInputChange(question, newAnswer)}
              tip={questions.find((q) => q.label === question)?.tip || null}
              textError={textError}
              onDelete={() => handleDelete(question)}
            />
          ))}
        </div> */}
        <div className="mt-8">
          {questionsAndAnswers.map(({ value, answer }) => {
            const questionObj = questions ? questions.find((q) => q.value === value) : null;

            if (!questionObj) return null; 

            return (
              <CustomText
                setIsButtonDisabled={setIsButtonDisabled}
                key={value}
                label={questionObj.label.replace("{author}", author)}
                placeholder="Type your answer here..."
                value={answer}
                onChange={(newAnswer) => handleInputChange(value, newAnswer)}
                tip={questionObj.tip || null}
                textError={textError}
                onDelete={() => handleDelete(value)}
              />
            );
          })}
        </div>
        <div className=" w-full">
          <CustomModalSelect
            resetOnSelect={true}
            options={optionsWithDisabled}
            onChange={handleQuestionSelectChange}
            placeholder="Choose a question"
            iconOrange={true}
          />

          {/* <CustomSelect
            resetOnSelect={true}
            className="w-full border border-gray-300 rounded-lg p-2"
            options={optionsWithDisabled}
            onChange={handleQuestionSelectChange}
            placeholder="Choose a question"
            iconOrange={true}
          /> */}
        </div>

        <div className="mt-[-10px] mb-2 mx-auto w-full text-center text-[14px] font-medium">
          More Answers, Better Story
        </div>
        <div className="">
          <ProgressTracker activeSteps={qualityLevel === "Excellent" ? 4 : qualityLevel === "Good" ? 3 : qualityLevel === "OK" ? 2 : qualityLevel === "Basic" ? 1 : 0} />
        </div>
      </div>
    </div>
  );
}

export default Step3;

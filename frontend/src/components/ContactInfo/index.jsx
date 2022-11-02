import "./index.css";
import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { REPLACE_QUESTION } from "../../redux/actions/questionActions";

function ContactInfo({ questionNumber }) {
  const [options, setOptions] = useState([]);
  const questionList = useSelector(
    (state) => state.questionReducer.questionList
  );
  useEffect(() => {
    console.log(questionList);
  }, [questionList]);

  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [questionName, setQuestionName] = useState("");

  useEffect(() => {
    const fields = { fullName, institution, email, telephone };
    console.log(fields);
    dispatch({
      type: REPLACE_QUESTION,
      payload: {
        questionIndex: questionNumber,
        questionObject: {
          question_type: "contactInfo",
          question_title: questionName,
          queston_index: questionNumber,
          question_options: fields,
          question_id: questionList[questionNumber].question_id,
        },
      },
    });
  }, [fullName, institution, email, questionName, telephone]);

  return (
    <div className="single-select-question-builder-container">
      <div className="question-header-row">
        <div className="question-number-container">
          <div className="question-number-text">Q{questionNumber}</div>
        </div>
        <input
          className="question-name-input"
          title="Add a question name "
          placeholder="Click to type your question here "
          type="text"
          name="name"
          value={questionName}
          onChange={(e) => {
            setQuestionName(e.target.value);
            dispatch({
              type: REPLACE_QUESTION,
              payload: {
                questionIndex: questionNumber,
                questionObject: {
                  question_type: "questionName",
                  question_title: questionName,
                  queston_index: questionNumber,
                  question_options: options,
                  question_id: questionList[questionNumber].question_id,
                },
              },
            });
          }}
        />
        <div className="question-close-button-container">
          <button
            className="question-cancel-button"
            onClick={() => {
              console.log("Clicked the Remove Button");
            }}
          >
            <FontAwesomeIcon icon={faX} className="question-cancel-icon" />
          </button>
        </div>
      </div>
      <div className="contact-info-container">
        <div className="contact-info-row">
          <span className="contact-info-field-label">First Name</span>
          <input
            className="contact-info-user-input"
            type="text"
            placeholder="User Types Here... "
            onBlur={(e) => {
              setFullName(e.target.value);
            }}
          ></input>
        </div>
        <div className="contact-info-row">
          <span className="contact-info-field-label">Institution</span>
          <input
            className="contact-info-user-input"
            type="text"
            placeholder="User Types Here... "
            onBlur={(e) => {
              setInstitution(e.target.value);
            }}
          ></input>
        </div>
        <div className="contact-info-row">
          <span className="contact-info-field-label">Email</span>
          <input
            className="contact-info-user-input"
            type="email"
            placeholder="User Types Here... "
            onBlur={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className="contact-info-row">
          <span className="contact-info-field-label">Telephone</span>
          <input
            className="contact-info-user-input"
            type="number"
            placeholder="User Types Here... "
            onBlur={(e) => {
              setTelephone(e.target.value);
            }}
          ></input>
        </div>
      </div>

      <div className="question-footer-row">
        <div
          className="question-logic-added-sign"
          title="Make this question required"
        >
          Logic Added
        </div>
        <div className="question-required-checkbox">
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "#AEAEAE",
                }}
                // onChange={handleChange}
              />
            }
            label={"Required"}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
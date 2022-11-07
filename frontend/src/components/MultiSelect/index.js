import "./index.css";
import "../index.css";
import { useEffect, useState } from "react";
import X from "../../assets/X.png";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import {
  DELETE_ANSWER,
  DELETE_QUESTION,
  SAVE_ANSWER,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";
import { SET_LOGIC_QUESTION, SET_LOGIC_VIEW_QUESTION } from "../../redux/actions/logicActions";
import { TOGGLE_LOGIC } from "../../redux/actions/uiActions";

function MultiSelect({ question }) {
  const dispatch = useDispatch();
  const logicList = useSelector((state) => state.logicReducer.logicList);

  const [options, setOptions] = useState([]);
  const answerList = useSelector((state) => state.questionReducer.answerList);

  const [questionNum, setQuestionNum] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log(question);
    setQuestionNum(`Q${question.position_index}`);
    setTitle(question.question);
  }, [question]);

  useEffect(() => {
    console.log(answerList);
    var optionList = answerList[question.question_id] ?? [];
    if (!optionList.includes("")) {
      optionList.push("");
    }
    setOptions(optionList);
  }, [answerList, question]);

  return (
    <div className="GlobalEditorComponent">
      <div className="GlobalEditorComponentHeader">
        <div
          className="GlobalEditorQuestionNumber"
          onClick={() => {
            dispatch({
              type: SET_LOGIC_QUESTION,
              payload: question,
            });
          }}
        >
          {questionNum}
        </div>
        <input
          className="GlobalEditorQuestionTitleInput"
          defaultValue={title}
          placeholder="Type your form name here..."
          onBlur={(text) => {
            dispatch({
              type: SAVE_QUESTION,
              payload: {
                ...question,
                question_title: text.target.value,
                question_index: question.position_index,
              },
            });
          }}
        />
        <img
          className="GlobalEditorDelete"
          src={X}
          alt="Delete"
          onClick={() => {
            dispatch({
              type: DELETE_QUESTION,
              payload: {
                question_id: question.question_id,
              },
            });
          }}
        />
      </div>
      {/* Copy Everything Except Content Below For Reusability */}
      <div className="single-select-options-container">
        <FormControl>
          {options.map((option, index) => {
            return (
              <div className="single-select-option" key={index}>
                <FormControlLabel control={<Checkbox />} />
                <input
                  type="text"
                  className="new-question-input"
                  defaultValue={option.answer}
                  placeholder="Click to add new option "
                  onBlur={(e) => {
                    const answerVal = e.target.value;
                    if (answerVal.trim() !== "") {
                      dispatch({
                        type: SAVE_ANSWER,
                        payload: {
                          answer_id: option.answer_id ?? uuid(),
                          fk_question_id: question.question_id,
                          question_type: question.question_type,
                          answer: answerVal,
                        },
                      });
                    } else {
                      dispatch({
                        type: DELETE_ANSWER,
                        payload: {
                          answer_id: option.answer_id,
                        },
                      });
                    }
                    e.target.value = "";
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const answerVal = e.target.value;
                      if (answerVal.trim() !== "") {
                        dispatch({
                          type: SAVE_ANSWER,
                          payload: {
                            answer_id: option.answer_id ?? uuid(),
                            fk_question_id: question.question_id,
                            question_type: question.question_type,
                            answer: answerVal,
                          },
                        });
                      } else {
                        dispatch({
                          type: DELETE_ANSWER,
                          payload: {
                            answer_id: option.answer_id,
                          },
                        });
                      }
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            );
          })}
        </FormControl>
      </div>
      {/* Copy Everything Except Content Above For Reusability */}
      <div className="GlobalEditorComponentFooter">
      {logicList[question.question_id] ? (
          <div
            className="GlobalEditorLogicAdded"
            onClick={() => {
              dispatch({
                type: TOGGLE_LOGIC,
                payload: true,
              });
              dispatch({
                type: SET_LOGIC_VIEW_QUESTION,
                payload: question,
              });
            }}
          >
            Logic Added
          </div>
        ) : (
          <div />
        )}
        <div className="GlobalEditorRequiredQuestion">
          <Checkbox
            style={{ color: "#AEAEAE", padding: 3 }}
            checked={question.mandatory === 1}
            onClick={(e) => {
              dispatch({
                type: SAVE_QUESTION,
                payload: {
                  ...question,
                  mandatory: e.target.checked,
                  question_index: question.position_index,
                },
              });
            }}
          />
          Required
        </div>
      </div>
    </div>
  );
}

export default MultiSelect;

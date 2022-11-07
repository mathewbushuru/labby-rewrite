import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import X from "../../assets/X.png";
import "./index.css";
import "../index.css";
import {
  DELETE_QUESTION,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";
import { SET_LOGIC_QUESTION, SET_LOGIC_VIEW_QUESTION } from "../../redux/actions/logicActions";
import { TOGGLE_LOGIC } from "../../redux/actions/uiActions";

function TextLine({ question }) {
  const dispatch = useDispatch();
  const logicList = useSelector((state) => state.logicReducer.logicList);
  const [questionNum, setQuestionNum] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log(question);
    setQuestionNum(`Q${question.position_index}`);
    setTitle(question.question);
  }, [question]);

  return (
    <div className="GlobalEditorComponent GlobalEditorComponent--textline">
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
          placeholder="Type your text line here..."
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
      <div className="GlobalEditorComponentFooter">
        {logicList[question.question_id] ? (
          <div
            className="GlobalEditorLogicAdded LogicPadding"
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
      </div>
    </div>
  );
}

export default TextLine;

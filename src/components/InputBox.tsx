import { useState } from "react";
import "../scss/InputBox.scss";
export interface InputBoxProps {
  value: string;
  handleOnChange: (e: any)=>void;
  handleKeyDown:(e: any)=>void;
  inputStyle?: any;
  firstSuggestion?: string;
  placeHolder?: string;
}
export const InputBox = (props: InputBoxProps) => {
  const { firstSuggestion, value, handleOnChange,handleKeyDown, inputStyle, placeHolder } =props;
  const {width,...style}=inputStyle
  const [focused, setFocused] = useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)
  let labelValue: any = value;
  if (firstSuggestion) {
    let firstHalf = value;
    let secondHalf = firstSuggestion.slice(value.length);
    labelValue = (
      <>
        <span>{firstHalf}</span>
        <span style={{ color: "#808080" }}>{secondHalf}</span>
      </>
    );
  }
  return (
    <div className="text-box">
      <input
        className="input-tag"
        type="text"
        id="inputText"
        value={value}
        placeholder={placeHolder}
        autoComplete="off"
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
        style={inputStyle}
        autoFocus
        onFocus={onFocus} 
        onBlur={onBlur}
      />
      <label className="input-tag-label" htmlFor="inputText" style={style} >
        {labelValue}{focused&&<span className="blinking-cursor">|</span>}
      </label>
    </div>
  );
};

import { lazy } from "react";
import "../scss/AutoSuggest.scss";
const InputBox=lazy(()=>import("./InputBox"))
const InputSuggestion=lazy(()=>import("./InputSuggestion"))
 interface AutoSuggestProps {
  suggestions: string[];
  handleOnChange: (e: any)=>void;
  value: string;
  placeHolder?:string;
  handleKeyDown:(e: any)=>void;
  onNoSuggestion?:any;
  onSelectionChange:(e:any)=>void
}
 const AutoSuggest = (props: AutoSuggestProps) => {
  const { suggestions, handleOnChange,handleKeyDown,onSelectionChange, value,placeHolder,onNoSuggestion } = props;
  return (
    <div className="autoSuggestPageWrapper">
      <InputBox
        firstSuggestion={suggestions.length ? suggestions[0] : ""}
        value={value}
        handleOnChange={handleOnChange}
        inputStyle={{ borderStyle: "none", outline: "none", width: "100%",fontSize:14,fontWeight:"bold" }}
        placeHolder={placeHolder}
        handleKeyDown={handleKeyDown}
      />
      <InputSuggestion inputString={value} onSelectionChange={onSelectionChange} suggestions={suggestions} onNoSuggestion={onNoSuggestion}/>
    </div>
  );
};

export default AutoSuggest
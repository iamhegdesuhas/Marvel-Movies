import "../scss/InputSuggestion.scss";
 interface InputSuggestionProps {
  inputString: string;
  suggestions: string[];
  onNoSuggestion?: any;
  onSelectionChange: (e: any) => void;
}
 const InputSuggestion = (props: InputSuggestionProps) => {
  const { suggestions, inputString, onNoSuggestion, onSelectionChange } = props;
  if (!suggestions.length) {
    if (inputString.length > 1 && onNoSuggestion) {
      return onNoSuggestion;
    }
    return null;
  }
  return (
    <div className="suggestion" data-testid="suggestion">
      {suggestions.map((ele: string, index: number) => (
        <div
          key={index}
          className="suggestion-item"
          onClick={() => {
            onSelectionChange(ele);
          }}
          style={
            ele === inputString
              ? { backgroundColor: "rgba(199, 222, 233, 0.746)" }
              : {}
          }
          data-testid="suggestions-div"
        >
          <span>{ele}</span>
        </div>
      ))}
    </div>
  );
};

export default InputSuggestion;
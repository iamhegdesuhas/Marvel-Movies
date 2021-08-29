import "../scss/Button.scss"
interface ButtonProps {
  label: string;
  handleOnClick: () => void;
  customStyle?: any;
  disabled?:boolean;
  style?:any;
}
  const Button = (props: ButtonProps) => {
  const { label, handleOnClick,disabled, ...otherProps } = props;

  return (
      <button className="button" disabled={disabled} onClick={handleOnClick} {...otherProps}>{label}</button>
  );
};

export default Button;
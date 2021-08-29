import "../scss/Button.scss"
export interface ButtonProps {
  label: string;
  handleOnClick: () => void;
  customStyle?: any;
  disabled?:boolean;
}
export const Button = (props: any) => {
  const { label, handleOnClick,disabled, ...otherProps } = props;

  return (
      <button className="button" disabled={disabled} onClick={handleOnClick} {...otherProps}>{label}</button>
  );
};

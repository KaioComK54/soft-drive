import { InputBase } from "./styles";

interface props {
  value: string;
  onChange: Function;
  name: string;
  placeholder: string;
  errors: string[];
  type?: string;
  disabled?: boolean;
}

const Input = ({
  value,
  onChange,
  name,
  placeholder,
  errors,
  ...rest
}: props) => {
  return (
    <InputBase
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={({ target }: any) => onChange(target.value)}
      className={errors.includes(name) ? "error" : ""}
      autocomplete="off"
      {...rest}
    />
  );
};

export default Input;

import "../styles/Button.css";

export default function Button({ children, ...rest }) {
  return <button {...rest}>{children}</button>;
}

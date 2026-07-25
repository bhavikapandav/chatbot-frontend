const Button = ({
  title,
  type = "button",
  className = "",
  onClick,
  disabled = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`primary-btn ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
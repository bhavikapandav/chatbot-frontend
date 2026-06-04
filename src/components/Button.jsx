const Button = ({
  title,
  type = "button",
  className = "",
  onClick
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`primary-btn ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
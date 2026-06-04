const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
};

export default Input;
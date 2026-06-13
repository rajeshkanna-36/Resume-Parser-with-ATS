import { useNavigate } from "react-router-dom";

function Button({
  text,
  to,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled) return;

    if (onClick) {
      onClick(e);
    }

    if (to) {
      navigate(to);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`h-15 w-50 border border-white/10 hover:bg-cyan-300 ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
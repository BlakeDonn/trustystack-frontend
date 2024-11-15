import type React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick} className="btn">
      {children}
    </button>
  );
};

export default Button;

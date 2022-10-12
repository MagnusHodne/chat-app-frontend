import React from "react";
import { useNavigate } from "react-router-dom";

type IconProps = { icon: string };

export const FAIcon: React.FC<IconProps> = ({ icon }) => {
  return <i className={`${icon}`}></i>;
};

type ButtonProps = {
  title: string;
  icon?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  to,
  onClick,
  className,
}) => {
  if (to) {
    const navigate = useNavigate();
    onClick = () => {
      navigate(to);
    };
  }
  const button = () => (
    <button
      className={`m-1 flex items-center justify-center gap-2 rounded-md bg-thischord-500 px-3 py-2 text-thischord-100 hover:bg-thischord-400 ${className}`}
      onClick={onClick}
    >
      {icon && <i className={`shrink-0 text-thischord-100 ${icon}`} />}
      {title}
    </button>
  );
  return button();
};

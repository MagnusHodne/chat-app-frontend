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
      className={`bg-brand-500 text-brand-100 hover:bg-brand-400 m-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 ${className}`}
      onClick={onClick}
    >
      {icon && <i className={`text-brand-100 shrink-0 ${icon}`} />}
      {title}
    </button>
  );
  return button();
};

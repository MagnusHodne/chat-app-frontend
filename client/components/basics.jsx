import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function FAIcon({ icon }) {
  return <i className={`icon ${icon}`}></i>;
}

export function Button({ title, icon, to, onClick, className }) {
  if (to) {
    const navigate = useNavigate();
    onClick = () => {
      navigate(to);
    };
  }
  const button = () => (
    <button
      className={`button ${className !== undefined ? className : ""}`}
      onClick={onClick}
    >
      {icon && <FAIcon icon={icon} />}
      {title}
    </button>
  );
  return button();
}

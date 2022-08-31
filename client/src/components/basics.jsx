import React from "react";
import { Link, useNavigate } from "react-router-dom";

export function FAIcon({ icon, className }) {
  return <i className={`${icon} ${className}`}></i>;
}

export function Button({ title, icon, to, onClick }) {
  if (to) {
    const navigate = useNavigate();
    onClick = () => {
      navigate(to);
    };
  }
  const button = () => (
    <button
      className={`m-1 flex items-center justify-center gap-2 rounded-md bg-thischord-500 p-2 text-thischord-100 hover:bg-thischord-400`}
      onClick={onClick}
    >
      {icon && <i className={`shrink-0 text-thischord-100 ${icon}`} />}
      {title}
    </button>
  );
  return button();
}

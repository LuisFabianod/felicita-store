import './styles.css'
import { useState } from "react";

export const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='collapsible-container'>
      <div className='collapsible'>
        <h2
          className='collapsible-title'
          onClick={toggle}
        >
          {title}
        </h2>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className='collapsible-children'>
          {children}
        </div>
      )}
    </div>
  );
}

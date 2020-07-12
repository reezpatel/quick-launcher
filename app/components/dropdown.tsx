import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface DropdownProps {
  options: { name: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
}

const Select = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  position: relative;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  background-color: white;
`;

const OptionContainer = styled.ul`
  list-style-type: none;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  top: 45px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 4px;
  z-index: 1;
`;

const Options = styled.li`
  cursor: pointer;
  padding: 8px 16px;
  border-top: 1px solid #e8e8e8;
  background-color: white;
  z-index: 1;
  font-size: 14px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Dropdown: (props: DropdownProps) => JSX.Element = ({
  options,
  value,
  onValueChange,
}) => {
  const [visible, setVisible] = useState(false);

  const clickListener = () => {
    setVisible(false);
  };

  useEffect(() => {
    window.addEventListener('click', clickListener, false);

    return () => {
      window.removeEventListener('click', clickListener, false);
    };
  }, []);

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setVisible(!visible);
  };

  const handleOptionClick = (v) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    setVisible(false);
    onValueChange(v);
  };

  const selectedOption = options.find(({ value: v }) => v === value);

  return (
    <Select onClick={handleDropdownClick}>
      {selectedOption ? selectedOption.name : 'Select Value'}
      {visible && (
        <OptionContainer>
          {options.map(({ name, value: v }) => (
            <Options key={v} onClick={handleOptionClick(v)}>
              {name}
            </Options>
          ))}
        </OptionContainer>
      )}
    </Select>
  );
};

export default Dropdown;

import React from "react";
import { Button } from "@nextui-org/react";

interface HeaderProps {
  onAddRecord: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddRecord }) => {
  return (
    <header className="sticky top-0 z-50 flex flex-col md:flex-row justify-between items-center p-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg rounded-lg">
      <div className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-0">
        Company employees
      </div>
      <Button
        className="text-white bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out"
        color="success"
        onClick={onAddRecord}
      >
        Добавить запись
      </Button>
    </header>
  );
};

export default Header;

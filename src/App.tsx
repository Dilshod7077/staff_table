import React, { useState } from "react";
import Table from "./components/Table/Table";
import Form from "./components/Form/Form";
import { Record } from "./types/index";
import { NextUIProvider } from "@nextui-org/react";
import Header from "./components/Header/Header";

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const fields: (keyof Record)[] = [
    "firstName",
    "lastName",
    "middleName",
    "age",
    "position",
    "hireDate",
    "salary",
    "department",
    "email",
    "phone",
    "address"
  ];

  return (
    <NextUIProvider>
      <div className="app p-4">
        <Header onAddRecord={() => setShowForm(true)} />
        <div className="mt-4">
          <Table fields={fields} />
        </div>
        {showForm && <Form onClose={() => setShowForm(false)} />}
      </div>
    </NextUIProvider>
  );
};

export default App;

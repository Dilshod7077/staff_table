import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { Calendar, CalendarDate } from "@nextui-org/react";
import { format } from "date-fns";
import { addRecord } from "../../services/api";

interface FormProps {
  onClose: () => void;
}

const Form: React.FC<FormProps> = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    age: "",
    position: "",
    hireDate: "",
    salary: "",
    department: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCalendarToggle = () => {
    setShowCalendar((prev) => !prev);
  };

  const handleDateChange = (date: CalendarDate | null) => {
    setSelectedDate(date);
    setShowCalendar(false);
    if (date) {
      const jsDate = new Date(date.year, date.month - 1, date.day);
      setFormData((prev) => ({
        ...prev,
        hireDate: format(jsDate, "yyyy-MM-dd"),
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value); // Add this line
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) newErrors.firstName = "Имя обязательно";
    if (!formData.lastName) newErrors.lastName = "Фамилия обязательна";
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 18 || Number(formData.age) > 90) {
      newErrors.age = "Возраст должен быть числом от 18 до 90";
    }
    if (!formData.salary || isNaN(Number(formData.salary))) {
      newErrors.salary = "Зарплата обязательна";
    }
    if (!formData.position) newErrors.position = "Должность обязательна";
    if (!formData.hireDate) newErrors.hireDate = "Дата приема на работу обязательна";
    if (!formData.department) newErrors.department = "Отдел обязателен";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Неверный формат email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await addRecord(formData);
        onClose();
      } catch (error) {
        console.error("Error adding record:", error);
      }
    }
  };

  const formatDate = (date: CalendarDate | null): string => {
    if (!date) return "";
    const jsDate = new Date(date.year, date.month - 1, date.day);
    return format(jsDate, "dd-MM-yyyy");
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Добавить запись о сотруднике
          </ModalHeader>
          <ModalBody className="modal-body-scroll max-h-[400px] overflow-y-auto relative">
            <div className="mb-4">
              <Input
                isRequired
                isClearable
                fullWidth
                label="Имя"
                placeholder="Введите имя"
                name="firstName"
                onChange={handleChange}
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div className="mb-4">
              <Input
                isRequired
                isClearable
                fullWidth
                label="Фамилия"
                placeholder="Введите фамилию"
                name="lastName"
                onChange={handleChange}
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
            <div className="mb-4">
              <Input
                isClearable
                fullWidth
                label="Отчество"
                placeholder="Введите отчество"
                name="middleName"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Input
                type="number"
                isRequired
                isClearable
                fullWidth
                label="Возраст"
                placeholder="Введите возраст"
                name="age"
                onChange={handleChange}
                min={18}
                max={90}
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>
            <div className="mb-4">
              <Input
                isRequired
                isClearable
                fullWidth
                label="Должность"
                placeholder="Введите должность"
                name="position"
                onChange={handleChange}
              />
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>
            <div className="relative mb-4">
              <Input
                isRequired
                readOnly
                onClick={handleCalendarToggle}
                value={formatDate(selectedDate)}
                label="Дата приема на работу"
                placeholder="Выберите дату"
              />
              {errors.hireDate && <p className="text-red-500 text-sm">{errors.hireDate}</p>}
              {showCalendar && (
                <div className="absolute top-full left-0 mt-1 z-50">
                  <Calendar
                    aria-label="Select a date"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </div>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="number"
                isRequired
                isClearable
                fullWidth
                label="Зарплата"
                placeholder="Введите зарплату"
                name="salary"
                onChange={handleChange}
              />
              {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
            </div>
            <div className="mb-4">
              <Input
                isRequired
                isClearable
                fullWidth
                label="Отдел"
                placeholder="Введите отдел"
                name="department"
                onChange={handleChange}
              />
              {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
            </div>
            <div className="mb-4">
              <Input
                isRequired
                isClearable
                fullWidth
                label="Email"
                placeholder="Введите email"
                name="email"
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <Input
                isClearable
                fullWidth
                label="Телефон"
                placeholder="Введите телефон"
                name="phone"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Input
                isClearable
                fullWidth
                label="Адрес"
                placeholder="Введите адрес"
                name="address"
                onChange={handleChange}
              />
            </div>
          </ModalBody>
          <ModalFooter> 
            <Button color="danger" variant="light" onPress={onClose}>
              Закрыть
            </Button>
            <Button
              color="success"
              className="text-white"
              onPress={handleSubmit}
            >
              Добавить
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default Form;

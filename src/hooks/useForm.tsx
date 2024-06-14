import { ChangeEvent, useState } from "react";

interface FormValues {
  [key: string]: string | number;
}

export const useForm = <T extends FormValues>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    console.log("valor: ", value);
    console.log("name: ", name);

    setValues({ ...values, [`${name}`]: value });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    resetForm,
  };
};

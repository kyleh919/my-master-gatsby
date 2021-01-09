import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    const value =
      e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;

    setValues({
      // copy the existing values into it
      ...values,

      // update the new value that changed
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}

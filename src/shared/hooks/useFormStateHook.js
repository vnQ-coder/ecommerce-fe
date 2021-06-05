import { useState } from 'react';

const useFormStateHook = (defaultState = {}) => {
  const [formState, setFormState] = useState(defaultState);

  const onUpdateState = (e) => {
    const {
      name, value, checked, type,
    } = e.target;
    let v = value;
    if (type === 'checkbox') v = checked;
    setFormState((prevState) => ({ ...prevState, [name]: v }));
  };

  const onUpdateFormState = (e) => {
    const { name, value } = e.target;
    const v = value;
    setFormState((prevState) => ({ ...prevState, [name]: v }));
  };

  const onUpdateStateByKey = (key, val) => {
    setFormState((prevState) => ({ ...prevState, [key]: val }));
  };

  const onClearState = () => {
    setFormState(defaultState);
  };

  const isStateEmpty = () => !(typeof formState === 'object' && Object.keys(formState).length);

  return {
    formState,
    setFormState,
    onUpdateState,
    onClearState,
    isStateEmpty,
    onUpdateFormState,
    onUpdateStateByKey,
  };
};

export default useFormStateHook;

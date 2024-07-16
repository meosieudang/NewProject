import { useState } from 'react';

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (text) => {
        setValue(text);
    };

    return {
        value,
        onChangeText: onChange
    };
};

export default useInput;

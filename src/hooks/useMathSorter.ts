import matchSorter from 'match-sorter';
import { useState } from 'react';

const useMathSorter = ({ data, keys }) => {
    const [search, setSearch] = useState([]);
    const [t, setT] = useState('');

    const onSearch = (t: string) => {
        setT(t);
        setSearch(matchSorter(data, t, { keys: [...keys] }));
    };

    const clearText = () => {
        setT('');
        setSearch([]);
    };

    return { search, onSearch, clearText, t };
};

export default useMathSorter;

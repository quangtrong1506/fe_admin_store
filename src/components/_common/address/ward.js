import { useEffect, useState } from 'react';
import provinceApis from '../../../api/baseAdmin/province';

const Ward = ({ code }) => {
    const [name, setName] = useState('-');
    useEffect(() => {
        (async () => {
            const res = await provinceApis.getWardByCode(code);
            if (res.success) return setName(res.data.name);
            else setName('-');
        })();
    }, [code]);
    return <>{name}</>;
};
export default Ward;

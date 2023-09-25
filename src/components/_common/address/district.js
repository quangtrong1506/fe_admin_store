import { useEffect, useState } from 'react';
import provinceApis from '../../../api/baseAdmin/province';
const District = ({ code }) => {
    const [name, setName] = useState('-');
    useEffect(() => {
        (async () => {
            const res = await provinceApis.getDistrictByCode(code);
            if (res.success) return setName(res.data.name);
            else setName('-');
        })();
    }, [code]);
    return <>{name}</>;
};
export default District;

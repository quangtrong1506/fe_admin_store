import provinceAxios from '../../plugins/provinceAxios';
const baseURL = 'api/';
const provinceApis = {
    getProvinces: () => {
        return provinceAxios.get(baseURL);
    },
    getDistricts: (provinceId) => {
        return provinceAxios.get(baseURL + `p/${provinceId}?depth=2`);
    },
    getWards: (districtId) => {
        return provinceAxios.get(baseURL + `d/${districtId}?depth=2`);
    },
    getProvinceByCode: (code) => {
        return provinceAxios.get(baseURL + 'p/' + code);
    },
    getDistrictByCode: (code) => {
        return provinceAxios.get(baseURL + 'd/' + code);
    },
    getWardByCode: (code) => {
        return provinceAxios.get(baseURL + 'w/' + code);
    },
};

export default provinceApis;

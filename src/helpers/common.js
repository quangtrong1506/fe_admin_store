import { Cookies } from 'react-cookie';

export const getHeaderWithAuthorizationBearerToken = () => {
    const cookies = new Cookies();
    const userToken = cookies.get('user_token') ?? '';

    return {
        Authorization: `Bearer ${userToken}`,
    };
};

export const generateFileToUrl = (file, type = 'application/octet-stream') => {
    const blob = new Blob([new Uint8Array(file)], { type });

    return URL.createObjectURL(blob);
};
export const getCustomId = (length = 32) => {
    if (length < 8) length = 8;
    if (length > 64) length = 64;
    let result = '';
    let string = 'zxcvbnmasdfghjklqwertyuiop';
    let number = '1234567890';
    result += string[Math.floor(Math.random() * (string.length - 1))];
    length--;
    while (length--) {
        if (length % 2 === 0)
            result += number[Math.floor(Math.random() * (number.length - 1))];
        else result += string[Math.floor(Math.random() * (number.length - 1))];
    }
    return result;
};
export const stringToSlug = (str) => {
    // remove accents
    var from =
            'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
        to =
            'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }

    str = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-');

    return str;
};
export const uploadImage = async (image, option = {}) => {
    const data = new FormData();
    data.append('image', image);
    let params = '?key=' + process.env.REACT_APP_IMGBB_KEY;
    if (option.name) params += '&name=';

    var requestOptions = {
        method: 'POST',
        body: data,
        redirect: 'follow',
    };

    const res = await fetch(
        process.env.REACT_APP_IMGBB_DOMAIN + params,
        requestOptions
    );
    const result = await res.json();
    console.log(result);
    return result;
};

import React from 'react';
import { Cookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
export const MySwal = withReactContent(Swal);
export const getHeaderWithAuthorizationBearerToken = () => {
    const cookies = new Cookies();
    const userToken = cookies.get('admin_token') ?? '';
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
    if (!str) return '';
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
    try {
        const data = new FormData();
        if (typeof image === 'string' && image.match('base64,'))
            data.append('image', image.split('base64,')[1]);
        else data.append('image', image);
        let params = '?key=' + process.env.REACT_APP_IMGBB_KEY;
        if (option.name) params += '&name=' + option.name;

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
        return result;
    } catch (error) {
        return {
            success: false,
            error: {
                message: error.message,
            },
        };
    }
};
export function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function numberToMoneyString(number) {
    return number.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
}
export function scrollToTop() {
    scrollTo({ top: 0, behavior: 'smooth' });
}

export function getOffice(role) {
    if (role == 1) return 'Admin';
    else return 'Nhân viên';
}

export const getOrderStatus = (status) => {
    if (status === 0) return <span className="text-danger">Đã huỷ</span>;
    if (status === 1) return <span className="text-info">Chờ xác nhận</span>;
    if (status === 2) return <span className="text-info">Chuẩn bị hàng</span>;
    if (status === 3) return <span className="text-info">Đang giao hàng</span>;
    if (status === 4)
        return <span className="text-success">Đã hoàn thành</span>;
};

export const getOrderPaymentStatus = (status) => {
    if (status === 0) return <span>Thanh toán khi nhận hàng</span>;
    if (status === 1) return <span>Chuyển khoản ngân hàng</span>;
    if (status === 2) return <span>Chuyển khoản Momo</span>;
};
export const getTextTime = (time) => {
    const date = new Date(time);
    return {
        date: `${
            date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
        }-${
            date.getMonth() > 8
                ? date.getMonth() + 1
                : '0' + (date.getMonth() + 1)
        }-${date.getFullYear()}`,
        hour: `${
            date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
        }:${
            date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
        }`,
    };
};
export const getTextTimeMessage = (time) => {
    const date = new Date(time);
    const now = new Date();
    let ss = Math.floor((now - date) / 1000);
    if (isNaN(ss)) return '';
    let mm = Math.floor(ss / 60);
    let hh = Math.floor(mm / 60);
    let dd = Math.floor(hh / 24);
    let ww = Math.floor(dd / 7);
    function s(num) {
        if (num == 1) return '';
        return 's';
    }
    if (ww >= 1) `${ww} week${s(ww)} ago`;
    else if (dd >= 1) return `${dd} day${s(dd)} ago`;
    else if (hh >= 1) return `${hh} hour${s(hh)} ago`;
    else if (mm >= 1) return `${mm} minute${s(mm)} ago`;
    else if (ss >= 1) return `${ss} second${s(ss)} ago`;
    else return 'now';
};

import imgbbAxios from '../../plugins/imgbbAxios';

const imgbbApis = {
    upload: (image, option) => {
        const data = new FormData();
        data.append('image', image);
        let params = '?key=' + process.env.REACT_APP_IMGBB_KEY;
        if (option.name) params += '&name=';
        return imgbbAxios.post(params, image, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':
                'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers':
                'Origin, Content-Type, X-Auth-Token',
        });
    },
};

export default imgbbApis;

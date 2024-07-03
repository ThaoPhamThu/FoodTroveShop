import icons from './icons';

const { AiFillStar, AiOutlineStar } = icons;

export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString();

export const secondsToHms = (d) => {
    d = Number(d) / 1000;
    const h = Math.floor(d / 3600)
    const m = Math.floor(d % 3600 / 60)
    const s = Math.floor(d % 3600 % 60)
    return ({ h, m, s })
}

export const renderStarFromNumber = (number, size) => {
    if (!Number(number)) return

    const stars = [];
    number = Math.round(number)
    for (let i = 0; i < +number; i++) stars.push(<AiFillStar color='orange' size={size || 16} />);
    for (let i = 5; i > +number; i--) stars.push(<AiOutlineStar color='orange' size={size || 16} />);

    return stars;
}

export const validate = (payload, setInvalidFields) => {
    let invalids = 0;
    const formatPayload = Object.entries(payload);
    for (let arr of formatPayload) {
        if (arr[1].trim() === '') {
            invalids++;
            setInvalidFields(prev => [...prev, { name: arr[0], mes: 'Required this field.' }])
        }
    }
    for (let arr of formatPayload) {
        switch (arr[0]) {
            case 'email':
                const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                if (!arr[1].match(regex)) {
                    invalids++;
                    setInvalidFields(prev => [...prev, { name: arr[0], mes: 'Email invalid.' }])
                }
                break;
            case 'password':
                if (arr[1].length < 6) {
                    invalids++;
                    setInvalidFields(prev => [...prev, { name: arr[0], mes: 'Password minimum 6 characters ' }])
                }
                break;
            case 'phoneNumber':
                if (arr[1].length < 10) {
                    invalids++;
                    setInvalidFields(prev => [...prev, { name: arr[0], mes: 'Phone number minimum 10 characters .' }])
                }
                break;
            default:
                break;
        }
    }
    return invalids;
}

export const generateRange = (start, end) => {
    const length = end + 1 - start;
    return Array.from({ length }, (_, index) => start + index)
}

export const getBase64 = (file) => {
    if (!file) return ''
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error)
    })
}
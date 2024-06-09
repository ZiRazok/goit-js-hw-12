import axios from "axios";
export default async function pixabayApiFunction(searchWord, page) {
    return (await axios
        .get(`https://pixabay.com/api/?${new URLSearchParams({
            key: '44228657-622a5a522e8285bbc9d7fdb17',
            q: `${searchWord}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 15,
            page: page
        })}`
        )).data;
}
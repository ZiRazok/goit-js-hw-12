export default function pixabayApiFunction(searchWord) {
    const searchParams = new URLSearchParams({
        key: '44228657-622a5a522e8285bbc9d7fdb17',
        q: `${searchWord}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
    });
    return fetch(`https://pixabay.com/api/?${searchParams}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            };
            return response.json();
        });
}
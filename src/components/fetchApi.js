const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `35172830-be7dc29c069ae2fbfd826fe75`;

export const getSearchImages = async (text, page) => {
  const data = await fetch(
    `${BASE_URL}/?q=${text}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return await data.json();
};
export default getSearchImages;

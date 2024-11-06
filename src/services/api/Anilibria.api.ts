import axios from "axios";

export const getTitle = async () => {
  const { data } = await axios.get(`https://api.anilibria.tv/v3/title?id=9000`);

  return data;
};

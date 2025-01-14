import api from "./apiConfig.ts"; 

export const listMovies = async () => {
  try {
    const response = await api.get("/movies");
    return response;  //return response
  } catch (error) {
    console.error("Error during listing movies:", error);
    throw error;
  }
};

export const getMovie = async (id:string|undefined) => {
  if(!id)return
  try {
    const response = await api.get(`/movies/${id}`);
    return response;  //return response
  } catch (error) {
    console.error("Error during getting movies:", error);
    throw error;
  }
}
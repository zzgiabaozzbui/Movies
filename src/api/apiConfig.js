const apiConfig ={
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'c9c055dbc745f77503e539b9eb0423b0', 
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;
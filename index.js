document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'ccd6845a2eadf07a70f343638d674928';
    const apiUrl = 'https://api.themoviedb.org/3';

    // Função para buscar os filmes populares da API da TMDb
    async function fetchPopularMovies() {
        try {
            const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`);
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Erro ao buscar filmes populares:', error);
        }
    }

    // Função para exibir os filmes na interface
    async function displayMovies() {
        const moviesList = document.querySelector('.movies-list');
        const movies = await fetchPopularMovies();

        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-overview">${truncateText(movie.overview, 150)}</div>
            `;
            movieElement.addEventListener('click', () => displayMovieDetails(movie));
            moviesList.appendChild(movieElement);
        });
    }

    // Função para exibir os detalhes de um filme selecionado
    function displayMovieDetails(movie) {
        const movieDetails = document.querySelector('.movie-details');
        movieDetails.innerHTML = `
            <div class="container">
                <h2>${movie.title}</h2>
                <p>${movie.overview}</p>
                <img class="movie-backdrop" src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="${movie.title} backdrop">
            </div>
        `;
    }

    // Trunca o texto para limitar o número de caracteres exibidos
    function truncateText(text, maxLength) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        } else {
            return text;
        }
    }

    // Inicialização da aplicação ao carregar a página
    displayMovies();
});

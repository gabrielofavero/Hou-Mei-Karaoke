const CANTOR = "CANTOR";
const NUMERO = "NÚMERO";
const MUSICA = "MÚSICA";

fetch('assets/json/hou-mei.json')
  .then(response => response.json())
  .then(data => {

    const tableBody = document.querySelector('#songs-table tbody');

    function createTableRow(linha) {
      const row = document.createElement('tr');
      
      const numero = document.createElement('td');
      const cantor = document.createElement('td');
      const musica = document.createElement('td');

      let musicaText = linha[MUSICA] || '-';

      // First letter of each word in the song name should be capitalized

      musicaText = musicaText.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');

      numero.textContent = linha[NUMERO] || '-';
      cantor.textContent = linha[CANTOR] || '-';
      musica.textContent = musicaText;

      row.appendChild(numero);
      row.appendChild(cantor);
      row.appendChild(musica);

      return row;
    }

    const FILTRO_TODOS = document.querySelector('input[value="todos"]');
    const FILTRO_NACIONAIS = document.querySelector('input[value="nacionais"]');
    const FILTRO_INTERNACIONAIS = document.querySelector('input[value="internacionais"]');
    const BARRA_PESQUISA = document.querySelector('#search-bar');


    function filterSongs() {

      const todosChecked = FILTRO_TODOS.checked;
      const nacionaisChecked = FILTRO_NACIONAIS.checked;
      const internacionaisChecked = FILTRO_INTERNACIONAIS.checked;
      const searchQuery = BARRA_PESQUISA.value.trim().toLowerCase().replace(/[^\w\s]/g, '');

      const filteredSongs = Object.values(data).filter(linha => {
        if (todosChecked) {
          return true;
        } else if (nacionaisChecked) {
          return linha.TIPO === "NACIONAL";
        } else if (internacionaisChecked) {
          return linha.TIPO === "INTERNACIONAL";
        } else {
          return false;
        }
      }).filter(linha => {
        const numero = linha[NUMERO];
        const cantor = linha[CANTOR].toLowerCase().replace(/[^\w\s]/g, '');
        const musica = linha[MUSICA].toLowerCase().replace(/[^\w\s]/g, '');
        const queryWords = searchQuery.split(/\s+/);

        for (let i = 0; i < queryWords.length; i++) {
          if (cantor.includes(queryWords[i]) || numero.includes(queryWords[i]) || musica.includes(queryWords[i])) {
            continue;
          } else {
            return false;
          }
        }

        return true;
      });

      tableBody.innerHTML = '';

      filteredSongs.forEach(song => {
        tableBody.appendChild(createTableRow(song));
      });
    }

    filterSongs();

    FILTRO_NACIONAIS.addEventListener('change', filterSongs);
    FILTRO_INTERNACIONAIS.addEventListener('change', filterSongs);
    FILTRO_TODOS.addEventListener('change', filterSongs);
    BARRA_PESQUISA.addEventListener('input', filterSongs);
  });

  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    let backToTop = document.getElementById("back-to-top");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }
  
  function topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    setTimeout(() => {
      document.getElementById("back-to-top").classList.remove("show");
    }, 500);
  }


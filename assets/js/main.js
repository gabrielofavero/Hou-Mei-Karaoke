const ATT = "ATT";
const CANTOR = "CANTOR";
const NUMERO = "NÚMERO";
const MUSICA = "MÚSICA";

fetch('assets/json/hou-mei.json')
  .then(response => response.json())
  .then(data => {

    const tableBody = document.querySelector('#songs-table tbody');

    function createTableRow(linha) {
      const row = document.createElement('tr');
      const att = document.createElement('td');
      const cantor = document.createElement('td');
      const numero = document.createElement('td');
      const musica = document.createElement('td');

      att.style.width = '10%';
      att.textContent = linha[ATT] || '-';

      cantor.style.width = '40%';
      cantor.textContent = linha[CANTOR] || '-';

      numero.style.width = '10%';
      numero.textContent = linha[NUMERO] || '-';

      musica.style.width = '40%';
      musica.textContent = linha[MUSICA] || '-';

      row.appendChild(att);
      row.appendChild(cantor);
      row.appendChild(numero);
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
          return linha.TIPO === "nacional";
        } else if (internacionaisChecked) {
          return linha.TIPO === "internacional";
        } else {
          return false;
        }
      }).filter(linha => {
        const att = linha[ATT];
        const cantor = linha[CANTOR].toLowerCase().replace(/[^\w\s]/g, '');
        const numero = linha[NUMERO];
        const musica = linha[MUSICA].toLowerCase().replace(/[^\w\s]/g, '');
        const queryWords = searchQuery.split(/\s+/);

        for (let i = 0; i < queryWords.length; i++) {
          if (att.includes(queryWords[i]) || cantor.includes(queryWords[i]) || numero.includes(queryWords[i]) || musica.includes(queryWords[i])) {
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

    // Add event listeners to the filter inputs and search bar
    FILTRO_NACIONAIS.addEventListener('change', filterSongs);
    FILTRO_INTERNACIONAIS.addEventListener('change', filterSongs);
    FILTRO_TODOS.addEventListener('change', filterSongs);
    BARRA_PESQUISA.addEventListener('input', filterSongs);

    // Make the table responsive on mobile devices
    function makeTableResponsive() {
      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth < 971;
      const isSemiMobile = viewportWidth < 1541;

      if (isMobile || isSemiMobile) {
        document.body.style.padding = '10px';
      }
    }

    makeTableResponsive();
    window.addEventListener('resize', makeTableResponsive);
  });



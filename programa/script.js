let listaPersonagens = document.getElementById('lista');
const openModalButton = document.querySelector("#abrir-modal");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");
const tituloModal = document.querySelector("#titulo-modal");

const statusP = document.querySelector("#status");
const species = document.querySelector("#species");
const gender = document.querySelector("#gender");
const locationP = document.querySelector("#location");

let pagina = "https://rickandmortyapi.com/api/character?page=1";

let anterior = document.getElementById('anterior');
let proximo = document.getElementById('proxima');

let fetchApi = async (url) => {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (erro) {
        console.log(erro);
    }
};

let personagens = async () => {
    const personagens = await fetchApi(pagina);
    render(personagens);
};

let render = (personagens) => {
    personagens.results.map((personagem) => {
        listaPersonagens.insertAdjacentHTML('beforeend', `<li class="lor">
    <img class="personagens" src="https://rickandmortyapi.com/api/character/avatar/${personagem.id}.jpeg"/>
    <input class="nome" id="abrir-modal" type="button" onclick="dadosEspecificos(${personagem.id})" value="${personagem.name}">
  </li>`)
    })
};

let botaoBuscar = () => {
    listaPersonagens.innerHTML = "";
    const text = document.getElementById('busca').value;
    if (!text) {
        personagens();
    } else {
        botaoVoltar(text);
        proximo.style.display = "none";
        anterior.style.display = "none";
    }
};

let botaoVoltar = async (name) => {
    let elementExist = document.getElementById('botaoVoltar');
    let existBotao = document.getElementById('voltar');
    if (!existBotao) {
        let input = document.createElement('input');
        input.type = 'button';
        input.onclick = removeProxAnte;
        input.id = 'voltar';
        input.value = 'Back';
        elementExist.appendChild(input);
    }

    const personagens = await fetchApi(`https://rickandmortyapi.com/api/character/?name=${name}`);
    render(personagens);
};

let removeProxAnte = () => {
    listaPersonagens.innerHTML = "";
    personagens();
    let divisao = document.getElementById('botaoVoltar');
    let botaoVoltar = document.getElementById('voltar');
    divisao.removeChild(botaoVoltar);
    anterior.style.display = "inline";
    proximo.style.display = "inline";
};

let dadosEspecificos = async (id) => {
    const personagens = await fetchApi(`https://rickandmortyapi.com/api/character/${id}`);

    tituloModal.textContent = personagens.name;
    statusP.textContent = `Status: ${personagens.status}`;
    species.textContent = `Species: ${personagens.species}`;
    gender.textContent = `Gender: ${personagens.gender}`;
    locationP.textContent = `Location: ${personagens.location.name}`;

    toggleModal();
};

const toggleModal = () => {
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
};

const fechar = () => {
    toggleModal();
};

const proximaPagina = async () => {
    const personagens = await fetchApi(pagina);
    if (!personagens.info.next) {
        proximo.disabled = true;
    } else {
        listaPersonagens.innerHTML = "";
        proximo.disabled = false;
        pagina = personagens.info.next;
        const personagensP = await fetchApi(pagina);
        render(personagensP);
    }
    anterior.disabled = false;
};

const paginaAnterior = async () => {
    const personagens = await fetchApi(pagina);
    if (!personagens.info.prev) {
        anterior.disabled = true;
    } else {
        listaPersonagens.innerHTML = "";
        anterior.disabled = false;
        pagina = personagens.info.prev;
        const personagensA = await fetchApi(pagina);
        render(personagensA);
    }
    proximo.disabled = false;
};

personagens();
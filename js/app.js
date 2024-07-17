let listaAmigoSecreto = [];

function adicionar() {
    let amigoSecreto = document.getElementById('nome-amigo');
    if (amigoSecreto.value == '') {
        alert('Informe um nome.');
        return; //daqui para baixo, ele não executa nada.
    }

    if (listaAmigoSecreto.includes(amigoSecreto.value)) {
        alert('Nome do amigo existente.');
        return; //daqui para baixo, ele não executa nada.
    }

    let listaVisualAmigoSecreto = document.getElementById('lista-amigos');

    listaAmigoSecreto.push((amigoSecreto.value).lowercase);

    if (listaVisualAmigoSecreto.textContent == '') {
        listaVisualAmigoSecreto.textContent = amigoSecreto.value;
    } else {
        listaVisualAmigoSecreto.textContent = listaVisualAmigoSecreto.textContent + ', ' + amigoSecreto.value;
    }

    amigoSecreto.value = '';

    atualizarLista();
    atualizarSorteio();
}

function sortear() {
    if (listaAmigoSecreto.length < 4) {
        alert('Para sortear é preciso ter ao menos 4 pessoas.');
        return;
    }

    embaralhar(listaAmigoSecreto);
    let sorteio = document.getElementById('lista-sorteio');

    for (let i = 0; i < listaAmigoSecreto.length; i++) {
        if (i == listaAmigoSecreto.length - 1) {
            sorteio.innerHTML = sorteio.innerHTML + listaAmigoSecreto[i] + ' tirou ' + listaAmigoSecreto[0] + '<br/>';
        } else {
            sorteio.innerHTML = sorteio.innerHTML + listaAmigoSecreto[i] + ' tirou ' + listaAmigoSecreto[i + 1] + '<br/>';
        }
    }
}

//ao clicar em cima do nome no campo amigos incluídos, o nome é excluido e, se tiver sido sorteado, a lista feita dos sorteados é apagada.
function excluirAmigo(index) {
    listaAmigoSecreto.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
}

//algoritmo de Fisher-Yates
function embaralhar(lista) {
    for (let i = lista.length; i; i--) {
        const j = Math.floor(Math.random() * (i));

        // Troca de elementos
        [lista[i - 1], lista[j]] = [lista[j], lista[i - 1]];
    }
}

function atualizarSorteio() {
    let sorteio = document.getElementById('lista-sorteio');
    sorteio.innerHTML = '';
}

function atualizarLista() {
    let lista = document.getElementById('lista-amigos');
    lista.innerHTML = '';

    for (let i = 0; i < listaAmigoSecreto.length; i++) {
        // Cria um elemento de parágrafo para cada amigo
        let paragrafo = document.createElement('p');
        paragrafo.textContent = listaAmigoSecreto[i];

        // Adiciona um evento de clique para excluir o amigo
        paragrafo.addEventListener('click', function() {
            excluirAmigo(i);
        });

        // Adiciona o parágrafo à lista
        lista.appendChild(paragrafo);
    }
}//

function reiniciar() {
    listaAmigoSecreto = [];
    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('lista-sorteio').innerHTML = '';
}

/* meus desafios pessoais:
    desativar botão adicionar e sortear ao sortear, só deixando o reiniciar disponível

    adicionar e-mail ou whatsapp de cada amigo adicionado

    editar nome e e-mail ou whatsapp da lista de amigos

    excluir nome e e-mail ou whatsapp da lista de amigos

    adicionar lista de presentes (até 5 opções) de cada amigo adicionado

    editar lista de presentes e enviar atualização

    excluir lista de presentes e enviar atualização

    enviar por e-mail ou whatsapp quem a pessoa tirou e a lista de presentes da pessoa tirada
*/
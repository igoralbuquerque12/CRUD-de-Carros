const carroList = document.getElementById('carroList');
const createCarroForm = document.getElementById('createCarroForm');

function loadCarros() {
    fetch('/api/v1/carros')
        .then(response => response.json())
        .then(data => {
            carroList.innerHTML = ''; 

            data.data.forEach(carro => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="text-content">
                        Modelo: ${carro.modelo} <br>
                        Marca: ${carro.marca} <br>
                        Ano: ${carro.ano} <br>
                        Cor: ${carro.cor} <br>
                        Número de Portas: ${carro.numeroPortas} <br>
                        Quilometragem: ${carro.quilometragem}
                    </div>
                    <div class="button-group">
                        <button data-id="${carro.id}" class="updateBtn">Editar</button>
                        <button data-id="${carro.id}" class="deleteBtn">Deletar</button>
                    </div>
                `;
                carroList.appendChild(li);
            });

            applyDeleteListeners();
            applyUpdateListeners();
        })
        .catch(err => console.log(err));
}

function applyDeleteListeners() {
    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener('click', deleteCarro);
    });
}

// Função para deletar um carro
function deleteCarro(event) {
    const id = event.target.getAttribute('data-id');

    fetch(`/api/v1/carros/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadCarros(); 
        } else {
            console.log('Erro ao deletar carro');
        }
    })
    .catch(err => console.log(err));
}

function applyUpdateListeners() {
    document.querySelectorAll('.updateBtn').forEach(button => {
        button.addEventListener('click', updateCarro);
    });
}


function updateCarro(event) {
    const id = event.target.getAttribute('data-id');

    const modelo = prompt('Novo Modelo:');
    const marca = prompt('Nova Marca:');
    const ano = prompt('Novo Ano:');
    const cor = prompt('Nova Cor:');
    const numeroPortas = prompt('Número de Portas:');
    const quilometragem = prompt('Nova Quilometragem:');

    const carroAtualizadoFiltrado = {};
    if (modelo) carroAtualizadoFiltrado.modelo = modelo;
    if (marca) carroAtualizadoFiltrado.marca = marca;
    if (ano) carroAtualizadoFiltrado.ano = parseInt(ano);
    if (cor) carroAtualizadoFiltrado.cor = cor;
    if (numeroPortas) carroAtualizadoFiltrado.numeroPortas = parseInt(numeroPortas);
    if (quilometragem) carroAtualizadoFiltrado.quilometragem = parseInt(quilometragem);

    fetch(`/api/v1/carros/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carroAtualizadoFiltrado),
    })
    .then(response => {
        if (response.ok) {
            loadCarros();
        } else {
            console.log('Erro ao atualizar carro');
        }
    })
    .catch(err => console.log(err));
}


createCarroForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const carroData = {
        modelo: document.getElementById('modelo').value,
        marca: document.getElementById('marca').value,
        ano: parseInt(document.getElementById('ano').value),
        cor: document.getElementById('cor').value,
        numeroPortas: parseInt(document.getElementById('numeroPortas').value),
        quilometragem: parseInt(document.getElementById('quilometragem').value),
    };

    fetch('/api/v1/carros', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(carroData),
    })
    .then(response => response.json())
    .then(() => {
        loadCarros(); 
        createCarroForm.reset(); 
    })
    .catch(err => console.log(err));
});

loadCarros();

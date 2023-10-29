const tarefas = document.querySelectorAll(".tarefa");
const colunas = document.querySelectorAll(".coluna");

let tarefaArrastada = null;

//Adiciona os ouvintes para cada tarefa
tarefas.forEach(tarefa => {
    tarefa.addEventListener("dragstart", iniciarArrasto)
    tarefa.addEventListener("dragend", finalizarArrasto)
})

//Adiciona os ouvintes para cada coluna
colunas.forEach(coluna => {
    coluna.addEventListener("dragover", permitirSoltar)
    coluna.addEventListener("drop", soltarTarefa)
})

function iniciarArrasto(event){
    tarefaArrastada = this;
    this.classList.add("arrastando")
}

function finalizarArrasto(event){
    this.classList.remove("arrastando")
}

function permitirSoltar(event){ //Permitir soltar
    event.preventDefault();
}

function soltarTarefa(event){
    event.preventDefault();

    if(tarefaArrastada){ //Verifica se tem uma tarefa sendo arrastada
        this.querySelector(".tarefas").appendChild(tarefaArrastada)
        tarefaArrastada = null
    }
}

const formAdicionarTarefa = document.getElementById("adicionar-tarefa")

formAdicionarTarefa.addEventListener("submit", adicionarTarefa);

function adicionarTarefa(event){
    event.preventDefault()

    const novaTarefa = document.getElementById("nova-tarefa").value

    if(novaTarefa){
        const novaTarefaLi = document.createElement("li")
        novaTarefaLi.innerHTML = novaTarefa
        novaTarefaLi.draggable = true
        novaTarefaLi.classList.add("tarefa")

        document.getElementById("tarefas-a-fazer").appendChild(novaTarefaLi)
        document.getElementById("nova-tarefa").value = ''

        novaTarefaLi.addEventListener("dragstart", iniciarArrasto)
        novaTarefaLi.addEventListener("dragend", finalizarArrasto)
    }
}

const lixeira = document.getElementById("lixeira");

lixeira.addEventListener("dragover", permitirSoltarNaLixeira);
lixeira.addEventListener("drop", apagarTarefa);

function permitirSoltarNaLixeira(event) {
    event.preventDefault();
}

function apagarTarefa(event) {
    event.preventDefault();

    if (tarefaArrastada) {
        // Verifica se a tarefa está sendo arrastada para a lixeira
        if (event.target.closest(".lixeira")) {
            tarefaArrastada.remove();
        }
        tarefaArrastada = null;
    }
}

// CONFIGURANDO A DATA


function hoje() {
    let hoje = new Date()
    let date = hoje.getDate()
    let day = hoje.getDay()
    let month = hoje.getMonth()+1

    switch (day) {
        case 0: day = 'Segunda'
            break;
        case 1: day = 'Terça'
            break;
        case 2: day = 'Quarta'
            break;
        case 3: day = 'Quinta'
            break;
        case 4: day = 'Sexta'
            break;
        case 5: day = 'Sábado'
            break;
        case 6: day = 'Domingo'
            break;
    }

    switch (month) {
        case 1: month = 'Jan.' 
            break;
        case 2: month = 'Fev.'
            break;
        case 3: month = 'Mar.'
            break;
        case 4: month = 'Abr.'
            break;
        case 5: month = 'Maio'
            break;
        case 6: month = 'Jun.'
            break;
        case 7: month = 'Jul.'
            break;
        case 8: month = 'Ago.'
            break;
        case 9: month = 'Set.'
            break;
        case 10: month = 'Out.'
            break;
        case 11: month = 'Nov.'
            break;
        case 12: month = 'Dez.'
            break;
    }

    let dataHoje = `${day}, ${date} de ${month}`
    document.getElementById('hoje').innerHTML = dataHoje
}

hoje()


// DEFININDO QUANTIDADE DE ITENS QUE PODEM SER ADICIONADOS NA LISTA COM BASE NO TAMANHO DA TELA

let height = window.innerHeight
let limiteTarefas
console.log(height)

if (height < 450){
    limiteTarefas = 3
}else if (height < 576) {
    limiteTarefas = 4
} else if (height < 768){
    limiteTarefas = 5
} else if (height < 992){
    limiteTarefas = 6
} else {
    limiteTarefas = 7
}

//CRIANDO OBJETO --TAREFA-- QUE REPRESENTA A LISTA E AS TAREFAS ADCIONADAS

class Tarefa{
    constructor(id,status = false,descricao){
        this.id = 0
        this.status = status
        this.descricao = descricao
        this.qtd = 0
        this.qtdDone = 0
    }

    avisarExcessoTarefas(){
        if (this.qtd >= limiteTarefas) {
            alerta('Excesso de tarefas', 'Termine e remova uma das atividades registradas antes de adcionar outra', 'warning')
            document.getElementById('add-atividade').value = ""
        }else {
            this.validarDescricao()
        }
    }
    
    validarDescricao(){
        let preenchimento = document.getElementById('add-atividade').value
        if (preenchimento == "") {
            alerta('Atenção','A descricao da tarefa não foi preenchida','danger')
        } else{
            this.gravarTarefa()
        }
    }

    gravarTarefa(){
        this.descricao = document.getElementById('add-atividade').value
        //gravando input no localStorage
        let tarefa =  new Array()
        tarefa = [this.id,this.status,this.descricao]
        console.log(tarefa)
        localStorage.setItem(this.id,JSON.stringify(tarefa))
        this.carregarTarefa(tarefa)
        document.getElementById('add-atividade').value = ""
        localStorage.setItem('id',this.id)
        this.id++
        this.qtd++
    }
 
    carregarTarefa(tarefa){
        let paiListaTarefas = document.getElementById('list')
        let listaTarefas = document.createElement('li')
        listaTarefas.id = 'tarefa-' + tarefa[0]
        let idStatus = 'status-'  + tarefa[0]
        let idTxt= 'txt-'  + tarefa[0]
        listaTarefas.className = 'list-group-item'
        paiListaTarefas.appendChild(listaTarefas)
        // FILTRANDO STATUS DA TAREFA AO CARREGA-LA APARTIR DO LOCAL STORAGE
        if (tarefa[1] == true) {
            listaTarefas.innerHTML = 
            `<i id="${idStatus}"
            class="fas fa-check-circle float-left"
            onclick="tarefa.monitorarStatus(${tarefa[0]})"></i>
            <p id="${idTxt}" class="d-inline ml-2 inativo" >${tarefa[2]}</p>
            <i class="far fa-trash-alt float-right"
            onclick="tarefa.removerItem(${tarefa[0]})"></i>`
            this.qtdDone++
            this.avisarTodasTarefasConcluidas()
        } else {
            listaTarefas.innerHTML = 
            `<i id="${idStatus}"
            class="far fa-circle float-left"
            onclick="tarefa.monitorarStatus(${tarefa[0]})"></i>
            <p id="${idTxt}" class="d-inline ml-2" >${tarefa[2]}</p>
            <i class="far fa-trash-alt float-right"
            onclick="tarefa.removerItem(${tarefa[0]})"></i>`
            
        }
        // listaTarefas.innerHTML = 
        //     `<i id="${idStatus}"
        //     class="far fa-circle float-left"
        //     onclick="tarefa.monitorarStatus(${tarefa[0]})"></i>
        //     <p id="${idTxt}" class="d-inline ml-2" >${tarefa[2]}</p>
        //     <i class="far fa-trash-alt float-right"
        //     onclick="tarefa.removerItem(${tarefa[0]})"></i>`
    }

    loadTarefas(){
        if (localStorage.getItem('id') != null) {
            this.id = localStorage.getItem('id')
            let tarefa = new Array()
                for (let i = 0; i <= this.id ; i++) {
                    tarefa = JSON.parse(localStorage.getItem(i))
                    if (tarefa == null) {
                        continue
                    }
                    this.carregarTarefa(tarefa)
                    this.qtd++        
                }
                this.avisarTodasTarefasConcluidas()
        }
            
    }

    monitorarStatus(id){
        let tarefa = new Array()
        tarefa = JSON.parse(localStorage.getItem(id))
        tarefa[1] = ! tarefa[1] 
        let status = document.getElementById('status-'+tarefa[0])
        let txt = document.getElementById('txt-'+tarefa[0])
        if (tarefa[1] == true){
            status.classList.remove('far','fa-circle')
            status.classList.add('fas','fa-check-circle')
            txt.className = 'd-inline ml-2 inativo'
            localStorage.setItem(tarefa[0],JSON.stringify(tarefa))
            this.qtdDone++
            this.avisarTodasTarefasConcluidas()
        } else{
            status.classList.remove('fas','fa-check-circle')
            status.classList.add('far','fa-circle')
            txt.className = 'd-inline ml-2'
            localStorage.setItem(tarefa[0],JSON.stringify(tarefa))
            this.qtdDone--
        }
    }

    avisarTodasTarefasConcluidas(){
        if (this.qtdDone == this.qtd){
            alerta('Parabéns!','Todas as suas atividades foram concluídas','success')
        } 
    }

    removerItem(id){
        let item = document.getElementById('tarefa-'+id)
        document.getElementById('list').removeChild(item)
        localStorage.removeItem(id)
        this.qtd--
    }

    limparTarefas(){
        document.getElementById('list').innerHTML = ""
        localStorage.clear()
        this.id = 0
        this.qtd = 0
        this.qtdDone = 0
        // this.id = 0
        // localStorage.setItem('id',this.id)

    }

   
   
    
}

let tarefa = new Tarefa()


function alerta(title, msg, color){
    document.getElementById('exampleModalLabel').innerHTML = title
    document.getElementById('modal-body').innerHTML = msg
    document.getElementById('btn-modal').className = `btn btn-${color}`
    document.getElementById('exampleModalLabel').className = `modal-title text-${color}`

    $('#modalAlerts').modal('show')
    $('#modalAlerts').on('shown.bs.modal', function () {
        $('#btn-modal').trigger('focus')
      })
}


jQuery('#add-atividade').keypress(function(event){

	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		tarefa.avisarExcessoTarefas();
	}

});
//CLASSE PARA ARMAZENAMENTO DAS ATIVIDADES

class ToDo{
    constructor(){
        this.atividade
        this.btn = document.getElementById('btn-add')
        this.idRegistro = 0
        this.qtdRegistro = 0
        this.doneQtd = 0  //contando itens realizados
    }
    carregarAtividade(){
        if (this.qtdRegistro < 8) {
     
        this.atividade =  document.getElementById('add-atividade').value
        let list = document.createElement('li')
        document.getElementById('list').appendChild(list)
        list.className = 'list-group-item'
        list.id =this.idRegistro
        
        list.innerHTML = 
        `<i id="i-${this.idRegistro}" class="far fa-circle" onclick = 'toDo.alterarStatus(${this.idRegistro})'></i>
        <p id="p-${this.idRegistro}" class="d-inline pl-2">${this.atividade}</p>
        <i type="button" class="far fa-trash-alt float-right" onclick='toDo.deletarAtvidade(${this.idRegistro})'></i>
        `
        this.idRegistro++
        this.qtdRegistro++
        console.log(this.idRegistro)

        }else {
            changeModal('danger','Excesso de atividades registrado','Você já tem muito a fazer, termine uma das atividades registradas primeiro.')
            $('#modalAlerts').modal('show')
            $('#modalAlerts').on('show.bs.modal', function(){
                $('#btn-modal').trigger('focus')
            })
        }
        
        this.limparInput()
    }

    alterarStatus(id){
        
        //alterando classe dos itens html com base no id informado
        let checkRegistro = document.getElementById('i-'+id)
        let descricaoRegistro = document.getElementById('p-'+id)

        if(descricaoRegistro.className == 'd-inline pl-2 inativo'){
           //ALTERANDO ELEMENTO P (TEXTO) PARA RISCADO
            descricaoRegistro.className = 'd-inline pl-2'
            //ALTERANDO ELEMENTO I (CIRCULO) PARA CIRCLE CHECK
            checkRegistro.classList.add('far','fa-circle')
            checkRegistro.classList.remove('fas','fa-check-circle','text-success')
            this.doneQtd--
        } else {
            descricaoRegistro.className = 'd-inline pl-2 inativo'
            checkRegistro.classList.add('fas','fa-check-circle','text-success')
            checkRegistro.classList.remove('far','fa-circle')
            this.doneQtd++
        }

        if(this.doneQtd == this.qtdRegistro){
            changeModal('success','Parabéns','Você finalizou todas as atividades!')
            $('#modalAlerts').modal('show')
            $('#modalAlerts').on('show.bs.modal', function(){
                $('#btn-modal').trigger('focus')
            })
        }
    }

    deletarAtvidade(id){
        
        //corrigind contagem de atividades realizadas
        let descricaoRegistro = document.getElementById('p-'+id)

        if(descricaoRegistro.className = 'd-inline pl-2 inativo'){
            this.doneQtd--
        }
        this.qtdRegistro--
        let element = document.getElementById(id)
        console.log(this.qtdRegistro, this.doneQtd)
        document.getElementById('list').removeChild(element)
       
    }

    limparLista(){
        let listAtividades = document.getElementById('list')
        listAtividades.innerHTML = ""
        this.idRegistro = 0
        this.qtdRegistro = 0
        this.doneQtd = 0
    }

    limparInput(){
        let input = document.getElementById('add-atividade')
        input.value = ''
    }
}

let toDo = new ToDo()


function changeModal(color,title,mensagem) {
    let modal = document.getElementById('exampleModalLabel')
    let modalBody = document.getElementById('modal-body')
    let buttonModal = document.getElementById('btn-modal')
    modal.className = `modal-title text-${color}`
    buttonModal.className = `btn btn-${color}`
    modal.innerHTML = title
    modalBody.innerHTML = mensagem
}


let hoje = new Date()
console.log(hoje)
function dataHoje(d){
    let dia
    switch (d.getDay()) {
        case 0: dia = 'Domingo'
            break;
        case 1: dia = 'Segunda-feira'
            break;
        case 2: dia = 'Terça-feira'
            break;
        case 3: dia = 'Quarta-feira'
            break;
        case 4: dia = 'Quinta-feira'
            break;
        case 5: dia = 'Sexta-feira'
            break;
        case 6: dia = 'Sábado'
            break;
    }

    let mes
    switch (d.getMonth()) {
        case 0: mes = 'Jan.'
            break;
        case 1: mes = 'Fev.'
            break;
        case 2: mes = 'Mar.'
            break;
        case 3: mes = 'Abr.'
            break;
        case 4: mes = 'Maio.'
            break;
        case 5: mes = 'Jun.'
            break;
        case 6: mes = 'Jul.'
            break;
        case 7: mes = 'Ago.'
            break;
        case 8: mes = 'Set.'
            break;
        case 9: mes = 'Out.'
            break;
        case 10: mes = 'Nov.'
            break;
        case 11: mes = 'Dez.'
            break;
      
    }

    document.getElementById('hoje').innerHTML =  (`${dia}, ${mes} ${d.getDate()}`)

}

dataHoje(hoje)

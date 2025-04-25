const carrinho = document.getElementsByClassName('carrinho-formato')[0];
const botaoCarrinho = document.getElementById('botao-carrinho');
const botaoFechar = document.getElementById('fechar');

// Abrir Pedidos
botaoCarrinho.addEventListener('click', function(){
    carrinho.style.display= 'flex'
})

// Fechar Pedidos
botaoFechar.addEventListener('click', function fecharPedidos(){
    carrinho.style.display= 'none'
})

// Contar pedidos 
const pedidos = document.getElementById('pedidos')
const mostrarTotal = document.getElementById('total')
let contador = document.getElementById('cont-pedidos')
let cont = 0
let total = 0

//Criando objeto
const itensCarrinho = {}

document.querySelectorAll('button.comprar').forEach (botao =>{
    botao.addEventListener('click', function (){
        let nome = botao.getAttribute('data-name')
        let preco = Number(botao.getAttribute('data-price'))

    
        if (itensCarrinho[nome]){
            itensCarrinho[nome].quantidade++
            itensCarrinho[nome].elemento.querySelector('span').textContent = `${nome}- R$${preco},00 [${itensCarrinho[nome].quantidade}]`
        } else {

            let itemPedido = document.createElement('div')
            itemPedido.className = 'item-pedido'
            itemPedido.dataset.price = preco 
            itemPedido.dataset.name = nome
            
            let span = document.createElement('span')
            span.textContent = `${nome}- R$${preco},00 [1]`
            
            let botaoCancelar = document.createElement('button')
            botaoCancelar.className = 'cancelar'
            botaoCancelar.textContent = 'Cancelar'
            botaoCancelar.addEventListener('click', function(){
                if(itensCarrinho[nome].quantidade>1){
                    itensCarrinho[nome].quantidade--
                    itensCarrinho[nome].elemento.querySelector('span').textContent = `${nome}- R$${preco},00 [${itensCarrinho[nome].quantidade}]`
                } else {
                    delete itensCarrinho[nome]
                    pedidos.removeChild(itemPedido)
                }

                total-= preco
                cont--
                atualizarTotal()
            })
            
            itemPedido.appendChild(span)
            itemPedido.appendChild(botaoCancelar)
            pedidos.appendChild(itemPedido)

            
            itensCarrinho[nome]={
                quantidade: 1,
                preco: preco,
                elemento: itemPedido
            }
        }

        cont++
        total+=preco
        atualizarTotal()

    })
})

function atualizarTotal(){
    mostrarTotal.innerHTML= `<strong> R$${total},00</strong>`
    if (cont !== 0){
        contador.style.display = 'flex'
        contador.innerHTML = `${cont}`
    } else {
        contador.style.display = 'none'
    }
    
}



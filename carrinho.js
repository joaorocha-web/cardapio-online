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
document.querySelectorAll('button.comprar').forEach (botao =>{
    botao.addEventListener('click', function (){
        let nome = botao.getAttribute('data-name')
        let preco = Number(botao.getAttribute('data-price'))

        //Criando div separada para cada pedido
        let itemPedido = document.createElement('div')
        itemPedido.className = 'item-pedido'
        itemPedido.dataset.price = preco

        itemPedido.innerHTML = `<span> ${nome}- R$${preco},00</span><button class="cancelar">Cancelar</button>`

        pedidos.appendChild(itemPedido)


        total += preco
        cont++
        atualizarTotal()

        itemPedido.querySelector('.cancelar').addEventListener('click', function (){
            pedidos.removeChild(itemPedido)
            total-= preco
            cont--
            atualizarTotal()
        })
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



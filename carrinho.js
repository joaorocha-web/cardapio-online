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

carrinho.addEventListener('click', function (event){
    if(event.target === carrinho){
        carrinho.style.display= 'none'
    }
})

// Contar pedidos 
const pedidos = document.getElementById('pedidos')
const mostrarTotal = document.getElementById('total')
let contador = document.getElementById('cont-pedidos')
let cont = 0
let total = 0
atualizarTotal()
//Criando objeto
const itensCarrinho = {}

document.querySelectorAll('button.comprar').forEach (botao =>{
    botao.addEventListener('click', function (){
        //animação do carrinho ao clicar em pedir
        
           botaoCarrinho.classList.remove('animar');
           setTimeout(() => {
               botaoCarrinho.classList.add('animar');
           }, 10);

        
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


// Adicionando scrollReveal 
ScrollReveal().reveal('.boas-vindas',{
    duration:1500,
    origin: 'right',
    distance: '160px'

})

ScrollReveal().reveal('.efeito1 , .efeito', {
    duration: 2300,
    origin: 'left',
    distance:'90px'
})

ScrollReveal().reveal('.efeito2 , .efeito3', {
    duration: 2500,
    origin: 'left',
    distance:'90px'
})

// configurando o input para direcionar ao whatsApp
const confirmar = document.getElementById('confirmar')
const endereco = document.getElementById('endereco')
confirmar.addEventListener('click', function() {
    // 1. Validações básicas
    if (endereco.value.trim().length < 10) {
        endereco.style.border = '2px solid red';
        return;
    }

    // 2. Formatar mensagem SIMPLES (sem caracteres especiais)
    let mensagem = "PEDIDO:\n\n";
    
    Object.keys(itensCarrinho).forEach(key => {
        const item = itensCarrinho[key];
        mensagem += `${key}: ${item.quantidade}x R$ ${item.preco}\n`;
    });
    
    mensagem += `\nTotal: R$ ${total}\n`;
    mensagem += `Endereço: ${endereco.value.trim()}`;

    // 3. Criar elemento VISÍVEL na página
    const linkContainer = document.createElement('div');
    linkContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border: 2px solid #25D366;
        border-radius: 10px;
        z-index: 10000;
        text-align: center;
    `;

    linkContainer.innerHTML = `
        <p style="margin-bottom: 15px; font-weight: bold;">Pedido pronto!</p>
        <p style="margin-bottom: 10px; font-size: 14px;">Clique no botão abaixo para abrir no WhatsApp:</p>
        <a href="https://wa.me/5532991263739" 
           onclick="this.href='https://wa.me/5532991263739?text='+encodeURIComponent(\`${mensagem}\`)" 
           style="
               background: #25D366;
               color: white;
               padding: 10px 15px;
               border-radius: 5px;
               text-decoration: none;
               display: inline-block;
           ">
           📲 Abrir WhatsApp
        </a>
        <button 
            onclick="this.parentElement.remove()" 
            style="
                position: absolute;
                top: 5px;
                right: 5px;
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
            ">
            ×
        </button>
    `;

    document.body.appendChild(linkContainer);
});
//verificar se a pizzaria está aberta
function pizzariaAberta(){
    const data = new Date()
    const hora = data.getHours()
    return hora >= 12 && hora <= 24
}

const abertoOuFechado = document.getElementById('horario')
if(!pizzariaAberta()){abertoOuFechado.style.background= '#BD3537'}

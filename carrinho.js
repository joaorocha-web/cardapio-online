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
    // 1. Validações
    if (endereco.value.trim().length < 10) {
        endereco.style.border = '2px solid #ff4444';
        return;
    }

    // 2. Construir mensagem
    const itens = Object.entries(itensCarrinho).map(([nome, item]) => 
        `• ${nome}: ${item.quantidade}x R$ ${item.preco.toFixed(2).replace('.', ',')}`
    ).join('\n');

    const mensagem = `*🍕 PEDIDO CONFIRMADO 🍕*\n\n${itens}\n\n*Total*: R$ ${total.toFixed(2).replace('.', ',')}\n*Endereço*: ${endereco.value.trim()}\n\n*Obrigado pela preferência!*`;

    // 3. MOSTRAR MODAL PRIMEIRO (sem abrir WhatsApp ainda)
    mostrarModalVerde(mensagem, '5532991263739'); // Substitua pelo seu número
});

// Modal verde vibrante (agora controla o redirecionamento)
function mostrarModalVerde(mensagem, numero) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    modal.innerHTML = `
        <div style="
            background: white;
            border-radius: 12px;
            overflow: hidden;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            border-top: 5px solid #25D366;
        ">
            <div style="
                background: linear-gradient(135deg, #25D366, #128C7E);
                color: white;
                padding: 20px;
                text-align: center;
            ">
                <h2 style="margin: 0; font-size: 22px;">🎉 Pedido Pronto!</h2>
                <p style="margin: 10px 0 0; opacity: 0.9;">Clique abaixo para enviar</p>
            </div>
            
            <div style="padding: 20px;">
                <div style="
                    background: #f9f9f9;
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 20px;
                    max-height: 200px;
                    overflow-y: auto;
                ">
                    <pre style="margin: 0; font-family: Arial; white-space: pre-wrap;">${mensagem.replace(/\*/g, '')}</pre>
                </div>
                
                <button id="enviarWhatsAppBtn"
                   style="
                       width: 100%;
                       background: #25D366;
                       color: white;
                       border: none;
                       padding: 12px;
                       border-radius: 6px;
                       font-weight: bold;
                       cursor: pointer;
                       margin-bottom: 10px;
                       transition: all 0.3s;
                   "
                   onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 5px 15px rgba(37, 211, 102, 0.4)';"
                   onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none';"
                >
                    📲 ENVIAR VIA WHATSAPP
                </button>
                
                <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" 
                   style="
                       width: 100%;
                       padding: 10px;
                       background: white;
                       color: #666;
                       border: 1px solid #ddd;
                       border-radius: 6px;
                       cursor: pointer;
                       transition: all 0.3s;
                   "
                   onmouseover="this.style.borderColor='#25D366'; this.style.color='#25D366';"
                   onmouseout="this.style.borderColor='#ddd'; this.style.color='#666';"
                >
                    Fechar
                </button>
            </div>
        </div>
    `;

    // Adiciona evento ao botão verde
    modal.querySelector('#enviarWhatsAppBtn').addEventListener('click', function() {
        // Só abre o WhatsApp quando clicado no botão verde
        window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, '_blank');
        modal.remove(); // Fecha o modal após abrir WhatsApp
    });

    document.body.appendChild(modal);
}
//verificar se a pizzaria está aberta
function pizzariaAberta(){
    const data = new Date()
    const hora = data.getHours()
    return hora >= 19 && hora <= 24
}

const abertoOuFechado = document.getElementById('horario')
if(!pizzariaAberta()){abertoOuFechado.style.background= '#BD3537'}

// vamos configurar o menu interativo
const botaoMenu = document.getElementById('botao-menu')
const menu = document.getElementById('menu')
const fecharMenu = document.getElementById('fechar-menu')


botaoMenu.addEventListener('click', function(){
    menu.style.display= 'block'
})

fecharMenu.addEventListener('click', function(){
    menu.style.display= 'none'
})

document.getElementById('links').addEventListener('click', function (){
     menu.style.display= 'none'
})

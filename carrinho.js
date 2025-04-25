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
    // 1. Validações iniciais
    const inputValor = endereco.value.trim();
    if (inputValor.length < 10) {
        alert('🚨 Endereço muito curto! Mínimo 10 caracteres');
        endereco.style.border = '2px solid #ff4444';
        return;
    }

    if (!pizzariaAberta()) {
        alert('⏰ Estamos fechados! Horário de funcionamento: 18h às 23h');
        return;
    }

    // 2. Construção da URL de forma ultra compatível
    const itensPedido = Object.keys(itensCarrinho).map(key => {
        const item = itensCarrinho[key];
        return `▪ ${key.replace(/:/g, '')} - ${item.quantidade}x (R$ ${item.preco})`;
    }).join('%0a');

    const mensagemBruta = 
        `*PEDIDO PIZZARIA*%0a%0a` +
        `${itensPedido}%0a%0a` +
        `*Total*: R$ ${total}%0a` +
        `*Endereço*:%0a${inputValor}`;

    const mensagemCodificada = encodeURIComponent(mensagemBruta)
        .replace(/'/g, '%27')
        .replace(/\*/g, '%2a');

    const numeroInternacional = '5532991263739'; // Sem espaços ou caracteres especiais
    const urlWhatsApp = `https://web.whatsapp.com/send?phone=${numeroInternacional}&text=${mensagemCodificada}`;

    // 3. Sistema inteligente de abertura
    const abrirWhatsApp = () => {
        // Tentativa 1: Método padrão
        const janela = window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
        
        // Verificação em tempo real
        setTimeout(() => {
            if (!janela || janela.closed || janela.location.href === 'about:blank') {
                // Tentativa 2: Criação dinâmica de link
                const link = document.createElement('a');
                link.href = urlWhatsApp;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Fallback final
                setTimeout(() => {
                    if (!window.open(urlWhatsApp, '_blank')) {
                        const mensagemAlerta = `Se o WhatsApp não abrir automaticamente, copie este link:${urlWhatsApp}`;
                        alert(mensagemAlerta);
                    }
                }, 1000);
            }
        }, 300);
    };

    // 4. Pré-carregamento essencial
    const preload = new Image();
    preload.src = 'https://web.whatsapp.com/favicon.ico';
    preload.onload = abrirWhatsApp;
    preload.onerror = abrirWhatsApp;

    // 5. Debug no console
    console.log('URL Gerada:', decodeURIComponent(urlWhatsApp));
});

//verificar se a pizzaria está aberta
function pizzariaAberta(){
    const data = new Date()
    const hora = data.getHours()
    return hora >= 12 && hora <= 24
}

const abertoOuFechado = document.getElementById('horario')
if(!pizzariaAberta()){abertoOuFechado.style.background= '#BD3537'}
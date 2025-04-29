const imgPizza = document.getElementById('img-pizza')



const desabilitar1 = document.getElementById('desabilitado1')
const desabilitar2 = document.getElementById('desabilitado2')
const estiloDesabilitar2 = window.getComputedStyle(desabilitar2).display;
let c = 1
document.querySelectorAll('.opcao').forEach(saborPizza =>{
    saborPizza.addEventListener('click', function(){
        
        
        console.log(c)
        desabilitar1.style.display= 'flex'
        let nome = saborPizza.getAttribute('data-name');
        let preco = Number(saborPizza.getAttribute('data-price'));
        let sabor = saborPizza.getAttribute('data-sabor')
        imgPizza.src = `pizza-metade-${sabor}.png`
        
        if(c === 1){
            imgPizza.src = `pizza-metade-${sabor}.png`
        } else{
            imgPizza.src = `pizza-metade-${sabor}-metade-calabresa.png`
        }

        
        const estiloAtual = window.getComputedStyle(desabilitar2).display;
        desabilitar2.style.display = estiloAtual === 'flex' ? 'none' : 'flex';

        c++
    })

   
})


const containers = document.querySelectorAll('.primeiro-sabor, .segundo-sabor');


containers.forEach(container => {
    container.addEventListener('wheel', (e) => {
        e.preventDefault(); 
        container.scrollBy({
            top: e.deltaY > 0 ? 50 : -50, // Rola 50px para baixo ou cima
            behavior: 'smooth'
        });
    });
});

const container = document.getElementsByClassName('primeiro-sabor')[0];
const mascara = document.getElementsByClassName('selecionar')[0];
const opcoes = document.querySelectorAll('.opcao');

container.addEventListener('scroll', function() {
    const containerRect = container.getBoundingClientRect();
    const mascaraRect = mascara.getBoundingClientRect();
    
    // Posição da máscara relativa ao contêiner
    const mascaraTop = mascaraRect.top - containerRect.top;
    const mascaraBottom = mascaraTop + mascara.offsetHeight;

    opcoes.forEach(opcao => {
        const opcaoRect = opcao.getBoundingClientRect();
        const opcaoTop = opcaoRect.top - containerRect.top;
        const opcaoBottom = opcaoTop + opcao.offsetHeight;

        // Verifica se a opção está dentro da máscara
        if (opcaoBottom > mascaraTop && opcaoTop < mascaraBottom) {
            opcao.classList.add('destaque');
        } else {
            opcao.classList.remove('destaque');
        }
    });
});

const container2 = document.getElementsByClassName('segundo-sabor')[0];
const mascara2 = document.getElementsByClassName('selecionar')[1];
const opcoes2 = document.querySelectorAll('.opcao');


container2.addEventListener('scroll', function() {
    const containerRect = container.getBoundingClientRect();
    const mascaraRect = mascara.getBoundingClientRect();
    
    // Posição da máscara relativa ao contêiner
    const mascaraTop = mascaraRect.top - containerRect.top;
    const mascaraBottom = mascaraTop + mascara.offsetHeight;

    opcoes.forEach(opcao => {
        const opcaoRect = opcao.getBoundingClientRect();
        const opcaoTop = opcaoRect.top - containerRect.top;
        const opcaoBottom = opcaoTop + opcao.offsetHeight;

        // Verifica se a opção está dentro da máscara
        if (opcaoBottom > mascaraTop && opcaoTop < mascaraBottom) {
            opcao.classList.add('destaque');
        } else {
            opcao.classList.remove('destaque');
        }
    });
});
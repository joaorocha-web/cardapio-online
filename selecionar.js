const desabilitar1 = document.getElementById('desabilitado1')
const desabilitar2 = document.getElementById('desabilitado2')
const estiloDesabilitar2 = window.getComputedStyle(desabilitar2).display;
document.querySelectorAll('.opcao').forEach(sabor =>{
    sabor.addEventListener('click', function(){
        let nome = sabor.getAttribute('data-name');
        let preco = Number(sabor.getAttribute('data-price'));
       

        
    desabilitar1.style.display = 'flex';


    const estiloAtual = window.getComputedStyle(desabilitar2).display;
    desabilitar2.style.display = estiloAtual === 'flex' ? 'none' : 'flex';
    })

   
})
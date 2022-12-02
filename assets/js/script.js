
async function loadFac(){
	let req = await fetch('https://stark-cove-48986.herokuapp.com/seguros/motivos'); //requisição que retorna uma promise
	let json = await req.json()//pega meus dados que a promise retorna e transforma em json
	montarAccordion(json); //chama função para montar o accordion na tela com a lista obtida
}

function montarAccordion(lista){
	let html = document.querySelector('.accordion').innerHTML;

	let width = window.screen.width;

	let open = '';

	for(let i in lista){
		/*Definir se 1º acordion virá ou não aberto
		 *Apenas 1º accordion iniciará aberto
		 *Iniciará aberto apenas nas versões a partir de tablet - mobile fechado
		 */

		if (i == 0 && width >= 768) {
			open = 'open';
		}else{
			open = '';
		}

		html += '<details '+ open +'>';
		html += '<summary class="has-x-small-font-size">'+lista[i].title+'</summary>';
		html += '<p>'+lista[i].text+'</p> </details>';
	}

	document.querySelector('.accordion').innerHTML = html;
}

/*Ajustar textos da área de contato na versão mobile*/
function trocarTextoMobile(){
	let title = document.querySelector('#contato .title-contato h2');
	let texto = document.querySelector('#contato .dados-contato h3');
	let whatsapp = document.querySelector('#contato .dados-contato a.whatsapp span');


	let width = window.screen.width;
	if(width < 992){
		/*Texto mobile*/
		title.innerHTML = "Ainda tem dúvidas sobre seguro de vida?";
		texto.innerHTML = "Entre em contato e receba uma consultoria personalizada gratuitamente";
		whatsapp.innerHTML = "Também respondemos pelo Whatsapp!";
		
	}else{
		/*Texto desktop*/
		title.innerHTML = "Ainda não sabe qual seguro contratar?";
		texto.innerHTML = "Ligue pra gente e receba uma consultoria personalizada gratuitamente!";
		whatsapp.innerHTML = "Se preferir, entre em contato pelo Whatsapp";
	}
}


window.onload = function(){
	loadFac();
	trocarTextoMobile();

	var header = document.querySelector("header");

	window.onscroll = function(){
		if (window.pageYOffset > 50) {
		    header.classList.add("sticky");
		  } else {
		    header.classList.remove("sticky");
		  }
	};

	/*Fechar menu mobile ao clicar sobre overlay*/
	document.querySelector('.menu-overlay').addEventListener("click", function(){
        document.querySelector('#ckb-menu-mobile').checked = false;
 	});
 	
	
}

window.onresize = function(){
	trocarTextoMobile()
};




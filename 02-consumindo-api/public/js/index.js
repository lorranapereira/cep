const form = document.querySelector('form');
const divResultado = document.querySelector('div#resultado');
const scriptTemplate = document.querySelector('#template');
const input = document.querySelector('input');
input.focus();
input.value+="00000000";
form.addEventListener('submit', function(e) {
  busca(form.cep.value);
  e.preventDefault();
});

function ajax(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = callback;
  xhr.send();
}

function busca(cep) { // cep: 96201460
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  ajax(url, function(e) {
    printa(JSON.parse(e.target.response));
  });
}

function printa(json) {
  if (!json.erro == true) {
    const template = scriptTemplate.innerText;
    const handlebars = Handlebars.compile(template);
    const html = handlebars(json);
    console.log(json);
    divResultado.innerHTML = html;
    
  }
  else{
    sucesso("CEP NÃO ENCONTRADO");
  }
}

function sucesso(mensagem) {
  var source = document.querySelector("#sucesso").innerHTML;
  var template = Handlebars.compile(source);
  var html = template({ mensagem: mensagem });
  document.querySelector('div.mensagem').innerHTML = html;
}

function sucesso(mensagem) {
  var source = document.querySelector("#sucesso").innerHTML;
  var template = Handlebars.compile(source);
  var html = template({ mensagem: mensagem });
  document.querySelector('div.mensagem').innerHTML = html;
}


cep.oninput = function () {

  if(this.value.length>=9){
    this.value = this.value.slice(1,9);
  }
  else{
     this.value = "00"+this.value;
     this.value = this.value.slice(1,9);
     
  }
}

function limpa(){
  input.value="";
}

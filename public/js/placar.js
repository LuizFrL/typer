var campoTabela = $('.placar').find('tbody')
firebase.database().ref('placar/').on('value', function (snapshot) {
    snapshot.forEach(element => {
        var placar = element.val().placar;
        var linha = $('<tr>');
        linha.append(placar);
        campoTabela.prepend(linha);
    });
})

function removerPlacar() {
    $("#removerPlacar").click(function () {
        var linha = $(this).parent().parent()
        linha.fadeOut()
        setInterval(function () {
            linha.remove()
        }, 500)
    })
}

function adicionaPlacar() {
    var linha = NovaLinha();

    firebase.database().ref('placar/').push({
        placar : linha.html()
      });
    reiniciarJogo()
    mostra()
    var posicao = $('.placar').offset().top
    $("body").animate({
        scrollTop: posicao
    }, 500)
}


function NovaLinha() {

    var tr = $("<tr>")

    var usuario = montaTdUsuario()
    var palavras = $("<td>").text($('#quantidadePalavras').text())
    var erro = $("<td>").text(contador_erro)
    var idFrase = $("<td>").text($("#id-frase").text())

    contador_erro = 0;
    tr.append(usuario)
    tr.append(palavras)
    tr.append(erro)
    tr.append(idFrase)


    return tr
}

function mostrarPlacar() {
    var placarmostrar = $('#mostrar-placar')
    placarmostrar.on('click', () => {
        mostra()
    })
}

function mostra() {
    $(".placar").stop().slideDown()
    $('#mostrar-placar').addClass("sumir")
    $("#esconder-placar").removeClass("sumir")
}

function esconderPlacar() {
    var esconderplacar = $("#esconder-placar")
    esconderplacar.on('click', () => {
        $(".placar").stop().slideUp()
        esconderplacar.toggleClass('sumir')
        $('#mostrar-placar').toggleClass("sumir")

    })
}

function montaTdUsuario() {
    var td = $("<td>")
    var div = $('<div>').addClass("col s2")
    var span = $("<span>").text( $("#displayName").text()).attr('id', 'span-texto')
    var image = $('<img>')
    .addClass('circle responsive-img')
    .attr('src', $("#photoURL").attr('src'))
    .attr('id','placar-imagem')
    div.prepend(span)
    div.prepend(image)
    td.prepend(div)
    
    return td


}
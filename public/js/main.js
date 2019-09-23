var textoDigitado = $(".Texto-Digitado")
var tempoInicial = $("#Tempo").text()

function finalGame() {
    textoDigitado.one("input", event => {
        
        var tempoID = setInterval(function () {
            var tempoDigitacao = $("#Tempo").text()
            tempoDigitacao--
            $("#Tempo").text(tempoDigitacao)
            if (tempoDigitacao == 0) {
                finalizaJogo()
                clearInterval(tempoID)
                finalGame()
            }
        }, 1000)

    })
}

function finalizaJogo(){
    textoDigitado.attr("disabled", true)
    textoDigitado.addClass("finalizado")
    
    $('#Tempo').text('1')
    reiniciarJogo()
    
    $("#quantidadePalavras").text('')
    $("#quantidadeCaracters").text('')

}

function reiniciarJogo() {
    $('#reiniciar-jogo').one("click", function () {
        textoDigitado.val('')
        textoDigitado.attr("disabled", false)
        textoDigiLen()
        palavraQtdFrase()
        $("#Tempo").text(tempoInicial)
        textoDigitado.removeClass("finalizado")
        textoDigitado.removeClass('borda-verde')
        textoDigitado.removeClass('borda-vermelha')
        textoDigitado.focus()
    })
}

function atualizatempoInicial(time){
    var tempo = $("#Tempo")
    tempo.text(time)
    tempoInicial = time
}

$("#logout").click( () => { firebase.auth().signOut() } )

function dispararModalAlerta(mensagem, cor){
    const modal = document.querySelector(".modalAlerta");
    modal.children[0].innerHTML = mensagem;
    modal.style.backgroundColor = cor;
    modal.style.display = "block";
}

function fazerUpload(event){
    event.preventDefault();

    const form = event.target;
    const formData = new FormData();
    formData.append("foto", form.children[0].files[0]);
    form.children[0].value = "";

    axios({
        method: "post",
        url: "/upload",
        data: formData
    })
        .then(res => {
            dispararModalAlerta("Enviado!", "rgb(82, 223, 82)");
        })
        .catch(e => {
            console.log(e);
        })
}

document.getElementById("enviarImagem").addEventListener("submit", fazerUpload);

document.getElementById("converter").addEventListener("click", (event) => {
    event.preventDefault();

    dispararModalAlerta("Carregando...", "rgb(207, 207, 78)");

    axios.get("/converter")
        .then(res => {
            dispararModalAlerta("Concluído!", "rgb(82, 223, 82)");
            document.getElementById("editorDeTextoBody").innerHTML = res.data.replace("\n", "<br>");
        })
        .catch(e => {
            console.log(e);
        })
})

const botoes = document.querySelectorAll(".btn");
botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        let command = botao.dataset["element"];

        document.execCommand(command, false, null);
    })
})
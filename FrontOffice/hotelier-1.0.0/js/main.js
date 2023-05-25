(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });

})(jQuery);

/*REGISTER*/

function RegistarUtilizador(event) {
    event.preventDefault();
    let a = [];
    a = JSON.parse(localStorage.getItem("Utilizadores")) || [];
    const nome = document.querySelector("#nome");
    const user = document.querySelector("#user");
    const email = document.querySelector("#email");
    const nif = document.querySelector("#nif");
    const tel = document.querySelector("#tel");
    const pass = document.querySelector("#pass");
    const passconf = document.querySelector("#passconf");
    let data = {};
    if (nome.value == null || nome.value == "") {
        alert('Por favor insira o seu nome.');
        return;
    }


    if (user.value == null || user.value == "") {
        alert('Por favor insira um username.');
        return;
    }
    var itemIndex = a.findIndex(item => item.user === user.value);

    if (itemIndex !== -1) {
        alert('Esse username já pertence a outro utilizador.');
        return;
    }


    if (nif.value == null || nif.value == "") {
        alert('Por favor insira o seu NIF.');
        return;
    }
    var itemIndex = a.findIndex(item => item.nif === nif.value);

    if (itemIndex !== -1) {
        alert('Já existe uma pessoa com esse NIF. Insira o seu por favor!!');
        return;
    }



   // let data2 = {};
    if (email.value == null || email.value == "") {
        alert('Por favor insira o seu email.');
        return;
    }

    if (tel.value == null || tel.value == "") {
        alert('Por favor insira o seu número de telemóvel.');
        return;
    }

    if (pass.value == null || pass.value == "") {
        alert('Por favor insira a sua password.');
        return;
    } else if (passconf.value == null || passconf.value == "") {
        alert('Por favor insira a sua confirmacao da password.');
        return;
    } else if (pass.value != passconf.value) {
        alert('A password de confirmação não corresponde à password inserida\n Insira novamente!');
        return;
    } else {

        data["Nome"] = nome.value;
        data["Username"] = user.value;
        data["NIF"] = nif.value;
        data["Email"] = email.value;
        data["Contacto"] = tel.value;
        data["Password"] = pass.value;
        data["Imagem"] = "";
        data["Tipo"] = "Cliente"
        SaveDataToLocalStorageClientes(data);
        /*data2["Nome"] = "Admin";
        data2["Username"] = "Admin";
        data2["NIF"] = "123456789";
        data2["Email"] = "Admin@adm.com";
        data2["Contacto"] = "123456789";
        data2["Password"] = "Admin";
        data2["Imagem"] = "";
        data2["Tipo"] = "Admin"
        SaveDataToLocalStorageClientes(data2);*/
        alert('Registado com sucesso!');
        window.location.href = "Login.html";
    }

}

function SaveDataToLocalStorageClientes(data) {
    let a = [];
    a = JSON.parse(localStorage.getItem("Utilizadores")) || [];
    a.push(data);
    localStorage.setItem("Utilizadores", JSON.stringify(a));
}

function Login(event) {

    event.preventDefault();
    const nome = document.querySelector("#nome");
    const pass = document.querySelector("#pass");
    if (nome.value == null || nome.value == "") {
        alert('Por favor insira o seu nome.');
        return;
    }
    else if (pass.value == null || pass.value == "") {
        alert('Por favor insira a sua password.');
        return;
    }
    let a = JSON.parse(localStorage.getItem("Utilizadores"))

    var utilizador = a.findIndex(item => item.Username === nome.value);
    if (utilizador !== -1) {
        if (a[utilizador].Password == pass.value) {
            sessionStorage.setItem("UtilizadorLigado", JSON.stringify(a[utilizador]))
            window.location.href = "index.html";
        } else {
            alert('A palavra-passe está incorreta.');
        }

    } else {
        alert('Este utilizador não existe.');
    }
}

const CamposDisponiveis = new Vue({
    el: '#ola',
    data: {
        items: [],
        Localizacoes: []
    },
    mounted() {
        const data = localStorage.getItem('Campos');
        if (data) {
            const parsedData = JSON.parse(data);
            this.items = parsedData;
            this.Localizacoes = this.items;
        }
    },
    methods: {
        hello() {
            const select = document.getElementById("SelectLocalizacao");
            const campos = localStorage.getItem('Campos');
            const camposJ = JSON.parse(campos);
            let a = [];
            if (select.value === "Nada") {
                this.items = camposJ;
                return;
            }
            for (let i = 0; i < camposJ.length; i++) {
                if (camposJ[i].Localizacao === select.value) {
                    a.push(camposJ[i]);
                }
            }

            this.items = a;
        },
        ReservasCampo(item) {
            sessionStorage.setItem("CampoEscolhido", JSON.stringify(item));
            window.location.href = "service.html";

        },
    },

});

const nCampos = new Vue({
    el: '#sobreNus',
    data: {
        nCampos: "",
    },
    mounted() {
        const data = localStorage.getItem('Campos');
        const dados = JSON.parse(data);
        this.nCampos = dados.length;
    },

});

const CampoaReservar = new Vue({
    el: '#tatudo',
    data: {
        imagem: "",
    },
    mounted() {
        const data = sessionStorage.getItem('CampoEscolhido');
        const dados = JSON.parse(data);
        this.imagem = dados.Imagem;
    },

});

function obterDiaDaSemana(data) {
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const diaDaSemana = data.getDay();
    return diasDaSemana[diaDaSemana];
}

function obterNomeMes(data) {
    const nomeMes = data.toLocaleString('pt-BR', { month: 'long' });
    return nomeMes;
}

function adicionarHora(hora, tempo) {
    const partes = hora.split(':');
    let horas = parseInt(partes[0]);
    let minutos = parseInt(partes[1]);

    horas += tempo;

    if (horas === 24) {
        horas = 0;
    }
    if (horas === 25) {
        horas = 01;
    }

    const novaHora = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    return novaHora;
}


function confirmar(x) {
    const data1 = document.getElementById("data").value;
    const paragrafo1 = document.getElementById("DataModal");
    const paragrafo2 = document.getElementById("DataModal2");
    const paragrafo3 = document.getElementById("DataModal3");
    const horario = document.getElementById("opt120");
    const campo = JSON.parse(sessionStorage.getItem("CampoEscolhido"))
    if (campo === null) {
        alert("Volte a esolher um campo")
        window.location.href = "campos.html";
        return;
    }
    const data = new Date(data1);
    if (data1 === "") {
        alert("Insira uma Data")
        return;
    }

    if (x === "00:00") {
        horario.style.display = "none";
    } else {
        horario.style.display = "inline";
    }


    const nomeMes = obterNomeMes(data);
    const diaSemana = obterDiaDaSemana(data);

    document.getElementById('modal123').style.display = 'block';
    document.getElementById('overlay123').style.display = 'block';
    let texto = diaSemana + ", " + data.getDate() + " de " + nomeMes + " de " + data.getFullYear();
    paragrafo1.innerHTML = texto;
    texto = x + "-" + adicionarHora(x, 1);
    paragrafo2.innerHTML = texto;
    paragrafo3.style.fontWeight = "bold"
    texto = "Total a Pagar: " + campo.Preco + "€";
    paragrafo3.innerHTML = texto;
}

function fecharconf() {
    const horario = document.getElementById("tempo2");
    horario.value = 1;
    document.getElementById('modal123').style.display = 'none';
    document.getElementById('overlay123').style.display = 'none';
}

function iniciarPag() {

    if (sessionStorage.getItem("UtilizadorLigado") === null) {
        document.getElementById("perfil12").remove();
        document.getElementById("BackOffice").remove();
    } else {
        document.getElementById("login12").remove();
    }
    if (JSON.parse(sessionStorage.getItem("UtilizadorLigado")).Tipo === "Cliente") {
        document.getElementById("BackOffice").remove();
    }
}

function horarios() {
    const butoes = document.getElementsByClassName("horas");
    const filtro = Number(document.getElementById("tempo").value);

    for (let i = 0; i < butoes.length; i++) {
        if (Number(butoes[i].name) < filtro) {
            console.log("tou aqui")
            butoes[i].style.display = "none";
        } else {
            butoes[i].style.display = "inline";
        }
    }
}

function tempo() {
    const horario = document.getElementById("tempo2");
    const paragrafo2 = document.getElementById("DataModal2");
    const paragrafo3 = document.getElementById("DataModal3");
    const campo = JSON.parse(sessionStorage.getItem("CampoEscolhido"))

    const partes = paragrafo2.innerHTML.split("-");
    if (horario.value === "1") {
        let texto2 = partes[0] + "-" + adicionarHora(partes[0], 1);
        paragrafo2.innerHTML = texto2;
        texto2 = "Total a Pagar: " + campo.Preco + "€";
        paragrafo3.innerHTML = texto2;
    } else {
        let texto2 = partes[0] + "-" + adicionarHora(partes[0], 2);
        paragrafo2.innerHTML = texto2;
        texto2 = "Total a Pagar: " + campo.Preco * 2 + "€";
        paragrafo3.innerHTML = texto2;
    }

}

function dados() {
    if (sessionStorage.getItem("UtilizadorLigado") === null) {
        document.getElementById("perfil12").remove();
        document.getElementById("BackOffice").remove();
    } else {
        document.getElementById("login12").remove();
    }
    if (JSON.parse(sessionStorage.getItem("UtilizadorLigado")).Tipo === "Cliente") {
        document.getElementById("BackOffice").remove();
    }
    const imagem = document.getElementById("quadrado-inserir-imagem5");
    const nome = document.getElementById("nome");
    const user = document.getElementById("user");
    const NIF = document.getElementById("nif");
    const email = document.getElementById("email");
    const tel = document.getElementById("tel");
    const Utilizador = JSON.parse(sessionStorage.getItem("UtilizadorLigado"));
    console.log(Utilizador.Imagem)
    imagem.style.backgroundImage = Utilizador.Imagem;
    imagem.style.backgroundSize = 'cover';
    imagem.style.backgroundPosition = 'center';
    imagem.style.backgroundRepeat = 'no-repeat';

    nome.value = Utilizador.Nome;
    user.value = Utilizador.Username;
    NIF.value = Utilizador.NIF;
    email.value = Utilizador.Email;
    tel.value = Utilizador.Contacto;


}

function editar() {

    const nome = document.getElementById("nome");
    const user = document.getElementById("user");
    const email = document.getElementById("email");
    const tel = document.getElementById("tel");
    const butao = document.getElementById("botao_editar");
    const inputImg = document.getElementById("input-inserir-imagem");

    nome.disabled = false;
    user.disabled = false;
    email.disabled = false;
    tel.disabled = false;
    inputImg.style.display = "inline"
    butao.innerHTML = "Guardar";
    butao.onclick = Guardar

}

function Guardar() {
    if (typeof localStorage !== 'undefined') {
        const Utilizadores = JSON.parse(localStorage.getItem('Utilizadores'));
        const userAtual = JSON.parse(sessionStorage.getItem('UtilizadorLigado'));
        const foto = sessionStorage.getItem('Imagem');

        const nome = document.getElementById("nome");
        const user = document.getElementById("user");
        const email = document.getElementById("email");
        const tel = document.getElementById("tel");

        var itemIndex = Utilizadores.findIndex(item => item.NIF === userAtual.NIF);

        if (itemIndex !== -1) {
            var itemIndex2 = Utilizadores.findIndex(item => item.user === user.value && item.NIF !== userAtual.NIF);

            if (itemIndex2 !== -1) {
                alert('Esse username já pertence a outro utilizador.');
                return;
            }
            Utilizadores[itemIndex].Nome = nome.value
            Utilizadores[itemIndex].Username = user.value
            Utilizadores[itemIndex].Email = email.value
            Utilizadores[itemIndex].Contacto = tel.value
            
            userAtual.Nome = nome.value
            userAtual.Username = user.value
            userAtual.Email = email.value
            userAtual.Contacto = tel.value

            if(!(foto === "" || foto === null)){
                Utilizadores[itemIndex].Imagem = foto
                userAtual.Imagem = foto
            }
            

            localStorage.setItem('Utilizadores', JSON.stringify(Utilizadores));
            sessionStorage.setItem('UtilizadorLigado', JSON.stringify(userAtual));


            window.location.reload()

            console.log('Os Dados foram alterados.');
            alert("Alterações com sucesso.")
        } else {
            console.log('Os Dados não foram alterados.');
        }
    } else {
        console.log('O LocalStorage não está disponível no navegador.');
    }
}


function previewImagem(event) {
    const input = event.target;
    const quadrado = document.getElementById("quadrado-inserir-imagem5");
    const imagem = input.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imagem);
    reader.onload = function () {
        quadrado.style.backgroundImage = `url(${reader.result})`;
        const estilo = quadrado.style.backgroundImage;
        quadrado.style.backgroundSize = 'cover';
        quadrado.style.backgroundPosition = 'center';
        quadrado.style.backgroundRepeat = 'no-repeat';
        sessionStorage.setItem("Imagem", estilo);
    };
}






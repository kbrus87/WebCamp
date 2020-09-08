(function() {
    'use strict';
    var regalo = document.getElementById('regalo');

    document.addEventListener('DOMContentLoaded', function() {


        if (document.getElementById('mapa')) {
            //MAPA
            var map = L.map('mapa').setView([-32.951568, -60.655346], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([-32.951568, -60.655346]).addTo(map)
                .bindPopup('Curso WEB en la ciudad de </br> Rosario')
                .openPopup()
                .bindTooltip('Un Tooltip')
                .openTooltip();
        }

        if (document.getElementById('calcular')) {
            // Campos Datos Usuario

            var nombre = document.getElementById('nombre');
            var apellid = document.getElementById('apellido');
            var email = document.getElementById('email');

            // Campos pases

            var pase_dia = document.getElementById('pase_dia')
            var pase_2dias = document.getElementById('pase_2dias')
            var pase_completo = document.getElementById('pase_completo')

            //Botones y divs

            var calcular = document.getElementById('calcular');
            var errorDiv = document.getElementById('error');
            var botonRegistro = document.getElementById('btnRegistro');
            var lista_productos = document.getElementById('lista-productos');
            var suma = document.getElementById('sub-total');

            //Extras

            var etiquetas = document.getElementById('etiquetas');
            var camisas = document.getElementById('camisa_evento');


            botonRegistro.disabled = true;




            calcular.addEventListener('click', calcularMontos);

            function calcularMontos(event) {
                event.preventDefault();


                if (regalo.value === '') {
                    alert("Debes elegir un regalo");
                    regalo.focus();
                } else {

                    var boletosDia = parseInt(pase_dia.value, 10) || 0,
                        boletos2Dias = parseInt(pase_2dias.value, 10) || 0,
                        boletoCompleto = parseInt(pase_completo.value, 10) || 0,
                        cantCamisas = parseInt(camisas.value, 10) || 0,
                        cantEtiquetas = parseInt(etiquetas.value, 10) || 0;



                    var totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + (cantCamisas * 0.93 * 10) + (cantEtiquetas * 2);

                    var listadoProductos = [];


                    if (boletosDia >= 1) {
                        listadoProductos.push(boletosDia + ' Pases por Día');
                    }

                    if (boletos2Dias >= 1) {
                        listadoProductos.push(boletos2Dias + ' Pases por Dos Dias');
                    }

                    if (boletoCompleto >= 1) {

                        listadoProductos.push(boletoCompleto + ' Pase completo');
                    }
                    if (cantCamisas >= 1) {

                        listadoProductos.push(cantCamisas + ' Camisas');
                    }

                    if (cantEtiquetas >= 1) {

                        listadoProductos.push(cantEtiquetas + ' Packs Etiquetas');
                    }

                    lista_productos.style.display = "block";
                    lista_productos.innerHTML = '';

                    for (var i = 0; i < listadoProductos.length; i++) {
                        lista_productos.innerHTML += listadoProductos[i] + '</br>';
                    }

                    suma.innerHTML = '$ ' + totalPagar.toFixed(2);

                    botonRegistro.disabled = false;
                    document.getElementById('total_pedido').value = totalPagar;
                    console.log(listadoProductos.length);

                }
            };
            pase_dia.addEventListener('blur', mostrarDias);
            pase_2dias.addEventListener('blur', mostrarDias);
            pase_completo.addEventListener('blur', mostrarDias);

            function mostrarDias() {
                var boletosDia = parseInt(pase_dia.value, 10) || 0,
                    boletos2Dias = parseInt(pase_2dias.value, 10) || 0,
                    boletoCompleto = parseInt(pase_completo.value, 10) || 0;
                var diasElegidos = [];


                if (boletosDia > 0) {
                    diasElegidos.push('viernes');
                    document.getElementById('sabado').style.display = 'none';
                    document.getElementById('domingo').style.display = 'none';
                }
                if (boletos2Dias > 0) {
                    diasElegidos.push('viernes', 'sabado');
                    document.getElementById('domingo').style.display = 'none';
                }
                if (boletoCompleto > 0) {
                    diasElegidos.push('viernes', 'sabado', 'domingo');
                } else if (boletosDia == 0 && boletos2Dias == 0 && boletoCompleto == 0) {
                    document.getElementById('sabado').style.display = 'none';
                    document.getElementById('domingo').style.display = 'none';
                    document.getElementById('viernes').style.display = 'none';
                }

                for (var i = 0; i < diasElegidos.length; i++) {
                    document.getElementById(diasElegidos[i]).style.display = 'block';
                    console.log(diasElegidos[i]);
                }



                console.log(diasElegidos[0]);
            };

            // VALIDACION

            nombre.addEventListener('blur', validarCampos);
            apellido.addEventListener('blur', validarCampos);
            email.addEventListener('blur', validarCampos);
            email.addEventListener('blur', validarMail);

            function validarCampos() {
                if (this.value == '') {
                    errorDiv.style.display = 'inline-block';
                    errorDiv.innerHTML = "Este Campo es Obligatorio";
                    this.style.border = '1px solid red';
                    errorDiv.style.border = '1px solid red';
                    errorDiv.parentElement.style.textAlign = 'center';
                } else {
                    errorDiv.style.display = 'none';
                    this.style.border = '1px solid #cccccc';
                }
            };

            function validarMail() {
                if (this.value.indexOf("@") > -1) {
                    errorDiv.style.display = 'none';
                    this.style.border = '1px solid #cccccc';
                } else {
                    errorDiv.style.display = 'inline-block';
                    errorDiv.innerHTML = "El E-Mail no es Válido";
                    this.style.border = '1px solid red';
                    errorDiv.style.border = '1px solid red';
                    errorDiv.parentElement.style.textAlign = 'center';
                }
            }



        }














    }); //DOM CONTENT LOADED
})();

$(function() {
    'use strict';

    //Programa de conferencias
    $('.programa-evento .info-curso:first').show();
    $('.menu-programa a:first').addClass('activo');
    $('.menu-programa a').on('click', function() {

        $('.menu-programa a').removeClass('activo');
        $(this).addClass('activo');
        $('.ocultar').hide();

        var enlace = $(this).attr('href');
        $(enlace).fadeIn(1000);

        return false
    })

    //Lettering
    $('.nombre-sitio').lettering();

    // Agregar clase a barra
    $('body.conferencia .navegacion-principal a:contains("Conferencia")').addClass('activo');
    $('body.invitados .navegacion-principal a:contains("Invitados")').addClass('activo');
    $('body.calendario .navegacion-principal a:contains("Calendario")').addClass('activo');


    // MY WAY OR THE HIGHWAY
    /* 
        $('.menu-programa a').on('click', function() {
            var enlace = $(this).attr('href');
            $('.info-curso').hide();
            $(enlace).fadeIn();

            return false
        })

    */

    // Animacion de Numeros
    /*
    let scroll = false;

    var s = window.scrollY;
    console.log(s);

    if (scroll == false && s >= 2300) {
        $('.resumen-evento li:nth-child(1) p').animateNumber({ number: 12 }, 1000);
        $('.resumen-evento li:nth-child(2) p').animateNumber({ number: 108 }, 1000);
        $('.resumen-evento li:nth-child(3) p').animateNumber({ number: 3 }, 1400);
        $('.resumen-evento li:nth-child(4) p').animateNumber({ number: 345 }, 1000);
        scroll = true;
    }*/

    let scrollVertical = 0;
    let i = 0;

    $(window).scroll(function() {
        // con window.scrollY definimos el número de pixeles que se ha descendido
        scrollVertical = window.scrollY;

        if (scrollVertical >= 2300 && i == 0) {
            $('.resumen-evento li:nth-child(1) p').animateNumber({ number: 6 }, 1200);
            $('.resumen-evento li:nth-child(2) p').animateNumber({ number: 108 }, 1200);
            $('.resumen-evento li:nth-child(3) p').animateNumber({ number: 3 }, 1000);
            $('.resumen-evento li:nth-child(4) p').animateNumber({ number: 405 }, 1500);

            i = 1;
            console.log(scrollVertical);

        }
    });

    // CUENTA REGRESIVA
    //MY WAY
    /*
        $('#clock li:nth-child(1) p').countdown('2021/10/10', function(event) {
            var $this = $(this).html(event.strftime('%D'));
        });
        $('#clock li:nth-child(2) p').countdown('2021/10/10 10:00:00', function(event) {
            var $this = $(this).html(event.strftime('%H'));
        });
        $('#clock li:nth-child(3) p').countdown('2021/10/10 10:00:00', function(event) {
            var $this = $(this).html(event.strftime('%M'))
        });
        $('#clock li:nth-child(4) p').countdown('2021/10/10 10:00:00', function(event) {
            var $this = $(this).html(event.strftime('%S'));
        });
    */

    //curso way

    $('.cuenta-regresiva').countdown('2020/07/23 16:00:00', function(event) {
        $('#meses').html(event.strftime('%-m'));
        $('#dias').html(event.strftime('%D'));
        $('#horas').html(event.strftime('%H'));
        $('#minutos').html(event.strftime('%M'));
        $('#segundos').html(event.strftime('%S'));
    })

    //Colorbox

    var invitado_info = document.getElementsByClassName('invitado-info');
    if (invitado_info.length) {
        $('.invitado-info').colorbox({ inline: true, width: "50%;" });

    }




    //Menu Fijo

    var windowheight = $(window).height();
    var barraAltura = $('.barra').innerHeight();

    console.log(barraAltura)

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= windowheight) {
            $('.barra').addClass('fixed');
            $('body').css({ 'margin-top': barraAltura + 'px' });
        } else {
            $('.barra').removeClass('fixed');
            $('body').css({ 'margin-top': '0px' });
        }

    });




    // MENU RESPONSIVE

    $('.menu-mobil').on('click', function() {
        $('.navegacion-principal').slideToggle();
    });







})
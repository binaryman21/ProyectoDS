$( document ).ready(function() {
    listarProvincias();
    listarTiposOrganizaciones();

    isLoggedIn();
    // $("#nombreColaborador").on("keyup change input",validarNombreColaborador);
    // $("#apellidoColaborador").on("keyup change input",validarApellidoColaborador);
    // $("#calle").on("keyup change input",validarNombreColaborador);
    // $("#numero").on("keyup change input",validarNombreColaborador);
    $("#btnRegistrarseComoOrganizacion").on('click', mostrarRegistrarseComoOrganizacion);
    $("#btnRegistrarseComoColaborador").on('click', mostrarRegistrarseComoColaborador);

    agregarPaginacionListaOrganizaciones();
    agregarPaginacionUsuarios();


    //Evento click del boton ingresar en el navbar
    $("#btnIngresar").click(function(){
        limpiarCamposRegistro();
        $("#modoRegistro").val("ingresar"); //seteo el modalLogin en "ingreso"
        $("#btnLogin").html("Ingresar"); //cambio el nombre del boton del modalLogin a "ingresar"
        $("#tituloModalLogin").html("Ingresar a solidariApp"); //Seteo el titulo del modalLogin
    });


    //evento click del boton del modalLogin
    $("#btnLogin").click(clickBtnLogin);

    //evento change en el selectProvincia
    $("#selectProvincia").change(function(){

        let idProvincia = $("#selectProvincia").val();
        $("#selectLocalidad").html("");
        listarLocalidades(idProvincia);
    });



    //evento click en el btnCrearCuenta del modalRegistroColOrg
    $("#btnCrearCuenta").click(function(){
        //Deshabilito el boton y muestro el spinner
        // $("#btnCrearCuenta").html("<span id = 'spinnerBtnLogin' class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Un momento...");
        // $("#btnCrearCuenta").attr("disabled", true);

        //Acciones segun el modoRegistro
        if($("#modoRegistro").val() == "colaborador")
        {
            if( validarRegistroColaborador() ){
                registrarColaborador();
            }
        }
        else if ($("#modoRegistro").val() == "organizacion"){
            if( validarRegistroOrganizacion() ){
                registrarOrganizacion();
            }
        }
    });
});


//Codigo que se ejecuta al clickear el boton del modalLogin
function clickBtnLogin()
{
    //Deshabilito el boton y muestro el spinner
    // $("#btnLogin").html("<span id = 'spinnerBtnLogin' class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Un momento...");
    // $("#btnLogin").attr("disabled", true);

    //Si el modoRegistro es "ingresar"
    if($("#modoRegistro").val() == "ingresar")
    {
        if( validarLogin() ){
            var datosLogin = {
                email: $("#emailUsuario").val(),
                idGoogle: 0,
                pass:$("#claveUsuario").val()
            };
            //hago el login
            login(datosLogin);
        }
    }
    else
    {
        if( validarRegistroGoogle() ){
            axios.post("/isUser",{email:$("#emailUsuario").val()})
            .then((response)=>{
                alert(response.data.isUser);
                if(response.data.isUser)
                {
                    limpiarCamposRegistro();
                    $("#errorCorreo").html("El correo ya esta registrado");
                    $("#errorCorreo").show();
                    $("#btnLogin").html("Ingresar");
                    $("#btnLogin").attr("disabled", false);
                }
                else
                {
                    $("#modalRegistroColOrg").modal("show");
                    $("#modalLogin").modal("hide");
                }
    
            });
        }

    }
}

function listarTiposOrganizaciones()
{
    return axios.get('/listarTipoOrganizaciones')
      .then((response)=>{
        let tiposOrganizaciones = response.data.tipoOrganizaciones;
        $.each(tiposOrganizaciones, function (indexInArray, tipoOrganizacion) {
            $("#selectTipoOrganizacion").append("<option value = '" + tipoOrganizacion.idTipoOrganizacion + "'>" + tipoOrganizacion.nombreTipoOrganizacion +"</option");
        });

      });
}


function registrarOrganizacion()
{
    var organizacion =
    {
        idUsuario:0,
        claveUsuario:$("#claveUsuario").val(),
        emailUsuario:$("#emailUsuario").val(),
        tokenGoogle:$("#idGoogle").val(),
        urlFotoPerfilUsuario:$("#urlFotoPerfilUsuario").val(),
        rol:{idRolUsuario:0,nombreRolUsuario:""},
        estado:{idEstadoUsuario:0,nombreEstadoUsuario:""},
        razonSocial:$("#nombreOrganizacion").val(),
        tipoOrganizacion:
        {
            idTipoOrganizacion:$("#selectTipoOrganizacion").val(),
            nombreTipoOrganizacion:$("#selectTipoOrganizacion :selected").text()
        },
        telefonos:
        [
            {idTelefono:0,
                codAreaTelefono:$("#codArea").val(),
                numeroTelefono:$("#numeroTelefono").val(),
                esCelular:0
            }
        ],
        domicilios:
        [
            {
                idDomicilio:0,
                calle:$("#calle").val(),
                numero:$("#numero").val(),
                piso:$("#piso").val(),
                depto:$("#depto").val(),
                latitud:0,
                longitud:0,
                localidad:
                {
                    idLocalidad:$("#selectLocalidad").val(),
                    nombreLocalidad:""
                }
            }
        ],
        links:
        [
            //{idLink:0,urlLink:"",tipoLink:{idTipoLink:0,nombreTipoLink:""}}
        ]
    }

    axios.post("/registrarOrganizacion",JSON.stringify(organizacion))
    .then((response)=>{

        alert(response.data.message);
        $("#btnCrearCuenta").html("Guardar");
        $("#btnCrearCuenta").attr("disabled", false);
        if(response.data.resultado == 1){
            $("#modalRegistroColOrg").modal("hide");
            $("#msjResultadoRegistro").html("Registro exitoso!");
            $("#modalResultadoRegistro").modal("show");

            var datosLogin = {
                email: organizacion.emailUsuario,
                idGoogle: organizacion.tokenGoogle,
                pass:organizacion.claveUsuario
            };

            login(datosLogin);

        }
        else{
            $("#modalRegistroColOrg").modal("hide");
            $("#msjResultadoRegistro").html("Algo fallo, intentalo mas tarde");
            $("#modalResultadoRegistro").modal("show");

        }
        });
}


function registrarColaborador()
{
    var colaborador =
    {
        idUsuario:0,
        claveUsuario:$("#claveUsuario").val(),
        emailUsuario:$("#emailUsuario").val(),
        tokenGoogle:$("#idGoogle").val(),
        urlFotoPerfilUsuario:$("#urlFotoPerfilUsuario").val(),
        rol:{idRolUsuario:0,nombreRolUsuario:""},
        estado:{idEstadoUsuario:0,nombreEstadoUsuario:""},
        nombreColaborador:$("#nombreColaborador").val(),
        apellidoColaborador:$("#apellidoColaborador").val(),

        telefonos:
        [
            {idTelefono:0,
                codAreaTelefono:$("#codArea").val(),
                numeroTelefono:$("#numeroTelefono").val(),
                esCelular:0
            }
        ],
        domicilios:
        [
            {
                idDomicilio:0,
                calle:$("#calle").val(),
                numero:$("#numero").val(),
                piso:$("#piso").val(),
                depto:$("#depto").val(),
                latitud:0,
                longitud:0,
                localidad:
                {
                    idLocalidad:$("#selectLocalidad").val(),
                    nombreLocalidad:""
                }
            }
        ],
        links:
        [
            //{idLink:0,urlLink:"",tipoLink:{idTipoLink:0,nombreTipoLink:""}}
        ]
    }

    axios.post("/registrarColaborador",JSON.stringify(colaborador))
    .then((response)=>{
        $("#btnCrearCuenta").html("Guardar");
        $("#btnCrearCuenta").attr("disabled", false);
        alert(response.data.message);
        if(response.data.resultado == 1){
            $("#modalRegistroColOrg").modal("hide");
            $("#msjResultadoRegistro").html("Registro exitoso!");
            $("#modalResultadoRegistro").modal("show");

            var datosLogin = {
                email: colaborador.emailUsuario,
                idGoogle: colaborador.tokenGoogle,
                pass:colaborador.claveUsuario
            };

            login(datosLogin);

        }
        else{
            $("#modalRegistroColOrg").modal("hide");
            $("#msjResultadoRegistro").html("Algo fallo, intentalo mas tarde");
            $("#modalResultadoRegistro").modal("show");

        }
        });
}

function agregarPaginacionListaOrganizaciones(){
    $('.listaOrganizaciones').after('<div id="navListaOrganizaciones"></div>');
    let organizacion = document.querySelectorAll('.cardOrganizacion')
    let filasMostradas = 2;
    let filasTotales = organizacion.length;

    let numPaginas = filasTotales/filasMostradas;
    for(i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navListaOrganizaciones').append('<a href="JavaScript:Void(0);" rel="' + i + '">' + numPag + '</a> ');
    }

    $( organizacion ).hide();
    $( organizacion ).slice(0, filasMostradas).show();
    $('#navListaOrganizaciones a:first').addClass('active');
    $('#navListaOrganizaciones a').bind('click', function(){
        $('#navListaOrganizaciones a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $( organizacion ).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
            css('display','block').animate({opacity:1}, 300);
    });
}

function agregarPaginacionUsuarios(){
    $('.usuarios').after('<div id="navUsuarios"></div>');
    let usuario = document.querySelectorAll('.usuario')
    let filasMostradas = 2;
    let filasTotales = usuario.length;

    let numPaginas = filasTotales/filasMostradas;
    for(i = 0; i < numPaginas; i++) {
        let numPag = i + 1;
        $('#navUsuarios').append('<a href="#" class="closeLink" rel="' + i + '">' + numPag + '</a> ');
    }

    $( usuario ).hide();
    $( usuario ).slice(0, filasMostradas).show();
    $('#navUsuarios a:first').addClass('active');
    $('#navUsuarios a').bind('click', function(){
        $('#navUsuarios a').removeClass('active');
        $(this).addClass('active');
        let pagActual = $(this).attr('rel');
        let primerItem = pagActual * filasMostradas;
        let ultimoItem = primerItem + filasMostradas;
        $( usuario ).css('opacity','0.0').hide().slice(primerItem, ultimoItem).
            css('display','block').animate({opacity:1}, 300);
    });
}

function mostrarRegistrarseComoOrganizacion(){
    mostrarComo('organizacion')
}

function mostrarRegistrarseComoColaborador(){
    mostrarComo('colaborador')
}
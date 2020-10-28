$(document).ready(function(){
    //evento click en el boton de cerrar sesion
    $("#btnCerrarSesion").click(cerrarSesion);
});

function login(datosLogin){

    axios.post("/login",JSON.stringify(datosLogin))
    .then((response)=>{

        if(response.data.usuario.length == 0){
            $("#errorLogin").show();
            $("#emailUsuario").val("");
            $("#claveUsuario").val("");
            $("#btnLogin").html("Ingresar");
            $("#btnLogin").attr("disabled", false);
        }
        else{
            mostrarInterfazSesionIniciada(response.data.usuario);
            $("#errorLogin").hide();
            $("#modalLogin").modal("hide");
        }
    });
}

function isLoggedIn(funcionSuccess)
{
    axios.get("/isLoggedIn")
    .then((response)=>{

        if(response.data.usuario != null)
        {
            mostrarInterfazSesionIniciada(response.data.usuario);
            if(funcionSuccess != undefined){
                funcionSuccess(response.data.usuario);
            }

        }
    });
}

function mostrarInterfazSesionIniciada(usuario)
{
    $("#btnIngresar").hide();
    $("#dropDownUsuario").show();
    $("#botonesRegistro").hide();
    $("#imgPerfil").attr("src",usuario.urlFotoPerfilUsuario);
    $("#mapa").removeClass("mapa");
    $("#mapa").addClass("mapaExtendido");
    $("#btnVerMiPerfil").attr("href","./"+ usuario.rol.nombreRol);
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

function cerrarSesion()
{
    signOut();
    axios.post("/logOut")
    .then((response)=>{

        window.location= "/";
    });

}

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    let profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    let id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    var datosLogin = {
        email: profile.getEmail(),
        idGoogle: profile.getId(),
        pass:""
    };
    $("#btnLogin").html("<span id = 'spinnerBtnLogin' class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>Un momento...");
    $("#btnLogin").attr("disabled", true);

    axios.post("/login",JSON.stringify(datosLogin))
    .then((response)=>{
        alert(JSON.stringify(response.data.usuario));

        if(response.data.usuario.length == 0)
        {

            $("#idGoogle").val(profile.getId());
            $("#urlFotoPerfilUsuario").val(profile.getImageUrl());
            $("#emailUsuario").val(profile.getEmail());

           if($("#modoRegistro").val() == "colaborador"){

            $("#nombreColaborador").val(profile.getGivenName());
            $("#apellidoColaborador").val(profile.getFamilyName());
            $("#modalRegistroColOrg").modal("show");
           }
           else if($("#modoRegistro").val() == "organizacion")
           {
            $("#modalRegistroColOrg").modal("show");
           }
        }
        else{
            $("#modalLogin").modal("hide");
            mostrarInterfazSesionIniciada(response.data.usuario);
        }
    });

}

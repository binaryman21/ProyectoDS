<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProvinciaController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function(){return view('UIPrincipal');})->name('UIPrincipal');

Route::get('/colaborador', function()
{
    session_start();
    if(!isset($_SESSION['usuario']) || $_SESSION['usuario']->rol->nombreRol != 'colaborador')
    {
        return view('Error403');
    }
    else
    {
        return view('UIPerfilColaborador');
    }

})->name('UIColaborador');

Route::get('/colaborador/{idUsuario}', function($idUsuario){return view('UIPerfilColaborador');})->name('UIColaboradorVisitante');
Route::get('/organizacion/{idUsuario}', function($idUsuario){return view('UIPerfilOrganizacion');})->name('UIOrganizacionVisitante');
//lo dejo de momento en otra ruta para no interferir en otras funcionalidades.
Route::get('/ver-colaborador/{idUsuario}', function($idUsuario){return view('UIPerfilVisitanteDeColaborador');})->name('UIColaboradorVisitante');
Route::get('/ver-organizacion/{idUsuario}', function($idUsuario){return view('UIPerfilVisitanteDeOrganizacion');})->name('UIOrganizacionVisitante');
//Route::get('/organizacion/{idUsuario}', 'App\Http\Controllers\OrganizacionController@getOrganizacion')->name('getOrganizacion');
Route::get('/organizacion', function()
{
    session_start();
    if(!isset($_SESSION['usuario']) || $_SESSION['usuario']->rol->nombreRol != 'organizacion')
    {
        return view('Error403');
    }
    else
    {
        return view('UIPerfilOrganizacion');
    }

})->name('UIOrganizacion');

Route::get('/administrador', function(){
    session_start();
    if(!isset($_SESSION['usuario']) || $_SESSION['usuario']->rol->nombreRol != 'administrador')
    {
        return view('Error403');
    }
    else
    {
        return view('UIPerfilAdministrador');
    }
})->name('UIAdministracion');

//RUTAS GENERALES
Route::get('/administrador/reportes', function(){
    session_start();
    if(!isset($_SESSION['usuario']) || $_SESSION['usuario']->rol->nombreRol != 'administrador')
    {
        return view('Error403');
    }
    else
    {
        return view('UIReporteDenuncias');
    }
})->name('UIReporteDenuncias');
Route::get('/contacto', function(){return view('UIContacto');})->name('UIContacto');

//LISTAR
Route::get('/listarProvincias', 'App\Http\Controllers\ProvinciaController@listarProvincias')->name('listarProvincias');
Route::get('/listarLocalidades/{idProvincia}', 'App\Http\Controllers\ProvinciaController@listarLocalidades')->name('listarLocalidades');
Route::get('/listarTipoOrganizaciones', 'App\Http\Controllers\TipoOrganizacionController@listarTipoOrganizaciones')->name('listarTipoOrganizaciones');
Route::get('/listarTipoLinks', 'App\Http\Controllers\TipoLinkController@listarTipoLinks')->name('listarTipoLinks');
Route::get('/listarCategoriasNecesidad', 'App\Http\Controllers\CategoriaNecesidadController@listarCategoriasNecesidad')->name('listarCategoriasNecesidad');

//REGISTRO Y LOGIN
Route::post('/registrarColaborador', 'App\Http\Controllers\ColaboradorController@registrarColaborador')->name('registrarColaborador');
Route::post('/registrarOrganizacion', 'App\Http\Controllers\OrganizacionController@registrarOrganizacion')->name('registrarOrganizacion');
Route::post('/login', 'App\Http\Controllers\UsuarioController@login')->name('login');
Route::post('/logOut', 'App\Http\Controllers\UsuarioController@logout')->name('logout');
Route::post('/isUser', 'App\Http\Controllers\UsuarioController@isUser')->name('isUser');
Route::get('/isLoggedIn', 'App\Http\Controllers\UsuarioController@isLoggedIn')->name('isLoggedIn');
Route::post('/registrarUsuario', 'App\Http\Controllers\UsuarioController@registrarUsuario')->name('registrarUsuario');

//ORGANIZACIONES
Route::get('/getOrganizacion/{idUsuario}', 'App\Http\Controllers\OrganizacionController@getOrganizacion')->name('getOrganizacion');
Route::get('/getOrganizaciones', 'App\Http\Controllers\OrganizacionController@getOrganizaciones')->name('getOrganizaciones');

//BUSCAR
Route::get('/buscarOrganizacionesPorUbicacion/{ubicacion}', 'App\Http\Controllers\OrganizacionController@busquedaOrganizacionesPorUbicacion')->name('busquedaOrganizacionesPorUbicacion');
Route::get('/buscarOrganizaciones/{filtro}', 'App\Http\Controllers\OrganizacionController@busquedaOrganizaciones')->name('busquedaOrganizaciones');
Route::get('/buscarOrganizacionesPorCategoria/{filtro}', 'App\Http\Controllers\OrganizacionController@busquedaOrganizacionesPorCategoria')->name('busquedaOrganizacionesPorCategoria');

//COLABORADOR
Route::get('/getColaborador/{idUsuario}', 'App\Http\Controllers\ColaboradorController@getColaborador')->name('getColaborador');
Route::post('/registrarColaboracion', 'App\Http\Controllers\ColaboracionController@registrarColaboracion')->name('registrarColaboracion');
Route::get('/getColaboraciones/{idNecesidad}', 'App\Http\Controllers\ColaboracionController@getColaboraciones')->name('getColaboraciones');
Route::get('/getColaboracionesPorUsuario/{idUsuario}', 'App\Http\Controllers\ColaboracionController@getColaboracionesPorUsuario')->name('getColaboracionesPorUsuario');

//DATOS USUARIOS
Route::get('/listarDomiciliosUsuario/{idUsuario}', 'App\Http\Controllers\DomicilioController@listarDomiciliosUsuario')->name('listarDomiciliosUsuario');
Route::get ('/listarTelefonosUsuario/{idUsuario}', 'App\Http\Controllers\TelefonoController@listarTelefonosUsuario')->name('listarTelefonosUsuario');
Route::get('/listarNecesidades/{idUsuario}', 'App\Http\Controllers\NecesidadController@listarNecesidades')->name('listarNecesidades');
Route::post('/bajaUsuario','App\Http\Controllers\UsuarioController@bajaUsuario')->name('bajaUsuario');
Route::post('/updateFotoPerfil','App\Http\Controllers\UsuarioController@updateFotoPerfil')->name('updateFotoPerfil');
Route::post('/actualizarDescripcion', 'App\Http\Controllers\OrganizacionController@actualizarDescripcion')->name('actualizarDescripcion');
Route::post('/registrarTelefono', 'App\Http\Controllers\TelefonoController@registrarTelefono')->name('registrarTelefono');
Route::post('/eliminarTelefono', 'App\Http\Controllers\TelefonoController@eliminarTelefono')->name('eliminarTelefono');
Route::post('/actualizarDomicilio', 'App\Http\Controllers\DomicilioController@actualizarDomicilio')->name('actualizarDomicilio');
Route::post('/cambiarClave', 'App\Http\Controllers\UsuarioController@cambiarClave')->name('cambiarClave');

//NECESIDADES
Route::get('/listarNecesidadesPantallaPrincipal/{idUsuario}', 'App\Http\Controllers\NecesidadController@listarNecesidadesPantallaPrincipal')->name('listarNecesidadesPantallaPrincipal');
Route::get('/buscarNecesidad/{filtroTexto}/{idUsuario}', 'App\Http\Controllers\NecesidadController@buscarNecesidad')->name('buscarNecesidad');
Route::get('/getNecesidad/{idNecesidad}', 'App\Http\Controllers\NecesidadController@getNecesidad')->name('getNecesidad');
Route::post('/bajaNecesidad','App\Http\Controllers\NecesidadController@bajaNecesidad')->name('bajaNecesidad');
Route::post('/updateNecesidad','App\Http\Controllers\NecesidadController@updateNecesidad')->name('updateNecesidad');
Route::post('/registrarCalificacion','App\Http\Controllers\CalificacionController@registrarCalificacion')->name('registrarCalificacion');
Route::post('/registrarNecesidad', 'App\Http\Controllers\NecesidadController@registrarNecesidad')->name('registrarNecesidad');
Route::post('/nuevaCategoriaNecesidad', 'App\Http\Controllers\CategoriaNecesidadController@nuevaCategoriaNecesidad')->name('nuevaCategoriaNecesidad');
Route::post('/modificarCategoria', 'App\Http\Controllers\CategoriaNecesidadController@modificarCategoria')->name('modificarCategoria');

//REPORTE DE DENUNCIA
Route::get('/getMotivos', 'App\Http\Controllers\MotivoDenunciaController@getMotivos')->name('getMotivos');
Route::get('/getDenuncias', 'App\Http\Controllers\DenunciaController@getDenuncias')->name('getDenuncias');
Route::post('/altaDenuncia', 'App\Http\Controllers\DenunciaController@altaDenuncia')->name('altaDenuncia');
Route::post('/confirmarDenuncia', 'App\Http\Controllers\DenunciaController@confirmarDenuncia')->name('confirmarDenuncia');

//Route::get('/tienePermisoPara/{pStringPermiso}', 'App\Http\Controllers\UsuarioController@tienePermisoPara')->name('confirmarDenuncia');
Route::get('/actualizarInsignias/{idUsuario}', 'App\Http\Controllers\CalificacionController@actualizarInsignias')->name('confirmarDenuncia');






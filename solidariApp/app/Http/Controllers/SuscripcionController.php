<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Suscripcion;
class SuscripcionController extends Controller
{
    public function registrarSuscripcion(Request $request)
    {
        try
        {
            $datos = json_decode($request->getContent());
            session_start();
            if(isset($_SESSION['usuario']))
            {
                $datos->idColaborador = $_SESSION['usuario']->idUsuario;

                if(UsuarioController::tienePermisoPara("suscribirseAOrganizacion"))
                {
                    $resultado = Suscripcion::where("idColaborador",$datos->idColaborador)
                    ->first();

                    if(!$resultado)
                    {
                        $suscripcion = new Suscripcion;
                        $suscripcion->idOrganizacion = $datos->idOrganizacion;
                        $suscripcion->idColaborador = $datos->idColaborador;
                        $suscripcion->save();
                        return response()->json([
                            'resultado' => 1,
                            'message' => 'Gracias por suscribirse a esta Organizacion. Se envió una notificación a la organización'
                        ]);
                    }
                    else
                    {
                        return response()->json([
                            'resultado' => 0,
                            'message' => 'Usted ya esta suscrito a esta Organizacion'
                        ]);
                    }

                }
                else
                {
                    return response()->json([
                        'resultado' => 0,
                        'message' => 'Debe ser un colaborador para realizar esta accion'
                    ]);
                }

            }
            else
            {
                return response()->json([
                    'resultado' => 0,
                    'message' => 'notLoggedIn'
                ]);
            }

        }
        catch (\Exception $e)
        {
            return response()->json([
                'resultado' => 0,
                //'message' => 'Accion no disponible. Intente mas tarde'
                'message' => $e->getMessage()
            ]);
        }
    }

}

<div class="modal fade" tabindex="-1" data-backdrop="static" role="dialog" id ="modalCambiarPass">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">Modificar contraseña</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body p-5">
        <form>
            <div class="form-group mb-3">
                <label for="passActual">Contraseña actual</label>
                <input type="password" id="passActual" class="form-control" required="">
                <span class="error text-danger"></span>
            </div>
            <div class="form-group mb-3">
                <label for="passNueva">Contraseña nueva</label>
                <input type="password" id="passNueva" class="form-control" required="">
                <span class="error text-danger"></span>
            </div>
            <div class="form-group mb-3">
                <label for="confirmacionPassNueva">Repetir contraseña nueva</label>
                <input type="password" id="confirmacionPassNueva" class="form-control" required="">
                <span class="error text-danger"></span>
            </div>

            <button type="button" class="btn btn-primary btn-block my-4" id="btnConfirmarPassNuevo">Confirmar</button>
            </div>
        </form>
    </div>
  </div>
</div>

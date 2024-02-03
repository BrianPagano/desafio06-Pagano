
document.querySelectorAll('.botonAgregarCarrito').forEach(function(button) {
    button.addEventListener('click', function() {

        const pid = this.dataset.pid

        console.log('PID:', pid)

        // Realizar una solicitud Fetch para cagregar al carrito
        fetch(`/api/carts/65a6128de87830ac5b33bf96/products/${pid}`, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: `Producto agregado correctamente`,
              })
        })
        .catch(error => {
            console.error('Error al cancelar la compra:', error)
        })
    })
})
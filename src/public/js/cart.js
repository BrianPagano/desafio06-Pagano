document.querySelector('.cancelarCompra').addEventListener('click', function() {
    const cid = this.dataset.cid

    // Realizar una solicitud Fetch para cancelar la compra
    fetch(`/api/carts/${cid}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        window.location.reload()
    })
    .catch(error => {
        console.error('Error al cancelar la compra:', error)
    })
})

document.querySelectorAll('.iconoBasura').forEach(function(button) {
    button.addEventListener('click', function() {
        const cid = this.dataset.cid
        const pid = this.dataset.pid

        console.log('CID:', cid)
        console.log('PID:', pid)

        // Realizar una solicitud Fetch para cancelar la compra
        fetch(`/api/carts/${cid}/products/${pid}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            window.location.reload()
        })
        .catch(error => {
            console.error('Error al cancelar la compra:', error)
        })
    })
})
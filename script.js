// Obtén el modal
var modal = document.getElementById("modal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var span = document.getElementsByClassName("close")[0];

// Obtén todas las imágenes de la galería
var imgs = document.getElementsByClassName("foto");

// Cuando se hace clic en una imagen, muestra el modal
for (var i = 0; i < imgs.length; i++) {
    imgs[i].onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
}

// Cuando se hace clic en el botón de cerrar, oculta el modal
span.onclick = function() {
    modal.style.display = "none";
}

// Cuando se hace clic en cualquier lugar fuera del modal, oculta el modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

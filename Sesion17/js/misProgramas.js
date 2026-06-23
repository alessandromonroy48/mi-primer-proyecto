function areaRectangulo() {
    base = Number(prompt("Ingrese base del rectángulo"));
        altura = Number(prompt("Ingrese altura del rectángulo"));

        area = baso * altura;
        perimetro = (base + altura) * 2;

        alert("Area del Rectángulo \n" + "Area: " + area + " m2\n" + "Perimetro:" + perimetro + " m")
}

function resta(x,y) {
    rest = x - y
    document.write("<h2>Resta de " + x + "-"+ y + "="+ rest + "</h2>")
}

function suma(a,b) {
    sum = a + b;
    document.getElementById("sumar").innerHTML = "Suma de " + a + "+" + b+ "=" + sum;
}

function escribir() {
    valor = document.getElementById("entrada").value;
    document.getElementById("contenido").innerHTML = "> " + valor;
}
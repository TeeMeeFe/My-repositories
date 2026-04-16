"use strict";
class Forma {
    tostring() {
        return "Esta forma es amorfa.";
    }
}
class Circulo extends Forma {
    radio = 0;
    _PI = Math.PI;
    get Radio() {
        return this.radio;
    }
    set Radio(r) {
        this.radio = r;
    }
    get Area() {
        return this._PI * (this.radio * this.radio);
    }
    get Perimetro() {
        return 2 * this._PI * this.radio;
    }
    tostring() {
        return `Circulo: Area=${this._PI * (this.radio * this.radio)}, Perimetro=${2 * this._PI * this.radio}`;
    }
}
class Rectangulo extends Forma {
    alto = 0;
    ancho = 0;
    constructor(Alto, Ancho) {
        super();
        this.alto = Alto;
        this.ancho = Ancho;
    }
    get Alto() {
        return this.alto;
    }
    set Alto(h) {
        this.alto = h;
    }
    get Ancho() {
        return this.ancho;
    }
    set Ancho(w) {
        this.ancho = w;
    }
    get Area() {
        return this.alto * this.ancho;
    }
    get Perimetro() {
        return 2 * (this.alto + this.ancho);
    }
    tostring() {
        return `Rectangulo: Area=${this.alto * this.ancho}, Perimetro=${2 * (this.alto + this.ancho)}`;
    }
}
const amorfo = new Forma();
console.log(amorfo.tostring());
const circulo = new Circulo();
circulo.Radio = 3;
console.log(circulo.tostring());
const rectangulo = new Rectangulo(3, 4);
console.log(rectangulo.tostring());
rectangulo.Alto = 12;
rectangulo.Ancho = 5;
console.log(rectangulo.tostring());

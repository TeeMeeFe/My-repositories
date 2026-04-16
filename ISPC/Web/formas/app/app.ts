class Forma {
    tostring(): string {
        return "Esta forma es amorfa."
    }
}

class Circulo extends Forma {
    private radio:number = 0;
    private readonly _PI:number = Math.PI;

    constructor(radio:number) {
        super();
        this.radio = radio;
    }

    get Radio():number {
        return this.radio;
    }

    set Radio(r:number) {
        this.radio = r;
    }
     
    get Area():number {
        return this._PI * (this.radio * this.radio);
    }

    get Perimetro():number {
        return 2 * this._PI * this.radio;
    }

    tostring():string {
        return `Circulo: Area=${this._PI * (this.radio * this.radio)}, Perimetro=${2 * this._PI * this.radio}`;
    }
}

class Rectangulo extends Forma {
    private alto:number = 0;
    private ancho:number = 0;

    constructor(Alto:number, Ancho:number) {
        super();
        this.alto = Alto;
        this.ancho = Ancho;
    }

    get Alto():number {
        return this.alto;
    }

    set Alto(h:number) {
        this.alto = h;
    }

    get Ancho():number {
        return this.ancho;
    }

    set Ancho(w:number) {
        this.ancho = w;
    }

    get Area():number {
        return this.alto * this.ancho;
    }

    get Perimetro():number {
        return 2 * (this.alto + this.ancho);
    }

    tostring():string {
        return `Rectangulo: Area=${this.alto * this.ancho}, Perimetro=${2 * (this.alto + this.ancho)}`;
    }

}

const amorfo:Forma = new Forma();
console.log(amorfo.tostring());

const circulo:Circulo = new Circulo(1);
circulo.Radio = 3;
console.log(circulo.tostring());

const rectangulo:Rectangulo = new Rectangulo(3, 4);
console.log(rectangulo.tostring());

rectangulo.Alto = 12;
rectangulo.Ancho = 5;
console.log(rectangulo.tostring());

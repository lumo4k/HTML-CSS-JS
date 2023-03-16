const numerosBotoes = document.querySelectorAll("[numeros]");
const operadoresBotoes = document.querySelectorAll("[operador]");
const igualFinal = document.querySelector("[igualzin]");
const botaoDeletarInteiro = document.querySelector("[data-deletar-full]");
const botaoDeletar = document.querySelector("[data-deletar]");

const numeroAntesTexto = document.querySelector("[operador-anterior]");
const numeroAtualTexto = document.querySelector("[operador-atual]");



class calculadora {
    constructor(numeroAntesTexto, numeroAtualTexto) {
        this.numeroAntesTexto = numeroAntesTexto;
        this.numeroAtualTexto = numeroAtualTexto;

        this.limpar();
    };

    formatarNumeros(numero) {
        const numeroString = numero.toString();

        const DigitosInt = parseFloat(numeroString.split(".")[0])
        const Digitodecimal = numeroString.split(".")[1];

        let numeroInteiroDisplay;

        if (isNaN(DigitosInt)) {
            numeroInteiroDisplay = "";
        } else {
            numeroInteiroDisplay = DigitosInt.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if (Digitodecimal != 
            null) {
            return `${numeroInteiroDisplay}.${Digitodecimal}`;
        } else {
            return numeroInteiroDisplay;
        }
    }

    deletarNumeros() {
        this.numeroAtual = this.numeroAtual.toString().slice(0, -1);
    }

    calcular() {
        let resultado;

        const numeroAntesFloat = parseFloat(this.numeroAntes);
        const numeroAtualFloat= parseFloat(this.numeroAtual);

        if (isNaN(numeroAntesFloat) || isNaN(numeroAtualFloat)) return;


        switch (this.operacaoUsada) {
            case "+":
                resultado = numeroAntesFloat + numeroAtualFloat;
                break;
            case "-":
                resultado = numeroAntesFloat - numeroAtualFloat;
                break;
            case "/":
                resultado = numeroAntesFloat / numeroAtualFloat;
                break;
            case "*":
                resultado = numeroAntesFloat * numeroAtualFloat;
                break;
            default:
                return;
        }

        this.numeroAtual = resultado;
        this.operacaoUsada = undefined;
        this.numeroAntes = "";
    };

    escolherOperacoes(operacaoUsada) {
        if (this.numeroAtual == "") return; 

        if (this.numeroAntes != "") {
            this.calcular();
        };
        
        this.operacaoUsada = operacaoUsada;

        this.numeroAntes = this.numeroAtual;
        this.numeroAtual = "";
    }

    adicionarNumero(numero) {
        if (this.numeroAtual.includes(".") && numero === ".") return;

        this.numeroAtual = `${this.numeroAtual}${numero.toString()}`;
    }

    limpar() {
        this.numeroAntes = "";
        this.numeroAtual = "";
        this.operacaoUsada = undefined;
    }

    atualizarDisplay() {
        this.numeroAntesTexto.innerText = `${this.formatarNumeros(this.numeroAntes)} ${this.operacaoUsada || ""}`;
        this.numeroAtualTexto.innerText = this.formatarNumeros(this.numeroAtual); 
    };

};


const Calculadora = new calculadora(numeroAntesTexto, numeroAtualTexto);

    botaoDeletarInteiro.addEventListener("click", () => {
    Calculadora.limpar();
    Calculadora.atualizarDisplay();
});

for (const BotaoOperacao of operadoresBotoes) {
    BotaoOperacao.addEventListener("click", () => {
        let operacaoExecutada = BotaoOperacao.innerText;
        Calculadora.operacaoUsada = operacaoExecutada;
        Calculadora.escolherOperacoes(operacaoExecutada);
        Calculadora.atualizarDisplay();
    });
};

for (const numeroBotao of numerosBotoes) {
    numeroBotao.addEventListener("click", () => {
        Calculadora.adicionarNumero(numeroBotao.innerText);
        Calculadora.atualizarDisplay();
    });
};

igualFinal.addEventListener("click", () => {
    Calculadora.calcular();
    Calculadora.atualizarDisplay();
});

botaoDeletar.addEventListener("click", () => {
    Calculadora.deletarNumeros();
    Calculadora.atualizarDisplay();
});
import FixConverterChar from "./fixConverterChar.js";
import FixConverterNum from "./fixConverterNum.js";
export default class converterView {
    constructor(root) {
        this.root = root;
        this.evaluatorRadio = this.root.querySelector('#evaluator');
        this.converterRadio = this.root.querySelector('#converter');

        this.infixRadio = this.root.querySelector('#infix');
        this.postfixRadio = this.root.querySelector('#postfix');
        this.prefixRadio = this.root.querySelector('#prefix');

        this.inputTextArea = this.root.querySelector('.inputText');
        this.mainButton = this.root.querySelector('.resultButton');

        this.infixOutput = this.root.querySelector('.infixText');
        this.postfixOutput = this.root.querySelector('.postfixText');
        this.prefixOutput = this.root.querySelector('.prefixText');
        this.resultOutput = this.root.querySelector('.resultText');

        this.numConverter = new FixConverterNum();
        this.charConverter = new FixConverterChar();
        console.log(this.numConverter.evalInfix("5 * 5 / 3 + 33"))
        this.setupEventListeners();
    }

    setupEventListeners() {
        const params = { convType: 'conv', expType: 'infix' };
        let input = "";

        this.evaluatorRadio.addEventListener('click', () => {
            params.convType = 'eval';
            this.resultOutput.style.display = 'block';
            this.mainButton.textContent = 'Evaluate';
        });

        this.converterRadio.addEventListener('click', () => {
            params.convType = 'conv';
            this.resultOutput.style.display = 'none';
            this.mainButton.textContent = 'Convert';
        });

        this.infixRadio.addEventListener('click', () => {
            params.expType = 'infix';
        });
        this.prefixRadio.addEventListener('click', () => {
            params.expType = 'prefix';
        });
        this.postfixRadio.addEventListener('click', () => {
            params.expType = 'postfix';
        });

        this.inputTextArea.addEventListener('input', () => {
            input = this.inputTextArea.value;

            // Reset output fields
            this.infixOutput.value = "";
            this.prefixOutput.value = "";
            this.postfixOutput.value = "";
            this.resultOutput.value = "";
        });

        this.mainButton.addEventListener('click', () => {
            // Add animation class
            this.mainButton.classList.add('buttonClickAnimation');

            // Remove after 300ms
            setTimeout(() => {
                this.mainButton.classList.remove('buttonClickAnimation');
            }, 300);

            const outputs = this.generateOuput(input, params);

            this.infixOutput.value = "Infix:-\t" + outputs.infix;
            this.prefixOutput.value = "Prefix:-\t" + outputs.prefix;
            this.postfixOutput.value = "Postfix:-\t" + outputs.postfix;
            this.resultOutput.value = "Result:-\t" + outputs.eval ?? "";
        });
    }


    generateOuput(input, params) {
        const outputs = { infix: "", prefix: "", postfix: "", eval: "" };

        if (params.convType === 'eval') {
            switch (params.expType) {
                case 'infix':
                    return this.numConverter.evalInfix(input);
                case 'prefix':
                    return this.numConverter.evalPrefix(input);
                case 'postfix':
                    return this.numConverter.evalPostfix(input);
            }
        }

        if (params.convType === 'conv') {
            switch (params.expType) {
                case 'infix':
                    return this.charConverter.evalInfix(input);
                case 'prefix':
                    return this.charConverter.evalPrefix(input);
                case 'postfix':
                    return this.charConverter.evalPostfix(input);
            }
        }

        return outputs;
    }
}
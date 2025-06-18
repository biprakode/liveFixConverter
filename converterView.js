import FixConverterChar from "./fixConverterChar";
import FixConverterNum from "./fixConverterNum";
export default class converterView {
    constructor(root) {
        this.root = root;
        this.evaluatorRadio = this.root.querySelector('#evaluator');
        this.converterRadio = this.root.querySelector('#converter');

        this.infixRadio = this.root.querySelector('#infix');
        this.postfixRadio = this.root.querySelector('#postfix');
        this.prefixRadio = this.root.querySelector('#prefix');

        this.inputTextArea = this.root.querySelector('.inputText');

        this.infixOutput = this.root.querySelector('.infixText');
        this.postfixOutput = this.root.querySelector('.postfixText');
        this.prefixOutput = this.root.querySelector('.prefixText');
        this.resultOutput = this.root.querySelector('.resultText');
    }

    setupEventListeners() {
        
    }
}
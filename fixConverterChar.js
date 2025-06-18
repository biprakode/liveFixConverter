export default class FixConverterChar {
    isChar(char) {
        return /^[a-zA-Z]$/.test(char);
    }

    isOperator(char) {
        return /^[+\-*/^]$/.test(char);
    }

    priority(operator) {
        switch (operator) {
            case '^': return 2;
            case '*':
            case '/': return 1;
            case '+':
            case '-': return 0;
            default: return -1;
        }
    }

    charInfixToPostfix(exp) {
        let stack = [], ans = [];

        exp.split('').forEach((char, index) => {
            if (this.isChar(char)) {
                ans.push(char);
            } else if (char === '(') {
                stack.push(char);
            } else if (char === ')') {
                while (stack.length > 0 && stack.at(-1) !== '(') {
                    ans.push(stack.pop());
                }
                if (stack.length === 0) throw new Error("Mismatched parentheses");
                stack.pop();
            } else if (this.isOperator(char)) {
                while (stack.length > 0 &&
                    (this.priority(stack.at(-1)) > this.priority(char) ||
                        (this.priority(stack.at(-1)) === this.priority(char) && char !== '^'))) {
                    ans.push(stack.pop());
                }
                stack.push(char);
            } else {
                throw new Error(`Invalid character '${char}' at position ${index}`);
            }
        });

        while (stack.length > 0) {
            if (stack.at(-1) === '(') throw new Error("Mismatched parentheses");
            ans.push(stack.pop());
        }

        return ans.join('');
    }

    charInfixToPrefix(exp) {
        let stack = [], ans = [];

        // reverse and swap brackets
        let expArr = exp.split('').reverse().map(char => {
            if (char === '(') return ')';
            if (char === ')') return '(';
            return char;
        });

        expArr.forEach((char, index) => {
            if (this.isChar(char)) {
                ans.push(char);
            } else if (char === '(') {
                stack.push(char);
            } else if (char === ')') {
                while (stack.length > 0 && stack.at(-1) !== '(') {
                    ans.push(stack.pop());
                }
                if (stack.length === 0) throw new Error("Mismatched parentheses");
                stack.pop();
            } else if (this.isOperator(char)) {
                while (stack.length > 0 && this.priority(stack.at(-1)) > this.priority(char)) {
                    ans.push(stack.pop());
                }
                stack.push(char);
            } else {
                throw new Error(`Invalid character '${char}' at position ${index}`);
            }
        });

        while (stack.length > 0) {
            if (stack.at(-1) === '(') throw new Error("Mismatched parentheses");
            ans.push(stack.pop());
        }

        return ans.reverse().join('');
    }

    charPostfixToInfix(exp) {
        let stack = [];

        exp.split('').forEach((char, index) => {
            if (this.isChar(char)) {
                stack.push(char);
            } else if (this.isOperator(char)) {
                if (stack.length < 2) throw new Error("Invalid postfix expression");
                let op2 = stack.pop();
                let op1 = stack.pop();
                let expr = `(${op1}${char}${op2})`;
                stack.push(expr);
            } else {
                throw new Error(`Invalid character '${char}' at position ${index}`);
            }
        });

        if (stack.length !== 1) throw new Error("Invalid postfix expression");
        return stack[0];
    }

    charPrefixToInfix(exp) {
        let stack = [];

        exp.split('').reverse().forEach((char, index) => {
            if (this.isChar(char)) {
                stack.push(char);
            } else if (this.isOperator(char)) {
                if (stack.length < 2) throw new Error("Invalid prefix expression");
                let op1 = stack.pop();
                let op2 = stack.pop();
                let expr = `(${op1}${char}${op2})`;
                stack.push(expr);
            } else {
                throw new Error(`Invalid character '${char}' at position ${index}`);
            }
        });

        if (stack.length !== 1) throw new Error("Invalid prefix expression");
        return stack[0];
    }

    charPrefixToPostfix(exp) {
        let stack = [];

        exp.split('').reverse().forEach((char, index) => {
            if (this.isChar(char)) {
                stack.push(char);
            } else if (this.isOperator(char)) {
                if (stack.length < 2) throw new Error("Invalid prefix expression");
                let op1 = stack.pop();
                let op2 = stack.pop();
                let expr = `${op1}${op2}${char}`;
                stack.push(expr);
            } else {
                throw new Error(`Invalid character '${char}' at position ${index}`);
            }
        });

        if (stack.length !== 1) throw new Error("Invalid prefix expression");
        return stack[0];
    }

    charPostfixToPrefix(exp) {
        let stack = [];

        exp.split('').forEach((char, index) => {
            if (this.isChar(char)) {
                stack.push(char);
            } else if (this.isOperator(char)) {
                if (stack.length < 2) throw new Error("Invalid postfix expression");
                let op2 = stack.pop();
                let op1 = stack.pop();
                let expr = `${char}${op1}${op2}`;
                stack.push(expr);
            } else {
                throw new Error(`Invalid character '${char}' at position ${index}`);
            }
        });

        if (stack.length !== 1) throw new Error("Invalid postfix expression");
        return stack[0];
    }
}

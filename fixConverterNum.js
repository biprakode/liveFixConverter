export default class FixConverterNum {
    isNum(char) {
        return /^[0-9]$/.test(char);
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

    evalInfix(exp) {
        let postfix = this.numInfixToPostfix(exp);
        let prefix = this.numInfixToPrefix(exp);

        let postVal = this.numPostfixEval(postfix);
        let preVal = this.numPrefixEval(prefix);

        if(preVal != postVal) {
            throw new Error("Mismatched ouput");
        }

        return postVal;
    }

    evalPostfix(exp) {
        let postfix = exp;
        let prefix = this.numPostfixToPrefix(exp);

        let postVal = this.numPostfixEval(postfix);
        let preVal = this.numPrefixEval(prefix);

        if(preVal != postVal) {
            throw new Error("Mismatched ouput");
        }

        return postVal;
    }

    evalPrefix(exp) {
        let postfix = this.numPrefixToPostfix(exp);
        let prefix = exp;

        let postVal = this.numPostfixEval(postfix);
        let preVal = this.numPrefixEval(prefix);

        if(preVal != postVal) {
            throw new Error("Mismatched ouput");
        }

        return postVal;
    }

    numInfixToPostfix(exp) {
        let stack = [], ans = [];

        exp.split(' ').forEach((char, index) => {
            if (this.isNum(char)) {
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

        return ans.join(' ');
    }

    numInfixToPrefix(exp) {
        let stack = [], ans = [];

        let expArr = exp.split(' ').reverse().map(char => {
            if (char === '(') return ')';
            if (char === ')') return '(';
            return char;
        });

        expArr.forEach((char, index) => {
            if (this.isNum(char)) {
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

        return ans.reverse().join(' ');
    }

    numPostfixToInfix(exp) {
        let stack = [];

        exp.split(' ').forEach((char, index) => {
            if (this.isNum(char)) {
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

    numPrefixToInfix(exp) {
        let stack = [];

        exp.split(' ').reverse().forEach((char, index) => {
            if (this.isNum(char)) {
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

    numPrefixToPostfix(exp) {
        let stack = [];

        exp.split(' ').reverse().forEach((char, index) => {
            if (this.isNum(char)) {
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

    numPostfixToPrefix(exp) {
        let stack = [];

        exp.split(' ').forEach((char, index) => {
            if (this.isNum(char)) {
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

    numPostfixEval(exp) {
        let stack = [];

        exp.split(' ').forEach((dig, index) => {
            if (this.isNum(dig)) {
                stack.push(dig);
            } else if (this.isOperator(dig)) {
                if (stack.length < 2) throw new Error(`Invalid postfix expression: not enough operands for operator '${dig}' at position ${index}`);
                let op1 = parseFloat(stack.pop());
                let op2 = parseFloat(stack.pop());

                switch (dig) {
                    case '*':
                        stack.push(String(op2 * op1));
                        break;
                    case '/':
                        if (op1 === 0) throw new Error("Division by zero");
                        stack.push(String(op2 / op1));
                        break;
                    case '+':
                        stack.push(String(op2 + op1));
                        break;
                    case '-':
                        stack.push(String(op2 - op1));
                        break;
                    case '^':
                        stack.push(String(Math.pow(op2, op1)));
                        break;
                    default:
                        throw new Error(`Invalid operator '${dig}'`);
                }
            } else {
                throw new Error(`Invalid character '${dig}' at position ${index}`);
            }
        });

        if (stack.length !== 1) throw new Error("Invalid postfix expression: leftover operands");

        return stack[0];
    }

    numPrefixEval(exp) {
        let stack = [];

        exp.split(' ').reverse().forEach((dig, index) => {
            if (this.isNum(dig)) {
                stack.push(dig);
            } else if (this.isOperator(dig)) {
                if (stack.length < 2) throw new Error(`Invalid prefix expression: not enough operands for operator '${dig}' at position ${index}`);
                let op1 = parseFloat(stack.pop());
                let op2 = parseFloat(stack.pop());

                switch (dig) {
                    case '*':
                        stack.push(String(op1 * op2));
                        break;
                    case '/':
                        if (op2 === 0) throw new Error("Division by zero");
                        stack.push(String(op1 / op2));
                        break;
                    case '+':
                        stack.push(String(op1 + op2));
                        break;
                    case '-':
                        stack.push(String(op1 - op2));
                        break;
                    case '^':
                        stack.push(String(Math.pow(op1, op2)));
                        break;
                    default:
                        throw new Error(`Invalid operator '${dig}'`);
                }
            } else {
                throw new Error(`Invalid character '${dig}' at position ${index}`);
            }
        });

        if (stack.length !== 1) throw new Error("Invalid prefix expression: leftover operands");

        return stack[0];
    }
}

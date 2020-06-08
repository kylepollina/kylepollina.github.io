/* lsystem.js */

/* TODO add push and pop functionality */

class Lsystem {
    constructor(draw, skip, axiom, ruleset, angle) {
        this.draw = draw;
        this.skip = skip;
        this.axiom = axiom;
        this.current = axiom;
        this.ruleset = ruleset;
        this.angle = angle;
        this.iterations = 1;
    }
    
    iterate() {
        // A new string buffer for the next generation
        let next = []; 

        for(let i = 0; i < this.current.length; i++) {
            let c = this.current.charAt(i);

            if(c == '+' || c == '-'){
                next.push(c);
            }
            else {
                for(let j = 0; j < this.ruleset.length; j++) {
                    let rule = this.ruleset[j];
                    rule = rule.replace(/ /g,'');   /* remove whitespace in string */
                    let symbol = rule.charAt(0);
                    let production = rule.substring(rule.indexOf("=") + 1); 

                    if(c == symbol) {
                        next.push(production);
                    }
                } 
            } 
        }
        this.current = next.join("");
        this.iterations++;
    }

    de_iterate() {
        this.current = this.axiom;
        this.iterations--;
        const reiterate = this.iterations;

        for(var k = 1; k < reiterate; k++){
            this.iterate();
            this.iterations--;
        }
    }

    set_iterations(n) {
        this.current = this.axiom;
        this.iterations = n;
        const reiterate = this.iterations;

        for(let k = 1; k < reiterate; k++) {
            this.iterate();
            this.iterations--;
        }
    }
};

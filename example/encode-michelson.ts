import { Parser } from '@mavrykdynamics/taquito-michel-codec'

const example = async () => {

  try {
    // Encode initial storage values to JSON that is acceptable to the Mavryk RPC
    const ex1 = '(Pair {Elt "0" 0} 0)'
    const ex2 = `(Pair (Pair { Elt 1
                  (Pair (Pair "mv1JQ19UKK5w264P8SDJmwjHsrXZASegkXrH" "mv18Cw7psUrAAPBpXYd9CtCpHg9EgjHP9KTe")
                        0x0501000000026869) }
            10000000)
      (Pair 2 333))`;

    const p = new Parser()

    console.log('Example 1')
    const exp1 = p.parseMichelineExpression(ex1)
    console.log(JSON.stringify(exp1))

    console.log('Example 2')
    const exp2 = p.parseMichelineExpression(ex2)
    console.log(JSON.stringify(exp2))

  } catch (ex) {
    console.log(ex)
  }
}

example();

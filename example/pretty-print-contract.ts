import { Parser, emitMicheline } from '@mavrykdynamics/taquito-michel-codec'
import { MavrykToolkit } from '@mavrykdynamics/taquito';

const provider = 'https://mainnet.ecadinfra.com/';

const example = async () => {

  const mavryk = new MavrykToolkit(provider)

  try {
    const contract = await mavryk.contract.at('KT1EctCuorV2NfVb1XTQgvzJ88MQtWP8cMMv') //StakerDAO
    const p = new Parser()

    console.log('Pretty Print Michelson:')
    const michelsonCode = p.parseJSON(contract.script.code)
    console.log(emitMicheline(michelsonCode, {indent:"    ", newline: "\n",}))

    console.log('Pretty Print Storage')
    const storage = p.parseJSON(contract.script.storage)
    console.log(emitMicheline(storage, {indent:"    ", newline: "\n",}))

  } catch (ex) {
    console.log(ex)
  }
}

example();

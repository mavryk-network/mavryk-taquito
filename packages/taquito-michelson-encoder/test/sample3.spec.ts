import BigNumber from 'bignumber.js';
import {
  params as params3,
  rpcContractResponse as rpcContractResponse3,
  storage as storage3,
} from '../data/sample3';
import { ParameterSchema } from '../src/schema/parameter';
import { Schema } from '../src/schema/storage';
import { MichelsonMap } from '../src/michelson-map';

describe('Schema test', () => {
  it('Should parse storage with mumav properly', () => {
    const schema = new Schema(storage3);
    const s = schema.Execute(rpcContractResponse3.script.storage);
    expect(s).toEqual({
      balances: MichelsonMap.fromLiteral(
        {
          mv18GyRj14j8aRPnRZf6qsidgmXVpHQ3oLUg: new BigNumber('700000000'),
          mv192p5n47e1xLAU1gCvqppJ9ocEoWmxfGPX: new BigNumber('11220754689'),
          mv1A16ciHyoBFfyuzrHYFMnY1yaVxtxU7xAj: new BigNumber('37742509148'),
          mv1ATHraCJgsY5zX4MGwJE9kb85thH4LsXNk: new BigNumber('9967227'),
          mv1BQ1Erpjr6qoiBdDAcNgTimQbzLTqHfNnG: new BigNumber('20856441766'),
          mv1CRV1gMfLHXpKipM9QcrTPC7L3G3BVZPPR: new BigNumber('0'),
          mv1CY4wPitTaRcPSN3NinGGZCmMtDNp5yQRx: new BigNumber('26757313041'),
          mv1Cc7nFGeWcfWxYgZt2WVtZh3V89TXpAuFE: new BigNumber('995650005'),
          mv1CtpceMygpvoZQSGStUerXeiAAnFo4HGsp: new BigNumber('1043871972'),
          mv1DpU3eYVuCyy6tuSfobV7ihYFpkn38e1ft: new BigNumber('21165644772'),
          mv1JGyN2TETyAVh1W5FL3Mixkem3vz2cLmau: new BigNumber('14268243108'),
          mv1JaYY9BZebGfk1YWpCnF7bmQzaToGbuidq: new BigNumber('4193732'),
          mv1KFwZ1MNComx9raqkppLpzrr2KkBRBzs9U: new BigNumber('49644981635'),
          mv1LCBwSi37Z3z2zWQ5g8gYiWRZArovS8wd2: new BigNumber('5581647542'),
          mv1Mj1W7Zq5zWSd1rEUgXzYczeJkQq352LY1: new BigNumber('1902576'),
          mv1N4ngAtojxqoLYQxXLSZUPpT7UPKDRdnYd: new BigNumber('8417961239'),
          mv1RzK5y7K2G8pLUaGuWryWpBdHMPVdyyTxF: new BigNumber('17437358995'),
          mv1UTrNZgCeeAtoeHSKJm5jWCyHyHMQpHPRS: new BigNumber('2498000000'),
          mv1UaCfudbmaiTHnaHLVeHYnabY68LoY3hUQ: new BigNumber('35524185304'),
          mv1VqZ1LMRoCcz57G33kR6omy98SXgzqgZTc: new BigNumber('48718359'),
          mv1Wna9N4TRV5ySbukftWsq6zgZF8rJhzvxV: new BigNumber('123799839'),
          KT18oQnGxZNPST7GndCN1w5o3RjCKMPRuQYb: new BigNumber('0'),
          KT1BPE6waJrv3CagjRYwtfF3ZbE4nKxCa35Q: new BigNumber('79540178'),
          KT1BgkG1u8oQ5x1nySJq9TSExZYZvuUHxG4d: new BigNumber('94738111'),
          KT1CDEg2oY3VfMa1neB7hK5LoVMButvivKYv: new BigNumber('972668'),
          KT1CSecsvPEUbnjQ58UAStVvanN2CghEuDNr: new BigNumber('850791'),
          KT1ETj1iC48XWpa7fGhD9AAArZgLkgNrk35W: new BigNumber('6694159084'),
          KT1F7Gn9YupQLwU4qM8u9CgcRzBa3gDRd1e5: new BigNumber('2244700000'),
          KT1GtaRfTTHXTYVNGZFsZjoB9T2yn3bToZEs: new BigNumber('67923763011'),
          KT1GvYJfGNqrLtUCPc4JithuXco72sxa9Ewh: new BigNumber('6067881716'),
          KT1J7u8E5XDz5LWQTr1ZKY7coDYNMh2vwvwX: new BigNumber('702521'),
          KT1KRzRDQxbGZDobSCdyWCnB6nShX3MvFLAW: new BigNumber('47371547783'),
          KT1LuVQUALxtVMnNTa36SDVwtDmpNbosZEh8: new BigNumber('50694800896'),
          KT1NkYSVn7FqXGqyi9ruiqHS7mjUzDyv6fmc: new BigNumber('5938869113'),
          KT1QB4Tib11b8gYrC77Xs9bXU8TGJTXPAK7J: new BigNumber('60414680184'),
          KT1QX5woZXV5N6iqFFHkrgZrwH9uhh7Ma6qz: new BigNumber('3977008911'),
          KT1RJ2HjvmGcrDqpPoFwy6uVDk9uf71iv7dF: new BigNumber('11416957072'),
          KT1SE8DxcSsfA7upZtdpcZGGRRP3guqSk4nM: new BigNumber('2155481887'),
          KT1SGQmwvK5s49ovZLXxLbW8RzNB1vSbtE5b: new BigNumber('3902114120'),
          KT1VqoJ5jEAY1UEugRFiSTXhTVXAsj65tsUv: new BigNumber('8992531001'),
          KT1Vqq4nD2Mgwz4bYZVFbjKUESAmxrVFfRAr: new BigNumber('99496052'),
          KT1VvGrrdJmVTwRER39btAXC64b56sLqbXkY: new BigNumber('9879704715'),
          KT1XBbG1xtdsSWDsy5dwqXpUQEEgLPm6RGRb: new BigNumber('482601406'),
        },
        { prim: 'big_map', args: [{ prim: 'address' }, { prim: 'nat' }] }
      ),
      buyPrice: new BigNumber('1062727'),
      decimals: new BigNumber('6'),
      inBaker: new BigNumber('570674096663'),
      name: 'Mav-Baking Token',
      owner: 'mv1BgHZsvYpqxwduk1EKr8XyhcPrWJPh22Gi',
      sellPrice: new BigNumber('1062060'),
      symbol: 'BAKER',
      totalSupply: new BigNumber('542476246169'),
    });
  });

  it('Should encode storage properly', () => {
    const schema = new Schema(storage3);

    const result = schema.Encode({
      balances: MichelsonMap.fromLiteral({
        KT18oQnGxZNPST7GndCN1w5o3RjCKMPRuQYb: new BigNumber('0'),
        KT1BPE6waJrv3CagjRYwtfF3ZbE4nKxCa35Q: new BigNumber('79540178'),
        KT1BgkG1u8oQ5x1nySJq9TSExZYZvuUHxG4d: new BigNumber('94738111'),
        KT1CDEg2oY3VfMa1neB7hK5LoVMButvivKYv: new BigNumber('972668'),
        KT1CSecsvPEUbnjQ58UAStVvanN2CghEuDNr: new BigNumber('850791'),
        KT1ETj1iC48XWpa7fGhD9AAArZgLkgNrk35W: new BigNumber('6694159084'),
        KT1F7Gn9YupQLwU4qM8u9CgcRzBa3gDRd1e5: new BigNumber('2244700000'),
        KT1GtaRfTTHXTYVNGZFsZjoB9T2yn3bToZEs: new BigNumber('67923763011'),
        KT1GvYJfGNqrLtUCPc4JithuXco72sxa9Ewh: new BigNumber('6067881716'),
        KT1J7u8E5XDz5LWQTr1ZKY7coDYNMh2vwvwX: new BigNumber('702521'),
        KT1KRzRDQxbGZDobSCdyWCnB6nShX3MvFLAW: new BigNumber('47371547783'),
        KT1LuVQUALxtVMnNTa36SDVwtDmpNbosZEh8: new BigNumber('50694800896'),
        KT1NkYSVn7FqXGqyi9ruiqHS7mjUzDyv6fmc: new BigNumber('5938869113'),
        KT1QB4Tib11b8gYrC77Xs9bXU8TGJTXPAK7J: new BigNumber('60414680184'),
        KT1QX5woZXV5N6iqFFHkrgZrwH9uhh7Ma6qz: new BigNumber('3977008911'),
        KT1RJ2HjvmGcrDqpPoFwy6uVDk9uf71iv7dF: new BigNumber('11416957072'),
        KT1SE8DxcSsfA7upZtdpcZGGRRP3guqSk4nM: new BigNumber('2155481887'),
        KT1SGQmwvK5s49ovZLXxLbW8RzNB1vSbtE5b: new BigNumber('3902114120'),
        KT1VqoJ5jEAY1UEugRFiSTXhTVXAsj65tsUv: new BigNumber('8992531001'),
        KT1Vqq4nD2Mgwz4bYZVFbjKUESAmxrVFfRAr: new BigNumber('99496052'),
        KT1VvGrrdJmVTwRER39btAXC64b56sLqbXkY: new BigNumber('9879704715'),
        KT1XBbG1xtdsSWDsy5dwqXpUQEEgLPm6RGRb: new BigNumber('482601406'),
        mv18GyRj14j8aRPnRZf6qsidgmXVpHQ3oLUg: new BigNumber('700000000'),
        mv192p5n47e1xLAU1gCvqppJ9ocEoWmxfGPX: new BigNumber('11220754689'),
        mv1A16ciHyoBFfyuzrHYFMnY1yaVxtxU7xAj: new BigNumber('37742509148'),
        mv1ATHraCJgsY5zX4MGwJE9kb85thH4LsXNk: new BigNumber('9967227'),
        mv1BQ1Erpjr6qoiBdDAcNgTimQbzLTqHfNnG: new BigNumber('20856441766'),
        mv1CRV1gMfLHXpKipM9QcrTPC7L3G3BVZPPR: new BigNumber('0'),
        mv1CY4wPitTaRcPSN3NinGGZCmMtDNp5yQRx: new BigNumber('26757313041'),
        mv1Cc7nFGeWcfWxYgZt2WVtZh3V89TXpAuFE: new BigNumber('995650005'),
        mv1CtpceMygpvoZQSGStUerXeiAAnFo4HGsp: new BigNumber('1043871972'),
        mv1DpU3eYVuCyy6tuSfobV7ihYFpkn38e1ft: new BigNumber('21165644772'),
        mv1JGyN2TETyAVh1W5FL3Mixkem3vz2cLmau: new BigNumber('14268243108'),
        mv1JaYY9BZebGfk1YWpCnF7bmQzaToGbuidq: new BigNumber('4193732'),
        mv1KFwZ1MNComx9raqkppLpzrr2KkBRBzs9U: new BigNumber('49644981635'),
        mv1LCBwSi37Z3z2zWQ5g8gYiWRZArovS8wd2: new BigNumber('5581647542'),
        mv1Mj1W7Zq5zWSd1rEUgXzYczeJkQq352LY1: new BigNumber('1902576'),
        mv1N4ngAtojxqoLYQxXLSZUPpT7UPKDRdnYd: new BigNumber('8417961239'),
        mv1RzK5y7K2G8pLUaGuWryWpBdHMPVdyyTxF: new BigNumber('17437358995'),
        mv1UTrNZgCeeAtoeHSKJm5jWCyHyHMQpHPRS: new BigNumber('2498000000'),
        mv1UaCfudbmaiTHnaHLVeHYnabY68LoY3hUQ: new BigNumber('35524185304'),
        mv1VqZ1LMRoCcz57G33kR6omy98SXgzqgZTc: new BigNumber('48718359'),
        mv1Wna9N4TRV5ySbukftWsq6zgZF8rJhzvxV: new BigNumber('123799839'),
      }),
      buyPrice: new BigNumber('1062727'),
      decimals: new BigNumber('6'),
      inBaker: new BigNumber('570674096663'),
      name: 'Mav-Baking Token',
      owner: 'mv1BgHZsvYpqxwduk1EKr8XyhcPrWJPh22Gi',
      sellPrice: new BigNumber('1062060'),
      symbol: 'BAKER',
      totalSupply: new BigNumber('542476246169'),
    });
    expect(result).toMatchObject(rpcContractResponse3.script.storage);
  });

  it('Should extract signature properly', () => {
    const schema = new ParameterSchema(params3);
    expect(schema.ExtractSignatures()).toContainEqual(['deposit', 'unit']);
  });

  it('Should encode parameter schema properly', () => {
    const schema = new ParameterSchema(params3);
    const result = schema.Encode('deposit');
    expect(result).toEqual({
      prim: 'Right',
      args: [
        {
          prim: 'Right',
          args: [
            {
              prim: 'Right',
              args: [
                {
                  prim: 'Left',
                  args: [{ prim: 'Unit' }],
                },
              ],
            },
          ],
        },
      ],
    });
  });
});

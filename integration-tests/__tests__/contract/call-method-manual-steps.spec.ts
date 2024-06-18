import { createTransferOperation } from '@mavrykdynamics/taquito';
import { encodeOpHash } from '@mavrykdynamics/taquito-utils';
import { CONFIGS } from '../../config';

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Mavryk = lib;

  describe(`Test obtain operation hash before sending the operation to the node ${rpc}`, () => {
    beforeEach(async () => {
      await setup(true);
    });

    test('Estimates, forges, signs, obtains the operation hash and injects the operation', async () => {
      // We deploy a simple contract that will be used in the next steps
      const code = `parameter nat; storage nat; code { CAR ; NIL operation ; PAIR }`;
      const opOrigination = await Mavryk.contract.originate({
        code,
        storage: 10
      });
      await opOrigination.confirmation();
      const contract = await opOrigination.contract();

      // Let's say we want to call the default entry point of the presented contract, and we want to obtain the operation hash before injecting the operation to the node.
      // Currently, if we do `await contract.methods.default(5).send()`, we won't be able to obtain the operation hash before the operation gets injected.
      // This plan to be addressed in issue #432

      // The purpose of this test is to calculate the operation hash before sending the operation to the node.
      // Using Taquito to call a contract entry point abstracts many underlying calls
      // Here are steps to manually reproduce the following operation: contract.methods.default(5).send();

      // Calling an entry point is a type of transaction operation
      // The toTransferParams method returns a TransferParams object having parameter in a JSON Michelson format
      const transferParams = contract.methods.default(5).toTransferParams();

      // We estimate the fees for the operation
      const estimate = await Mavryk.estimate.transfer(transferParams);

      // The createTransferOperation function returns RPCTransferOperation where we include the estimated fees
      const rpcTransferOperation = await createTransferOperation({
        ...transferParams,
        fee: estimate.suggestedFeeMumav,
        gasLimit: estimate.gasLimit,
        storageLimit: estimate.storageLimit
      });

      // We add the branch, the source and the counter to the operation object
      const source = await Mavryk.signer.publicKeyHash();
      const { counter } = await Mavryk.rpc.getContract(source);
      const { hash } = await Mavryk.rpc.getBlockHeader();

      const op = {
        branch: hash,
        contents: [{
          ...rpcTransferOperation,
          source,
          counter: parseInt(counter || '0', 10) + 1,
        }]
      }

      // We forge the operation
      const forgedOp = await Mavryk.rpc.forgeOperations(toString(op))

      // We sign the operation
      const signOp = await Mavryk.signer.sign(forgedOp, new Uint8Array([3]));

      // We calculate the operation hash
      const opHash = encodeOpHash(signOp.sbytes);

      // simulate the operation, additional step in the default main flow
      // const results = await Mavryk.rpc.preapplyOperations(op);

      // We inject the operation
      const opHashFromRpc = await Mavryk.rpc.injectOperation(signOp.sbytes)

      expect(opHash).toEqual(opHashFromRpc);
    });
  });

  // deepcode ignore no-any: any is good enough
  function toString(object: any): object {
    const keys = Object.keys(object);
    keys.forEach(key => {
      if (typeof object[key] === 'object') {
        return toString(object[key]);
      }

      object[key] = '' + object[key];
    });

    return object;
  }

});

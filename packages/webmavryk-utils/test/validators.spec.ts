/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import {
  validateAddress,
  ValidationResult,
  validateChain,
  validateKeyHash,
  validateContractAddress,
  validatePublicKey,
  validateSignature,
  validateOperation,
  validateProtocol,
  validateBlock,
  validateSmartRollupAddress,
} from '../src/validators';

describe('validateAddress', () => {
  it('Validate address properly', () => {
    expect(validateAddress('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toEqual(ValidationResult.VALID);
    expect(validateAddress('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D')).toEqual(ValidationResult.VALID);
    expect(validateAddress('mv2ZLWuozgeXpSsauhhLYroGjdjCHuqTSwFC')).toEqual(ValidationResult.VALID);
    expect(validateAddress('mv3Fqu4nnPcvRQREkhxCjVJfznU7JfiQ3CGL')).toEqual(ValidationResult.VALID);
    expect(validateAddress('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D%test')).toEqual(
      ValidationResult.VALID
    );
    expect(validateAddress('mv4iZavVJgwFdqwLdeaV3Vj1Km5rA55ocbjW')).toEqual(ValidationResult.VALID);

    // Invalid checksum
    expect(validateAddress('mv1XAMJySucFtqRVW5M2Lh7rQEPUa3jtPMUu')).toEqual(
      ValidationResult.INVALID_CHECKSUM
    );
    expect(validateAddress('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7sp')).toEqual(
      ValidationResult.INVALID_CHECKSUM
    );
    expect(validateAddress('mv1')).toEqual(ValidationResult.INVALID_CHECKSUM);
    expect(validateAddress('mv2')).toEqual(ValidationResult.INVALID_CHECKSUM);
    expect(validateAddress('mv3')).toEqual(ValidationResult.INVALID_CHECKSUM);
    expect(validateAddress('KT1')).toEqual(ValidationResult.INVALID_CHECKSUM);
    expect(validateAddress('mv4')).toEqual(ValidationResult.INVALID_CHECKSUM);
    expect(validateAddress('test')).toEqual(ValidationResult.NO_PREFIX_MATCHED);
    expect(validateAddress('')).toEqual(ValidationResult.NO_PREFIX_MATCHED);
    expect(validateAddress('mv2ZLWuozgeXpSsauhhLYroGjdjCHuqTSwFCAAAAAAAAAA')).toEqual(
      ValidationResult.INVALID_CHECKSUM
    );

    expect(validateAddress('sr166cywS6HJx9gmqMU28Vo284gPQaPcGmYW')).toEqual(ValidationResult.VALID);
    expect(validateAddress('sr166cywS6HJx9gmqMU28Vo284gPQaPcGmY1')).toEqual(
      ValidationResult.INVALID_CHECKSUM
    );
  });
});

describe('validateSmartRollupAddress', () => {
  it('Validate smart rollup address properly', () => {
    expect(validateSmartRollupAddress('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateSmartRollupAddress('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateSmartRollupAddress('mv2ZLWuozgeXpSsauhhLYroGjdjCHuqTSwFC')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateSmartRollupAddress('mv3Fqu4nnPcvRQREkhxCjVJfznU7JfiQ3CGL')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateSmartRollupAddress('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D%test')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateSmartRollupAddress('mv4iZavVJgwFdqwLdeaV3Vj1Km5rA55ocbjW')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );

    expect(validateSmartRollupAddress('test')).toEqual(ValidationResult.NO_PREFIX_MATCHED);
    expect(validateSmartRollupAddress('')).toEqual(ValidationResult.NO_PREFIX_MATCHED);

    expect(validateSmartRollupAddress('sr166cywS6HJx9gmqMU28Vo284gPQaPcGmYW')).toEqual(
      ValidationResult.VALID
    );
    expect(validateSmartRollupAddress('sr166cywS6HJx9gmqMU28Vo284gPQaPcGmY1')).toEqual(
      ValidationResult.INVALID_CHECKSUM
    );
  });
});

describe('validateChain', () => {
  it('Validate chain id properly', () => {
    expect(validateChain('NetXXAAR1wWQhhe')).toEqual(ValidationResult.VALID);

    // Invalid checksum
    expect(validateChain('NetXdQprcVkpaWm')).toEqual(ValidationResult.INVALID_CHECKSUM);
    expect(validateChain('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7sp')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateChain('mv1')).toEqual(ValidationResult.NO_PREFIX_MATCHED);
    expect(validateChain('mv2')).toEqual(ValidationResult.NO_PREFIX_MATCHED);
    expect(validateChain('mv3')).toEqual(ValidationResult.NO_PREFIX_MATCHED);
    expect(validateChain('KT1')).toEqual(ValidationResult.NO_PREFIX_MATCHED);
    expect(validateChain('test')).toEqual(ValidationResult.NO_PREFIX_MATCHED);
    expect(validateChain('')).toEqual(ValidationResult.NO_PREFIX_MATCHED);
  });
});

describe('validateKeyHash', () => {
  it('Validate key hash properly', () => {
    expect(validateKeyHash('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toEqual(ValidationResult.VALID);
    expect(validateKeyHash('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateKeyHash('mv2ZLWuozgeXpSsauhhLYroGjdjCHuqTSwFC')).toEqual(ValidationResult.VALID);
    expect(validateKeyHash('mv3Fqu4nnPcvRQREkhxCjVJfznU7JfiQ3CGL')).toEqual(ValidationResult.VALID);
  });
});

describe('validateContractAddress', () => {
  it('Validate contract address properly', () => {
    expect(validateContractAddress('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D')).toEqual(
      ValidationResult.VALID
    );
    expect(validateContractAddress('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateContractAddress('mv2ZLWuozgeXpSsauhhLYroGjdjCHuqTSwFC')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateContractAddress('mv3Fqu4nnPcvRQREkhxCjVJfznU7JfiQ3CGL')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(
      validateContractAddress('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4Dasdasdasdasdadasd')
    ).toEqual(ValidationResult.INVALID_CHECKSUM);
    expect(validateContractAddress('KT1Fe71jyjrxFg9ZrYqtvaX7uQ')).toEqual(
      ValidationResult.INVALID_CHECKSUM
    );
  });
});

describe('validatePublicKey', () => {
  it('Validate public key properly', () => {
    expect(validatePublicKey('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validatePublicKey('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validatePublicKey('mv2ZLWuozgeXpSsauhhLYroGjdjCHuqTSwFC')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validatePublicKey('mv3Fqu4nnPcvRQREkhxCjVJfznU7JfiQ3CGL')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validatePublicKey('edpkvS5QFv7KRGfa3b87gg9DBpxSm3NpSwnjhUjNBQrRUUR66F7C9g')).toEqual(
      ValidationResult.VALID
    );
    expect(validatePublicKey('sppk7aqSksZan1AGXuKtCz9UBLZZ77e3ZWGpFxR7ig1Z17GneEhSSbH')).toEqual(
      ValidationResult.VALID
    );
    expect(validatePublicKey('p2pk66tTYL5EvahKAXncbtbRPBkAnxo3CszzUho5wPCgWauBMyvybuB')).toEqual(
      ValidationResult.VALID
    );
  });
});

describe('validateSignature', () => {
  it('Validate signature properly', () => {
    expect(
      validateSignature(
        'edsigtkpiSSschcaCt9pUVrpNPf7TTcgvgDEDD6NCEHMy8NNQJCGnMfLZzYoQj74yLjo9wx6MPVV29CvVzgi7qEcEUok3k7AuMg'
      )
    ).toEqual(ValidationResult.VALID);
    expect(
      validateSignature(
        'edsigthp7LbR5JQ1HRnxKdvhphTJs2omjnu6DF7LhRokPbPHXjkv2EqmCwu3KT1jKRZjrrgb749Yao26qMdcDFbXKrjA7KLSKRC'
      )
    ).toEqual(ValidationResult.VALID);
    expect(
      validateSignature(
        'sigd9ugzpERZmBfyVAAPG4KZfpR4qYA4U51EcALp2hijGgJq3aRqFQANo4hudg3uWbSTaKRKzYhXeoG1TStq5jowaGx1dP9H'
      )
    ).toEqual(ValidationResult.VALID);
    expect(
      validateSignature(
        'spsig1RriZtYADyRhyNoQMa6AiPuJJ7AUDcrxWZfgqexzgANqMv4nXs6qsXDoXcoChBgmCcn2t7Y3EkJaVRuAmNh2cDDxWTdmsz'
      )
    ).toEqual(ValidationResult.VALID);
    expect(validateSignature('sigUdRdXYCXW14xqT8mFTMkX4wSmDMBmcW1Vuz1vanGWqYT')).toEqual(
      ValidationResult.INVALID_CHECKSUM
    );
    expect(validateSignature('mv1NiGqJHiRwivfGULeVz8kV16AnhepCa5rW')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateSignature('KT1Fe71jyjrxFg9ZrYqtvaX7uQjcLo7svE4D')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateSignature('mv2ZLWuozgeXpSsauhhLYroGjdjCHuqTSwFC')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateSignature('mv3Fqu4nnPcvRQREkhxCjVJfznU7JfiQ3CGL')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateSignature('edpkvS5QFv7KRGfa3b87gg9DBpxSm3NpSwnjhUjNBQrRUUR66F7C9g')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateSignature('sppk7aqSksZan1AGXuKtCz9UBLZZ77e3ZWGpFxR7ig1Z17GneEhSSbH')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateSignature('p2pk66tTYL5EvahKAXncbtbRPBkAnxo3CszzUho5wPCgWauBMyvybuB')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
  });
});

describe('validateOperation', () => {
  it('Validate Operation Hash properly', () => {
    expect(validateOperation('ood2Y1FLHH9izvYghVcDGGAkvJFo1CgSEjPfWvGsaz3qypCmeUj')).toEqual(
      ValidationResult.VALID
    );
    expect(validateOperation('onwtjK2Q32ndjF9zbEPPtmifdBq5qB59wjMP2oCH22mARjyKnGP')).toEqual(
      ValidationResult.VALID
    );
    expect(validateOperation('oo6JPEAy8VuMRGaFuMmLNFFGdJgiaKfnmT1CpHJfKP3Ye5ZahiP')).toEqual(
      ValidationResult.VALID
    );
    expect(validateOperation('ont3n75kMA2xeoTdxkGM23h5XhWgyP51WEznc4zCDtGNz1TWSzg')).toEqual(
      ValidationResult.VALID
    );

    expect(validateOperation('ont3n75kMA2xeoTdxkGM23h5XhWgyP51WEznc4zCDtGNz1TWSz')).toEqual(
      ValidationResult.INVALID_CHECKSUM
    );
    expect(validateOperation('onwtjK2Q32ndjF9zbEPPtmifdBq5qB59wjMP2oCH22mARyKnGP')).toEqual(
      ValidationResult.INVALID_CHECKSUM
    );

    expect(validateOperation('sppk7aqSksZan1AGXuKtCz9UBLZZ77e3ZWGpFxR7ig1Z17GneEhSSbH')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateOperation('p2pk66tTYL5EvahKAXncbtbRPBkAnxo3CszzUho5wPCgWauBMyvybuB')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
  });
});

describe('validateProtocol', () => {
  it('Validate Protocol Hash properly', () => {
    expect(validateProtocol('PtBoreasK2KPuKbeYtXeEdudEHS7YcMFHE9amwheUc4kejTxgRi')).toEqual(
      ValidationResult.VALID
    );
    expect(validateProtocol('ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK')).toEqual(
      ValidationResult.VALID
    );

    expect(validateProtocol('PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQE')).toEqual(
      ValidationResult.INVALID_CHECKSUM
    );
    expect(validateProtocol('PsBABY5HQTSkA4297zNHfsZNKtxULfL18y95b3m53QJiXGmrbU')).toEqual(
      ValidationResult.INVALID_CHECKSUM
    );

    expect(validateProtocol('ont3n75kMA2xeoTdxkGM23h5XhWgyP51WEznc4zCDtGNz1TWSz')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateProtocol('sppk7aqSksZan1AGXuKtCz9UBLZZ77e3ZWGpFxR7ig1Z17GneEhSSbH')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
  });
});

describe('validateBlock', () => {
  it('Validate Block Hash properly', () => {
    expect(validateBlock('BLJjnzaPtSsxykZ9pLTFLSfsKuiN3z7SjSPDPWwbE4Q68u5EpBw')).toEqual(
      ValidationResult.VALID
    );
    expect(validateBlock('BMEdgRZbJJqUrtByoA5Jyuvy8mzp8mefbcrno82nQCAEbBCUhog')).toEqual(
      ValidationResult.VALID
    );

    expect(validateBlock('BLJjnzaPtSsxykZ9pLTFLSfsKuiN3z7SjSPDPWwbE4Q68u5EBw')).toEqual(
      ValidationResult.INVALID_CHECKSUM
    );
    expect(validateBlock('BMEdgRZbJJrtByoA5Jyuvy8mzp8mefbcrno82nQCAEbBCUhog')).toEqual(
      ValidationResult.INVALID_CHECKSUM
    );

    expect(validateBlock('bnt3n75kMA2xeoTdxkGM23h5XhWgyP51WEznc4zCDtGNz1TWSz')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
    expect(validateBlock('sppk7aqSksZan1AGXuKtCz9UBLZZ77e3ZWGpFxR7ig1Z17GneEhSSbH')).toEqual(
      ValidationResult.NO_PREFIX_MATCHED
    );
  });
});

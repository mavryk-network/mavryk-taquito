/* eslint-disable @typescript-eslint/no-empty-interface */
import { Prim, Expr, IntLiteral, StringLiteral, BytesLiteral, List, Node } from './micheline';

interface Prim0<PT extends string = string> extends Prim<PT> {
  args?: never;
}
interface PrimX<PT extends string = string, AT extends Expr[] = Expr[]> extends Prim<PT, AT> {
  args: AT;
}

// Instructions
type MichelsonNoArgInstructionID =
  | 'ABS'
  | 'ADD'
  | 'ADDRESS'
  | 'AMOUNT'
  | 'AND'
  | 'APPLY'
  | 'BALANCE'
  | 'BLAKE2B'
  | 'CAR'
  | 'CDR'
  | 'CHAIN_ID'
  | 'CHECK_SIGNATURE'
  | 'COMPARE'
  | 'CONCAT'
  | 'CONS'
  | 'EDIV'
  | 'EQ'
  | 'EXEC'
  | 'FAILWITH'
  | 'GE'
  | 'GET_AND_UPDATE'
  | 'GT'
  | 'HASH_KEY'
  | 'IMPLICIT_ACCOUNT'
  | 'INT'
  | 'ISNAT'
  | 'JOIN_TICKETS'
  | 'KECCAK'
  | 'LE'
  | 'LEVEL'
  | 'LSL'
  | 'LSR'
  | 'LT'
  | 'MEM'
  | 'MUL'
  | 'NEG'
  | 'NEQ'
  | 'NEVER'
  | 'NOT'
  | 'NOW'
  | 'OR'
  | 'PACK'
  | 'PAIRING_CHECK'
  | 'READ_TICKET'
  | 'SAPLING_VERIFY_UPDATE'
  | 'SELF'
  | 'SELF_ADDRESS'
  | 'SENDER'
  | 'SET_DELEGATE'
  | 'SHA256'
  | 'SHA3'
  | 'SHA512'
  | 'SIZE'
  | 'SLICE'
  | 'SOME'
  | 'SOURCE'
  | 'SPLIT_TICKET'
  | 'SUB'
  | 'SUB_MUMAV'
  | 'SWAP'
  | 'TICKET'
  | 'TICKET_DEPRECATED'
  | 'TOTAL_VOTING_POWER'
  | 'TRANSFER_TOKENS'
  | 'UNIT'
  | 'VOTING_POWER'
  | 'XOR'
  | 'RENAME'
  | 'OPEN_CHEST'
  | 'MIN_BLOCK_TIME'
  | 'BYTES'
  | 'NAT';

type MichelsonRegularInstructionID =
  | 'CONTRACT'
  | 'CREATE_CONTRACT'
  | 'DIG'
  | 'DIP'
  | 'DROP'
  | 'DUG'
  | 'DUP'
  | 'EMPTY_BIG_MAP'
  | 'EMPTY_MAP'
  | 'EMPTY_SET'
  | 'GET'
  | 'IF'
  | 'IF_CONS'
  | 'IF_LEFT'
  | 'IF_NONE'
  | 'ITER'
  | 'LAMBDA'
  | 'LAMBDA_REC'
  | 'LEFT'
  | 'LOOP'
  | 'LOOP_LEFT'
  | 'MAP'
  | 'NIL'
  | 'NONE'
  | 'PAIR'
  | 'PUSH'
  | 'RIGHT'
  | 'SAPLING_EMPTY_STATE'
  | 'UNPACK'
  | 'UNPAIR'
  | 'UPDATE'
  | 'CAST'
  | 'VIEW'
  | 'EMIT'
  // legacy
  | 'CREATE_ACCOUNT'
  | 'STEPS_TO_QUOTA';

export type MichelsonInstructionID = MichelsonNoArgInstructionID | MichelsonRegularInstructionID;
type InstrPrim<PT extends MichelsonInstructionID, AT extends Expr[]> = Prim<PT, AT>;
type Instr0<PT extends MichelsonNoArgInstructionID> = Prim0<PT>;
type InstrX<PT extends MichelsonRegularInstructionID, AT extends Expr[]> = PrimX<PT, AT>;

export type MichelsonCode = InstructionList | MichelsonInstruction;
export interface InstructionList extends List<MichelsonCode> {}

export type MichelsonNoArgInstruction = Instr0<MichelsonNoArgInstructionID>;
export type MichelsonInstruction =
  | MichelsonNoArgInstruction
  | InstrX<'DIG' | 'DUG' | 'SAPLING_EMPTY_STATE', [IntLiteral]>
  | InstrX<'NONE' | 'LEFT' | 'RIGHT' | 'NIL' | 'CAST', [MichelsonType]>
  | InstrX<'IF_NONE' | 'IF_LEFT' | 'IF_CONS' | 'IF', [InstructionList, InstructionList]>
  | InstrX<'MAP' | 'ITER' | 'LOOP' | 'LOOP_LEFT' | 'DIP', [InstructionList]>
  | InstrX<'UNPACK', [MichelsonType]>
  | InstrX<'CONTRACT', [MichelsonType]>
  | InstrX<'CREATE_CONTRACT', [MichelsonContract]>
  | InstrX<'PUSH', [MichelsonType, MichelsonData]>
  | InstrX<'EMPTY_SET', [MichelsonType]>
  | InstrX<'EMPTY_MAP', [MichelsonType, MichelsonType]>
  | InstrX<'EMPTY_BIG_MAP', [MichelsonType, MichelsonType]>
  | InstrX<'LAMBDA' | 'LAMBDA_REC', [MichelsonType, MichelsonType, InstructionList]>
  | InstrX<'DIP', [IntLiteral, InstructionList] | [InstructionList]>
  | InstrX<'VIEW', [StringLiteral, MichelsonType]>
  | InstrX<'EMIT', [MichelsonType]>
  | InstrPrim<'DROP' | 'PAIR' | 'UNPAIR' | 'DUP' | 'GET' | 'UPDATE', [IntLiteral]>;

// Types

export type MichelsonSimpleComparableTypeID =
  | 'string'
  | 'nat'
  | 'int'
  | 'bytes'
  | 'bool'
  | 'mumav'
  | 'key_hash'
  | 'address'
  | 'timestamp'
  | 'never'
  | 'key'
  | 'unit'
  | 'signature'
  | 'chain_id'
  | 'tx_rollup_l2_address';

export type MichelsonTypeID =
  | MichelsonSimpleComparableTypeID
  | 'option'
  | 'list'
  | 'set'
  | 'contract'
  | 'operation'
  | 'pair'
  | 'or'
  | 'lambda'
  | 'map'
  | 'big_map'
  | 'sapling_transaction'
  | 'sapling_transaction_deprecated'
  | 'sapling_state'
  | 'ticket'
  | 'bls12_381_g1'
  | 'bls12_381_g2'
  | 'bls12_381_fr'
  | 'chest_key'
  | 'chest';

type Type0<PT extends MichelsonTypeID> = Prim0<PT>;
type TypeX<PT extends MichelsonTypeID, AT extends Expr[]> = PrimX<PT, AT>;

// Michelson types

export const refContract: unique symbol = Symbol('ref_contract');
export interface MichelsonTypeAddress extends Type0<'address'> {
  [refContract]?: MichelsonTypeContract<MichelsonType>;
}

export type MichelsonTypeInt = Type0<'int'>;
export type MichelsonTypeNat = Type0<'nat'>;
export type MichelsonTypeString = Type0<'string'>;
export type MichelsonTypeBytes = Type0<'bytes'>;
export type MichelsonTypeMumav = Type0<'mumav'>;
export type MichelsonTypeBool = Type0<'bool'>;
export type MichelsonTypeKeyHash = Type0<'key_hash'>;
export type MichelsonTypeTimestamp = Type0<'timestamp'>;
export type MichelsonTypeKey = Type0<'key'>;
export type MichelsonTypeUnit = Type0<'unit'>;
export type MichelsonTypeSignature = Type0<'signature'>;
export type MichelsonTypeOperation = Type0<'operation'>;
export type MichelsonTypeChainID = Type0<'chain_id'>;
export type MichelsonTypeNever = Type0<'never'>;
export type MichelsonTypeBLS12_381_G1 = Type0<'bls12_381_g1'>;
export type MichelsonTypeBLS12_381_G2 = Type0<'bls12_381_g2'>;
export type MichelsonTypeBLS12_381_FR = Type0<'bls12_381_fr'>;
export type MichelsonTypeChestKey = Type0<'chest_key'>;
export type MichelsonTypeChest = Type0<'chest'>;

type TypeList<T extends MichelsonType[]> = T & Node;
export type MichelsonTypePair<T extends MichelsonType[]> = TypeX<'pair', T> | TypeList<T>;

export interface MichelsonTypeOption<T extends MichelsonType> extends TypeX<'option', [T]> {}
export interface MichelsonTypeList<T extends MichelsonType> extends TypeX<'list', [T]> {}
export interface MichelsonTypeContract<T extends MichelsonType> extends TypeX<'contract', [T]> {}
export interface MichelsonTypeOr<T extends [MichelsonType, MichelsonType]> extends TypeX<'or', T> {}
export interface MichelsonTypeLambda<Arg extends MichelsonType, Ret extends MichelsonType>
  extends TypeX<'lambda', [Arg, Ret]> {}

export interface MichelsonTypeSet<T extends MichelsonType> extends TypeX<'set', [T]> {}
export interface MichelsonTypeMap<K extends MichelsonType, V extends MichelsonType>
  extends TypeX<'map', [K, V]> {}
export interface MichelsonTypeBigMap<K extends MichelsonType, V extends MichelsonType>
  extends TypeX<'big_map', [K, V]> {}
export interface MichelsonTypeSaplingState<S extends string = string>
  extends TypeX<'sapling_state', [IntLiteral<S>]> {}
export interface MichelsonTypeSaplingTransaction<S extends string = string>
  extends TypeX<'sapling_transaction', [IntLiteral<S>]> {}
export interface MichelsonTypeTicket<T extends MichelsonType> extends TypeX<'ticket', [T]> {}

export type MichelsonType<T extends MichelsonTypeID = MichelsonTypeID> = T extends 'int'
  ? MichelsonTypeInt
  : T extends 'nat'
  ? MichelsonTypeNat
  : T extends 'string'
  ? MichelsonTypeString
  : T extends 'bytes'
  ? MichelsonTypeBytes
  : T extends 'mumav'
  ? MichelsonTypeMumav
  : T extends 'bool'
  ? MichelsonTypeBool
  : T extends 'key_hash'
  ? MichelsonTypeKeyHash
  : T extends 'timestamp'
  ? MichelsonTypeTimestamp
  : T extends 'address'
  ? MichelsonTypeAddress
  : T extends 'key'
  ? MichelsonTypeKey
  : T extends 'unit'
  ? MichelsonTypeUnit
  : T extends 'signature'
  ? MichelsonTypeSignature
  : T extends 'operation'
  ? MichelsonTypeOperation
  : T extends 'chain_id'
  ? MichelsonTypeChainID
  : T extends 'option'
  ? MichelsonTypeOption<MichelsonType>
  : T extends 'list'
  ? MichelsonTypeList<MichelsonType>
  : T extends 'contract'
  ? MichelsonTypeContract<MichelsonType>
  : T extends 'ticket'
  ? MichelsonTypeTicket<MichelsonType>
  : T extends 'pair'
  ? MichelsonTypePair<MichelsonType[]>
  : T extends 'or'
  ? MichelsonTypeOr<[MichelsonType, MichelsonType]>
  : T extends 'lambda'
  ? MichelsonTypeLambda<MichelsonType, MichelsonType>
  : T extends 'set'
  ? MichelsonTypeSet<MichelsonType>
  : T extends 'map'
  ? MichelsonTypeMap<MichelsonType, MichelsonType>
  : T extends 'big_map'
  ? MichelsonTypeBigMap<MichelsonType, MichelsonType>
  : T extends 'never'
  ? MichelsonTypeNever
  : T extends 'bls12_381_g1'
  ? MichelsonTypeBLS12_381_G1
  : T extends 'bls12_381_g2'
  ? MichelsonTypeBLS12_381_G2
  : T extends 'bls12_381_fr'
  ? MichelsonTypeBLS12_381_FR
  : T extends 'sapling_transaction'
  ? MichelsonTypeSaplingTransaction
  : T extends 'sapling_state'
  ? MichelsonTypeSaplingState
  : T extends 'chest_key'
  ? MichelsonTypeChestKey
  : MichelsonTypeChest;

// Data

export type MichelsonDataID =
  | 'Unit'
  | 'True'
  | 'False'
  | 'None'
  | 'Pair'
  | 'Left'
  | 'Right'
  | 'Some'
  | 'Lambda_rec';

type Data0<PT extends MichelsonDataID> = Prim0<PT>;
type DataX<PT extends MichelsonDataID, AT extends MichelsonData[]> = PrimX<PT, AT>;

export type MichelsonDataOption = DataX<'Some', [MichelsonData]> | Data0<'None'>;
export type MichelsonDataOr = DataX<'Left' | 'Right', [MichelsonData]>;
type DataList<T extends MichelsonData[]> = T & Node;
export type MichelsonDataPair<T extends MichelsonData[]> = DataX<'Pair', T> | DataList<T>;
export type MichelsonMapElt = PrimX<'Elt', [MichelsonData, MichelsonData]>;
export type MichelsonMapEltList = List<MichelsonMapElt>;
export type MichelsonLambdaRec = DataX<'Lambda_rec', [InstructionList]>;

export type MichelsonData =
  | IntLiteral
  | StringLiteral
  | BytesLiteral
  | Data0<'Unit' | 'True' | 'False'>
  | MichelsonDataOption
  | MichelsonDataOr
  | DataList<MichelsonData[]>
  | MichelsonDataPair<MichelsonData[]>
  | InstructionList
  | MichelsonMapEltList
  | MichelsonLambdaRec;

// Top level script sections

export type MichelsonSectionID = 'parameter' | 'storage' | 'code' | 'view';
type SectionPrim<PT extends MichelsonSectionID, AT extends Expr[]> = PrimX<PT, AT>;

export type MichelsonContractParameter = SectionPrim<'parameter', [MichelsonType]>;
export type MichelsonContractStorage = SectionPrim<'storage', [MichelsonType]>;
export type MichelsonContractCode = SectionPrim<'code', [InstructionList]>;
export type MichelsonContractView = SectionPrim<
  'view',
  [StringLiteral, MichelsonType, MichelsonType, InstructionList]
>;

export type MichelsonContract = MichelsonContractSection[];

export type MichelsonContractSection<T extends MichelsonSectionID = MichelsonSectionID> =
  T extends 'parameter'
    ? MichelsonContractParameter
    : T extends 'storage'
    ? MichelsonContractStorage
    : T extends 'view'
    ? MichelsonContractView
    : MichelsonContractCode;

// Code analysis types
export interface MichelsonTypeFailed {
  failed: MichelsonType;
  level: number;
}

export type MichelsonReturnType = MichelsonType[] | MichelsonTypeFailed;

export enum Protocol {
  Ps9mPmXa = 'Ps9mPmXaRzmzk35gbAYNCAw6UXdE2qoABTHbN2oEEc1qM7CwT9P',
  PtAtLas = 'PtAtLasomUEW99aVhVTrqjCHjJSpFUa8uHNEAEamx9v2SNeTaNp',
  ProtoALpha = 'ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK', // temporary protocol hash
}

export const DefaultProtocol = Protocol.PtAtLas;

export type ProtocolID = `${Protocol}`;

const protoLevel: Record<ProtocolID, number> = {
  Ps9mPmXaRzmzk35gbAYNCAw6UXdE2qoABTHbN2oEEc1qM7CwT9P: 0,
  PtAtLasomUEW99aVhVTrqjCHjJSpFUa8uHNEAEamx9v2SNeTaNp: 19,
  ProtoALphaALphaALphaALphaALphaALphaALphaALphaDdp3zK: 20,
};

export function ProtoGreaterOrEqual(a: ProtocolID, b: ProtocolID): boolean {
  return protoLevel[a] >= protoLevel[b];
}

export function ProtoInferiorTo(a: ProtocolID, b: ProtocolID): boolean {
  return protoLevel[a] < protoLevel[b];
}

export interface ProtocolOptions {
  protocol?: ProtocolID;
}

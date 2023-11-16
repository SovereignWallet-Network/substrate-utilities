const { TypeRegistry, createType } = polkadotTypes;

let rawBytes = document.getElementById('rawBytes');
let customTypes = document.getElementById('customTypes');
let typeKey = document.getElementById('typeKey');
let output = document.getElementById('output');

customTypes.addEventListener('input', parseCustomType);
rawBytes.addEventListener('input', parseCustomType);
output.addEventListener('input', unparseCustomType);

/* CUSTOM TYPES EDITOR START */

// create the editor
const options = { mode: 'code', onChange: registerTypes };
const editor = new JSONEditor(customTypes, options);

// set json
const initialJson = [{
  "PeerId": "OpaquePeerId",
  "identifier": "[u8;32]",
  "public_key": "[u8;32]",
  "metadata": "Vec<u8>",
  "DidStruct": {
    "identifier": "identifier",
    "public_key": "public_key",
    "metadata": "metadata"
  },
  "Did": "[u8;32]",
  "PublicKey": "[u8;32]",
  "Address": "MultiAddress",
  "LookupSource": "MultiAddress",
  "Balance": "u128",
  "TreasuryProposal": {
    "proposer": "Did",
    "beneficiary": "Did",
    "value": "Balance",
    "bond": "Balance"
  },
  "CurrencyId": "u32",
  "Amount": "i64",
  "Memo": "Vec<u8>",
  "AccountInfo": "AccountInfoWithDualRefCount",
  "VC": {
    "hash": "Hash",
    "owner": "Did",
    "issuers": "Vec<Did>",
    "signatures": "Vec<Signature>",
    "is_vc_used": "bool",
    "vc_type": "VCType",
    "vc_property": "[u8;128]"
  },
  "VCType": {
    "_enum": [
      "TokenVC",
      "SlashTokens",
      "MintTokens",
      "TokenTransferVC",
      "GenericVC"
    ]
  },
  "TokenVC": {
    "token_name": "[u8;16]",
    "reservable_balance": "Balance",
    "decimal": "u8",
    "currency_code": "[u8;8]"
  },
  "SlashMintTokens": {
    "vc_id": "VCid",
    "currency_code": "CurrencyCode",
    "amount": "u128"
  },
  "TokenTransferVC": {
    "vc_id": "VCid",
    "currency_code": "CurrencyCode",
    "amount": "u128"
  },
  "GenericVC": {
    "cid": "[u8;64]"
  },
  "VCHash": "Vec<u8>",
  "VCStatus": {
    "_enum": [
      "Active",
      "Inactive"
    ]
  },
  "VCid": "[u8;32]",
  "Hash": "H256",
  "Signature": "H512",
  "TokenDetails": {
    "token_name": "Vec<u8>",
    "currency_code": "Vec<u8>",
    "decimal": "u8",
    "block_number": "BlockNumber"
  },
  "StorageVersion": {
    "_enum": [
      "V1_0_0",
      "V2_0_0"
    ]
  },
  "TokenBalance": "u128",
  "TokenAccountData": {
    "free": "TokenBalance",
    "reserved": "TokenBalance",
    "frozen": "TokenBalance"
  },
  "TokenAccountInfo": {
    "nonce": "u32",
    "data": "TokenAccountData"
  },
  "Votes": {
    "index": "ProposalIndex",
    "threshold": "MemberCount",
    "ayes": "Vec<Did>",
    "nays": "Vec<Did>",
    "end": "BlockNumber"
  },
  "CurrencyCode": "[u8;8]",
  "VCPalletVersion": {
    "_enum": [
      "V1_0_0",
      "V2_0_0"
    ]
  }
}];

editor.set(initialJson);

/* CUSTOM TYPES EDITOR END */

const registry = new TypeRegistry();

function registerTypes() {
  let typesObject = editor.get();

  if (Array.isArray(typesObject)) {
    typesObject.map(type => {
      registry.register(type);
    });
  } else {
    registry.register(typesObject);
  }
}

function parseCustomType() {
  try {
    console.log(typeKey.value, rawBytes.value.trim())
    let result = JSON.stringify(
      createType(registry, typeKey.value, rawBytes.value.trim())
    );
    output.innerText = result;
    console.log("Parse Result:", result);
  } catch (e) {
    console.error(e);
  }
}

function unparseCustomType() {
  try {
    console.log(typeKey.value, JSON.parse(output.value))
    let result = createType(registry, typeKey.value, JSON.parse(output.value)).toHex();
    rawBytes.innerText = result;
    console.log("Unparse Result:", result);
  } catch (e) {
    console.error(e);
  }
}

registerTypes();
parseCustomType();

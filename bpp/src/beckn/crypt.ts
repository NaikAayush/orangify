// import _sodium from 'libsodium-wrappers';
// import { base64_variants } from 'libsodium-wrappers';
const _sodium = require('libsodium-wrappers');
const { base64_variants } = require('libsodium-wrappers');

export const createAuthorizationHeader = async (message) => {
  const { signingString, expires, created } = await createSigningString(
    JSON.stringify(message),
  );
  // console.log(process.env.PRIVATE_KEY);
  const signature = await signMessage(
    signingString,
    process.env.PRIVATE_KEY || '',
  );
  const subscriberId = process.env.SUBSCRIBER_ID;
  const header = `Signature keyId="${subscriberId}|${process.env.UNIQUE_ID}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`;
  console.log('Auth', header);
  return header;
};

const createSigningString = async (message, created = null, expires = null) => {
  if (!created)
    created = Math.floor(new Date().getTime() / 1000 - 1 * 60).toString();
  if (!expires) expires = (parseInt(created) + 1 * 60 * 60).toString();
  await _sodium.ready;
  const sodium = _sodium;
  const digest = sodium.crypto_generichash(64, sodium.from_string(message));
  const digest_base64 = sodium.to_base64(digest, base64_variants.ORIGINAL);
  const signingString = `(created): ${created}
(expires): ${expires}
digest: BLAKE-512=${digest_base64}`;
  return { signingString, expires, created };
};

const signMessage = async (signingString, privateKey) => {
  await _sodium.ready;
  const sodium = _sodium;
  const signedMessage = sodium.crypto_sign_detached(
    signingString,
    sodium.from_base64(privateKey, base64_variants.ORIGINAL),
  );
  return sodium.to_base64(signedMessage, base64_variants.ORIGINAL);
};

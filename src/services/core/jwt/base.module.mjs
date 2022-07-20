import { SignJWT, importJWK, jwtVerify } from 'jose'

async function getSecretKey(secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY) {  
  const jwk = {
    kty: 'oct',
    k: secret,
  }
  return await importJWK(jwk, 'HS256')
}

export async function encryptMessage(input) {
  try {
    const secretKey = await getSecretKey()
    return await new SignJWT(input).setProtectedHeader({ alg: 'HS256' }).sign(secretKey)
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function decryptMessage(input) {
  try {
    const secretKey = await getSecretKey()
    const decryptResult = await jwtVerify(input, secretKey)
    const result = decryptResult?.payload ?? null
    return result
  } catch {
    return null
  }
}

export const jwtMethods = {
  encryptMessage,
  decryptMessage,
}
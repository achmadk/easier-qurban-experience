import { SignJWT, importJWK, jwtVerify, JWTPayload } from 'jose'

export interface JWTWorkerType {
  encryptMessage<PayloadType = unknown>(
    input: PayloadType
  ): Promise<string | null>
  decryptMessage<SuccessReturnType = unknown>(input: string): Promise<SuccessReturnType | null>
}

async function getSecretKey(secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY as string) {
  
  const jwk = {
    kty: 'oct',
    k: secret,
  }
  return await importJWK(jwk, 'HS256')
}

export async function encryptMessage<
  PayloadType extends JWTPayload = JWTPayload
>(input: PayloadType) {
  try {
    const secretKey = await getSecretKey()
    return await new SignJWT(input).setProtectedHeader({ alg: 'HS256' }).sign(secretKey)
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function decryptMessage<SuccessReturnType = unknown>(input: string) {
  try {
    const secretKey = await getSecretKey()
    const decryptResult = await jwtVerify(input, secretKey)
    const result = decryptResult?.payload ?? null
    return result as unknown as SuccessReturnType
  } catch {
    return null
  }
}

export const jwtMethods = {
  encryptMessage,
  decryptMessage,
}
import crypto from "crypto";

export function hashPassword( password: string ): string {
  const salt = crypto.randomBytes( 16 ).toString( "hex" );
  const hash = crypto.pbkdf2Sync( password, salt, 1000, 64, "sha512" ).toString( "hex" );
  const hashedPassword = `pbkdf2_sha512$1000$${salt}$${hash}`;
  
  return hashedPassword;
}
  
export function verifyPassword( password: string, hashedPassword: string ): boolean {
  const [ _, iterations, salt, expectedHash ] = hashedPassword.split( "$" );
  const hash = crypto.pbkdf2Sync( password, salt, parseInt( iterations ), 64, "sha512" ).toString( "hex" );
  const isMatch = hash === expectedHash;
  
  return isMatch;
}
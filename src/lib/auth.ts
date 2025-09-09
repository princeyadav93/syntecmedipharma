import jwt from 'jsonwebtoken';

export interface DecodedToken {
    id: string;
    email: string;
    name: string;
    iat?: number;
    exp?: number;
}

export function verifyToken(token: string): DecodedToken | null {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    } catch (err) {
        console.log('Error verifying token:', err);
        return null;
    }
}

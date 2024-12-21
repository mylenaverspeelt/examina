import { NextResponse } from 'next/server';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swagger';

const specs = swaggerJsdoc(swaggerOptions);

export async function GET() {
  return NextResponse.json(specs);
}

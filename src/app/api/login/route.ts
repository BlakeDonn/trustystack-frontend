import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  // Mock user data for testing
  if (email === 'test@example.com' && password === 'password123') {
    return NextResponse.json({ name: 'Test User', email });
  }

  // Return 401 for invalid credentials
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
} 
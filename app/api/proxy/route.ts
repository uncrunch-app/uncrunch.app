import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const baseUrl = searchParams.get('url')
  const token = searchParams.get('token')

  if (!baseUrl || !token) {
    return NextResponse.json(
      { error: 'Missing URL or token parameter' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(decodeURIComponent(baseUrl), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from API' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 })
  }
}

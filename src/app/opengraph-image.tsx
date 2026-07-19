import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#090710',
          overflow: 'hidden',
        }}
      >
        {/* Vinyl disc (right, partially cropped) */}
        <div
          style={{
            position: 'absolute',
            right: -80,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 580,
            height: 580,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'absolute', width: 556, height: 556, borderRadius: '50%', border: '24px solid rgba(255,255,255,0.12)' }} />
          <div style={{ position: 'absolute', width: 452, height: 452, borderRadius: '50%', border: '24px solid rgba(255,255,255,0.16)' }} />
          <div style={{ position: 'absolute', width: 368, height: 368, borderRadius: '50%', border: '24px solid rgba(255,255,255,0.20)' }} />
          <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '24px solid rgba(255,255,255,0.24)' }} />
          <div style={{ position: 'absolute', width: 214, height: 214, borderRadius: '50%', border: '24px solid rgba(255,255,255,0.28)' }} />
          <div style={{ position: 'absolute', width: 104, height: 104, borderRadius: '50%', backgroundColor: '#6702C6' }} />
        </div>

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 88px', maxWidth: 700 }}>
          <div style={{
            color: '#a78bfa',
            fontSize: 18,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: 28,
          }}>
            Listening Bar & Records · Curitiba
          </div>
          <div style={{
            color: 'white',
            fontSize: 100,
            fontWeight: 700,
            lineHeight: 0.94,
            letterSpacing: '-0.02em',
          }}>
            Purple Cat
          </div>
          <div style={{
            color: '#71717a',
            fontSize: 24,
            marginTop: 32,
            lineHeight: 1.5,
          }}>
            Listening bar, drinks, cozinha e discos de vinil.
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}

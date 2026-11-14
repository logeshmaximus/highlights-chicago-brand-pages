export const metadata = {title: 'Brand Service Pages Studio', robots: {index: false, follow: false}}

export default function StudioLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body style={{margin: 0}}>{children}</body>
    </html>
  )
}

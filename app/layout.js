export const metadata = {
  title: 'DIY Journal Builder',
  description: 'Customized Booklet Tool',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
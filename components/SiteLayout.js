import React from 'react'
import Head from 'next/head'
import { css } from "@emotion/css"

export default function SiteLayout({ title, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={css`padding: 20px;`}>
        <header>
          <h1 className={css`font-size: 48px;`}>Get Shipped.</h1>
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

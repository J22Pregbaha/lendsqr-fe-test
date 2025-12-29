import React from 'react'
import { Helmet } from 'react-helmet-async'

export interface Props {
  title: string;
  description?: string;
  canonicalUrl?: string;
}

export const PageTitle: React.FC<Props> = ({ title, description, canonicalUrl }) => {
  const fullTitle = `${title} | Lendersqr`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="author" content="Drugstoc" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}

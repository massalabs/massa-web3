const DefaultUrl = ''

async function resolve(uri: string): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('This function can only be used in a browser environment')
  }

  const url = new URL(uri)
  const domain = url.hostname

  try {
    const response = await fetch(
      `${window.location.protocol}//${window.location.hostname}/__deweb_info`
    )
    const data = await response.json()
    if (data.app == 'deweb') {
      return `${window.location.protocol}//domain.${window.location.hostname}/${url.pathname}${url.search}`
    }
    return DefaultUrl
  } catch (error) {
    throw new Error(`Failed to resolve MNS domain: ${domain}`)
  }
}

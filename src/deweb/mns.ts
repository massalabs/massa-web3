export const DEWEB_REDIRECT_URL = 'https://deweb.massa.network/deweb_redirect'

export async function resolveDeweb(uri: string): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('This function can only be used in a browser environment')
  }

  if (!uri.includes('://')) {
    uri = `http://${uri}`
  }

  if (!URL.canParse(uri)) {
    throw new Error('Invalid URI')
  }

  // Retrieve the url information
  const { hostname: mns, pathname: mnsPath, search: mnsSearch } = new URL(uri)

  // If the current domain is not a MNS domain, we throw an error
  if (!mns.includes('.massa')) {
    throw new Error('Not a MNS domain')
  }

  /* -- Check if mns domain are natively supported by the current browser -- */
  try {
    const response = await fetch(`http://${mns}/__deweb_info`)
    if (response.ok) {
      return uri
    }
  } catch (error) {
    // ignore error
  }

  const mnsDomain = mns.replace('.massa', '')

  /* -- Check if a localhost deweb provider is available -- */
  try {
    const response = await fetch('http://localhost:8080/__deweb_info')
    if (await isDewebInfoData(response)) {
      return `http://${mnsDomain}.localhost:8080${mnsPath}${mnsSearch}`
    }
  } catch (error) {
    // ignore error
  }

  /* -- Check if the current domain is a Deweb provider -- */
  // retrieve current url information
  const { host: currentHost, protocol: currentProtocol } = window.location
  const subdomains = currentHost.split('.')

  // If the current domain is not a Deweb provider, we redirect to the default URL
  // Use proper URL encoding for the deweb_url parameter as per RFC 3986
  const defaultUrl = `${DEWEB_REDIRECT_URL}?deweb_url=${encodeURIComponent(mns + mnsPath + mnsSearch)}`

  /* 
    If the current domain has no subdomains, it can't be a Deweb provider.
    So we redirect to the default URL 
    */
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (subdomains.length < 2) {
    return defaultUrl
  }

  try {
    const response = await fetch(
      `${currentProtocol}//${currentHost}/__deweb_info`
    )
    if (await isDewebInfoData(response)) {
      subdomains[0] = mnsDomain
      return `${currentProtocol}//${subdomains.join('.')}${mnsPath}${mnsSearch}`
    }
    return defaultUrl
  } catch (error) {
    return defaultUrl
  }
}

async function isDewebInfoData(response: Response): Promise<boolean> {
  if (response.ok) {
    const data = await response.json()
    return data.app && data.app == 'deweb'
  }
  return false
}

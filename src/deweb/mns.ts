const DEWEB_REDIRECT_URL = 'https://deweb.massa.network/deweb_redirect'

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

  // Retrieve the uri informations
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
    console.log('MNS domain not natively supported by the current browser')
  }

  const mnsDomain = mns.replace('.massa', '')

  /* -- Check if a localhost deweb provider is available -- */
  try {
    const response = await fetch('http://localhost:8080/__deweb_info')
    if (await isDewebInfoData(response)) {
      return `http://${mnsDomain}.localhost:8080${mnsPath}${mnsSearch}`
    }
    console.log('No local deweb provider found')
  } catch (error) {
    console.log('No local deweb provider found')
  }

  /* -- Check if the current domain is a Deweb provider -- */
  // retrieve current url informations
  const { host: currentHost, protocol: currentProtocol } = window.location
  const subdomains = currentHost.split('.')

  // If the current domain is not a Deweb provider, we redirect to the default URL
  const defaultUrl = `${DEWEB_REDIRECT_URL}?domain="${uri.split('://')[1]}"`

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
      `${currentProtocol}//${subdomains.slice(1).join('.')}/__deweb_info`
    )
    if (await isDewebInfoData(response)) {
      subdomains[0] = mnsDomain
      return `${currentProtocol}//${subdomains.join('.')}/${mnsPath}${mnsSearch}`
    }
    return defaultUrl
  } catch (error) {
    console.log(
      'Current domain is not a deweb provider. Return the default redirect URL'
    )
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

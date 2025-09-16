export const DEWEB_REDIRECT_URL = 'https://deweb.massa.network/deweb_redirect'

/* deweb plugin status */
const STATION_DEWEB_STATUS_URL =
  'https://station.massa/plugin/massa-labs/local-deweb-provider/api/server/status'
const DEWEB_STATUS_RUNNING = 'running'

type DewebStatus = {
  serverPort: number
  status: string
}

/**
 * Resolve the deweb mns domain to a valid http url pointing to a deweb provider.
 *
 * Providers are used in following order if availables:
 * - Check if the mns domain is natively supported by the current browser
 * - Check if the station deweb plugin is available
 * - Check if a localhost deweb provider is available
 * - Check if the current domain is a Deweb provider
 *
 * If no provider is available, we redirect to the default URL
 * @param uri - The mns domain to resolve. It must be suffixed with a '.massa'
 * @param chainId - The returned url must belong to a provider having the same same chainid. If null, we don't check the chainId
 * @returns The resolved URI
 */
export async function resolveDeweb(
  uri: string,
  chainId: number | null = null
): Promise<string> {
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
  const {
    hostname: mns,
    pathname: mnsPath,
    search: mnsSearch,
    hash: mnsHash,
  } = new URL(uri)

  // If the current domain is not a MNS domain, we throw an error
  if (!mns.includes('.massa')) {
    throw new Error('Not a MNS domain')
  }

  // remove trailing "/"
  const urlSearch = (mnsPath + mnsSearch).replace(/\/$/, '')

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

  /* -- Check if the deweb plugin is running -- */
  const dewebServePort = await pluginDewebServePort()
  if (dewebServePort) {
    if (!chainId) {
      return `http://${mnsDomain}.localhost:${dewebServePort}${urlSearch}${mnsHash}`
    }
    try {
      const response = await fetch(
        `http://${mnsDomain}.localhost:${dewebServePort}/__deweb_info`
      )
      if (await checkDewebInfoData(response, chainId)) {
        return `http://${mnsDomain}.localhost:${dewebServePort}${urlSearch}${mnsHash}`
      }
    } catch (error) {
      // ignore error
    }
  }

  /* -- Check if a localhost deweb provider is available -- */
  try {
    const response = await fetch('http://localhost:8080/__deweb_info')
    if (await checkDewebInfoData(response, chainId)) {
      return `http://${mnsDomain}.localhost:8080${urlSearch}${mnsHash}`
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
  const defaultUrl = `${DEWEB_REDIRECT_URL}?${chainId ? `chainid=${chainId}&` : ''}deweb_url=${encodeURIComponent(mns + urlSearch + mnsHash)}`

  /* 
    If the current domain has no subdomains, it can't be a Deweb provider.
    So we redirect to the default URL 
    */
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (subdomains.length < 2) {
    return defaultUrl
  }

  // try to fetch the deweb info data from the current domain
  try {
    const response = await fetch(
      `${currentProtocol}//${currentHost}/__deweb_info`
    )
    if (await checkDewebInfoData(response, chainId)) {
      subdomains[0] = mnsDomain
      return `${currentProtocol}//${subdomains.join('.')}${urlSearch}${mnsHash}`
    }
    return defaultUrl
  } catch (error) {
    // return default url if the current domain is not a Deweb provider
    return defaultUrl
  }
}

/* 
Check if the response correspond to a provider's __deweb_info endpoint response
If the chainId parameter is not zero, we check if it corresponds to the chainId of the provider
 */
async function checkDewebInfoData(
  response: Response,
  chainId: number | null
): Promise<boolean> {
  if (response.ok) {
    const data = await response.json()
    return (
      data.app &&
      data.app == 'deweb' &&
      (!chainId || (data.chainId && data.chainId == chainId))
    )
  }
  return false
}

/* Retrieve the port of the station deweb plugin.
If the plugin is not running, we return null
 */
async function pluginDewebServePort(): Promise<number | null> {
  try {
    const response = await fetch(STATION_DEWEB_STATUS_URL)
    if (response.ok) {
      const data: DewebStatus = await response.json()
      if (data.status !== DEWEB_STATUS_RUNNING) {
        return null
      }
      return data.serverPort
    }
    return null
  } catch (error) {
    return null
  }
}

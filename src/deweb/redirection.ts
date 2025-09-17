import { CHAIN_ID } from '../utils/networks'

export const DEWEB_REDIRECT_URL = 'https://deweb.massa.network/deweb_redirect'

/* deweb plugin status */
const STATION_DEWEB_STATUS_URL =
  'https://station.massa/plugin/massa-labs/local-deweb-provider/api/server/status'
const DEWEB_STATUS_RUNNING = 'running'

type DewebStatus = {
  serverPort: number
  status: string
}

type DewebInfoData = {
  app?: string
  chainId?: bigint
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
 * @param chainId - The returned url must belong to a provider having the same chainid. Mainnet by default
 * @returns The resolved URI
 */
export async function resolveDeweb(
  uri: string,
  chainId: bigint = CHAIN_ID.Mainnet
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
    try {
      if (
        await isDewebProvider(`http://localhost:${dewebServePort}`, chainId)
      ) {
        return `http://${mnsDomain}.localhost:${dewebServePort}${urlSearch}${mnsHash}`
      }
    } catch (error) {
      // ignore error
    }
  }

  /* -- Check if a localhost deweb provider is available -- */
  try {
    if (await isDewebProvider('http://localhost:8080', chainId)) {
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
  const defaultUrl = `${DEWEB_REDIRECT_URL}?chainid=${chainId}&deweb_url=${encodeURIComponent(mns + urlSearch + mnsHash)}`

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
    if (await isDewebProvider(`${currentProtocol}//${currentHost}`, chainId)) {
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
Check if there is a deweb provider associated to a given url. 
If so, check it run on the same chainId as the one provided
 */
async function isDewebProvider(
  providerUrl: string,
  chainId: bigint
): Promise<boolean> {
  const response = await fetch(providerUrl + '/__deweb_info')
  if (response.ok) {
    const data: DewebInfoData = await response.json()
    return (
      !!data.app &&
      data.app == 'deweb' &&
      !!data.chainId &&
      data.chainId == chainId
    )
  }
  return false
}

/* Retrieve the port of the station deweb plugin.
If the plugin is not running, we return undefined
 */
async function pluginDewebServePort(): Promise<number | undefined> {
  try {
    const response = await fetch(STATION_DEWEB_STATUS_URL)
    if (response.ok) {
      const data: DewebStatus = await response.json()
      if (data.status !== DEWEB_STATUS_RUNNING) {
        return
      }
      return data.serverPort
    }
    return
  } catch (error) {
    return
  }
}

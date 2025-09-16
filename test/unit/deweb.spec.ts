import {
  resolveDeweb,
  DEWEB_REDIRECT_URL,
  extractWebsiteMetadata,
} from '../../src/deweb'
import { Metadata } from '../../src/deweb/serializers/Metadata'
import {
  TITLE_METADATA_KEY,
  DESCRIPTION_METADATA_KEY,
  KEYWORD_METADATA_KEY_PREFIX,
  LAST_UPDATE_KEY,
} from '../../src/deweb/const'

// Mock the browser environment
const mockWindow = {
  location: {
    host: 'example.com',
    protocol: 'https:',
  },
}

// Mock fetch function
const mockFetch = jest.fn()

// Helper function to generate expected default URLs consistently
// This uses proper URL encoding for the deweb_url parameter as per RFC 3986
function buildDefaultUrl(mnsPath: string, chainId?: number): string {
  return `${DEWEB_REDIRECT_URL}?${chainId ? `chainid=${chainId}&` : ''}deweb_url=${encodeURIComponent(mnsPath)}`
}

describe('resolveDeweb Unit Tests', () => {
  beforeAll(() => {
    // Setup browser environment
    global.window = mockWindow as any
    global.fetch = mockFetch
    global.URL = URL
  })

  beforeEach(() => {
    mockFetch.mockClear()
    // Reset window.location to default
    mockWindow.location.host = 'example.com'
    mockWindow.location.protocol = 'https:'
  })

  afterAll(() => {
    // Cleanup
    delete (global as any).window
    delete (global as any).fetch
  })

  // Common test input including a hash fragment
  const URL_TEST = 'test.massa/path?query=1#section'

  // Helper function to create mock deweb info response with chainId
  function createMockDewebInfoResponse(chainId?: number) {
    return {
      ok: true,
      json: () =>
        Promise.resolve({
          app: 'deweb',
          ...(chainId !== undefined && { chainId }),
        }),
    }
  }

  describe('Environment validation', () => {
    test('should throw error when not in browser environment', async () => {
      delete (global as any).window

      await expect(resolveDeweb('test.massa')).rejects.toThrow(
        'This function can only be used in a browser environment'
      )

      // Restore window for other tests
      global.window = mockWindow as any
    })
  })

  describe('URI validation and normalization', () => {
    test('should add http:// protocol when missing', async () => {
      mockFetch.mockResolvedValue({ ok: false })

      const result = await resolveDeweb('test.massa')

      expect(mockFetch).toHaveBeenCalledWith('http://test.massa/__deweb_info')
    })

    test('should preserve existing protocol', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true }) // Native support succeeds

      const result = await resolveDeweb('https://test.massa')

      // The native check always uses http://, but returns original URI
      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        'http://test.massa/__deweb_info'
      )
      expect(result).toBe('https://test.massa')
    })

    test('should throw error for invalid URI', async () => {
      await expect(resolveDeweb('not-a-valid-uri:::')).rejects.toThrow(
        'Invalid URI'
      )
    })

    test('should throw error for non-MNS domain', async () => {
      await expect(resolveDeweb('example.com')).rejects.toThrow(
        'Not a MNS domain'
      )
    })
  })

  describe('Native browser support check', () => {
    test('should return original URI when native support is available', async () => {
      mockFetch.mockResolvedValue({ ok: true })

      const result = await resolveDeweb(URL_TEST)

      expect(result).toBe('http://' + URL_TEST)
      expect(mockFetch).toHaveBeenCalledWith('http://test.massa/__deweb_info')
    })

    test('should continue to next check when native support fails', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('localhost not available')) // Localhost fails
        .mockResolvedValueOnce({ ok: false }) // Current domain fails

      const result = await resolveDeweb(URL_TEST)

      expect(result).toBe(buildDefaultUrl(URL_TEST))
    })
  })

  describe('Deweb plugin check', () => {
    test('should return plugin URL when deweb plugin is running', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ serverPort: 3000, status: 'running' }),
        }) // Plugin status succeeds

      const result = await resolveDeweb(URL_TEST)

      expect(result).toBe('http://test.localhost:3000/path?query=1#section')
      expect(mockFetch).toHaveBeenCalledWith(
        'https://station.massa/plugin/massa-labs/local-deweb-provider/api/server/status'
      )
    })

    test('should continue to localhost check when plugin is not running', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ serverPort: 3000, status: 'stopped' }),
        }) // Plugin not running
        .mockResolvedValueOnce(createMockDewebInfoResponse()) // Localhost succeeds

      const result = await resolveDeweb(URL_TEST)

      expect(result).toBe('http://test.localhost:8080/path?query=1#section')
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/__deweb_info'
      )
    })

    test('should continue to localhost check when plugin status API fails', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('Plugin API not available')) // Plugin API fails
        .mockResolvedValueOnce(createMockDewebInfoResponse()) // Localhost succeeds

      const result = await resolveDeweb(URL_TEST)

      expect(result).toBe('http://test.localhost:8080/path?query=1#section')
    })

    test('should continue to localhost check when plugin status API returns invalid response', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ serverPort: 3000 }), // Missing status field
        }) // Plugin API returns incomplete data
        .mockResolvedValueOnce(createMockDewebInfoResponse()) // Localhost succeeds

      const result = await resolveDeweb(URL_TEST)

      expect(result).toBe('http://test.localhost:8080/path?query=1#section')
    })

    test('should use deweb plugin when chainId matches', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ serverPort: 3000, status: 'running' }),
        }) // Plugin status succeeds
        .mockResolvedValueOnce(createMockDewebInfoResponse(123)) // Plugin provider with chainId 123

      const result = await resolveDeweb('test.massa', 123)

      expect(result).toBe('http://test.localhost:3000')
    })

    test('should skip deweb plugin when chainId does not match', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ serverPort: 3000, status: 'running' }),
        }) // Plugin status succeeds
        .mockResolvedValueOnce(createMockDewebInfoResponse(456)) // Plugin provider with chainId 456
        .mockResolvedValueOnce(createMockDewebInfoResponse(123)) // Localhost with chainId 123

      const result = await resolveDeweb('test.massa', 123)

      expect(result).toBe('http://test.localhost:8080')
    })
  })

  describe('Localhost deweb provider check', () => {
    test('should return localhost URL when deweb provider is available', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('Plugin not available')) // Deweb Plugin fails
        .mockResolvedValueOnce(createMockDewebInfoResponse()) // Localhost succeeds

      const result = await resolveDeweb(URL_TEST)

      expect(result).toBe('http://test.localhost:8080/path?query=1#section')
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:8080/__deweb_info'
      )
    })

    test('should continue to next check when localhost fails', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('Plugin not available')) // Plugin fails
        .mockRejectedValueOnce(new Error('localhost not available')) // Localhost fails
        .mockResolvedValueOnce({ ok: false }) // Current domain fails

      const result = await resolveDeweb(URL_TEST)

      expect(result).toBe(buildDefaultUrl(URL_TEST))
    })

    test('should continue when localhost returns non-deweb response', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('Plugin not available')) // Plugin fails
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ app: 'other' }),
        }) // Localhost returns non-deweb
        .mockResolvedValueOnce({ ok: false }) // Current domain fails

      const result = await resolveDeweb(URL_TEST)

      expect(result).toBe(buildDefaultUrl(URL_TEST))
    })

    test('should use localhost provider when chainId matches', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('Plugin not available')) // Plugin fails
        .mockResolvedValueOnce(createMockDewebInfoResponse(123)) // Localhost with chainId 123

      const result = await resolveDeweb('test.massa', 123)

      expect(result).toBe('http://test.localhost:8080')
    })

    test('should skip localhost provider when chainId does not match', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('Plugin not available')) // Plugin fails
        .mockResolvedValueOnce(createMockDewebInfoResponse(456)) // Localhost with chainId 456
        .mockResolvedValueOnce({ ok: false }) // Current domain fails

      const result = await resolveDeweb(URL_TEST, 123)

      expect(result).toBe(buildDefaultUrl(URL_TEST, 123))
    })

    test('When no chainid is returned by local deweb provider don t use it', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('Plugin not available')) // Plugin fails
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ app: 'deweb' }), // No chainId field
        }) // Localhost without chainId
        .mockResolvedValueOnce({ ok: false }) // Current domain fails

      const result = await resolveDeweb(URL_TEST, 123)

      expect(result).toBe(buildDefaultUrl(URL_TEST, 123))
    })
  })

  describe('Current domain deweb provider check', () => {
    test('should return current domain URL when deweb provider is available', async () => {
      mockWindow.location.host = 'subdomain.deweb-provider.com'
      mockWindow.location.protocol = 'https:'

      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('Plugin not available')) // Plugin fails
        .mockRejectedValueOnce(new Error('localhost not available')) // Localhost fails
        .mockResolvedValueOnce(createMockDewebInfoResponse()) // Current domain succeeds

      const result = await resolveDeweb('test.massa/path?query=1')

      expect(result).toBe('https://test.deweb-provider.com/path?query=1')
      expect(mockFetch).toHaveBeenCalledWith(
        'https://subdomain.deweb-provider.com/__deweb_info'
      )
    })

    test('should return default URL when current domain has no subdomains', async () => {
      mockWindow.location.host = 'localhost' // Single level domain

      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('Plugin not available')) // Plugin fails
        .mockRejectedValueOnce(new Error('localhost not available')) // Localhost fails
      // No fourth call should be made for current domain

      const result = await resolveDeweb('test.massa/path?query=1')

      expect(result).toBe(buildDefaultUrl('test.massa/path?query=1'))
      // Should not try to check current domain when no subdomains
      expect(mockFetch).toHaveBeenCalledTimes(3)
    })

    test('should return default URL when current domain fails', async () => {
      mockWindow.location.host = 'subdomain.example.com'

      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockResolvedValueOnce({ ok: false }) // Plugin fails
        .mockRejectedValueOnce(new Error('localhost not available')) // Localhost fails
        .mockRejectedValueOnce(new Error('current domain fails')) // Current domain fails

      const result = await resolveDeweb(URL_TEST)

      expect(result).toBe(buildDefaultUrl(URL_TEST))
    })

    test('should return default URL when current domain returns non-deweb response', async () => {
      mockWindow.location.host = 'subdomain.example.com'

      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockResolvedValueOnce({ ok: false }) // Plugin fails
        .mockRejectedValueOnce(new Error('localhost not available')) // Localhost fails
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ app: 'other' }),
        }) // Current domain returns non-deweb

      const result = await resolveDeweb(URL_TEST)

      expect(result).toBe(buildDefaultUrl(URL_TEST))
    })

    test('should use current domain provider when chainId matches', async () => {
      mockWindow.location.host = 'subdomain.deweb-provider.com'
      mockWindow.location.protocol = 'https:'

      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('Plugin not available')) // Plugin fails
        .mockRejectedValueOnce(new Error('localhost not available')) // Localhost fails
        .mockResolvedValueOnce(createMockDewebInfoResponse(123)) // Current domain with chainId 123

      const result = await resolveDeweb('test.massa', 123)

      expect(result).toBe('https://test.deweb-provider.com')
    })

    test('should skip current domain provider when chainId does not match', async () => {
      mockWindow.location.host = 'subdomain.deweb-provider.com'
      mockWindow.location.protocol = 'https:'

      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('Plugin not available')) // Plugin fails
        .mockRejectedValueOnce(new Error('localhost not available')) // Localhost fails
        .mockResolvedValueOnce(createMockDewebInfoResponse(456)) // Current domain with chainId 456

      const result = await resolveDeweb(URL_TEST, 123)

      expect(result).toBe(buildDefaultUrl(URL_TEST, 123))
    })

    test('when no chainid is returned by current domain deweb provider don t use it', async () => {
      mockWindow.location.host = 'subdomain.deweb-provider.com'
      mockWindow.location.protocol = 'https:'

      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('Plugin not available')) // Plugin fails
        .mockRejectedValueOnce(new Error('localhost not available')) // Localhost fails
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ app: 'deweb' }), // No chainId field
        }) // Current domain without chainId

      const result = await resolveDeweb(URL_TEST, 123)

      expect(result).toBe(buildDefaultUrl(URL_TEST, 123))
    })
  })

  describe('Complex domain scenarios', () => {
    test('should handle domain with multiple subdomains', async () => {
      mockWindow.location.host = 'sub1.sub2.deweb-provider.com'

      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockResolvedValueOnce({ ok: false }) // Plugin fails
        .mockRejectedValueOnce(new Error('localhost not available')) // Localhost fails
        .mockResolvedValueOnce(createMockDewebInfoResponse()) // Current domain succeeds

      const result = await resolveDeweb('test.massa')

      expect(result).toBe('https://test.sub2.deweb-provider.com')
    })

    test('should handle complex paths and query parameters', async () => {
      mockFetch.mockResolvedValue({ ok: true })

      const input = 'test.massa/deep/path/file.html?param1=value1&param2=value2'
      const result = await resolveDeweb(input)

      expect(result).toBe(`http://${input}`)
    })

    test('should handle domains with special characters', async () => {
      mockFetch.mockResolvedValue({ ok: true })

      const input = 'test-domain.massa'
      const result = await resolveDeweb(input)

      expect(result).toBe(`http://${input}`)
      expect(mockFetch).toHaveBeenCalledWith(
        'http://test-domain.massa/__deweb_info'
      )
    })
  })

  describe('Fallback behavior', () => {
    test('should always return default URL when all checks fail', async () => {
      mockWindow.location.host = 'subdomain.example.com'
      mockFetch.mockRejectedValue(new Error('Network error'))

      const result = await resolveDeweb('test.massa/path')

      expect(result).toBe(buildDefaultUrl('test.massa/path'))
    })

    test('should handle malformed JSON responses gracefully', async () => {
      mockWindow.location.host = 'subdomain.example.com'

      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockResolvedValueOnce({ ok: false }) // Plugin fails
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.reject(new Error('Invalid JSON')),
        }) // Localhost returns malformed JSON
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({}), // Missing app property
        }) // Current domain returns incomplete data

      const result = await resolveDeweb('test.massa')

      expect(result).toBe(buildDefaultUrl('test.massa'))
    })
  })

  describe('Edge cases', () => {
    test('should handle empty path and search', async () => {
      mockFetch.mockResolvedValue({ ok: true })

      const result = await resolveDeweb('test.massa')

      expect(result).toBe('http://test.massa')
    })

    test('should handle URI with only query parameters', async () => {
      mockFetch.mockResolvedValue({ ok: true })

      const result = await resolveDeweb('test.massa?query=1')

      expect(result).toBe('http://test.massa?query=1')
    })

    test('should handle URI with only path', async () => {
      mockFetch.mockResolvedValue({ ok: true })

      const result = await resolveDeweb('test.massa/path')

      expect(result).toBe('http://test.massa/path')
    })

    test('should handle URI with only hash', async () => {
      mockFetch.mockResolvedValue({ ok: true })

      const result = await resolveDeweb('test.massa#only-hash')

      expect(result).toBe('http://test.massa#only-hash')
    })

    test('should use URL encoding instead of literal quotes in default URL', async () => {
      mockWindow.location.host = 'localhost'
      mockFetch
        .mockResolvedValueOnce({ ok: false }) // Native support fails
        .mockRejectedValueOnce(new Error('Plugin not available')) // Plugin fails
        .mockRejectedValueOnce(new Error('localhost not available')) // Localhost fails

      const result = await resolveDeweb('test.massa/path')

      // Should use proper URL encoding instead of literal quotes
      expect(result).toBe(buildDefaultUrl('test.massa/path'))
      // Verify it's not using literal quotes
      expect(result).not.toContain('deweb_url="')
      expect(result).not.toContain('"')
      // Verify it uses URL encoding
      expect(result).toContain('deweb_url=')
    })
  })
})

// Helper function to create mock response for deweb info
function createMockDewebResponse(isDewebApp: boolean = true) {
  return {
    ok: true,
    json: () =>
      Promise.resolve({
        app: isDewebApp ? 'deweb' : 'other',
      }),
  }
}

describe('extractWebsiteMetadata Unit Tests', () => {
  test('should extract all types of metadata together', () => {
    const metadata = [
      new Metadata(TITLE_METADATA_KEY, 'Complete Website'),
      new Metadata(DESCRIPTION_METADATA_KEY, 'A complete website example'),
      new Metadata(LAST_UPDATE_KEY, '2024-01-01T12:00:00Z'),
      new Metadata(`${KEYWORD_METADATA_KEY_PREFIX}_1`, 'complete'),
      new Metadata(`${KEYWORD_METADATA_KEY_PREFIX}_2`, 'example'),
      new Metadata('author', 'Jane Smith'),
      new Metadata('category', 'demo'),
    ]

    const result = extractWebsiteMetadata(metadata)

    expect(result).toEqual({
      title: 'Complete Website',
      description: 'A complete website example',
      lastUpdate: '2024-01-01T12:00:00Z',
      keywords: ['complete', 'example'],
      custom: {
        author: 'Jane Smith',
        category: 'demo',
      },
    })
  })
  test('should handle empty metadata array', () => {
    const metadata: Metadata[] = []

    const result = extractWebsiteMetadata(metadata)

    expect(result).toEqual({})
  })

  test('should handle metadata with empty values', () => {
    const metadata = [
      new Metadata(TITLE_METADATA_KEY, ''),
      new Metadata(DESCRIPTION_METADATA_KEY, ''),
      new Metadata(`${KEYWORD_METADATA_KEY_PREFIX}_1`, ''),
      new Metadata('custom_field', ''),
    ]

    const result = extractWebsiteMetadata(metadata)

    expect(result).toEqual({
      title: '',
      description: '',
      keywords: [''],
      custom: {
        custom_field: '',
      },
    })
  })

  test('should handle metadata with only keywords', () => {
    const metadata = [
      new Metadata(`${KEYWORD_METADATA_KEY_PREFIX}_tag1`, 'tech'),
      new Metadata(`${KEYWORD_METADATA_KEY_PREFIX}_tag2`, 'blockchain'),
    ]

    const result = extractWebsiteMetadata(metadata)

    expect(result).toEqual({
      keywords: ['tech', 'blockchain'],
    })
  })

  test('should handle metadata with only custom fields', () => {
    const metadata = [
      new Metadata('license', 'MIT'),
      new Metadata('repository', 'https://github.com/example/repo'),
    ]

    const result = extractWebsiteMetadata(metadata)

    expect(result).toEqual({
      custom: {
        license: 'MIT',
        repository: 'https://github.com/example/repo',
      },
    })
  })

  test('should handle duplicate standard metadata (last one wins)', () => {
    const metadata = [
      new Metadata(TITLE_METADATA_KEY, 'First Title'),
      new Metadata(TITLE_METADATA_KEY, 'Second Title'),
      new Metadata(DESCRIPTION_METADATA_KEY, 'First Description'),
      new Metadata(DESCRIPTION_METADATA_KEY, 'Second Description'),
    ]

    const result = extractWebsiteMetadata(metadata)

    expect(result).toEqual({
      title: 'Second Title',
      description: 'Second Description',
    })
  })

  test('should handle mixed keyword prefix variations', () => {
    const metadata = [
      new Metadata(`${KEYWORD_METADATA_KEY_PREFIX}1`, 'keyword1'),
      new Metadata(`${KEYWORD_METADATA_KEY_PREFIX}_tag`, 'keyword2'),
      new Metadata(`${KEYWORD_METADATA_KEY_PREFIX}abc`, 'keyword3'),
    ]

    const result = extractWebsiteMetadata(metadata)

    expect(result).toEqual({
      keywords: ['keyword1', 'keyword2', 'keyword3'],
    })
  })

  test('should preserve order of keywords as they appear in metadata', () => {
    const metadata = [
      new Metadata(`${KEYWORD_METADATA_KEY_PREFIX}_z`, 'last'),
      new Metadata(`${KEYWORD_METADATA_KEY_PREFIX}_a`, 'first'),
      new Metadata(`${KEYWORD_METADATA_KEY_PREFIX}_m`, 'middle'),
    ]

    const result = extractWebsiteMetadata(metadata)

    expect(result).toEqual({
      keywords: ['last', 'first', 'middle'],
    })
  })

  test('should handle special characters in metadata values', () => {
    const metadata = [
      new Metadata(TITLE_METADATA_KEY, 'Title with émojis 🎉 and ñ'),
      new Metadata(
        DESCRIPTION_METADATA_KEY,
        'Description with "quotes" and <tags>'
      ),
      new Metadata('special', 'Value with\nnewlines\tand\ttabs'),
    ]

    const result = extractWebsiteMetadata(metadata)

    expect(result).toEqual({
      title: 'Title with émojis 🎉 and ñ',
      description: 'Description with "quotes" and <tags>',
      custom: {
        special: 'Value with\nnewlines\tand\ttabs',
      },
    })
  })
})

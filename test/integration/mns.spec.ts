import { Account, MNS } from '../../src'
import { provider, publicProvider } from './setup'

// The syntra MNS ownership has been renounced, so the associated contract will not change.
const syntraContract = 'AS1hyi3cyBocobFtFZHhTs84mTLhThDK4KvCkj6bijbtHEi3d8Vv'

describe('MNS tests', () => {
  let mns: MNS

  // The syntra MNS ownership has been renounced, so the associated contract will not change.
  const syntraContract = 'AS1hyi3cyBocobFtFZHhTs84mTLhThDK4KvCkj6bijbtHEi3d8Vv'

  beforeAll(async () => {
    mns = await MNS.init(provider)
  })

  test('resolve', async () => {
    const res = await mns.resolve('syntra')
    expect(res).toBe(syntraContract)
  })

  test('from address', async () => {
    const res = await mns.fromAddress(syntraContract)
    expect(res).toEqual(['syntra'])
  })

  test('alloc, update target and free', async () => {
    const domain = 'trloloooooooooooooooololololzs' + Date.now()

    let operation = await mns.alloc(domain, provider.address, {
      coins: 2064100000n,
    })
    await operation.waitFinalExecution()

    // check resolution
    let res = await mns.resolve(domain)
    expect(res).toBe(provider.address)

    // update target
    const newTarget = 'bonjour'
    operation = await mns.updateTarget(domain, newTarget)
    await operation.waitFinalExecution()

    // check new resolution
    res = await mns.resolve(domain)
    expect(res).toBe(newTarget)

    // free domain
    operation = await mns.free(domain)
    await operation.waitFinalExecution()

    // check domain has been freed
    res = await mns.resolve(domain)
    expect(res).toBe('')
  }, 300000)

  test('transfer domain', async () => {
    const domain = 'trloloooooooooooooooololololzs' + Date.now()
    const account2 = await Account.generate()
    let operation = await mns.alloc(domain, provider.address, {
      coins: 2064100000n,
    })

    await operation.waitFinalExecution()

    // check resolution
    let res = await mns.resolve(domain)
    expect(res).toBe(provider.address)
    // check balance
    let balance = await mns.balanceOf(provider.address)
    expect(balance).toBeGreaterThan(0n)

    // transfer domain
    operation = await mns.transferFrom(
      domain,
      provider.address,
      account2.address.toString()
    )
    await operation.waitFinalExecution()

    const domains = await mns.getOwnedDomains(account2.address.toString())
    expect(domains).toContain(domain)
    const balance2 = await mns.balanceOf(account2.address.toString())
    expect(balance2).toBeGreaterThan(0n)
  })

  test('getTargets, getOwnedDomains', async () => {
    // Alloc some domains
    const domain1 = 'trloloooooooooooooooololololyoyyyzs1' + Date.now()
    const domain2 = 'trloloooooooooooooooololololoyoyyyzs2' + Date.now()
    const domain3 = 'trloloooooooooooooooololololozyoyyys3' + Date.now()

    const op1 = await mns.alloc(domain1, provider.address, {
      coins: 2064100000n,
    })
    const op2 = await mns.alloc(domain2, provider.address, {
      coins: 2064100000n,
    })
    const op3 = await mns.alloc(domain3, provider.address, {
      coins: 2064100000n,
    })

    await Promise.all([
      op1.waitFinalExecution(),
      op2.waitFinalExecution(),
      op3.waitFinalExecution(),
    ])

    // Get owned domains for the provider address
    const ownedDomains = await mns.getOwnedDomains(provider.address)

    // Should contain the domains we just allocated
    expect(ownedDomains).toContain(domain1)
    expect(ownedDomains).toContain(domain2)
    expect(ownedDomains).toContain(domain3)

    const targets = await mns.getTargets([domain1, domain2, domain3])
    expect(targets).toEqual([
      provider.address,
      provider.address,
      provider.address,
    ])

    // Free the domains
    mns.free(domain1)
    mns.free(domain2)
    mns.free(domain3)
  })
})

describe('MNS tests using PublicProvider', () => {
  let mns: MNS

  beforeAll(async () => {
    mns = MNS.buildnet(publicProvider)
  })

  test('resolve', async () => {
    const res = await mns.resolve('syntra')
    expect(res).toBe(syntraContract)
  })

  test('from address', async () => {
    const res = await mns.fromAddress(syntraContract)
    expect(res).toEqual(['syntra'])
  })

  test('alloc, update target and free should reject', async () => {
    const domain = 'trloloooooooooooooooololololzs' + Date.now()

    await expect(
      mns.alloc(domain, provider.address, {
        coins: 1049000000n,
      })
    ).rejects.toThrow()

    await expect(mns.updateTarget(domain, 'bonjour')).rejects.toThrow()

    await expect(mns.free(domain)).rejects.toThrow()
  }, 300000)

  test('get dns allocation cost', async () => {
    const domain = 'trloloooooooooooooooololololzs'
    const res = await mns.dnsAllocCost(domain)
    expect(res).toBeGreaterThan(0n)
  })

  test('get dns allocation cost fail if invalid domain', async () => {
    const domain = 'trloloooooooooooooooololoPolzs////'
    await expect(mns.dnsAllocCost(domain)).rejects.toThrow(/.*Invalid domain.*/)
  })
})

describe('getDomainsFromMultipleAddresses', () => {
  let publicMns: MNS

  beforeAll(async () => {
    publicMns = await MNS.init(provider)
  })

  test('getDomainsFromMultipleAddresses integration test', async () => {
    // Test address that owns domains
    const testAddress = 'AU1fRkszGyF8h6GCdsqvmimFCuYuCdprYYFUJFCeYNWbySbyCKrx'

    // Step 1: Get all domains owned by the test address
    const ownedDomains = await publicMns.getOwnedDomains(testAddress, true)

    expect(ownedDomains.length).toBeGreaterThan(0) // Ensure the address owns at least one domain

    // Step 2: Get all addresses corresponding to owned domains via getTargets
    const targetAddresses = await publicMns.getTargets(ownedDomains, true)

    // Step 3: Create a map of address -> domains[] using fromAddress for each unique target address
    const addressToDomainMap = new Map<string, string[]>()

    // Get unique non-empty target addresses
    const uniqueTargetAddresses = [
      ...new Set(targetAddresses.filter((addr) => addr && addr.trim() !== '')),
    ]

    expect(uniqueTargetAddresses.length).toBeGreaterThan(0) // Ensure at least one domain has a target

    // For each unique target address, get all domains pointing to it using fromAddress
    for (const targetAddress of uniqueTargetAddresses) {
      try {
        const domainsPointingToAddress =
          await publicMns.fromAddress(targetAddress)

        if (domainsPointingToAddress && domainsPointingToAddress.length > 0) {
          addressToDomainMap.set(targetAddress, domainsPointingToAddress)
        }
      } catch (error) {
        console.warn(
          `Failed to get domains for address ${targetAddress}:`,
          error
        )
        // Continue with other addresses
      }
    }

    expect(addressToDomainMap.size).toBeGreaterThan(0) // Ensure at least one address has domains

    // Step 4: Use getDomainsFromMultipleAddresses to get domains for these target addresses
    const addressesToTest = Array.from(addressToDomainMap.keys())
    const domainsFromTargets =
      await publicMns.getDomainsFromMultipleAddresses(addressesToTest)

    expect(domainsFromTargets).toHaveLength(addressesToTest.length)

    // Step 5: Verify that getDomainsFromMultipleAddresses returns the same domains as fromAddress
    for (let i = 0; i < addressesToTest.length; i++) {
      const targetAddress = addressesToTest[i]
      const foundDomains = domainsFromTargets[i]
      const expectedDomains = addressToDomainMap.get(targetAddress) || []

      // The results should be identical (both methods should return the same domains)
      expect(foundDomains.sort()).toEqual(expectedDomains.sort())
    }
  }, 120000) // Increased timeout for integration test

  test('getDomainsFromMultipleAddresses with known addresses', async () => {
    // Test with known addresses including syntra
    const testAddresses = [
      syntraContract, // Should return ['syntra']
      syntraContract, // Duplicate for testing
    ]

    const results =
      await publicMns.getDomainsFromMultipleAddresses(testAddresses)

    expect(results).toHaveLength(2)

    // First address should have syntra domain
    expect(results[0]).toContain('syntra')

    // Second address (same as first) should also have syntra domain
    expect(results[1]).toContain('syntra')

    // Results should be consistent
    expect(results[0]).toEqual(results[1])
  })

  test('getDomainsFromMultipleAddresses with empty and invalid addresses', async () => {
    const testAddresses = [
      syntraContract, // Valid address with domains
      'AS1111111111111111111111111111111111111111111111111111', // Invalid address
      '', // Empty address
    ]

    const results =
      await publicMns.getDomainsFromMultipleAddresses(testAddresses)

    expect(results).toHaveLength(3)

    // First address should have domains
    expect(results[0].length).toBeGreaterThan(0)
    expect(results[0]).toContain('syntra')

    // Invalid and empty addresses should return empty arrays or handle gracefully
    // Note: The actual behavior depends on the smart contract implementation
    expect(Array.isArray(results[1])).toBe(true)
    expect(Array.isArray(results[2])).toBe(true)
  })

  test('getDomainsFromMultipleAddresses performance with large batch', async () => {
    // Test performance with multiple addresses (some duplicates)
    const testAddresses = Array(10).fill(syntraContract) // 10 copies of the same address

    const startTime = Date.now()
    const results =
      await publicMns.getDomainsFromMultipleAddresses(testAddresses)
    const endTime = Date.now()

    expect(results).toHaveLength(10)

    // All results should be identical
    results.forEach((result) => {
      expect(result).toEqual(results[0])
      expect(result).toContain('syntra')
    })

    // Should complete in reasonable time (less than 30 seconds)
    expect(endTime - startTime).toBeLessThan(30000)

    console.log(
      `Batch processing of ${testAddresses.length} addresses took ${endTime - startTime}ms`
    )
  })

  test('getDomainsFromMultipleAddresses with PublicProvider', async () => {
    const publicMns = MNS.buildnet(publicProvider)
    const testAddresses = [
      syntraContract, // Valid address with domains
    ]

    await expect(
      publicMns.getDomainsFromMultipleAddresses(testAddresses)
    ).rejects.toThrow(
      'current MNS contract wrapper has PublicProvider but getDomainsFromMultipleAddresses need Provider'
    )
  })
})

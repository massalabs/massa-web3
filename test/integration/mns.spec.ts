import { Account, MNS } from '../../src'
import { provider, publicProvider } from './setup'

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
    const domain1 = 'trloloooooooooooooooololololyoyyyzs1'
    const domain2 = 'trloloooooooooooooooololololoyoyyyzs2'
    const domain3 = 'trloloooooooooooooooololololozyoyyys3'

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

  // The syntra MNS ownership has been renounced, so the associated contract will not change.
  const syntraContract = 'AS1hyi3cyBocobFtFZHhTs84mTLhThDK4KvCkj6bijbtHEi3d8Vv'

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

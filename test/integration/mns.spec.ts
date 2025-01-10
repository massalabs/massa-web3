import { MNS } from '../../src'
import { provider, publicProvider } from './setup'

describe('MNS tests', () => {
  let mns: MNS

  // The syntra MNS ownership has been renounced, so the associated contract will not change.
  const syntraContract = 'AS1hyi3cyBocobFtFZHhTs84mTLhThDK4KvCkj6bijbtHEi3d8Vv'

  beforeAll(async () => {
    mns = MNS.buildnet(provider)
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

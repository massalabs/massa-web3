import { MNS } from '../../src'
import { provider } from './setup'

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
      coins: 1049000000n,
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

const Procurement = artifacts.require('Procurement')

contract('Procurement', () => {
  
  // ...

  // Add the following test:
  it("can ", async () => {
    const proc = await Procurement.deployed()
    const about = web3.utils.fromAscii("testing")
    proc.createTender(about)
    const userId = 1
    
    // Get the userInfo array
    const userInfo = await proc.getTender.call(userId)
    
    const name = web3.utils.toAscii(userInfo[2]).replace(/\u0000/g, '')
    
    assert.equal(name, "testing")
    
  });

})
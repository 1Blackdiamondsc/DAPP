pragma solidity^0.5.16;

contract Procurement{
    struct Bid{
        uint tenderid; 
        address owner;
        uint amount;
        bytes32 email;
        string desc; 
    }
    

    struct Tender {
        address manager;
        uint id;
        bytes32 name;

    }
    
    
    mapping(uint => Tender) tenders;
    mapping(uint => Bid) bids;

    
    
    uint256 latestId = 0;

    uint latestTenderId = 0;
  
    function createTender(bytes32 _name) public returns(uint) {
        latestTenderId++;
        manager = msg.sender;

        tenders[latestTenderId] = Tender(manager, latestTenderId, _name);

        return latestTenderId;
    }
    function getTender(uint _id)public view returns(address, uint, bytes32) {
       return( 
           tenders[_id].manager,
           tenders[_id].id,
           tenders[_id].name
           );
        


    }
    function createBid(uint _tenderid, uint _amount)public returns(uint) {
        latestBidId++;
        owner = msg.sender;
        tenderid = _tenderid;
        bids[latestBidId] = Tender(owner, latestBidId, _name);

        return latestBidId;
    }
    function setBid(uint _amount, bytes32 _email, string memory _desc) public {
        Bid memory newBid = Bid({
            owner: msg.sender,
            amount: _amount,
            email: _email,
            desc: _desc
        });
        bids.push(newBid);
        
        

    }
}

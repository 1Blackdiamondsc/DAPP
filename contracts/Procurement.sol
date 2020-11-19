pragma solidity >=0.4.21 <0.7.0;

contract Procurement{
    struct Bid{
        address owner;
        uint tenderid; 
        uint id;
        uint amount;
        
         
    }
    

    struct Tender {
        address manager;
        uint id;
        bytes32 name;

    }
    
    
    mapping(uint => Tender) tenders;
    mapping(uint => Bid) bids;

    
    
    uint256 latestId = 0;
    address owner;
    address manager;

    uint latestTenderId = 0;
    uint latestBidId = 0;
  
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
        
        bids[latestBidId] = Bid(owner, _tenderid, latestBidId, _amount);

        return latestBidId;
    }
    function getBid(uint _id)public view returns(uint, uint, address) {
       return( 
           bids[_id].tenderid,
           bids[_id].id,
           bids[_id].owner
           );
        


    }
        
        

    }


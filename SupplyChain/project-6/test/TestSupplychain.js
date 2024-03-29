var SupplyChain = artifacts.require('SupplyChain')

const State =
{
    Harvested: 0,
    Processed: 1,
    Packed: 2,
    ForSale: 3,
    Sold: 4,
    Shipped: 5,
    Received: 6,
    Purchased: 7
}


contract('SupplyChain', function (accounts) {

    // Declare few constants and assign a few sample accounts generated by ganache-cli
    var sku = 1;
    var upc = 1;
    const ownerID = accounts[0];
    const originFarmerID = accounts[1];
    const originFarmName = "John Doe";
    const originFarmInformation = "Yarra Valley";
    const originFarmLatitude = "-38.239770";
    const originFarmLongitude = "144.341490";
    var productID = sku + upc;
    const productNotes = "Best beans for Espresso";
    const productPrice = web3.toWei('1', "ether");
    var itemState = 0;
    const distributorID = accounts[2];
    const retailerID = accounts[3];
    const consumerID = accounts[4];
    const emptyAddress = '0x00000000000000000000000000000000000000';

/* Available Accounts
==================
(0) 0x27D8D15CbC94527cAdf5eC14B69519aE23288B95 (1000 ETH)
(1) 0x018C2daBef4904ECbd7118350A0c54DbeaE3549A (1000 ETH)
(2) 0xCe5144391B4aB80668965F2Cc4f2CC102380Ef0A (1000 ETH)
(3) 0x460c31107DD048e34971E57DA2F99f659Add4f02 (1000 ETH)
(4) 0xD37b7B8C62BE2fdDe8dAa9816483AeBDBd356088 (1000 ETH)
(5) 0x27f184bdc0E7A931b507ddD689D76Dba10514BCb (1000 ETH)
(6) 0xFe0df793060c49Edca5AC9C104dD8e3375349978 (1000 ETH)
(7) 0xBd58a85C96cc6727859d853086fE8560BC137632 (1000 ETH)
(8) 0xe07b5Ee5f738B2F87f88B99Aac9c64ff1e0c7917 (1000 ETH)
(9) 0xBd3Ff2E3adEd055244d66544c9c059Fa0851Da44 (1000 ETH)

*/

    console.log("ganache-cli accounts used here...");
    console.log("Contract Owner: accounts[0] ", accounts[0]);
    console.log("Farmer: accounts[1] ", accounts[1]);
    console.log("Distributor: accounts[2] ", accounts[2]);
    console.log("Retailer: accounts[3] ", accounts[3]);
    console.log("Consumer: accounts[4] ", accounts[4]);


    // 1st Test
    it("Testing smart contract function harvestItem() that allows a farmer to harvest coffee", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Add farmer address to farmerRole
        await supplyChain.addFarmer(originFarmerID, { from: ownerID });

        // Mark an item as Harvested by calling function harvestItem()
        await supplyChain.harvestItem(
            upc,
            originFarmerID,
            originFarmName,
            originFarmInformation,
            originFarmLatitude,
            originFarmLongitude,
            productNotes, { from: originFarmerID });

        // Watch the emitted event Harvested()
        await supplyChain.Harvested((err, res) => eventEmitted = true);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        console.log('sku', ':	', resultBufferOne[0].toNumber());
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        console.log('upc', ':	', resultBufferOne[1].toNumber());
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        console.log('ownerID', ':	', resultBufferOne[2]);
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID');
        console.log('originFarmerID', ':	', resultBufferOne[3]);
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
        console.log('originFarmName', ':	', resultBufferOne[4]);
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
        console.log('originFarmInformation', ':	', resultBufferOne[5]);
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
        console.log('originFarmLatitude', ':	', resultBufferOne[6]);
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
        console.log('originFarmLongitude', ':	', resultBufferOne[7]);
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
        console.log('State', ':	 Harvested Item ', resultBufferTwo[5].toNumber());
        assert.equal(resultBufferTwo[5], State.Harvested, 'Error: Invalid item State');
        console.log('emitted', ':	', eventEmitted);
        assert.equal(eventEmitted, true, 'Invalid event emitted');

    })

    // 2nd Test
    it("Testing smart contract function processItem() that allows a farmer to process coffee", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        let eventEmitted = false;
        // Watch the emitted event Processed()
        await supplyChain.processItem(
            upc, { from: originFarmerID });
            itemState = 1

        // Watch the emitted event Processed()
        await supplyChain.Processed((err, res) => eventEmitted = true);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], State.Processed, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');

    });

    // 3rd Test
    it("Testing smart contract function packItem() that allows a farmer to pack coffee", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Mark an item as Packed by calling function packItem()
        await supplyChain.packItem(
            upc, { from: originFarmerID });
            itemState = 2   

        // Watch the emitted event Packed()
        await supplyChain.Packed((err, res) => eventEmitted = true);
        
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], State.Packed, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');

    })

    // 4th Test
    it("Testing smart contract function sellItem() that allows a farmer to sell coffee", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        let eventEmitted = false;
  
        // Mark an item as ForSale by calling function sellItem()
        await supplyChain.sellItem(
            upc, productPrice, { from: originFarmerID });
            itemState = 3;

        
        // Watch the emitted event ForSale()
        await supplyChain.ForSale((err, res) => eventEmitted = true);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], originFarmerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], State.ForSale, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');

    })

    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Add [2] address as a distributor
        await supplyChain.addDistributor(distributorID, { from: ownerID });

        // Declare and Initialize a variable for event
        let eventEmitted = false;
        
        // Mark an item as Sold by calling function buyItem()
        await supplyChain.buyItem(upc, { from: distributorID, value: productPrice });
        itemState = 4;

        // Watch the emitted event Sold()
        await supplyChain.Sold((err, res) => eventEmitted = true);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], distributorID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], State.Sold, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');

    })

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Watch the emitted event shipItem()
        await supplyChain.shipItem(
            upc, { from: distributorID });
        itemState = 5;

        // Watch the emitted event Shipped()
        await supplyChain.Shipped((err, res) => eventEmitted = true);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], distributorID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], State.Shipped, 'Error: Invalid item State');
        assert.equal(eventEmitted, true, 'Invalid event emitted');

    })

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async () => {
        const supplyChain = await SupplyChain.deployed();
        // Add [3] accounts as a new retailer
        await supplyChain.addRetailer(retailerID, { from: ownerID });

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Mark an item as Received by calling function receiveItem()
        await supplyChain.receiveItem(upc, { from: retailerID });
        itemState = 6;

        // Watch the emitted event Received()
        await supplyChain.Received((err, res) => eventEmitted = true);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], retailerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], State.Received, 'Error: Invalid item State');
        assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid Retailer ID');
        assert.equal(eventEmitted, true, 'Invalid event emitted');

    })

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async () => {
        const supplyChain = await SupplyChain.deployed();
        // Add [4] account as a new consumer
        await supplyChain.addConsumer(consumerID, { from: ownerID });

        // Declare and Initialize a variable for event
        let eventEmitted = false;

        // Mark an item as Purchased by calling function purchaseItem()
        await supplyChain.purchaseItem(upc, { from: consumerID, value: productPrice });
        itemState = 7;

        // Watch the emitted event Purchased()
        await supplyChain.Purchased((err, res) => eventEmitted = true);

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], consumerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
        assert.equal(resultBufferTwo[5], State.Purchased, 'Error: Invalid item State');
        assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid Retailer ID');
        assert.equal(resultBufferTwo[8], consumerID, 'Error: Invalid Consumer ID');
        assert.equal(eventEmitted, true, 'Invalid event emitted');

    })

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async () => {
        const supplyChain = await SupplyChain.deployed();
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc);

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU');
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC');
        assert.equal(resultBufferOne[2], consumerID, 'Error: Missing or Invalid ownerID');
        assert.equal(resultBufferOne[3], originFarmerID, 'Error: Missing or Invalid originFarmerID');
        assert.equal(resultBufferOne[4], originFarmName, 'Error: Missing or Invalid originFarmName');
        assert.equal(resultBufferOne[5], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
        assert.equal(resultBufferOne[6], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
        assert.equal(resultBufferOne[7], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');

    })

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async () => {
        const supplyChain = await SupplyChain.deployed();

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc);

        // Verify the result set
        assert.equal(resultBufferTwo[0], sku, 'Error: Invalid item sku');
        assert.equal(resultBufferTwo[1], upc, 'Error: Invalid item upc');
        console.log('productID ', ':	', resultBufferTwo[2].toNumber());
        assert.equal(resultBufferTwo[2], productID, 'Error: Invalid product ID');
        assert.equal(resultBufferTwo[3], productNotes, 'Error: Invalid product notes');
        assert.equal(resultBufferTwo[4], productPrice, 'Error: Invalid product price');
        console.log('Purchased Item ', ':	', resultBufferTwo[5]);
        assert.equal(resultBufferTwo[5], State.Purchased, 'Error: Invalid item State');
        assert.equal(resultBufferTwo[6], distributorID, 'Error: Invalid distributor ID');
        console.log('retailerID ', ':	', resultBufferTwo[7]);
        assert.equal(resultBufferTwo[7], retailerID, 'Error: Invalid retailer ID');
        console.log('consumerID ', ':	', resultBufferTwo[8]);
        assert.equal(resultBufferTwo[8], consumerID, 'Error: Invalid Consumer ID');


    })

});

/*

References:
https://github.com/Decentral3/SupplyChainDapp
https://github.com/trufflesuite/ganache
https://trufflesuite.com/boxes/helloworldbox/
https://www.npmjs.com/package/ganache-cli
https://www.youtube.com/watch?v=35SDvokII7A
https://github.com/axelgalicia/blockchain-supply-chain
https://www.cdnpkg.com/web3/file/web3.min.js/
https://github.com/Faizack/Supply-Chain-Blockchain

*/
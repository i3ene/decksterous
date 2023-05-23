/*
 SELECT * FROM MarketplaceItems;
 SELECT * FROM UserObjects WHERE userId = 6;
 SELECT * FROM UserObjects WHERE userId = 4;
*/

# Buyed item is (objectHash): 774E9O4C3MKCNSNH
# Buyer is (userId): 6

# Add money to seller
UPDATE User
SET coins = coins + (SELECT price FROM MarketplaceItems
	WHERE objectHash = '774E9O4C3MKCNSNH')
WHERE id = (SELECT userId FROM MarketplaceItems
	WHERE objectHash = '774E9O4C3MKCNSNH');

# Remove money from buyer
UPDATE User
SET coins = coins - (SELECT price FROM MarketplaceItems
	WHERE objectHash = '774E9O4C3MKCNSNH')
WHERE id = 6;

# Update object to buyer inventory
UPDATE Object
SET inventoryId = (SELECT id FROM Inventory
	WHERE userId = 6)
WHERE hash = '774E9O4C3MKCNSNH';
    
# Remove object from marketplace
DELETE FROM Marketplace
WHERE objectHash = '774E9O4C3MKCNSNH';
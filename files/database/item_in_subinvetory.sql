SELECT Self.hash, SelfItem.name, SelfItem.description, Other.hash AS inventoryHash, OtherItem.name AS inventoryName, OtherItem.description AS inventoryDescription FROM Object AS Self
INNER JOIN Item AS SelfItem ON SelfItem.id = Self.itemId
RIGHT JOIN SubObject ON SubObject.objectHash = Self.hash
INNER JOIN SubInventory ON SubInventory.id = SubObject.subInventoryId
LEFT JOIN Object AS Other ON Other.hash = SubInventory.objectHash
INNER JOIN Item AS OtherItem ON OtherItem.id = Other.itemId
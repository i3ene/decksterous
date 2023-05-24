# Accepted friends with userId 2
SELECT * FROM FriendAccepted
WHERE userId = 2;

# Friend invites from userId 3
SELECT * FROM FriendInvites
WHERE userId = 3;

# Friend requests from userId 4
SELECT * FROM FriendRequests
WHERE userId = 4;
Template for a social networking service using firebase.
Only 1 active chat per project.

# database architecture
```
bands
  1
    m(embers)
      uid: name
    n(ame of band)
  2
    m(embers)
      uid: name
    n(ame of band)
 chatmessages
  chat
    message
      message
      sender
      time
chatsActive
  chatuid: 2
members(of chat)
  uid1
    uid1+uid2
      r(ole)
      u(sername)
  uid2
    uid1+uid2
      r(ole)
      u(sername)
users
  uid
    b(and): uid
    r(ole)
    u(sername)
```

# CS 262 — Lab 05 : items-app (Using Context)

## 1. Why couldn’t the old app delete items?
The old app passed the list of items through the route when moving to another screen.  
That means every screen had its own copy of the list.  
When I tried to delete an item, it only deleted from that copy, not from the main list, so nothing changed.

---

## 2. How could this app let users add or update items?
I would make two new functions inside the context:
- **addItem** → adds a new item to the list  
- **updateItem** → changes an item that already exists  
Then I could make a small “Add Item” or “Edit Item” screen that uses those functions.

---

## 3. Did the old version use good URL parameters?
No, it didn’t.  
It sent the whole item through the route, which is not a good way.  
The new version only sends the item id and uses Context to get the full data.  
That is much cleaner.

---

## 4. Why is deleteItem inside useCallback?
It helps React remember the delete function and not rebuild it every time the app reloads.  
That makes the app a bit faster and keeps the data from refreshing too much.

---

## 5. Is this a refactor?
Yes.  
The app still does the same things, but now the code is better organized.  
It uses Context to share data instead of passing everything through screens.

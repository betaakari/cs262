# CS 262 - Homework 1
**To-Do Application**

## Description
This is a simple To-Do app built using Expo, React Native, and TypeScript.  
It allows the user to add, edit, delete, and check off tasks from a list.

## Example Features
- Create a new to-do item  
- Edit an existing item  
- Delete an item  
- Mark items as completed  

## Code Examples

**Object**
```typescript
type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

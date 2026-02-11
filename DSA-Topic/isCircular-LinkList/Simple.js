
class Node {
  constructor(val){
    this.val = val,
    this.next = null;
  }
}

class LinkedList {
  constrcutor(){
    this.head = null;
    this.size = 0;
  }
  
  addAtHead(val){
    const newNode = new Node(val);
    if(this.head === null){
      this.head = newNode;
      this.size++;
      return;
    }
    
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  
  display(){
    const result = [];
    if(this.head === null){
      return result;
    }
    let current = this.head;
    while(current){
      result.push(current.val);
      current = current.next;
    }
    
    return result;
  }
  
  applyCircular(){
    let current = this.head;
    while(current.next){
      current = current.next;
    }
    current.next = this.head;
  }
  
  isCircular(){
    let current = this.head;
    const visited = new Set();
    while(current){
      if(!visited.has(current)){
        visited.add(current);
        current = current.next;
      } else {
        return true;
      }
    }
    
    return false;
  }
}

const linkList = new LinkedList();

linkList.addAtHead(2);
linkList.addAtHead(5);
linkList.addAtHead(12);
console.log(linkList.display());
linkList.applyCircular();
console.log(linkList.isCircular())

output: 
[ 12, 5, 2 ]
true






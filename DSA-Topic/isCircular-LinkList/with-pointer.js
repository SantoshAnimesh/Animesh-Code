class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  addAtHead(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // Safe display (non-circular only)
  display(limit = 20) {
    const result = [];
    let current = this.head;
    let count = 0;

    while (current && count < limit) {
      result.push(current.val);
      current = current.next;
      count++;
    }

    return result;
  }

  applyCircular() {
    if (!this.head) return;

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = this.head;
  }

  isCircular() {
    if (!this.head) return false;

    let slow = this.head;
    let fast = this.head;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;

      if (slow === fast) {
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

console.log(linkList.display());      // [12, 5, 2]
console.log(linkList.isCircular());   // false

linkList.applyCircular();
console.log(linkList.isCircular());   // true


// output------------->
[ 12, 5, 2 ]
false
true

export default class Node {
  constructor(id, status) {
    this.id = id;
    this.status = status;
    this.previousNode = null;
  }
}

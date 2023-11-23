const fs = require('fs');
const path = require('path');

class MemoryManager {
  constructor(memoryFilePath) {
    this.memoryFilePath = memoryFilePath;
  }

  loadMemory() {
    if (fs.existsSync(this.memoryFilePath)) {
      const data = fs.readFileSync(this.memoryFilePath, 'utf8');
      return JSON.parse(data);
    }
    return {};
  }

  saveMemory(memory) {
    const data = JSON.stringify(memory, null, 2);
    fs.writeFileSync(this.memoryFilePath, data, 'utf8');
  }

  getMemoryItem(key) {
    const memory = this.loadMemory();
    return memory[key];
  }

  updateMemoryItem(key, value) {
    const memory = this.loadMemory();
    memory[key] = value;
    this.saveMemory(memory);
  }

  deleteMemoryItem(key) {
    const memory = this.loadMemory();
    delete memory[key];
    this.saveMemory(memory);
  }

  // Additional methods for more complex memory operations can be added here
}

module.exports = MemoryManager;

const fs = require('fs').promises;
const path = require('path');

class MemoryManager {
  constructor(memoryFilePath) {
    this.memoryFilePath = memoryFilePath;
    this.initializeMemory();
  }

  async initializeMemory() {
    try {
      const data = await fs.readFile(this.memoryFilePath, 'utf8').catch(() => '{}');
      await fs.writeFile(this.memoryFilePath, data, 'utf8');
    } catch (error) {
      console.error('Error initializing memory:', error);
    }
  }


  async loadMemory() {
    try {
      const data = await fs.readFile(this.memoryFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading memory:', error);
      return {}; // Fallback to empty memory
    }
  }

  async saveMemory(memory) {
    try {
      const data = JSON.stringify(memory, null, 2);
      await fs.writeFile(this.memoryFilePath, data, 'utf8');
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  }

  async getMemoryItem(key) {
    const memory = await this.loadMemory();
    return memory[key];
  }

  async updateMemoryItem(key, value) {
    const memory = await this.loadMemory();
    memory[key] = value;
    await this.saveMemory(memory);
  }

  async deleteMemoryItem(key) {
    const memory = await this.loadMemory();
    delete memory[key];
    await this.saveMemory(memory);
  }

  // Additional methods for more complex memory operations can be added here
}

module.exports = MemoryManager;

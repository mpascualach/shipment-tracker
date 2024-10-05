// src/models/PortRepository.js

const ports = require('../data/ports');

class PortRepository {
  constructor() {
    this.ports = new Map(ports.map(port => [port.id, port]));
  }

  getAll() {
    return Array.from(this.ports.values());
  }

  getById(id) {
    return this.ports.get(id);
  }

  getByName(name) {
    return this.getAll().find(port => port.name.toLowerCase() === name.toLowerCase());
  }

  getByCountry(country) {
    return this.getAll().filter(port => port.country.toLowerCase() === country.toLowerCase());
  }
}

module.exports = PortRepository;
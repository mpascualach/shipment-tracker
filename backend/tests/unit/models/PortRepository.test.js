// tests/unit/models/PortRepository.test.js

const PortRepository = require('../../../src/models/PortRepository');

describe('PortRepository', () => {
  let portRepository;

  beforeEach(() => {
    portRepository = new PortRepository();
  });

  it('should get all ports', () => {
    const allPorts = portRepository.getAll();
    expect(allPorts.length).toBe(8); // Assuming we have 8 ports in our data
  });

  it('should get a port by ID', () => {
    const port = portRepository.getById('NLRTM');
    expect(port.name).toBe('Port of Rotterdam');
  });

  it('should get a port by name', () => {
    const port = portRepository.getByName('Port of Singapore');
    expect(port.id).toBe('SGSIN');
  });

  it('should get ports by country', () => {
    const usPorts = portRepository.getByCountry('United States');
    expect(usPorts.length).toBe(2); // Assuming we have 2 US ports in our data
  });
});
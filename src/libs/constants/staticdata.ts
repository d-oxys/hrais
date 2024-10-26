export const LEVEL_A = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const LEVEL_N = ['A', 'B', 'C'];
export const LEVEL_EM = ['1A', '1B', '1C', '2', '3', '4', '5', '6', '7', '7A', '7B'];
export const LEVEL_SPECIALIST = ['Advisor', 'Sr. Expert / Partner / Consultant', 'Expert / Partner / Consultant', 'Sr. Specialist', 'Specialist', 'Jr. Specialist'];
export const LEVEL_GROUP = ['Head', 'Sr. Lead', 'Lead', 'Jr. Lead', 'Team Leader / Supervisor', 'Jr. Supervisor'];
export const LEVEL_MANAGERIAL = ['Chief', 'SVP', 'VP', 'Director', 'Associate Director'];

export const EMPLOYEE_STATUS = ['Contract', 'Permanent'];

export const BLOOD_TYPES = ['A', 'B', 'AB', 'O'];

export const RELIGIONS = ['Islam', 'Kristen Protestan', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'];

const originalData = [
  {
    key: 1,
    artikel: 'Product A',
    qty: 120,
    brutto: 1200,
    discount: 200,
    netto: 1000,
    percentageOfSales: 25,
    details: [
      { headerColor: 'Red', qty: 10 },
      { headerColor: 'Blue', qty: 20 },
    ],
  },
  {
    key: 2,
    artikel: 'Product B',
    qty: 80,
    brutto: 800,
    discount: 100,
    netto: 700,
    percentageOfSales: 17.5,
    details: [
      { headerColor: 'Green', qty: 15 },
      { headerColor: 'Yellow', qty: 5 },
    ],
  },
  {
    key: 3,
    artikel: 'Product C',
    qty: 60,
    brutto: 600,
    discount: 50,
    netto: 550,
    percentageOfSales: 13.75,
    details: [
      { headerColor: 'Black', qty: 8 },
      { headerColor: 'White', qty: 12 },
    ],
  },
  {
    key: 4,
    artikel: 'Product D',
    qty: 50,
    brutto: 500,
    discount: 80,
    netto: 420,
    percentageOfSales: 10.5,
    details: [
      { headerColor: 'Purple', qty: 7 },
      { headerColor: 'Orange', qty: 3 },
    ],
  },
];

export default originalData;

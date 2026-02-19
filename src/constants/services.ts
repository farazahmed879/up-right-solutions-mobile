export interface ChildService {
  title: string;
  icon: string;
}

export interface Service {
  title: string;
  icon: string;
  children?: ChildService[];
}

export const SERVICES: Service[] = [
  /* ------- Passport and its Services ---------- */
  {
    title: 'Passport Application',
    icon: 'passport',
    children: [
      { title: 'New Passport', icon: 'plus-circle' },
      { title: 'Renew Passport', icon: 'sync-alt' },
      { title: 'Lost Passport', icon: 'search' },
    ],
  },

  /* ------- CNIC and its Services ---------- */
  {
    title: 'CNIC',
    icon: 'id-card',
    children: [
      { title: 'New CNIC', icon: 'plus-circle' },
      { title: 'Renew CNIC', icon: 'sync-alt' },
      { title: 'Lost CNIC', icon: 'search' },
    ],
  },

  /* ------- B-Form and its Services ---------- */
  {
    title: 'B-Form',
    icon: 'file-alt',
    children: [
      { title: 'New B-Form', icon: 'plus-circle' },
      { title: 'Renew B-Form', icon: 'sync-alt' },
      { title: 'Lost B-Form', icon: 'search' },
    ],
  },

  /* ------- Nadra ---------- */
  {
    title: 'Nadra',
    icon: 'landmark',
    children: [
      { title: 'CNIC', icon: 'id-card' },
      { title: 'Birth Certificate', icon: 'baby' },
      { title: 'Nikah Nama', icon: 'heart' },
    ],
  },

  /* ------- Bills, Taxes and Challans ---------- */
  {
    title: 'Bill and Payments',
    icon: 'money-bill-wave',
    children: [
      { title: 'Taxes and Challans', icon: 'receipt' },
      { title: 'Deposit of Income Tax', icon: 'hand-holding-usd' },
      { title: 'Property Tax', icon: 'home' },
      { title: 'Vehicle Tax', icon: 'car' },
      { title: 'NTN Registration', icon: 'registered' },
    ],
  },

  /* ------- Vehicle and its Services ---------- */
  {
    title: 'Vehicle',
    icon: 'car',
    children: [
      { title: 'Registration', icon: 'clipboard-list' },
      { title: 'Vehicle Transfer', icon: 'exchange-alt' },
      { title: 'Tax Payment', icon: 'money-check-alt' },
      { title: 'Number Plate', icon: 'hashtag' },
    ],
  },

  /* ------- Driving License ---------- */
  {
    title: 'Driving License',
    icon: 'address-card',
    children: [
      { title: 'New License', icon: 'plus-circle' },
      { title: 'Renew License', icon: 'sync-alt' },
      { title: 'Lost License', icon: 'search' },
    ],
  },

  /* ------- Sui Gas ---------- */
  {
    title: 'Sui Gas',
    icon: 'fire',
    children: [
      { title: 'Gas Connection', icon: 'plug' },
      { title: 'Gas Billing', icon: 'file-invoice-dollar' },
      { title: 'Meter Change', icon: 'tachometer-alt' },
      { title: 'Name Change', icon: 'user-edit' },
    ],
  },

  /* ------- Electric ---------- */
  {
    title: 'Electric',
    icon: 'bolt',
    children: [
      { title: 'Connection', icon: 'plug' },
      { title: 'Billing', icon: 'file-invoice-dollar' },
      { title: 'Meter Change', icon: 'tachometer-alt' },
      { title: 'Name Change', icon: 'user-edit' },
    ],
  },

  /* ------- Domicile and PRC ---------- */
  {
    title: 'Domicile and PRC',
    icon: 'certificate',
  },
];

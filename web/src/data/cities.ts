export interface City {
  name: string;
  slug: string;
  description: string;
  doctor_count: number;
  lat: number;
  lng: number;
}

export const cities: City[] = [
  {
    name: 'Sofia',
    slug: 'sofia',
    description:
      'The Bulgarian capital and largest city is home to the widest selection of English-speaking doctors, international clinics, and private hospitals. Sofia has the best-developed private healthcare infrastructure in the country, with multiple facilities accredited to international standards.',
    doctor_count: 10,
    lat: 42.6977,
    lng: 23.3219,
  },
  {
    name: 'Plovdiv',
    slug: 'plovdiv',
    description:
      "Bulgaria's second city and 2019 European Capital of Culture has a growing expat community and a solid network of private medical centers. Plovdiv's medical university trains a significant portion of the country's doctors, ensuring a high standard of care.",
    doctor_count: 4,
    lat: 42.1354,
    lng: 24.7453,
  },
  {
    name: 'Varna',
    slug: 'varna',
    description:
      "The Black Sea capital and Bulgaria's third largest city attracts many foreign residents and retirees. Varna has well-equipped private clinics and English-speaking specialists, particularly popular among expats living on the northern Black Sea coast.",
    doctor_count: 3,
    lat: 43.2141,
    lng: 27.9147,
  },
  {
    name: 'Burgas',
    slug: 'burgas',
    description:
      "A major Black Sea port city, Burgas serves expats living along the southern coast and in the Sunny Beach resort area. The city has a regional hospital and several private medical centers offering care to both residents and seasonal visitors.",
    doctor_count: 2,
    lat: 42.5048,
    lng: 27.4626,
  },
  {
    name: 'Veliko Tarnovo',
    slug: 'veliko-tarnovo',
    description:
      "The historic medieval capital of Bulgaria sits inland and is home to a notable expat community attracted by its beauty, culture, and low cost of living. Medical care is available at the local district hospital and a handful of private clinics.",
    doctor_count: 1,
    lat: 43.0757,
    lng: 25.6172,
  },
];

export const ALL_BULGARIAN_CITIES: string[] = [
  'Blagoevgrad',
  'Burgas',
  'Dobrich',
  'Gabrovo',
  'Haskovo',
  'Kardzhali',
  'Kyustendil',
  'Lovech',
  'Montana',
  'Pazardzhik',
  'Pernik',
  'Pleven',
  'Plovdiv',
  'Razgrad',
  'Ruse',
  'Shumen',
  'Silistra',
  'Sliven',
  'Smolyan',
  'Sofia',
  'Stara Zagora',
  'Targovishte',
  'Varna',
  'Veliko Tarnovo',
  'Vidin',
  'Vratsa',
  'Yambol',
  'Simitli',
];

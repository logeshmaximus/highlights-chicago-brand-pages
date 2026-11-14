// Business facts used across every page. Each value is a verified (`live`) fact in the
// service-page profile (profile.json), read 2026-10-26.
export const SITE = {
  live: 'https://www.highlightschicago.com',
  name: 'Highlights Chicago',
  phone: '(773) 262-3333',
  phoneShort: '773-262-3333',
  tel: '+17732623333',
  email: 'info@highlightschicago.com',
  street: '5766 N Lincoln Ave',
  address: '5766 N Lincoln Ave, Chicago, IL 60659',
  hoursShort: 'Open 24 hours, 7 days',
  mapsPlace: 'https://www.google.com/maps/search/?api=1&query=Highlights+Chicago+Inc+5766+N+Lincoln+Ave+Chicago',
  mapsDirections: 'https://www.google.com/maps/dir/?api=1&destination=Highlights+Chicago+Inc%2C+5766+N+Lincoln+Ave%2C+Chicago%2C+IL+60659',
  aiSearch: 'https://www.google.com/search?udm=50&q=Tell%20me%20about%20Highlights%20Chicago%2C%20the%20electrical%20contractor%20at%205766%20N%20Lincoln%20Ave%2C%20Chicago%3A%20its%20services%2C%20service%20areas%2C%20reviews%20and%20how%20to%20book',
  footerBlurb: 'Highlights Chicago is a family-owned electrical company, established in 2012, working from a shop on N Lincoln Ave in West Ridge.',
  google: { rating: '4.9', count: '494', url: 'https://www.google.com/maps/search/?api=1&query=Highlights+Chicago+Inc+5766+N+Lincoln+Ave+Chicago' },
  yelp: { rating: '4.9', count: '307', url: 'https://www.yelp.com/biz/highlights-chicago-chicago-2' },
  licence: 'ECC96456',
  licence2: 'ECC94521',
  permits: '1,213',
  rank: 'Top 13%',
};

// Service areas from profile.areas. Suburban registration numbers stay off the page
// (licenses-suburbs is still a `confirm` fact).
export const AREAS = [
  ['Lincoln Square', 'Minutes from the shop', 'area-lincoln-square', 'James~Quinn · CC BY-SA 2.0 · Wikimedia Commons'],
  ['North Park', 'Next door to the West Ridge shop', 'area-north-park', 'Ken Lund from Reno, Nevada, USA · CC BY-SA 2.0 · Wikimedia Commons'],
  ['Albany Park', 'Jensen Park', 'area-albany-park', 'Nick Number · CC BY 4.0 · Wikimedia Commons'],
  ['Ravenswood', 'Ravenswood Metra', 'area-ravenswood', 'Matt Sommer (presumably, Sommermt at en.wikipedia) · CC BY-SA 2.5 · Wikimedia Commons'],
  ['Uptown', 'The Uptown marquee', 'area-uptown', 'Paul R. Burley · CC BY-SA 4.0 · Wikimedia Commons'],
  ['Logan Square', 'Centennial Monument', 'area-logan-square', 'Roberto Morales · CC BY-SA 4.0 · Wikimedia Commons'],
  ['Lakeview', '70.9% of houses predate 1940', 'area-lakeview', 'Ken Lund from Reno, Nevada, USA · CC BY-SA 2.0 · Wikimedia Commons'],
  ['Wicker Park', '83.0% of houses predate 1940', 'area-wicker-park', 'Warren LeMay from Chicago, IL, United States · CC BY-SA 4.0 · Wikimedia Commons'],
  ['Rogers Park', 'Rogers Park Metra', 'area-rogers-park', 'Adam Moss · CC BY-SA 2.0 · Wikimedia Commons'],
  ['Jefferson Park', 'Transit hub', 'area-jefferson-park', 'Jacob G. from Chicago, Ilinois, United States · CC BY-SA 2.0 · Wikimedia Commons'],
  ['Evanston', 'North Shore suburb', 'area-evanston', 'Madcoverboy (talk) · CC BY-SA 3.0 · Wikimedia Commons'],
  ['Palatine', 'Northwest suburb', 'area-palatine', 'Mysterymanblue · CC0 · Wikimedia Commons'],
];

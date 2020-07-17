const { v4: uuidv4 } = require('uuid');

module.exports = () => {
  return [
    {
      id: 1,
      city_id: 1,
      name: 'Contemporary Home, Marais, Central Paris',
      description:
        'Fusing vintage elegance with modern design, this apartment is a true expression of Parisian style. The chevron wood floors and sleek minimalist furniture are accented by pops of color and decor items providing an elevated and authentic ambiance',
      rooms: 2,
      bathrooms: 1,
      max_guests: 3,
      price_by_night: 129,
      image:
        'https://www.airbnb.fr/rooms/plus/25392196/photos/627171182?location=Paris&adults=1&guests=1&source_impression_id=p3_1594976813_ykbHLfkmv5WqQ4qT',
    },
    {
      id: 2,
      city_id: 2,
      name: 'Villa La Palmeraie, calme & confort à 5mn du métro',
      description:
        'Villa La Palmeraie est un joli T2 de 38m2 situé au rez-de-chaussée d’une ancienne imprimerie entièrement réhabilitée en 2019. Il vous accueille jusqu’à 4 personnes pour vos séjours professionnels ou personnels. Un boîtier à clés vous permet d’arriver à l’heure que vous désirez',
      rooms: 2,
      bathrooms: 1,
      max_guests: 4,
      price_by_night: 75,
      image:
        'https://www.airbnb.fr/rooms/36522079/photos/806914028?adults=1&guests=1&location=Dijon&source_impression_id=p3_1594977237_fUQDZxbwwC536h1s',
    },
    {
      id: 3,
      city_id: 1,
      name: 'Sweet & Cosy room Canal Saint Martin',
      description:
        'La chambre est située en plein cœur du quartier de la République, dans le 10e arrondissement de Paris. Toute proche du beau quartier du Marais, des transports et des commerces, c’est une chambre calme, lumineuse et confortable où vous pourrez vous reposer après vos longues journées de découverte et de balade dans les rues de Paris.',
      rooms: 1,
      bathrooms: 1,
      max_guests: 2,
      price_by_night: 74,
      image:
        'https://www.airbnb.fr/rooms/17222007/photos/266830212?adults=1&guests=1&location=Paris&check_in=2020-08-26&check_out=2020-08-27&source_impression_id=p3_1594977443_P3uVlB2NrCpKUpXp',
    },
    {
      id: 4,
      city_id: 4,
      name: 'Mon bel appart',
      description: 'Un bel appart confortable au coeur de Bordeaux',
      rooms: 2,
      bathrooms: 1,
      max_guests: 3,
      price_by_night: 59,
      image:
        'https://www.airbnb.fr/rooms/17222007/photos/266830212?adults=1&guests=1&location=Paris&check_in=2020-08-26&check_out=2020-08-27&source_impression_id=p3_1594977443_P3uVlB2NrCpKUpXp',
    },
    {
      id: 5,
      city_id: 5,
      name: 'Séjour inoubliable chez Happy Family',
      description: 'Un grand appartement, composé de trois chambres et un séjour de plus de 30 m2.',
      rooms: 2,
      bathrooms: 1,
      max_guests: 2,
      price_by_night: 25,
      image:
        'https://www.airbnb.fr/rooms/40016713/photos/910767461?adults=1&guests=1&location=Marseille&check_in=2020-08-26&check_out=2020-08-27&source_impression_id=p3_1594978930_08he4wzvdPFmypWd',
    },
    {
      id: 6,
      city_id: 6,
      name: 'Suite parentale entre Montpellier et la Mer',
      description:
        'Grande chambre "suite parentale" de 26m2 comprenant une chambre, une salle de bain privée et un dressing plus un balcon.',
      rooms: 2,
      bathrooms: 1,
      max_guests: 2,
      price_by_night: 22,
      image:
        'https://www.airbnb.fr/rooms/41968929/photos/960443742?adults=1&guests=1&location=Montpellier&check_in=2020-08-26&check_out=2020-08-27&source_impression_id=p3_1594979058_98y4mI9Rbs0v1DUn',
    },
    {
      id: 7,
      city_id: 1,
      name: 'Champs-Élysées Golden triangle flat with mezzanine',
      description:
        'Newly renovated tiny apartment with mezzanine, compact and design,well-equipped, direct elevator.',
      rooms: 1,
      bathrooms: 1,
      max_guests: 2,
      price_by_night: 74,
      image:
        'https://www.airbnb.fr/rooms/22475432/photos/427273308?adults=1&guests=1&location=Paris&check_in=2020-08-26&check_out=2020-08-27&previous_page_section_name=1000&federated_search_id=cec5609b-1c49-4508-9cef-0619e2fc78f1',
    },
    {
      id: 8,
      city_id: 1,
      name: 'Chambre Double Standard',
      description:
        'Profitez d’une expérience Parisienne dans une ambiance contemporaine et relaxante tout en restant connecté.',
      rooms: 1,
      bathrooms: 1,
      max_guests: 2,
      price_by_night: 58,
      image:
        'https://www.airbnb.fr/rooms/35178219/photos/767174362?adults=1&guests=1&location=Paris&check_in=2020-08-26&check_out=2020-08-27&previous_page_section_name=1000&federated_search_id=cec5609b-1c49-4508-9cef-0619e2fc78f1',
    },
    {
      id: 9,
      city_id: 1,
      name: 'Charmant studio avec vue sur le jardin',
      description:
        'Charmant studio de 25 m2 donnant sur le jardin. Salle d eau douche à l italienne spacieuse. Chambre et cuisine équipée. Il se situe au rez-de-chaussée de ma maison. La terrasse du studio est mitoyenne à la mienne mais sans vis à vis.',
      rooms: 1,
      bathrooms: 1,
      max_guests: 3,
      price_by_night: 58,
      image:
        'https://www.airbnb.fr/rooms/27280842/photos/716363663?adults=1&guests=1&location=Paris&check_in=2020-08-26&check_out=2020-08-27&source_impression_id=p3_1594978304_SZgLFLAALNfAyLd%2F',
    },
    {
      id: 10,
      city_id: 1,
      name: 'Joli studio atypique tout confort dans jardin',
      description:
        'Studio indépendant et lumineux dans une ambiance familiale sans être envahissante ! Proche commerces, bus, RER B/T4 à 15mm à pied, Parc Expos Villepinte concours et salons, Aéroport et Stade de France',
      rooms: 1,
      bathrooms: 1,
      max_guests: 2,
      price_by_night: 46,
      image:
        'https://www.airbnb.fr/rooms/11922717/photos/783862579?adults=1&guests=1&location=Paris&check_in=2020-08-26&check_out=2020-08-27&previous_page_section_name=1000&federated_search_id=759cdf6c-7067-492b-aa13-a203114698e6',
    },
    {
      id: 11,
      city_id: 1,
      name: 'Bel appartement confortable - 18ème',
      description:
        'Ce bel appartement se situe dans le 18ème arrondissement, proche de la gare du Nord. Il est spacieux et très agréable.',
      rooms: 1,
      bathrooms: 1,
      max_guests: 2,
      price_by_night: 78,
      image:
        'https://www.airbnb.fr/rooms/39263879/photos/926286301?adults=1&guests=1&location=Paris&check_in=2020-08-26&check_out=2020-08-27&previous_page_section_name=1000&federated_search_id=7efa432d-29ae-48b1-8af3-a4d600bd603b',
    },
    {
      id: 12,
      city_id: 1,
      name: 'Appartement Cosy',
      description:
        'Bienvenue dans cet appartement cosy au cœur de Saint-Gratien, avec une place de parking privée à votre disposition.',
      rooms: 1,
      bathrooms: 1,
      max_guests: 4,
      price_by_night: 71,
      image:
        'https://www.airbnb.fr/rooms/43334043/photos/1000722827?adults=1&guests=1&location=Paris&check_in=2020-08-26&check_out=2020-08-27&previous_page_section_name=1000&federated_search_id=7efa432d-29ae-48b1-8af3-a4d600bd603b',
    },
  ];
};

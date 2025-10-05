import React, { useState } from 'react';
import CountrySelector from './components/CountrySelector';
import CitySelector from './components/CitySelector';
import DateSelector from './components/DateSelector';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const countriesAndCities = {
  Argentina: ['Buenos Aires', 'Cali', 'Cartagena', 'Medellín', 'Pereira', 'Santa Marta', 'Ibagué', 'Barranquilla', 'Bucaramanga', 'Cúcuta'],
  Armenia: ['Abovyan', 'Artashat', 'Dilijan', 'Goris', 'Gyumri', 'Hrazdan', 'Kapan', 'Vanadzor', 'Vagharshapat', 'Yerevan'],
  Australia: ['Adelaide', 'Brisbane', 'Canberra', 'Gold Coast', 'Logan City', 'Melbourne', 'Newcastle', 'Perth', 'Sydney', 'Wollongong'],
  Austria: ['Dornbirn', 'Graz', 'Innsbruck', 'Klagenfurt', 'Linz', 'Salzburg', 'St. Pölten', 'Stuttgart', 'Villach', 'Vienna'],
  Azerbaijan: ['Baku', 'Ganja', 'Khachmaz', 'Lankaran', 'Mingachevir', 'Nakhchivan', 'Shaki', 'Shirvan', 'Sumqayit', 'Yevlakh'],
  Bangladesh: ['Chittagong', 'Dhaka', 'Khulna', 'Rajshahi', 'Sylhet', 'Barisal', 'Comilla', 'Rangpur', 'Mymensingh', 'Narayanganj'],
  Belarus: ['Babruysk', 'Baranovichi', 'Brest', 'Gomel', 'Hrodna', 'Minsk', 'Mogilev', 'Orsha', 'Pinsk', 'Vitebsk'],
  Belgium: ['Antwerp', 'Brussels', 'Charleroi', 'Ghent', 'Liège', 'Bruges', 'Namur', 'Leuven', 'Mons', 'Aalst'],
  Bolivia: ['Cochabamba', 'La Paz', 'Oruro', 'Potosí', 'Santa Cruz', 'Sucre', 'Tarija', 'Trinidad', 'Montero', 'El Alto'],
  Brazil: ['Belo Horizonte', 'Brasília', 'Curitiba', 'Fortaleza', 'Manaus', 'Porto Alegre', 'Recife', 'Rio de Janeiro', 'Salvador', 'São Paulo'],
  Bulgaria: ['Burgas', 'Dobrich', 'Plovdiv', 'Pleven', 'Ruse', 'Sofia', 'Sliven', 'Stara Zagora', 'Varna', 'Veliko Tarnovo'],
  Canada: ['Calgary', 'Edmonton', 'Hamilton', 'Kitchener', 'Montreal', 'Ottawa', 'Quebec City', 'Toronto', 'Vancouver', 'Winnipeg'],
  Chile: ['Antofagasta', 'Arica', 'Iquique', 'Puente Alto', 'Rancagua', 'Santiago', 'Talca', 'Temuco', 'Valparaíso', 'Viña del Mar'],
  China: ['Beijing', 'Chengdu', 'Chongqing', 'Guangzhou', 'Nanjing', 'Shanghai', 'Shenzhen', 'Tianjin', 'Wuhan', 'Xi’an'],
  Colombia: ['Barranquilla', 'Bucaramanga', 'Cali', 'Cartagena', 'Cúcuta', 'Ibagué', 'Medellín', 'Pereira', 'Santa Marta', 'Bogotá'],
  CostaRica: ['Alajuela', 'Cartago', 'Guanacaste', 'Heredia', 'Liberia', 'Limón', 'Puntarenas', 'San José', 'Tres Ríos', 'Golfito'],
  Croatia: ['Dubrovnik', 'Osijek', 'Pula', 'Rijeka', 'Split', 'Zagreb', 'Zadar', 'Slavonski Brod', 'Šibenik', 'Vinkovci'],
  Cuba: ['Camagüey', 'Havana', 'Holguín', 'Matanzas', 'Pinar del Río', 'Santiago de Cuba', 'Santa Clara', 'Cienfuegos', 'Bayamo', 'Guantánamo'],
  Cyprus: ['Famagusta', 'Larnaca', 'Limassol', 'Nicosia', 'Paphos', 'Kyrenia', 'Paralimni', 'Morphou', 'Ayia Napa', 'Protaras'],
  CzechRepublic: ['Brno', 'Ceske Budejovice', 'Hradec Králové', 'Liberec', 'Olomouc', 'Ostrava', 'Plzen', 'Prague', 'Ústí nad Labem', 'Zlín'],
  Denmark: ['Aarhus', 'Copenhagen', 'Esbjerg', 'Fredericia', 'Gladsaxe', 'Kolding', 'Odense', 'Roskilde', 'Vejle', 'Aalborg'],
  DominicanRepublic: ['Barahona', 'Bonao', 'Higüey', 'La Romana', 'Moca', 'Puerto Plata', 'San Francisco de Macorís', 'Santo Domingo', 'Santiago de los Caballeros', 'San Pedro de Macorís'],
  Ecuador: ['Cuenca', 'Guayaquil', 'Loja', 'Manta', 'Portoviejo', 'Quito', 'Santo Domingo', 'Machala', 'Ambato', 'Esmeraldas'],
  Egypt: ['Alexandria', 'Cairo', 'Giza', 'Luxor', 'Mansoura', 'Port Said', 'Suez', 'Tanta', 'Zagazig', 'Ismailia'],
  ElSalvador: ['Santa Ana', 'San Miguel', 'San Salvador', 'Sonsonate', 'Soyapango', 'Ahuachapán', 'Chalatenango', 'Usulután', 'La Libertad', 'La Unión'],
  Estonia: ['Kohtla-Järve', 'Kuressaare', 'Narva', 'Pärnu', 'Rakvere', 'Sillamäe', 'Tallinn', 'Tartu', 'Valga', 'Viljandi'],
  Finland: ['Espoo', 'Helsinki', 'Jyväskylä', 'Lahti', 'Oulu', 'Tampere', 'Turku', 'Vantaa', 'Kuopio', 'Vaasa'],
  France: ['Bordeaux', 'Lille', 'Lyon', 'Marseille', 'Montpellier', 'Nantes', 'Nice', 'Paris', 'Strasbourg', 'Toulouse'],
  Georgia: ['Batumi', 'Gori', 'Khashuri', 'Kutaisi', 'Poti', 'Rustavi', 'Samtredia', 'Telavi', 'Tbilisi', 'Zugdidi'],
  Germany: ['Berlin', 'Bielefeld', 'Bonn', 'Cologne', 'Dresden', 'Dortmund', 'Düsseldorf', 'Essen', 'Frankfurt', 'Hamburg'],
  Ghana: ['Accra', 'Ashaiman', 'Cape Coast', 'Koforidua', 'Kumasi', 'Sekondi', 'Takoradi', 'Tamale', 'Tema', 'Obuasi'],
  Greece: ['Agrinio', 'Chania', 'Heraklion', 'Ioannina', 'Kalamata', 'Larissa', 'Patras', 'Rhodes', 'Thessaloniki', 'Athens'],
  Guatemala: ['Antigua', 'Chimaltenango', 'Ciudad de Guatemala', 'Escuintla', 'Huehuetenango', 'Mazatenango', 'Quetzaltenango', 'San Marcos', 'Santa Cruz del Quiché', 'Totonicapán'],
  Honduras: ['Choloma', 'Comayagua', 'Danlí', 'El Progreso', 'La Ceiba', 'Puerto Cortés', 'San Pedro Sula', 'Tegucigalpa', 'Siguatepeque', 'Tela'],
  Hungary: ['Budapest', 'Debrecen', 'Győr', 'Kecskemét', 'Miskolc', 'Nyíregyháza', 'Pécs', 'Szeged', 'Székesfehérvár', 'Szombathely'],
  Iceland: ['Akureyri', 'Egilsstaðir', 'Garðabær', 'Hafnarfjörður', 'Kópavogur', 'Mosfellsbær', 'Reykjanesbær', 'Reykjavík', 'Selfoss', 'Vestmannaeyjar'],
  India: ['Ahmedabad', 'Bangalore', 'Chennai', 'Delhi', 'Hyderabad', 'Jaipur', 'Kolkata', 'Mumbai', 'Pune', 'Surat'],
  Indonesia: ['Bandung', 'Bekasi', 'Depok', 'Jakarta', 'Medan', 'Semarang', 'Surabaya', 'Tangerang', 'Palembang', 'Makassar'],
  Ireland: ['Cork', 'Dublin', 'Dundalk', 'Galway', 'Limerick', 'Swords', 'Waterford', 'Bray', 'Navan', 'Tralee'],
  Israel: ['Ashdod', 'Beersheba', 'Bnei Brak', 'Haifa', 'Jerusalem', 'Netanya', 'Petah Tikva', 'Rishon LeZion', 'Tel Aviv', 'Holon'],
  Italy: ['Bologna', 'Catania', 'Florence', 'Genoa', 'Milan', 'Naples', 'Palermo', 'Rome', 'Turin', 'Venice'],
  Jamaica: ['Kingston', 'Spanish Town', 'Portmore', 'Montego Bay', 'Mandeville', 'May Pen', 'Old Harbour', 'Linstead', 'Black River', 'Port Antonio'],
  Japan: ['Fukuoka', 'Hiroshima', 'Kawasaki', 'Kobe', 'Kyoto', 'Nagoya', 'Osaka', 'Sapporo', 'Saitama', 'Tokyo'],
  Jordan: ['Amman', 'Aqaba', 'Irbid', 'Jerash', 'Karak', 'Mafraq', 'Madaba', 'Russeifa', 'Zarqa', 'Al-Salt'],
  Kazakhstan: ['Aktobe', 'Almaty', 'Karaganda', 'Kokshetau', 'Kyzylorda', 'Nur-Sultan', 'Pavlodar', 'Petropavl', 'Shymkent', 'Taldykorgan'],
  Kenya: ['Eldoret', 'Kakamega', 'Kisumu', 'Mombasa', 'Nairobi', 'Nakuru', 'Thika', 'Garissa', 'Homa Bay', 'Kitale'],
  Kuwait: ['Al Ahmadi', 'Al Farwaniyah', 'Al Jahra', 'Hawalli', 'Kuwait City', 'Mubarak Al-Kabeer'],
  Latvia: ['Daugavpils', 'Jelgava', 'Jūrmala', 'Liepāja', 'Rēzekne', 'Rīga', 'Salaspils', 'Valmiera', 'Ventspils', 'Jēkabpils'],
  Lebanon: ['Aley', 'Batroun', 'Beirut', 'Byblos', 'Damour', 'Jounieh', 'Nabatieh', 'Sidon', 'Tripoli', 'Zahle'],
  Lithuania: ['Alytus', 'Kaunas', 'Klaipėda', 'Marijampolė', 'Mazeikiai', 'Panevėžys', 'Šiauliai', 'Tauragė', 'Vilnius', 'Utena'],
  Luxembourg: ['Esch-sur-Alzette', 'Luxembourg City', 'Differdange', 'Dudelange', 'Ettelbruck', 'Diekirch', 'Remich', 'Wiltz', 'Grevenmacher', 'Clervaux'],
  Malaysia: ['Alor Setar', 'George Town', 'Ipoh', 'Johor Bahru', 'Kota Kinabalu', 'Kuala Lumpur', 'Kuantan', 'Melaka', 'Petaling Jaya', 'Shah Alam'],
  Malta: ['Birkirkara', 'Birżebbuġa', 'Fgura', 'Floriana', 'Gzira', 'Kalkara', 'Marsaskala', 'Marsaxlokk', 'Mdina', 'Sliema'],
  Mexico: ['Aguascalientes', 'Cancún', 'Chihuahua', 'Ciudad Juárez', 'Guadalajara', 'León', 'Mexico City', 'Monterrey', 'Querétaro', 'Tijuana'],
  Morocco: ['Agadir', 'Casablanca', 'Fes', 'Kenitra', 'Marrakech', 'Meknes', 'Oujda', 'Rabat', 'Safi', 'Tangier'],
  Myanmar: ['Bago', 'Hpa-an', 'Kawthaung', 'Kengtung', 'Lashio', 'Mandalay', 'Mawlamyine', 'Myitkyina', 'Naypyidaw', 'Yangon'],
  Namibia: ['Gobabis', 'Katima Mulilo', 'Lüderitz', 'Okahandja', 'Ongwediva', 'Oshakati', 'Otjiwarongo', 'Rundu', 'Swakopmund', 'Windhoek'],
  Nepal: ['Biratnagar', 'Butwal', 'Dharan', 'Hetauda', 'Itahari', 'Janakpur', 'Kathmandu', 'Lalitpur', 'Pokhara', 'Bhaktapur'],
  Netherlands: ['Almere', 'Amersfoort', 'Amsterdam', 'Arnhem', 'Breda', 'Dordrecht', 'Eindhoven', 'Groningen', 'Maastricht', 'Rotterdam'],
  NewZealand: ['Auckland', 'Christchurch', 'Dunedin', 'Hamilton', 'Napier', 'Palmerston North', 'Rotorua', 'Tauranga', 'Wellington', 'Whangarei'],
  Nicaragua: ['Bluefields', 'Chinandega', 'Estelí', 'Jinotega', 'León', 'Managua', 'Masaya', 'Matagalpa', 'Ocotal', 'Rivas'],
  Nigeria: ['Enugu', 'Ibadan', 'Ikeja', 'Ilorin', 'Jos', 'Kaduna', 'Kano', 'Lagos', 'Port Harcourt', 'Benin City'],
  Norway: ['Bergen', 'Drammen', 'Fredrikstad', 'Kristiansand', 'Lillehammer', 'Oslo', 'Porsgrunn', 'Sandnes', 'Skien', 'Trondheim'],
  Oman: ['Al Buraimi', 'Ibri', 'Muscat', 'Nizwa', 'Salalah', 'Seeb', 'Sohar', 'Sur', 'Saham', 'Rustaq'],
  Pakistan: ['Faisalabad', 'Gujranwala', 'Hyderabad', 'Islamabad', 'Karachi', 'Lahore', 'Multan', 'Peshawar', 'Quetta', 'Rawalpindi'],
  Panama: ['Arraiján', 'Chitré', 'Colón', 'David', 'La Chorrera', 'Las Cumbres', 'Penonomé', 'San Miguelito', 'Santiago', 'Tocumen'],
  Paraguay: ['Asunción', 'Ciudad del Este', 'Concepción', 'Coronel Oviedo', 'Encarnación', 'Luque', 'Mariano Roque Alonso', 'Pedro Juan Caballero', 'San Lorenzo', 'Villarrica'],
  Peru: ['Arequipa', 'Cusco', 'Huancayo', 'Iquitos', 'Lima', 'Puno', 'Tacna', 'Tarapoto', 'Trujillo', 'Chiclayo'],
  Philippines: ['Antipolo', 'Baguio', 'Cabanatuan', 'Cagayan de Oro', 'Caloocan', 'Davao City', 'General Santos', 'Iloilo City', 'Manila', 'Quezon City'],
  Poland: ['Białystok', 'Bydgoszcz', 'Gdańsk', 'Katowice', 'Kraków', 'Lublin', 'Łódź', 'Poznań', 'Szczecin', 'Warsaw'],
  Portugal: ['Agualva-Cacém', 'Amadora', 'Braga', 'Coimbra', 'Funchal', 'Lisbon', 'Porto', 'Setúbal', 'Vila Nova de Gaia', 'Viseu'],
  Qatar: ['Al Daayen', 'Al Khor', 'Al Rayyan', 'Al Shamal', 'Al Wakrah', 'Doha', 'Madīnat ash Shamāl', 'Mesaieed', 'Umm Salal Mohammed', 'Al Shahaniya'],
  Romania: ['Bacău', 'Baia Mare', 'Bucharest', 'Cluj-Napoca', 'Constanța', 'Craiova', 'Galați', 'Iași', 'Oradea', 'Timișoara'],
  Russia: ['Chelyabinsk', 'Kazan', 'Moscow', 'Nizhny Novgorod', 'Novosibirsk', 'Omsk', 'Rostov-on-Don', 'Samara', 'Saint Petersburg', 'Yekaterinburg'],
  SaudiArabia: ['Abha', 'Al Khobar', 'Al Madinah', 'Dammam', 'Hafr Al-Batin', 'Jeddah', 'Khamis Mushait', 'Makkah', 'Riyadh', 'Tabuk'],
  Serbia: ['Belgrade', 'Čačak', 'Kragujevac', 'Kraljevo', 'Niš', 'Novi Sad', 'Pančevo', 'Požarevac', 'Subotica', 'Zrenjanin'],
  Singapore: ['Singapore'],
  Slovakia: ['Banská Bystrica', 'Bratislava', 'Košice', 'Martin', 'Nitra', 'Prešov', 'Trenčín', 'Trnava', 'Žilina', 'Poprad'],
  Slovenia: ['Celje', 'Koper', 'Kranj', 'Ljubljana', 'Maribor', 'Murska Sobota', 'Novo Mesto', 'Ptuj', 'Slovenj Gradec', 'Velenje'],
  SouthAfrica: ['Cape Town', 'Durban', 'East London', 'Johannesburg', 'Mbombela', 'Nelson Mandela Bay', 'Pietermaritzburg', 'Polokwane', 'Pretoria', 'Tshwane'],
  SouthKorea: ['Busan', 'Changwon', 'Daegu', 'Daejeon', 'Gwangju', 'Incheon', 'Seongnam', 'Seoul', 'Suwon', 'Ulsan'],
  Spain: ['Alicante', 'Barcelona', 'Bilbao', 'Madrid', 'Málaga', 'Murcia', 'Palma', 'Seville', 'Valencia', 'Zaragoza'],
  SriLanka: ['Colombo', 'Galle', 'Jaffna', 'Kandy', 'Matara', 'Negombo', 'Nuwara Eliya', 'Trincomalee', 'Anuradhapura', 'Ratnapura'],
  Sweden: ['Gothenburg', 'Helsingborg', 'Jönköping', 'Linköping', 'Lund', 'Malmö', 'Norrköping', 'Södertälje', 'Stockholm', 'Uppsala'],
  Switzerland: ['Basel', 'Bern', 'Geneva', 'Lausanne', 'Lucerne', 'St. Gallen', 'Winterthur', 'Zug', 'Zurich', 'Lugano'],
  Taiwan: ['Banqiao', 'Hsinchu', 'Kaohsiung', 'New Taipei', 'Taichung', 'Tainan', 'Taipei', 'Taitung', 'Taiyuan', 'Yilan'],
  Tanzania: ['Arusha', 'Dar es Salaam', 'Dodoma', 'Mwanza', 'Mbeya', 'Tanga', 'Zanzibar City', 'Morogoro', 'Moshi', 'Musoma'],
  Thailand: ['Bangkok', 'Chiang Mai', 'Hat Yai', 'Khon Kaen', 'Nakhon Ratchasima', 'Nakhon Si Thammarat', 'Pattaya', 'Phuket', 'Udon Thani', 'Ubon Ratchathani'],
  Tunisia: ['Ariana', 'Bizerte', 'El Kef', 'Gabès', 'Gafsa', 'La Marsa', 'Sfax', 'Sousse', 'Tunis', 'Zarzis'],
  Turkey: ['Adana', 'Antalya', 'Ankara', 'Bursa', 'Gaziantep', 'Istanbul', 'Kayseri', 'Konya', 'Mersin', 'Samsun'],
  Uganda: ['Gulu', 'Jinja', 'Kampala', 'Lira', 'Masaka', 'Mbarara', 'Mukono', 'Soroti', 'Tororo', 'Wakiso'],
  Ukraine: ['Chernihiv', 'Dnipro', 'Donetsk', 'Kharkiv', 'Kherson', 'Kiev', 'Lviv', 'Odessa', 'Poltava', 'Vinnytsia'],
  UnitedArabEmirates: ['Abu Dhabi', 'Ajman', 'Al Ain', 'Dubai', 'Fujairah', 'Ras Al Khaimah', 'Sharjah', 'Umm Al Quwain'],
  UnitedKingdom: ['Birmingham', 'Bradford', 'Edinburgh', 'Glasgow', 'Leeds', 'Liverpool', 'London', 'Manchester', 'Sheffield', 'Wakefield'],
  Uruguay: ['Artigas', 'Bella Unión', 'Durazno', 'Florida', 'Maldonado', 'Mercedes', 'Melo', 'Minas', 'Paysandú', 'Salto'],
  Uzbekistan: ['Andijon', 'Bukhara', 'Fergana', 'Jizzax', 'Margilan', 'Nukus', 'Qarshi', 'Samarqand', 'Toshkent', 'Urganch'],
  Venezuela: ['Barquisimeto', 'Caracas', 'Ciudad Guayana', 'Ciudad Bolívar', 'Coro', 'Maturín', 'Maracaibo', 'Maracay', 'Valencia', 'Puerto la Cruz'],
  Vietnam: ['Can Tho', 'Da Nang', 'Haiphong', 'Hanoi', 'Ho Chi Minh City', 'Hue', 'Nha Trang', 'Qui Nhon', 'Vinh', 'Buon Ma Thuot']
};

const sortedCountries = Object.keys(countriesAndCities).sort();

const boxStyle = {
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 6px 10px rgba(0,0,0,0.15)',
  padding: '25px',
  marginBottom: '25px',
  maxWidth: '400px',
  boxSizing: 'border-box',
  textAlign: 'left'
};

const labelStyle = {
  fontWeight: '600',
  marginBottom: '6px',
  display: 'block',
  color: '#264653',
  fontSize: '18px'
};

const selectStyle = {
  width: '100%',
  padding: '12px 16px',
  fontSize: '18px',
  borderRadius: '12px',
  border: '1.5px solid #ccc',
  marginBottom: '20px',
  outline: 'none',
  boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '14px 24px',
  borderRadius: '14px',
  border: 'none',
  fontSize: '18px',
  fontWeight: '600',
  cursor: 'pointer'
};

const iconButtonStyle = {
  ...buttonStyle,
  padding: '8px 16px',
  borderRadius: '10px'
};

// Helper to clean and format Gemini response text
const formatResponseText = (text) => {
  if (!text) return '';

  // Remove markdown asterisks ***
  let cleanText = text.replace(/\*{1,3}/g, '');

  // Split by multiple newlines to paragraphs
  const paragraphs = cleanText.split(/\n+/).filter(p => p.trim() !== '');

  return paragraphs.map((p, i) => (
    <p key={i} style={{ marginBottom: '0.8em', whiteSpace: 'pre-wrap' }}>
      {p.trim()}
    </p>
  ));
};

const App = () => {
  const [tripName, setTripName] = useState('');
  const [places, setPlaces] = useState([{ country: '', city: '', date: '' }]);
  const [usePrevCountryForNext, setUsePrevCountryForNext] = useState(false);
  const [weatherResults, setWeatherResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addPlace = () => {
    let countryForNext = '';
    if (usePrevCountryForNext && places.length > 0) {
      countryForNext = places[places.length - 1].country || '';
    }
    const newPlace = { country: countryForNext, city: '', date: '' };
    setPlaces([...places, newPlace]);
    setUsePrevCountryForNext(false);
  };

  const updatePlace = (index, field, value) => {
    const updatedPlaces = [...places];
    updatedPlaces[index][field] = value;
    if (field === 'country') updatedPlaces[index].city = '';
    setPlaces(updatedPlaces);
  };

  const deletePlace = (index) => {
    setPlaces(places.filter((_, idx) => idx !== index));
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newPlaces = [...places];
    [newPlaces[index - 1], newPlaces[index]] = [newPlaces[index], newPlaces[index - 1]];
    setPlaces(newPlaces);
  };

  const moveDown = (index) => {
    if (index === places.length - 1) return;
    const newPlaces = [...places];
    [newPlaces[index], newPlaces[index + 1]] = [newPlaces[index + 1], newPlaces[index]];
    setPlaces(newPlaces);
  };

  const handleCheckWeather = async () => {
    setIsLoading(true);
    const results = [];
    for (const place of places) {
      if (place.city && place.country && place.date) {
        try {
          const res = await fetch('http://localhost:5000/weather', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              city: place.city,
              country: place.country,
              date: place.date
            }),
          });
          const data = await res.json();
          results.push({ text: data.text, place });
        } catch (err) {
          results.push({ text: `Error: ${err.message}`, place });
        }
      } else {
        results.push({ text: 'Incomplete trip details', place });
      }
    }
    setWeatherResults(results);
    setIsLoading(false);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('weather-results-section');
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(tripName ? `${tripName}-WeatherResults.pdf` : 'WeatherResults.pdf');
  };

  return (
    <div style={{
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#e7f0f7',
      minHeight: '100vh',
      padding: '30px 20px',
      boxSizing: 'border-box',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#2a9d8f', marginBottom: '30px', fontSize: '36px' }}>
        Rain Check - Weather Dashboard
      </h1>

      {/* Trip Name field */}
      <div style={{ maxWidth: '400px', margin: '0 auto 30px', textAlign: 'left' }}>
        <label
          htmlFor="tripName"
          style={{
            fontWeight: '600',
            color: '#264653',
            fontSize: '18px',
            marginBottom: '8px',
            display: 'block'
          }}
        >
          Trip Name
        </label>
        <input
          id="tripName"
          type="text"
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '18px',
            borderRadius: '12px',
            border: '1.5px solid #ccc',
            outline: 'none',
            marginBottom: '22px',
            boxSizing: 'border-box'
          }}
          placeholder="Name your trip (e.g., Europe Adventure)"
          value={tripName}
          onChange={e => setTripName(e.target.value)}
          maxLength={48}
        />
      </div>

      {/* Flex container for place boxes */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '25px',
        marginBottom: '30px'
      }}>
        {places.map((place, idx) => (
          <div key={idx} style={{
            ...boxStyle,
            flex: '0 0 400px'
          }}>
            <label style={labelStyle}>Country</label>
            <select
              style={selectStyle}
              value={place.country}
              onChange={e => updatePlace(idx, 'country', e.target.value)}
            >
              <option value="">Select Country</option>
              {sortedCountries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <label style={labelStyle}>City</label>
            <select
              style={selectStyle}
              value={place.city}
              onChange={e => updatePlace(idx, 'city', e.target.value)}
              disabled={!place.country}
            >
              <option value="">Select City</option>
              {place.country && countriesAndCities[place.country].map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <label style={labelStyle}>Date</label>
            <input
              type="date"
              style={{
                ...selectStyle,
                padding: '12px 14px',
                fontWeight: '500'
              }}
              value={place.date}
              onChange={e => updatePlace(idx, 'date', e.target.value)}
            />

            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => moveUp(idx)}
                disabled={idx === 0}
                style={{ ...iconButtonStyle, backgroundColor: idx === 0 ? '#B0C4DE' : '#89CFF0' }}
                aria-label="Move up"
              >↑</button>
              <button
                onClick={() => moveDown(idx)}
                disabled={idx === places.length - 1}
                style={{ ...iconButtonStyle, backgroundColor: idx === places.length - 1 ? '#B0C4DE' : '#89CFF0' }}
                aria-label="Move down"
              >↓</button>
              <button
                onClick={() => deletePlace(idx)}
                style={{ ...iconButtonStyle, backgroundColor: '#ff6363', color: '#fff' }}
                aria-label="Delete"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '400px', margin: '0 auto 30px' }}>
        <label style={{ display: 'flex', alignItems: 'center', fontSize: '18px', color: '#264653' }}>
          <input
            type="checkbox"
            style={{ marginRight: '12px', width: '20px', height: '20px' }}
            checked={usePrevCountryForNext}
            onChange={e => setUsePrevCountryForNext(e.target.checked)}
            disabled={places.length === 0 || !places[places.length - 1].country}
          />
          Use previous place's country for next destination
        </label>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <button
          onClick={addPlace}
          style={{
            ...buttonStyle,
            backgroundColor: '#2a9d8f',
            color: 'white',
            marginRight: '20px',
            width: '160px'
          }}
        >+ Add Place</button>
        <button
          onClick={handleCheckWeather}
          disabled={places.some(p => !p.city || !p.country || !p.date) || isLoading}
          style={{
            ...buttonStyle,
            backgroundColor: isLoading ? '#ccc' : '#264653',
            color: 'white',
            width: '160px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Loading...' : 'Check Weather'}
        </button>
      </div>

      {weatherResults.length > 0 && (
        <div
          id="weather-results-section"
          style={{
            maxWidth: '600px',
            margin: 'auto',
            backgroundColor: '#fff',
            padding: '25px',
            borderRadius: '20px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            textAlign: 'left'
          }}>
          <h2 style={{ color: '#e76f51', marginBottom: '25px', textAlign: 'center' }}>
            {tripName ? `${tripName} - Weather Prediction Results` : 'Weather Prediction Results'}
          </h2>
          {weatherResults.map((result, idx) => (
            <div key={idx} style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
              <h3>{result.place.city}, {result.place.country} - {result.place.date}</h3>
              <div>
                {typeof result.text === 'string'
                  ? formatResponseText(result.text)
                  : Array.isArray(result.text.parts)
                    ? formatResponseText(result.text.parts.map(part => part.text).join(''))
                    : JSON.stringify(result.text)}
              </div>
            </div>
          ))}
          <button
            onClick={handleDownloadPDF}
            style={{
              ...buttonStyle,
              backgroundColor: '#e9c46a',
              color: '#264653',
              marginTop: '20px',
              width: '180px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default App;

WeatherUI = function () {
    this.container = document.getElementById('weatherMain');

    this.init();
    this.createUI();
};

/**
 * Инициализация глобальных переменных
 */
WeatherUI.prototype.init = function() {
window.ERROR_STATUS = false;
};

/**
 * Отправка данных на сервер для формирования запроса на API и получение ответа
 * @param country
 * @param city
 * @returns {any}
 * @constructor
 */
GetData = function (country, city) {
    this.country = country;
    this.city = city;

let idsupof;

    var request = new XMLHttpRequest();
    request.open('GET',window.location.origin + `/getData?country=${this.country}&city=${this.city}`,false);
    request.send();
    if (request.status==200) {
        idsupof = request.response;
    }else if (request.status > 399) {
        window.ERROR_STATUS = true;
        console.log(request.status)
    }
    let parsed = JSON.parse(idsupof);

    return parsed
};

/**
 * Создание интерфейса пользователя
 */
WeatherUI.prototype.createUI = function () {

   let data = GetData('Russia', 'Moscow');

    let inputGroup = document.createElement('div');
    inputGroup.className = 'inputGroup';

    let weatherDataGrop = document.createElement('div');
    weatherDataGrop.className = 'weatherDataGrop';
    weatherDataGrop.id = 'weatherDataGrop';

    let recommendationGroup = document.createElement('div');
    recommendationGroup.className = 'recommendationGroup';
    recommendationGroup.id = 'recommendationGroup';

    new InpGrup(inputGroup, weatherDataGrop, recommendationGroup);
    new WeatherDataGrp(weatherDataGrop, data);
    new RecommendationGrp(recommendationGroup, data);

    this.container.appendChild(inputGroup);
    this.container.appendChild(weatherDataGrop);
    this.container.appendChild(recommendationGroup);
};

/**
 * Создание блока ввода данных пользователем
 * @param ingroup
 * @param weatherDataGrop
 * @param recommendationGroup
 * @constructor
 */
InpGrup = function (ingroup,weatherDataGrop, recommendationGroup) {
    this.ingroup = ingroup;

    let countries = ["Russia","Somaliland","South Georgia and South Sandwich Islands","Somaliland","South Georgia and South Sandwich Islands","French Southern and Antarctic Lands","Palestine","Aland Islands",        "Nauru","Saint Martin","Tokelau","Western Sahara",        "Afghanistan",        "Albania",        "Algeria",        "American Samoa",        "Andorra",        "Angola",        "Anguilla",        "Antigua and Barbuda",        "Argentina",        "Armenia",        "Aruba",        "Australia",        "Austria",        "Azerbaijan",        "Bahamas",        "Bahrain",        "Bangladesh",        "Barbados",        "Belarus",        "Belgium",        "Belize",        "Benin",        "Bermuda",        "Bhutan",        "Bolivia",        "Bosnia and Herzegovina",        "Botswana",        "Brazil",        "British Virgin Islands",        "Brunei Darussalam",        "Bulgaria",        "Burkina Faso",        "Myanmar",        "Burundi",        "Cambodia",        "Cameroon",        "Canada",        "Cape Verde",        "Cayman Islands",        "Central African Republic",        "Chad",        "Chile",        "China",        "Christmas Island",        "Cocos Islands",        "Colombia",        "Comoros",        "Democratic Republic of the Congo",        "Republic of Congo",        "Cook Islands",        "Costa Rica",        "Cote d'Ivoire",        "Croatia",        "Cuba",        "CuraÃ§ao",        "Cyprus",        "Czech Republic",        "Denmark",        "Djibouti",        "Dominica",        "Dominican Republic",        "Ecuador",        "Egypt",        "El Salvador",        "Equatorial Guinea",        "Eritrea",        "Estonia",        "Ethiopia",        "Falkland Islands",        "Faroe Islands",        "Fiji",        "Finland",        "France",        "French Polynesia",        "Gabon",        "The Gambia",        "Georgia",        "Germany",        "Ghana",        "Gibraltar",        "Greece",        "Greenland",        "Grenada",        "Guam",        "Guatemala",        "Guernsey",        "Guinea",        "Guinea-Bissau",        "Guyana",        "Haiti",        "Vatican City",        "Honduras",        "Hungary",        "Iceland",        "India",        "Indonesia",        "Iran",        "Iraq",        "Ireland",        "Isle of Man",        "Israel",        "Italy",        "Jamaica",        "Japan",        "Jersey",        "Jordan",        "Kazakhstan",        "Kenya",        "Kiribati",        "North Korea",        "South Korea",        "Kosovo",        "Kuwait",        "Kyrgyzstan",        "Laos",        "Latvia",        "Lebanon",        "Lesotho",        "Liberia",        "Libya",        "Liechtenstein",        "Lithuania",        "Luxembourg",        "Macedonia",        "Madagascar",        "Malawi",        "Malaysia",        "Maldives",        "Mali",        "Malta",        "Marshall Islands",        "Mauritania",        "Mauritius",        "Mexico",        "Federated States of Micronesia",        "Moldova",        "Monaco",        "Mongolia",        "Montenegro",        "Montserrat",        "Morocco",        "Mozambique",        "Namibia",        "Nepal",        "Netherlands",        "New Caledonia",        "New Zealand",        "Nicaragua",        "Niger",        "Nigeria",        "Niue",        "Norfolk Island",        "Northern Mariana Islands",        "Norway",        "Oman",        "Pakistan",        "Palau",        "Panama",        "Papua New Guinea",        "Paraguay",        "Peru",        "Philippines",        "Pitcairn Islands",        "Poland",        "Portugal",        "Puerto Rico",        "Qatar",        "Romania",        "Russia",        "Rwanda",        "Saint Barthelemy",        "Saint Helena",        "Saint Kitts and Nevis",        "Saint Lucia",        "Saint Pierre and Miquelon",        "Saint Vincent and the Grenadines",        "Samoa",        "San Marino",        "Sao Tome and Principe",        "Saudi Arabia",        "Senegal",        "Serbia",        "Seychelles",        "Sierra Leone",        "Singapore",        "Sint Maarten",        "Slovakia",        "Slovenia",        "Solomon Islands",        "Somalia",        "South Africa",        "South Sudan",        "Spain",        "Sri Lanka",        "Sudan",        "Suriname",        "Svalbard",        "Swaziland",        "Sweden",        "Switzerland",        "Syria",        "Taiwan",        "Tajikistan",        "Tanzania",        "Thailand",        "Timor-Leste",        "Togo",        "Tonga",        "Trinidad and Tobago",        "Tunisia",        "Turkey",        "Turkmenistan",        "Turks and Caicos Islands",        "Tuvalu",        "Uganda",        "Ukraine",        "United Arab Emirates",        "United Kingdom",        "United States",        "Uruguay",        "Uzbekistan",        "Vanuatu",        "Venezuela",        "Vietnam",        "US Virgin Islands",        "Wallis and Futuna",        "Yemen",        "Zambia",        "Zimbabwe",        "US Minor Outlying Islands",        "Antarctica",        "Northern Cyprus",        "Hong Kong",        "Heard Island and McDonald Islands",        "British Indian Ocean Territory",        "Macau"];

    let textColumn = document.createElement('div');
    textColumn.className = 'textColumn';

    let inputColumn = document.createElement('div');
    inputColumn.className = 'inputColumn';

    let buttonColumn = document.createElement('div');
    buttonColumn.className = 'buttonColumn';

    this.ingroup.appendChild(textColumn);
    this.ingroup.appendChild(inputColumn);
    this.ingroup.appendChild(buttonColumn);

    let countryText = document.createElement('p');
    countryText.innerText = 'Страна: ';
    countryText.className = 'inpText';

    let cityText = document.createElement('p');
    cityText.innerText = 'Город: ';
    cityText.className = 'inpText';

    let countryList = document.createElement('select');
    for (let i = 0; i < countries.length; i++) {
        let elm = document.createElement('option');
        elm.value = countries[i];
        elm.innerText = countries[i];

        countryList.appendChild(elm);
    }
    countryList.id = 'countryList';
    countryList.style.width = '75%';
    countryList.style.marginTop = '5px';
    countryList.style.marginBottom = '5px';
    countryList.onchange = function() {
        let elm = document.getElementById('inputCity');
        elm.value = '';
    };

    let inputCity = document.createElement('input');
    inputCity.style.width = '72%';
    inputCity.id = 'inputCity';
    inputCity.value = 'Moscow';

    let btn = document.createElement('button');
    btn.innerText = 'Получить данные';
    btn.style.marginTop = '12px';

    btn.onclick = function() {
       let err = document.getElementsByClassName('errorInfo');
       err[0].style.display = (window.ERROR_STATUS) ? 'block' : 'none';

       let data = GetData(document.getElementById('countryList').value, document.getElementById('inputCity').value);

        let wthrddt = document.getElementById('weatherDataGrop');
        let parent = document.getElementById('weatherMain');
        while (wthrddt.firstChild){
            wthrddt.removeChild(wthrddt.firstChild)
        }
        parent.removeChild(wthrddt);

        WeatherDataGrp(weatherDataGrop, data);
        parent.appendChild(weatherDataGrop);


        let recom = document.getElementById('recommendationGroup');
        while (recom.firstChild){
            recom.removeChild(recom.firstChild)
        }
        parent.removeChild(recom);
        RecommendationGrp(recommendationGroup, data);
        parent.appendChild(recommendationGroup)
    };

    let err = document.createElement('p');
    err.className = 'errorInfo';
    err.style.margin = '0px';
    err.style.fontSize = '12px';
    err.style.color = 'red';
    err.innerText = 'No connection to API!';

    if (!window.ERROR_STATUS){
        err.style.display = 'none'
    }else{
        err.style.display = 'block'
    }

    textColumn.appendChild(countryText);
    textColumn.appendChild(cityText);

    inputColumn.appendChild(countryList);
    inputColumn.appendChild(inputCity);

    buttonColumn.appendChild(btn);
    buttonColumn.appendChild(err);
};

/**
 * Создание блока отображения информации о погоде
 * @param weatherDataGroup
 * @param data
 * @constructor
 */
WeatherDataGrp = function (weatherDataGroup, data) {
    this.weatherGroup = weatherDataGroup;

    let currentBlock = document.createElement('div');
    currentBlock.className = 'currentBlock';

    new CurrentInfoConstructor(currentBlock, data);

    this.weatherGroup.appendChild(currentBlock);

    let morningInfo = document.createElement('div');
    morningInfo.className = 'morningInfo';
    
    let mrnInfo = function (morningInfo) {
        this.morningInfo = morningInfo;

        let titl = document.createElement('p');
        titl.innerText = 'Утро';
        titl.align = 'center';
        titl.style.margin = '5px';
        titl.style.fontSize = '14px';
        this.morningInfo.appendChild(titl);

        let img = document.createElement('img');
        img.src = `http://openweathermap.org/img/wn/${data.morning.icon}.png`;
        img.width = 50;
        img.height = 50;
        img.style.float = 'left';
        this.morningInfo.appendChild(img);

        let temp = document.createElement('p');
        temp.innerText = `${Math.round(data.morning.temp)} °C`;
        temp.style.fontSize = '18px';
        this.morningInfo.appendChild(temp);

        let feelLike = document.createElement('p');
        feelLike.innerText = `Ощущается: ${Math.round(data.morning.feels_like)} °C`;
        feelLike.style.margin = '5px';
        this.morningInfo.appendChild(feelLike);

        let clouds = document.createElement('p');
        clouds.innerText = `${data.morning.description}`;
        clouds.style.margin = '5px';
        this.morningInfo.appendChild(clouds);

        let pressure = document.createElement('p');
        pressure.innerText = `Давление: ${Math.round(data.morning.pressure/1.333)} мм рт.ст.`;
        pressure.style.margin = '0px';
        this.morningInfo.appendChild(pressure);

        let wind_letter;
        if(data.morning.wind_deg > 312 && data.morning.wind_deg < 45){wind_letter = 'C'}else if(data.morning.wind_deg > 0 && data.morning.wind_deg < 90){wind_letter = 'СВ'}
        else if (data.morning.wind_deg > 45 && data.morning.wind_deg < 135){wind_letter = 'В'}else if (data.morning.wind_deg > 90 && data.morning.wind_deg < 180){wind_letter = 'ЮВ'}
        else if(data.morning.wind_deg > 135 && data.morning.wind_deg < 225){wind_letter = 'Ю'}else if (data.morning.wind_deg > 180 && data.morning.wind_deg < 270){wind_letter = 'ЮЗ'}
        else {wind_letter = 'З'}

        let wind = document.createElement('p');
        wind.innerText = `Ветер: ${data.morning.wind_speed} м/с ${wind_letter}`;
        wind.style.margin = '5px';
        this.morningInfo.appendChild(wind);
    };

    mrnInfo(morningInfo);
    
    this.weatherGroup.appendChild(morningInfo);

    let dayInfo = document.createElement('div');
    dayInfo.className = 'dayInfo';

    let dInfo = function (dayInfo) {
        this.dayInfo = dayInfo;

        let titl = document.createElement('p');
        titl.innerText = 'День';
        titl.align = 'center';
        titl.style.margin = '5px';
        titl.style.fontSize = '14px';
        this.dayInfo.appendChild(titl);

        let img = document.createElement('img');
        img.src = `http://openweathermap.org/img/wn/${data.day.icon}.png`;
        img.width = 50;
        img.height = 50;
        img.style.float = 'left';
        this.dayInfo.appendChild(img);

        let temp = document.createElement('p');
        temp.innerText = `${Math.round(data.day.temp)} °C`;
        temp.style.fontSize = '18px';
        this.dayInfo.appendChild(temp);

        let feelLike = document.createElement('p');
        feelLike.innerText = `Ощущается: ${Math.round(data.day.feels_like)} °C`;
        feelLike.style.margin = '5px';
        this.dayInfo.appendChild(feelLike);

        let clouds = document.createElement('p');
        clouds.innerText = `${data.day.description}`;
        clouds.style.margin = '5px';
        this.dayInfo.appendChild(clouds);

        let pressure = document.createElement('p');
        pressure.innerText = `Давление: ${Math.round(data.day.pressure/1.333)} мм рт.ст.`;
        pressure.style.margin = '2px';
        this.dayInfo.appendChild(pressure);

        let wind_letter;
        if(data.day.wind_deg > 312 && data.day.wind_deg < 45){wind_letter = 'C'}else if(data.day.wind_deg > 0 && data.day.wind_deg < 90){wind_letter = 'СВ'}
        else if (data.day.wind_deg > 45 && data.day.wind_deg < 135){wind_letter = 'В'}else if (data.day.wind_deg > 90 && data.day.wind_deg < 180){wind_letter = 'ЮВ'}
        else if(data.day.wind_deg > 135 && data.day.wind_deg < 225){wind_letter = 'Ю'}else if (data.day.wind_deg > 180 && data.day.wind_deg < 270){wind_letter = 'ЮЗ'}
        else {wind_letter = 'З'}

        let wind = document.createElement('p');
        wind.innerText = `Ветер: ${data.day.wind_speed} м/с ${wind_letter}`;
        wind.style.margin = '5px';
        this.dayInfo.appendChild(wind);
    };

    dInfo(dayInfo);

    this.weatherGroup.appendChild(dayInfo);

    let eveningInfo = document.createElement('div');
    eveningInfo.className = 'eveningInfo';

    let evnInfo = function (eveningInfo) {
        this.eveningInfo = eveningInfo;

        let titl = document.createElement('p');
        titl.innerText = 'Вечер';
        titl.align = 'center';
        titl.style.margin = '5px';
        titl.style.fontSize = '14px';
        this.eveningInfo.appendChild(titl);

        let img = document.createElement('img');
        img.src = `http://openweathermap.org/img/wn/${data.evening.icon}.png`;
        img.width = 50;
        img.height = 50;
        img.style.float = 'left';
        this.eveningInfo.appendChild(img);

        let temp = document.createElement('p');
        temp.innerText = `${Math.round(data.evening.temp)} °C`;
        temp.style.fontSize = '18px';
        this.eveningInfo.appendChild(temp);

        let feelLike = document.createElement('p');
        feelLike.innerText = `Ощущается: ${Math.round(data.evening.feels_like)} °C`;
        feelLike.style.margin = '5px';
        this.eveningInfo.appendChild(feelLike);

        let clouds = document.createElement('p');
        clouds.innerText = `${data.evening.description}`;
        clouds.style.margin = '5px';
        this.eveningInfo.appendChild(clouds);

        let pressure = document.createElement('p');
        pressure.innerText = `Давление: ${Math.round(data.evening.pressure/1.333)} мм рт.ст.`;
        pressure.style.margin = '2px';
        this.eveningInfo.appendChild(pressure);

        let wind_letter;
        if(data.evening.wind_deg > 312 && data.evening.wind_deg < 45){wind_letter = 'C'}else if(data.evening.wind_deg > 0 && data.evening.wind_deg < 90){wind_letter = 'СВ'}
        else if (data.evening.wind_deg > 45 && data.evening.wind_deg < 135){wind_letter = 'В'}else if (data.evening.wind_deg > 90 && data.evening.wind_deg < 180){wind_letter = 'ЮВ'}
        else if(data.evening.wind_deg > 135 && data.evening.wind_deg < 225){wind_letter = 'Ю'}else if (data.evening.wind_deg > 180 && data.evening.wind_deg < 270){wind_letter = 'ЮЗ'}
        else {wind_letter = 'З'}

        let wind = document.createElement('p');
        wind.innerText = `Ветер: ${data.evening.wind_speed} м/с ${wind_letter}`;
        wind.style.margin = '5px';
        this.eveningInfo.appendChild(wind);
    };

    evnInfo(eveningInfo);

    this.weatherGroup.appendChild(eveningInfo);

    let nightInfo = document.createElement('div');
    nightInfo.className = 'nightInfo';

    let nInfo = function (nightInfo) {
        this.nightInfo = nightInfo;

        let titl = document.createElement('p');
        titl.innerText = 'Ночь';
        titl.align = 'center';
        titl.style.margin = '5px';
        titl.style.fontSize = '14px';
        this.nightInfo.appendChild(titl);

        let img = document.createElement('img');
        img.src = `http://openweathermap.org/img/wn/${data.night.icon}.png`;
        img.width = 50;
        img.height = 50;
        img.style.float = 'left';
        this.nightInfo.appendChild(img);

        let temp = document.createElement('p');
        temp.innerText = `${Math.round(data.night.temp)} °C`;
        temp.style.fontSize = '18px';
        this.nightInfo.appendChild(temp);

        let feelLike = document.createElement('p');
        feelLike.innerText = `Ощущается: ${Math.round(data.night.feels_like)} °C`;
        feelLike.style.margin = '5px';
        this.nightInfo.appendChild(feelLike);

        let clouds = document.createElement('p');
        clouds.innerText = `${data.night.description}`;
        clouds.style.margin = '5px';
        this.nightInfo.appendChild(clouds);

        let pressure = document.createElement('p');
        pressure.innerText = `Давление: ${Math.round(data.night.pressure/1.333)} мм рт.ст.`;
        pressure.style.margin = '2px';
        this.nightInfo.appendChild(pressure);

        let wind_letter;
        if(data.night.wind_deg > 312 && data.night.wind_deg < 45){wind_letter = 'C'}else if(data.night.wind_deg > 0 && data.night.wind_deg < 90){wind_letter = 'СВ'}
        else if (data.night.wind_deg > 45 && data.night.wind_deg < 135){wind_letter = 'В'}else if (data.night.wind_deg > 90 && data.night.wind_deg < 180){wind_letter = 'ЮВ'}
        else if(data.night.wind_deg > 135 && data.night.wind_deg < 225){wind_letter = 'Ю'}else if (data.night.wind_deg > 180 && data.night.wind_deg < 270){wind_letter = 'ЮЗ'}
        else {wind_letter = 'З'}

        let wind = document.createElement('p');
        wind.innerText = `Ветер: ${data.night.wind_speed} м/с ${wind_letter}`;
        wind.style.margin = '5px';
        this.nightInfo.appendChild(wind);
    };

    nInfo(nightInfo);

    this.weatherGroup.appendChild(nightInfo);
};

CurrentInfoConstructor = function (currentBlock, data) {
    this.currentBlock = currentBlock;

    let leftGroup = document.createElement('div');
    leftGroup.className = 'currentLeftGroup';

    let img = document.createElement('img');
    img.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
    img.height = 100;
    img.width = 100;
    img.style.float = 'left';
    leftGroup.appendChild(img);

    let temp = document.createElement('p');
    temp.innerText = `${Math.round(data.temp)} °C`;
    temp.style.fontSize = '22px';
    temp.style.margin = '10px';
    leftGroup.appendChild(temp);

    let feelLike = document.createElement('p');
    feelLike.innerText = `Ощущается:\n ${Math.round(data.feels_like)}°C`;
    feelLike.style.fontSize = '14px';
    leftGroup.appendChild(feelLike);

    this.currentBlock.appendChild(leftGroup);

    let centralGroup = document.createElement('div');
    centralGroup.className = 'currentCentralGroup';

    let descript = document.createElement('p');
    descript.innerText = `${data.description}`;
    descript.style.margin = '5px';
    centralGroup.appendChild(descript);

    let pressure = document.createElement('p');
    pressure.innerText = `Давление: ${Math.round(data.pressure/1.333)} mmHg`;
    pressure.style.margin = '5px';
    centralGroup.appendChild(pressure);

    let humidity = document.createElement('p');
    humidity.innerText = `Влажность: ${data.humidity}%`;
    humidity.style.margin = '5px';
    centralGroup.appendChild(humidity);

    let dewPoint = document.createElement('p');
    dewPoint.innerText = `Т. росы: ${data.dew_point}°`;
    dewPoint.style.margin = '5px';
    centralGroup.appendChild(dewPoint);

    this.currentBlock.appendChild(centralGroup);

    let rightGroup = document.createElement('div');
    rightGroup.className = 'currentRightGroup';

    let uvi = document.createElement('p');
    uvi.innerText = `УФ индекс: ${data.uvi}`;
    uvi.style.margin = '5px';
    rightGroup.appendChild(uvi);

    let visibility = document.createElement('p');
    visibility.innerText = `Видимость: ${(data.visibility > 1000) ? Math.round(data.visibility/1000) + 'км' : data.visibility + 'м'}`;
    visibility.style.marginLeft = '5px';
    visibility.style.marginBottom = '10px';
    visibility.style.marginTop = '10px';
    rightGroup.appendChild(visibility);

    let wind_letter;
    if(data.wind_deg > 312 && data.wind_deg < 45){wind_letter = 'C'}else if(data.wind_deg > 0 && data.wind_deg < 90){wind_letter = 'СВ'}
    else if (data.wind_deg > 45 && data.wind_deg < 135){wind_letter = 'В'}else if (data.wind_deg > 90 && data.wind_deg < 180){wind_letter = 'ЮВ'}
    else if(data.wind_deg > 135 && data.wind_deg < 225){wind_letter = 'Ю'}else if (data.wind_deg > 180 && data.wind_deg < 270){wind_letter = 'ЮЗ'}
    else {wind_letter = 'З'}

    let windSpeed = document.createElement('p');
    windSpeed.innerText = `Ветер: ${data.wind_speed} м/с ${wind_letter}`;
    windSpeed.style.marginLeft = '5px';
    windSpeed.style.marginTop = '10px';

    rightGroup.appendChild(windSpeed);

    this.currentBlock.appendChild(rightGroup);
};

/**
 * Создание блока реккомендаций по выбору одежды
 * @param recommendationGroup
 * @param data
 * @constructor
 */
RecommendationGrp = function (recommendationGroup, data) {
    let texxt = ReccomendInfo(data);

    this.recommendationGroup = recommendationGroup;

    let head = document.createElement('h4');
    head.innerText = 'Реккомендации по одежде';
    this.recommendationGroup.appendChild(head);

    let descript = document.createElement('p');
    descript.innerText = texxt;
        descript.style.margin = '3px';
    this.recommendationGroup.appendChild(descript);
};

/**
 * Функция по выборы реккомендаций для одежды
 * @param data
 * @returns {string}
 * @constructor
 */
ReccomendInfo = function (data) {

    let recomText;

    if (data.morning.temp > 15 && data.day.temp > 20 && data.evening.temp > 15 && data.night.temp > 15)
    { if ((data.morning.icon == '01d' || '02d' || '03d') && (data.day.icon == '01d' || '02d' || '03d') && (data.evening.icon == '01d' || '02d' || '03d') && (data.night.icon == '01n' || '02n' || '03n')){
        recomText = 'Сегодня реккомендуем надеть Вам что-нибудь лёгкое, ибо ожидается хорошая погода без дождя.'
    }else if (data.morning.icon == '11d' || data.day.icon == '11d' || data.evening.icon == '11d' || data.night.icon == '11n'){
        recomText = 'Ожидается гроза. Не забудьте взять зонтик и реккомендуем надеть непромокаему обувь. Будьте осторожны на улице!'
    }else {
        recomText = 'Ожидаются осадки. Не забудьте взять с собой зонтик. Так же было бы неплохо взять соответствующую обувь, но кто знает, может быть Вам доставляет радость бегать по лужам :)'
    }
    } else if (data.morning.temp > 5  && data.day.temp > 15 && data.evening.temp > 5 && data.night.temp > 5){
        if ((data.morning.icon == '01d' || '02d' || '03d') && (data.day.icon == '01d' || '02d' || '03d') && (data.evening.icon == '01d' || '02d' || '03d') && (data.night.icon == '01n' || '02n' || '03n')){
            recomText = 'Сегодня может быть прохладно, но без осадков. Не забудьте взять с собой легкую куртку.'
        }else if (data.morning.icon == '11d' || data.day.icon == '11d' || data.evening.icon == '11d' || data.night.icon == '11n'){
            recomText = 'Ожидается гроза. Не забудьте взять зонтик и реккомендуем надеть сапоги. Будьте осторожны на улице!'
        }else {
            recomText = 'Ожидаются осадки. Не забудьте взять с собой зонтик. Так же сегодня может быть прохладно, так что советуем взять с собой непромокаемую куртку.'
        }
    } else if (data.morning.temp < 0 && data.day.temp < 5 && data.evening.temp < 0 && data.night.temp < 0){
        if ((data.morning.icon == '01d' || '02d' || '03d') && (data.day.icon == '01d' || '02d' || '03d') && (data.evening.icon == '01d' || '02d' || '03d') && (data.night.icon == '01n' || '02n' || '03n')){
            recomText = 'Советуем надеть куртку потеплее. Не забудьте про шапку, которая убережет Ваш ценный ум от холода.'
        }else if (data.morning.icon == '11d' || data.day.icon == '11d' || data.evening.icon == '11d' || data.night.icon == '11n'){
            recomText = 'Ожидается гроза. Совсем неподходящая погода для прогулок, однако если Вам все же необходимо выйти.'
        }else {
            recomText = 'Ожидаются осадки. Оденьтесь потеплее, а так же не забудьте про шапку и шарф.'
        }
    } else if (data.temp > 20 && (data.icon == '01d' || '02d' || '03d' || '01n' || '02n' || '03n')){
        recomText = 'Сегодня реккомендуем надеть Вам что-нибудь лёгкое, ибо ожидается хорошая погода без дождя.'
    } else if (data.temp > 20 && (data.icon != '01d' || '02d' || '03d' || '01n' || '02n' || '03n')){
        recomText = 'Ожидаются осадки. Не забудьте взять с собой зонтик. Так же было бы неплохо взять соответствующую обувь.'
    } else if (data.temp < 20 && data.temp > 10 && (data.icon == '01d' || '02d' || '03d' || '04d' || '01n' || '02n' || '03n' || '04n')){
        recomText = 'Возьмите с собой накидку или толстовку, на улице может быть холодновато.'
    } else if (data.temp < 20 && data.temp > 10 && (data.icon != '01d' || '02d' || '03d' || '04d' || '01n' || '02n' || '03n' || '04n')){
        recomText = 'Возьмите с собой легкую куртку и не забудьте про непромокаемую обувь. Так же не забудьте про зонтик'
    } else if (data.temp < 10 && data.temp > 0 && (data.icon != '01d' || '02d' || '03d' || '04d' || '01n' || '02n' || '03n' || '04n')){
        recomText = 'Возьмите куртку. Так же непомешает закрытая обувь и шапка. Может быть прохладно'
    } else if (data.temp < 10 && data.temp > 0 && (data.icon == '01d' || '02d' || '03d' || '04d' || '01n' || '02n' || '03n' || '04n')){
        recomText = 'Возьмите с собой куртку, погода ясная но прохладная.'
    } else if (data.temp < 0  && (data.icon == '01d' || '02d' || '03d' || '04d' || '01n' || '02n' || '03n' || '04n')){
        recomText = 'Одевайтесь тепло. Самое время для шапки и шарфа.'
    } else if (data.temp < 0 && (data.icon != '01d' || '02d' || '03d' || '04d' || '01n' || '02n' || '03n' || '04n' )){
        recomText = 'Не самая приятная погода для прогулок. Не забудьте тепло одеться. Шапка и шарф ваши друзья на сегодня.'
    } else { recomText = 'Увы для текущих погодных условий не можем ничего предложить.'}

    return recomText
};
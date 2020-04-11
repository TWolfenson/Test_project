package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"os"
	"time"
)

type Capitals struct {
	CountryName string `json:"CountryName"`
	CapitalName string `json:"CapitalName"`
	CapitalLatitude string `json:"CapitalLatitude"`
	CapitalLongitude string `json:"CapitalLongitude"`
	CountryCode string `json:"CountryCode"`
	ContinentName string `json:"ContinentName"`
}

type Weather struct {
	Id int `json:"id"`
	Main string `json:"main"`
	Description string `json:"description"`
	Icon string `json:"icon"`
}

type Current struct {
	Dt int64 `json:"dt"`
	Sunrise uint `json:"sunrise"`
	Sunset uint `json:"sunset"`
	Temp float64 `json:"temp"`
	FeelsLike float64 `json:"feels_like"`
	Pressure int `json:"pressure"`
	Humidity int `json:"humidity"`
	DewPoint float64 `json:"dew_point"`
	Uvi float64 `json:"uvi"`
	Clouds int `json:"clouds"`
	Visibility int `json:"visibility"`
	WindSpeed float64 `json:"wind_speed"`
	WindDeg int `json:"wind_deg"`
	Weather []Weather `json:"weather"`
}

type Rain struct {
	Hour float64 `json:"1h"`
}

type Hourly struct {
	Dt int64 `json:"dt"`
	Temp float64 `json:"temp"`
	FeelsLike float64 `json:"feels_like"`
	Pressure int `json:"pressure"`
	Humidity int `json:"humidity"`
	DewPoint float64 `json:"dew_point"`
	Clouds int `json:"clouds"`
	WindSpeed float64 `json:"wind_speed"`
	WindDeg int `json:"wind_deg"`
	Weather []Weather `json:"weather"`
	Rain Rain `json:"rain"`
} 

type Answer struct {
	Lat float64 `json:"lat"`
	Lon float64 `json:"lon"`
	Timezone string `json:"timezone"`
	Current Current `json:"current"`
	Hourly []Hourly `json:"hourly"`
}

type DayPart struct {
	Temp float64 `json:"temp"`
	FeelsLike float64 `json:"feels_like"`
	Description string `json:"description"`
	Pressure int `json:"pressure"`
	WindSpeed float64 `json:"wind_speed"`
	WindDeg int `json:"wind_deg"`
	Icon string `json:"icon"`
}

type Respon struct {
	Temp float64 `json:"temp"`
	FeelsLike float64 `json:"feels_like"`
	Description string `json:"description"`
	Pressure int `json:"pressure"`
	Humidity int `json:"humidity"`
	DewPoint float64 `json:"dew_point"`
	Uvi float64 `json:"uvi"`
	Visibility int `json:"visibility"`
	WindSpeed float64 `json:"wind_speed"`
	WindDeg int `json:"wind_deg"`
	Icon string `json:"icon"`
	Morning DayPart `json:"morning"`
	Day DayPart `json:"day"`
	Evening DayPart `json:"evening"`
	Night DayPart `json:"night"`
}

func main()  {

	ip, err := externalIP()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(ip)

	server := http.Server{
		Addr:    ip + ":7990",
		Handler: nil,
	}

	fs := http.FileServer(http.Dir("./statics/"))
	http.Handle("/statics/", http.StripPrefix("/statics/", fs))
	http.HandleFunc("/getData", getData)

	server.ListenAndServe()
}

/*
Получение данных и генерация ответа клиенту
 */
func getData(w http.ResponseWriter, r *http.Request)  {

	country := r.URL.Query().Get("country")
	city := r.URL.Query().Get("city")

	fmt.Println(city, country)

	var lat, log string

	cityArr := getCapitalsData()

	for i := range cityArr {
		if cityArr[i].CountryName == country {
			if cityArr[i].CapitalName == city{
				lat = cityArr[i].CapitalLatitude
				log = cityArr[i].CapitalLongitude
			}
		}
	}

	var response Respon

	apiAnswer := APICall(lat, log)

	response.Temp = apiAnswer.Current.Temp
	response.FeelsLike = apiAnswer.Current.FeelsLike
	response.Description = apiAnswer.Current.Weather[0].Description
	response.Pressure = apiAnswer.Current.Pressure
	response.Humidity = apiAnswer.Current.Humidity
	response.DewPoint = apiAnswer.Current.DewPoint
	response.Uvi = apiAnswer.Current.Uvi
	response.Visibility = apiAnswer.Current.Visibility
	response.WindSpeed = apiAnswer.Current.WindSpeed
	response.WindDeg = apiAnswer.Current.WindDeg
	response.Icon = apiAnswer.Current.Weather[0].Icon

	var timeDCheck = time.Unix(apiAnswer.Current.Dt, 0)

	for i := 0; i < 24; i++ {
		var timeUTC = time.Unix(apiAnswer.Hourly[i].Dt, 0)
		local := timeUTC
		location, err := time.LoadLocation(apiAnswer.Timezone)
		if err == nil {
			local = local.In(location)
		}

		localD := timeDCheck
		locationD, err := time.LoadLocation(apiAnswer.Timezone)
		if err == nil {
			localD = localD.In(locationD)
		}

		if local.Hour() == 8 {
			fmt.Println(local)
			response.Morning.Temp = apiAnswer.Hourly[i].Temp
			response.Morning.FeelsLike = apiAnswer.Hourly[i].FeelsLike
			response.Morning.Description = apiAnswer.Hourly[i].Weather[0].Description
			response.Morning.Pressure = apiAnswer.Hourly[i].Pressure
			response.Morning.WindSpeed = apiAnswer.Hourly[i].WindSpeed
			response.Morning.WindDeg = apiAnswer.Hourly[i].WindDeg
			response.Morning.Icon = apiAnswer.Hourly[i].Weather[0].Icon
		} else if local.Hour() == 12 {
			fmt.Println(local)
			response.Day.Temp = apiAnswer.Hourly[i].Temp
			response.Day.FeelsLike = apiAnswer.Hourly[i].FeelsLike
			response.Day.Description = apiAnswer.Hourly[i].Weather[0].Description
			response.Day.Pressure = apiAnswer.Hourly[i].Pressure
			response.Day.WindSpeed = apiAnswer.Hourly[i].WindSpeed
			response.Day.WindDeg = apiAnswer.Hourly[i].WindDeg
			response.Day.Icon = apiAnswer.Hourly[i].Weather[0].Icon
		} else if local.Hour() == 18 {
			fmt.Println(local)
			response.Evening.Temp = apiAnswer.Hourly[i].Temp
			response.Evening.FeelsLike = apiAnswer.Hourly[i].FeelsLike
			response.Evening.Description = apiAnswer.Hourly[i].Weather[0].Description
			response.Evening.Pressure = apiAnswer.Hourly[i].Pressure
			response.Evening.WindSpeed = apiAnswer.Hourly[i].WindSpeed
			response.Evening.WindDeg = apiAnswer.Hourly[i].WindDeg
			response.Evening.Icon = apiAnswer.Hourly[i].Weather[0].Icon
		}else if local.Hour() == 23 {
			fmt.Println(local)
			response.Night.Temp = apiAnswer.Hourly[i].Temp
			response.Night.FeelsLike = apiAnswer.Hourly[i].FeelsLike
			response.Night.Description = apiAnswer.Hourly[i].Weather[0].Description
			response.Night.Pressure = apiAnswer.Hourly[i].Pressure
			response.Night.WindSpeed = apiAnswer.Hourly[i].WindSpeed
			response.Night.WindDeg = apiAnswer.Hourly[i].WindDeg
			response.Night.Icon = apiAnswer.Hourly[i].Weather[0].Icon
		}
	}

	resp, err := json.Marshal(response)
	if err != nil {
		fmt.Println(err)
	}

	w.Write(resp)
}

/*
Вызов API погоды и парсинг ответа
 */
func APICall(lat, log string) Answer {
	resp, err := http.Get("http://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+log+"&lang=ru&units=metric&appid=dd46ed86405a20093964a210953d45ff")
	if err != nil {
		fmt.Println(err)
	}
	defer resp.Body.Close()
    ansver := Answer{}

    jsonFile, _ := ioutil.ReadAll(resp.Body)

	/*jsonFile, err := os.Open("tessst.json")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successful opened")
	defer jsonFile.Close()*/

	//byteArr, _ := ioutil.ReadAll(jsonFile)

	json.Unmarshal(jsonFile, &ansver)

	return ansver
}

/*
Получение данных о сранах и столицах
 */
func getCapitalsData() []Capitals {
	jsonFile, err := os.Open("country-capitals.json")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successful opened")
	defer jsonFile.Close()

	byteArr, _ := ioutil.ReadAll(jsonFile)

	capitals := make([]Capitals, 200)

	json.Unmarshal(byteArr, &capitals)

	return capitals
}

/**
Получение IP адреса сервера
 */
func externalIP() (string, error) {
	ifaces, err := net.Interfaces()
	if err != nil {
		return "", err
	}
	for _, iface := range ifaces {
		if iface.Flags&net.FlagUp == 0 {
			continue // interface down
		}
		if iface.Flags&net.FlagLoopback != 0 {
			continue // loopback interface
		}
		addrs, err := iface.Addrs()
		if err != nil {
			return "", err
		}
		for _, addr := range addrs {
			var ip net.IP
			switch v := addr.(type) {
			case *net.IPNet:
				ip = v.IP
			case *net.IPAddr:
				ip = v.IP
			}
			if ip == nil || ip.IsLoopback() {
				continue
			}
			ip = ip.To4()
			if ip == nil {
				continue // not an ipv4 address
			}
			return ip.String(), nil
		}
	}
	return "", errors.New("Are you connected to the network?")
}

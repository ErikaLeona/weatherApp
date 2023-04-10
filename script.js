const currentWeatherItems=document.getElementById('current-weather-info');
const days=["Duminică", "Luni","Marți","Miercuri","Joi","Vineri","Sâmbătă"]
const months=["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie",
    "Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"];

//Calcularea zilei urmatoare
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay()-7;
    }
    else{
        return day + d.getDay();
    }
}

function GetInfo() {
    

    var newName = document.getElementById("cityInput");

    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&units=metric&appid=32ba0bfed592484379e51106cef3f204')
    .then(response => response.json())
    .then(data => {

    //Date curente
        const date=data.list[0].dt_txt.slice(5,10);
        const month=date[1];
        
        document.getElementById("date").innerHTML = days[CheckDay(0)]+ ', '+ date.slice(-2)+' '+months[month-1];
        document.getElementById("temperature").innerHTML = Number(data.list[0].main.temp).toFixed(0)+ "&#176;C";
        document.getElementById("humidity").innerHTML = Number(data.list[0].main.humidity).toFixed(0)+ "%";
        document.getElementById("pressure").innerHTML = Number(data.list[0].main.pressure).toFixed(0)+ "mmHg";
        document.getElementById("wind").innerHTML = Number(data.list[0].wind.speed).toFixed(0)+ "km/h";

        //Vreme pe ore
        for(i = 0; i<8; i++){
            document.getElementById("dayHour" + (i+1)).innerHTML = "Ora: " + data.list[i].dt_txt.slice(-8,-3);
            document.getElementById("imghour" + (i+1)).src = "http://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+".png";
            document.getElementById("dayTemp" + (i+1)).innerHTML = "Temperatura: " + Number(data.list[i].main.temp).toFixed(0)+ "&#176;C";
        }
        
        //Valori maxime si minime 
        for(i = 0; i<5; i++){
            for(j=0;j<40;j++){
                if(data.list[i].dt_txt.slice(-11,-9)<data.list[j].dt_txt.slice(-11,-9)){
                    document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[j].main.temp_max ).toFixed(0)+ "&#176;C";
                    document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min ).toFixed(0)+ "&#176;C";
                    document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+data.list[j].weather[0].icon+".png";
                }  
                    
            }        
        }  
        console.log(data);
          
    })
    .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
}


function DefaultScreen(){
    document.getElementById("cityInput").defaultValue = "cluj-napoca";
    GetInfo();
}

document
    .querySelector("#cityInput")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        GetInfo();
      }
    });

//Getting and displaying the text for the upcoming five days of the week
var d = new Date();



for(i = 0; i<5; i++){
    document.getElementById("day" + (i+1)).innerHTML = days[CheckDay(i)];
}
   

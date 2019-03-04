
class AjaxWheather{
    constructor(){
        this.apiKey='493b7d53afcc6b3fdb01f3e40d09e743';
    }
    async getWheather(city){
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}&units=metric`;
        const wheatherData = await fetch(url);
        const wheather = await wheatherData.json();
        return wheather;
    }
}

class Display{
    constructor(){
        this.results = document.querySelector('.results');
        this.cityName = document.getElementById('cityName');
        this.cityCountry = document.getElementById('cityCountry');
        this.cityIcon = document.getElementById('cityIcon');
        this.cityTemp = document.getElementById('cityTemp');
        this.cityHumidity = document.getElementById('cityHumidity');
    }
    showWheather(data){
        console.log(data);
        const {name, sys:{country},main:{temp, humidity}}=data;
        const {icon} = data.weather[0];

        this.results.classList.add('showItem');
        this.cityName.textContent = name;
        this.cityCountry.textContent=country;
        this.cityTemp.textContent=temp;
        this.cityHumidity.textContent=humidity;
        this.cityIcon.src=`http://openweathermap.org/img/w/${icon}.png`;
    }   
}

(function(){
    const form = document.getElementById('wheatherForm');
    const cityInput = document.getElementById('cityInput');
    const feedback = document.querySelector('.feedback');

    //class

    const ajax = new AjaxWheather();
    const display = new Display();

    form.addEventListener('submit', event=>{
        event.preventDefault();
        const city =cityInput.value;

        if(city.length === 0){
            showFeedback('City value cannot be empty');
        }else{
            ajax.getWheather(city).then(data=>{
                if(data.message === 'city not found'){
                    showFeedback('City not found');
                } else {
                    display.showWheather(data);
                }
            });
        }
    });
    

    function showFeedback(text){
        feedback.classList.add('showItem');
        feedback.innerHTML=`<p>${text}</p>`;
        setTimeout(()=>{
            feedback.classList.remove('showItem');
        },3000);
    }
})();
// Get the data from api.
const phonesData = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await response.json();
    const mainData = data.data;
    console.log(mainData);


    phoneData(mainData);
}




// iterate the mainData for individual data.
const phoneData = (mainData) => {
    mainData.forEach(phoneData => {

        showDataInUI(phoneData);
    });
}



// Show this individual data in UI,
const showDataInUI = (phoneData) => {
    const phoneContainer = document.getElementById('phone_container');
    
}



phonesData();
// Get the data from api.
const phonesData = async (inputText) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`);
    const data = await response.json();
    let mainData = data.data;

    // Show the Show All button for specific number of phone show.
    const showAllButton = document.getElementById('show_all_button_section');

    if (mainData.length > 6) {
        showAllButton.classList.remove('hidden');
    }
    else {
        showAllButton.classList.add('hidden');
    }



    // For show specific number of phone on UI.
    mainData = mainData.slice(0, 6);



    phoneData(mainData);
}




// iterate the mainData for individual data.
const phoneData = (mainData) => {

    // For empty the content every time.
    const phoneContainer = document.getElementById('phone_container');
    phoneContainer.textContent = '';

    mainData.forEach(phoneData => {

        showDataInUI(phoneData);
    });
}



// Show this individual data in UI,
const showDataInUI = (phoneData) => {
    const phoneContainer = document.getElementById('phone_container');

    const phoneDiv = document.createElement('div');
    phoneDiv.setAttribute("card", "p-0", "lg:p-[1.5625em]", "bg-base-100", "border");

    phoneDiv.innerHTML = `
    <figure class="px-1 lg:px-[3.25em] py-8 lg:py-10 bg-bgColor01 rounded-xl ">
        <div class="w-[13.75em] h-[15.25em] flex justify-center items-center">
            <img src="${phoneData.image}"
                class="rounded-xl" />
        </div>
    </figure>
    <div class="card-body p-4 items-center text-center mt-[1.5625em]">
        <h2 class="card-title mb-5 text-[1.5625em] text-dark02 poppins-bold">${phoneData.phone_name}</h2>
        <p class="text-lg poppins-regular text-commonTextColor mb-2">This is Iphone 13 Pro Max. It's
            one of the best mobile phone. It's looking great.</p>
        <p class="mb-4 text-dark02 text-[1.5625em] poppins-bold">$999</p>
        <div class="card-actions">
            <button
                class="btn flex-nowrap h-auto bg-buttonBgColor text-whiteColor px-[.5em] sm:px-[1em] lg:px-[1.5625em] py-[.5em] sm:py-[.5em] lg:py-[0.5625em] text-[.8em] md:text-[1em] lg:text-[1.25em] poppins-semibold">Show
                Details</button>
        </div>
    </div>
    `

    

    phoneContainer.appendChild(phoneDiv);
}




// Get the input text and set it on search button.
const getInputText = () => {
    const inputField = document.getElementById('input_text_field');
    const inputText = inputField.value;

    phonesData(inputText);

    loading();
}



// Loading spinner.
const loading = () => {
    const loadingSpinnerSection = document.getElementById('loading_spinner_section');
    loadingSpinnerSection.classList.remove('hidden');
}


phonesData();
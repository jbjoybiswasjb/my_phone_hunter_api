// Get the data from api.
const phonesData = async (inputText, isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`);
    const data = await response.json();
    let mainData = data.data;

    // Show the Show All button for specific number of phone show.
    const showAllButton = document.getElementById('show_all_button_section');

    if (mainData.length > 8 && !isShowAll) {
        showAllButton.classList.remove('hidden');
    }
    else {
        showAllButton.classList.add('hidden');
    }



    // For show specific number of phone on UI.
    if (!isShowAll) {
        mainData = mainData.slice(0, 6);
    }



    phoneData(mainData);
}




// iterate the mainData for individual data.
const phoneData = (mainData) => {

    // Clear phone container before adding new search results.
    const phoneContainer = document.getElementById('phone_container');
    phoneContainer.textContent = '';

    mainData.forEach(phoneData => {

        showDataInUI(phoneData);

        // For stop spinner after loading data.
        loading(false);

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
            <img src="${phoneData?.image}"
                class="rounded-xl" />
        </div>
    </figure>
    <div class="card-body p-4 items-center text-center mt-[1.5625em]">
        <h2 class="card-title mb-5 text-[1.5625em] text-dark02 poppins-bold">${phoneData?.phone_name}</h2>
        <p class="text-lg poppins-regular text-commonTextColor mb-2">This is Iphone 13 Pro Max. It's
            one of the best mobile phone. It's looking great.</p>
        <p class="mb-4 text-dark02 text-[1.5625em] poppins-bold">$999</p>
        <div class="card-actions">
            <button
                class="btn flex-nowrap h-auto bg-buttonBgColor text-whiteColor px-[.5em] sm:px-[1em] lg:px-[1.5625em] py-[.5em] sm:py-[.5em] lg:py-[0.5625em] text-[.8em] md:text-[1em] lg:text-[1.25em] poppins-semibold" onclick="clickedShowDetails('${phoneData?.slug}')">Show
                Details</button>
        </div>
    </div>
    `

    phoneContainer.appendChild(phoneDiv);
}




// Get the input text and set it on search button.
const getInputText = (isShowAll) => {
    const inputField = document.getElementById('input_text_field');
    const inputText = inputField.value;

    phonesData(inputText, isShowAll);

    loading(true);
}



// Loading spinner.
const loading = (isLoading) => {
    const loadingSpinnerSection = document.getElementById('loading_spinner_section');

    // Show spinner.
    if (isLoading) {
        loadingSpinnerSection.classList.remove('hidden');
    }
    else {
        loadingSpinnerSection.classList.add('hidden');
    }

}



// For show all data.
const showAllData = () => {
    getInputText(true);
}


// Get phone details from api.
const clickedShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phoneDetails = data.data;

    showPhoneDetailsOnModal(phoneDetails);
}


// Show phone details on modal.
const showPhoneDetailsOnModal = (phoneDetails) => {
    console.log(phoneDetails);

    const phoneDetailsModalDiv = document.getElementById('phone_details_modal_box');
    phoneDetailsModalDiv.innerHTML = `
    <figure class="py-8 lg:py-10 bg-bgColor01 rounded-xl ">
        <div class="flex justify-center items-center">
            <img src="${phoneDetails?.image}" />
        </div>
    </figure>
    <h3 class="text-3xl mt-10 mb-6 poppins-bold text-dark02" id="phone_name">${phoneDetails?.name}
    </h3>
    <p class="py-4 text-base poppins-regular text-commonTextColor text-justify">It is a long
        established fact that a
        reader
        will be
        distracted by the readable content of a page when looking at its
        layout.</p>
    <div class="text-xl space-y-4 text-left">
        <p class="text-commonTextColor poppins-regular">
            <span class="text-dark02 poppins-semibold">Storage:</span>
            ${phoneDetails?.mainFeatures?.storage}
        </p>
        <p class="text-commonTextColor poppins-regular">
            <span class="text-dark02 poppins-semibold">Display Size :</span>
            ${phoneDetails?.mainFeatures?.displaySize}
        </p>
        <p class="text-commonTextColor poppins-regular">
            <span class="text-dark02 poppins-semibold">Chipset :</span>
            ${phoneDetails?.mainFeatures?.chipSet}
        </p>
        <p class="text-commonTextColor poppins-regular">
            <span class="text-dark02 poppins-semibold">Memory :</span>
            ${phoneDetails?.mainFeatures?.memory}
        </p>
        <p class="text-commonTextColor poppins-regular">
            <span class="text-dark02 poppins-semibold">Slug :</span>
            ${phoneDetails?.slug}
        </p>
        <p class="text-commonTextColor poppins-regular">
            <span class="text-dark02 poppins-semibold">Release date :</span>
            ${phoneDetails?.releaseDate}
        </p>
        <p class="text-commonTextColor poppins-regular">
            <span class="text-dark02 poppins-semibold">Brand :</span>
            ${phoneDetails.name}
        </p>
        <p class="text-commonTextColor poppins-regular">
            <span class="text-dark02 poppins-semibold">GPS :</span>
            ${phoneDetails?.others?.GPS ? phoneDetails?.others?.GPS : 'No GPS available.'}
        </p>
    </div>
    <div class="modal-action mt-10 flex justify-end">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button
                class="btn flex-nowrap h-auto text-xl poppins-bold text-whiteColor px-12 py-4 bg-modalCloseButtonColor">Close</button>
        </form>
    </div>
    `;

    details_modal.showModal();
}



phonesData();


// Use ternary operator for ignore empty data.

// or
// ${phoneDetails?.others?.GPS || 'No GPS available'}

// Ternary operator.
// ${ phoneDetails?.others?.GPS ? phoneDetails?.others?.GPS : 'No GPS available' }
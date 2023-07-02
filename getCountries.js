import axios from "axios";
export function getCountries(reg, lim) {
  axios
    .get("https://api.first.org/data/v1/countries?pretty=true", {
      params: {
        region: "Asia",
        limit: 30,
      },
    })
    .then((response) => {
      let data = response.data;

      if (!data || !data.data) {
        throw new Error("Invalid response data");
      }

      data = data.data;

      const countries = [];
      Object.values(data).forEach((countryRegionObject) => {
        const { country } = countryRegionObject;
        countries.push(country);
      });

      // console.info({ countries });
      const select = document.getElementById("country-names");

      // Loop through the countries array and create an option element for each country
      countries
        .forEach((country) => {
          // Create a new option element
          const option = document.createElement("option");

          // Set the value and text content of the option
          option.value = country.toUpperCase(); // Assuming you want to use the first two characters of the country name as the value
          option.textContent = country;

          // Add the option to the select element
          select.appendChild(option);

          select.onchange = function () {
            displayCountry();
          };
          function displayCountry() {
            let selectedCountry = document.getElementById("selected-country");
            const countryToDisplay = document.createElement("p");
            selectedCountry.innerHTML =
              "You Have Made Your Decision To Nuke :::: " + select.value;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
}

export function displayCountry() {}
// export function getCountries(reg, lim) {
//   return axios
//     .get("https://api.first.org/data/v1/countries?pretty=true", {
//       params: {
//         region: reg,
//         limit: lim,
//       },
//     })
//     .then(({ data }) => {
//       return data;
//     })
//     .then((objectData) => {
//       return objectData.data;
//     })
//     .then((dataToArray) => {
//       const array = [];
//       Object.entries(dataToArray).forEach((country) =>
//         Object.values(country[1]).forEach((val) => {
//           array.push(val);
//         })
//       );
//       // console.log(array);
//       const select = document.getElementById("country-names");

//       // Loop through the countries array and create an option element for each country
//       array.forEach((country) => {
//         // Create a new option element
//         const option = document.createElement("option");

//         // Set the value and text content of the option
//         option.value = country.substring(0, 2).toUpperCase(); // Assuming you want to use the first two characters of the country name as the value
//         option.textContent = country;

//         // Add the option to the select element
//         select.appendChild(option);
//       });
//     });
//   // .then((innerData) => {
//   //   console.log(innerData);

//   //   innerData.map((country) => {
//   //     console.log(country);
//   //   });
//   // });
// }

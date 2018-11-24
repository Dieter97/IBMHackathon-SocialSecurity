
$(document).ready(function() {

    //First load the patient data
    loadPatientData();



    //Show page content and remove loader
    setTimeout(function(){toggleLoader();},2000);
});

var patient;
var debug = true;

function toggleLoader() {
    document.getElementById("loader").classList.toggle("hidden");
    document.getElementById("wrapper").classList.toggle("hidden");
}

function loadPatientData() {
    $.ajax({
        type: "GET",
        url: "",
        dataType: "text",
        success: function(patientDATA){

            if(debug){
                patientDATA = "{\n" +
                    "  \"id\": \"26\",\n" +
                    "  \"patient_info\": {\n" +
                    "    \"id\": \"26\",\n" +
                    "    \"first_name\": \"Kirsten\",\n" +
                    "    \"last_name\": \"Schuermans\",\n" +
                    "    \"birthdate\": \"1988-08-25\",\n" +
                    "    \"sex\": \"female\"\n" +
                    "  },\n" +
                    "  \"demand\": \"Parking license\",\n" +
                    "  \"pathologies\": [\n" +
                    "    \"Ziekte van Alzheimer\"\n" +
                    "  ],\n" +
                    "  \"keywords\": {\n" +
                    "    \"prothese\": [\n" +
                    "      {\n" +
                    "        \"data_type\": \"text\",\n" +
                    "        \"value\": \"2007: Totale heupprothese links\"\n" +
                    "      },\n" +
                    "      {\n" +
                    "        \"data_type\": \"text\",\n" +
                    "        \"value\": \"2008: Totale heupprothese rechts\"\n" +
                    "      }\n" +
                    "    ],\n" +
                    "    \"hypoxie\": [\n" +
                    "      {\n" +
                    "        \"data_type\": \"text\",\n" +
                    "        \"value\": \"COPD GOLD III met emfyseem en bronchiëctasieën; reeds nachtelijke hypoxie in 2012 maar blijvende nicotine-abusus.\"\n" +
                    "      }\n" +
                    "    ],\n" +
                    "    \"atelectase\": [\n" +
                    "      {\n" +
                    "        \"data_type\": \"text\",\n" +
                    "        \"value\": \"Eind 2015 consultatie toegenomen hoesten en ook vermagering; CT thorax wat atelectase rechter MK.\"\n" +
                    "      }\n" +
                    "    ],\n" +
                    "    \"exacerbatie\": [\n" +
                    "      {\n" +
                    "        \"data_type\": \"text\",\n" +
                    "        \"value\": \"11-2016 COPD exacerbatie, sputumkweek: Moraxella en Haemofilus Influenzae\\nR/ Augmentin\"\n" +
                    "      }\n" +
                    "    ],\n" +
                    "    \"pleuritis\": [\n" +
                    "      {\n" +
                    "        \"data_type\": \"text\",\n" +
                    "        \"value\": \"Licht afgestompte longsinussen : sequelen pleuritis of lichtgradige hoeveelheid pleuravocht.\"\n" +
                    "      }\n" +
                    "    ],\n" +
                    "    \"Key 1\": [\n" +
                    "      {\n" +
                    "        \"data_type\": \"text\",\n" +
                    "        \"value\": \"2007: Totale heupprothese links\"\n" +
                    "      },\n" +
                    "      {\n" +
                    "        \"data_type\": \"text\",\n" +
                    "        \"value\": \"2008: Totale heupprothese rechts\"\n" +
                    "      }\n" +
                    "    ],\n" +
                    "    \"Key 2\": [\n" +
                    "      {\n" +
                    "        \"data_type\": \"text\",\n" +
                    "        \"value\": \"COPD GOLD III met emfyseem en bronchiëctasieën; reeds nachtelijke hypoxie in 2012 maar blijvende nicotine-abusus.\"\n" +
                    "      }\n" +
                    "    ],\n" +
                    "    \"Key 3\": [\n" +
                    "      {\n" +
                    "        \"data_type\": \"text\",\n" +
                    "        \"value\": \"Eind 2015 consultatie toegenomen hoesten en ook vermagering; CT thorax wat atelectase rechter MK.\"\n" +
                    "      }\n" +
                    "    ],\n" +
                    "    \"Key 4\": [\n" +
                    "      {\n" +
                    "        \"data_type\": \"text\",\n" +
                    "        \"value\": \"11-2016 COPD exacerbatie, sputumkweek: Moraxella en Haemofilus Influenzae\\nR/ Augmentin\"\n" +
                    "      }\n" +
                    "    ],\n" +
                    "    \"Key 5\": [\n" +
                    "      {\n" +
                    "        \"data_type\": \"text\",\n" +
                    "        \"value\": \"Licht afgestompte longsinussen : sequelen pleuritis of lichtgradige hoeveelheid pleuravocht.\"\n" +
                    "      }\n" +
                    "    ]\n" +
                    "  }\n" +
                    "}";
            }
            patient = JSON.parse(patientDATA);

            //Set patient data on page
            document.getElementById("patient-name").innerText = patient.patient_info.first_name + " " + patient.patient_info.last_name;
            document.getElementById("patient-birth").innerHTML = "<b>Birthday: </b>"+patient.patient_info.birthdate;
            document.getElementById("patient-gender").innerHTML = "<b>Sex: </b>"+patient.patient_info.sex;
            document.getElementById("patient-profession").innerHTML = "<b>Profession: </b>"+patient.patient_info.job;

            //Set demand
            document.getElementById("demand").innerText = patient.demand;

            //Set pathologies
            var html = "";
            patient.pathologies.forEach(function(p) {
                html += "<li>"+p+"</li>";
            });
            document.getElementById("pathology-list").innerHTML = html;

            //Fill keyword list
            var html = "";
            var keys = new Map(Object.entries(patient.keywords));
            for (const [key, value] of keys.entries()) {
                html += "<li class='list-group-item list-group-item-action' onclick='loadKeyValue(\""+key+"\");'>"+key+"</li>";
            }
            document.getElementById("keyword-list").innerHTML = html;

        },
        error: function(e){
            alert('Connection to backend failed! Error:' + e);
        }
    });
}

function loadKeyValue(key) {
    //TODO LOG the click to the backend
    var html = "";
    var keys = new Map(Object.entries(patient.keywords));
    for (const [k, value] of keys.entries()) {
        if(key === k){
            value.forEach(function(data) {
                switch (data.data_type){
                    case "text":
                        html += "<p>" +data.value +"</p>";
                        break;
                    //TODO add more data types
                }
            });
        }
    }
    document.getElementById("content").innerHTML = html;
}

function filterKeywords() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('keyword-search');
    filter = input.value.toUpperCase();
    ul = document.getElementById("keyword-list");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function logout(){
    window.location = "../portal/";
}

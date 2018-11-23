
$(document).ready(function() {

    //First load the patient data
    loadPatientData();
});

var patient;
var debug = true;

function loadPatientData() {
    $.ajax({
        type: "GET",
        url: "",
        dataType: "text",
        success: function(patientDATA){

            if(debug){
                patientDATA = "{\"id\":\"26\",\"patient_info\":{\"id\":\"26\",\"first_name\":\"Kirsten\",\"last_name\":\"Schuermans\",\"birthdate\":\"1988-08-25\",\"sex\":\"female\"},\"demand\":\"parking license\",\"pathologies\":[\"Ziekte van Alzheimer\"],\"keywords\":[{\"key\":\"prothese\",\"data_type\":\"text\",\"value\":\"2007: Totale heupprothese links\"},{\"key\":\"slechtziend\",\"data_type\":\"text\",\"value\":\"zicht\"},{\"key\":\"hypoxie\",\"data_type\":\"text\",\"value\":\"COPD GOLD III met emfyseem en bronchiëctasieën; reeds nachtelijke hypoxie in 2012 maar blijvende nicotine-abusus.\"},{\"key\":\"atelectase\",\"data_type\":\"text\",\"value\":\"Eind 2015 consultatie toegenomen hoesten en ook vermagering; CT thorax wat atelectase rechter MK.\"},{\"key\":\"exacerbatie\",\"data_type\":\"text\",\"value\":\"11-2016 COPD exacerbatie, sputumkweek: Moraxella en Haemofilus Influenzae\\nR/ Augmentin\"},{\"key\":\"pleuritis\",\"data_type\":\"text\",\"value\":\"Licht afgestompte longsinussen : sequelen pleuritis of lichtgradige hoeveelheid pleuravocht.\"}]}";
            }
            patient = JSON.parse(patientDATA);

            //Set patient data on page
            document.getElementById("patient-name").innerText = patient.patient_info.first_name + " " + patient.patient_info.last_name;
            document.getElementById("patient-birth").innerText = patient.patient_info.birthdate;
            document.getElementById("patient-gender").innerText = patient.patient_info.sex;
            document.getElementById("patient-profession").innerText = patient.patient_info.job;

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
            patient.keywords.forEach(function(k) {
                html += "<li class='list-group-item list-group-item-action' onclick='loadKeyValue(\""+k.key+"\");'>"+k.key+"</li>";
            });
            document.getElementById("keyword-list").innerHTML = html;

        },
        error: function(e){
            alert('Connection to backend failed! Error:' + e);
        }
    });
}

function loadKeyValue(key) {
    //TODO
    console.log("test");
    var text = "";
    switch(key){
        case "prothese":
            text = "2007: Totale heupprothese links";
            break;
        case "slechtziend":
            text = "slecht zien linker oog";
            break;
        case "hypoxie":
            text = "Eind 2015 consultatie toegenomen hoesten en ook vermagering; CT thorax wat atelectase rechter MK.";
            break;
        case "atelectase":
            text = "COPD GOLD III met emfyseem en bronchiëctasieën; reeds nachtelijke hypoxie in 2012 maar blijvende nicotine-abusus.";
            break;
        case "exacerbatie":
            text = "11-2016 COPD exacerbatie, sputumkweek: Moraxella en Haemofilus Influenzae\nR/ Augmentin";
            break;
        case "pleuritis":
            text = "Licht afgestompte longsinussen : sequelen pleuritis of lichtgradige hoeveelheid pleuravocht";
            break;

    }
    document.getElementById("content").innerText = text;
}



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
                patientDATA = "{\"id\":\"26\",\"patient_info\":{\"id\":\"26\",\"first_name\":\"Kirsten\",\"last_name\":\"Schuermans\",\"birthdate\":\"1988-08-25\",\"sex\":\"female\"},\"demand\":\"parking license\",\"pathologies\":[\"Ziekte van Alzheimer\"],\"keywords\":{\"prothese\":[{\"data_type\":\"text\",\"value\":\"2007: Totale heupprothese links\"}],\"hypoxie\":[{\"data_type\":\"text\",\"value\":\"COPD GOLD III met emfyseem en bronchiëctasieën; reeds nachtelijke hypoxie in 2012 maar blijvende nicotine-abusus.\"}],\"atelectase\":[{\"data_type\":\"text\",\"value\":\"Eind 2015 consultatie toegenomen hoesten en ook vermagering; CT thorax wat atelectase rechter MK.\"}],\"exacerbatie\":[{\"data_type\":\"text\",\"value\":\"11-2016 COPD exacerbatie, sputumkweek: Moraxella en Haemofilus Influenzae\\nR/ Augmentin\"}],\"pleuritis\":[{\"data_type\":\"text\",\"value\":\"Licht afgestompte longsinussen : sequelen pleuritis of lichtgradige hoeveelheid pleuravocht.\"}]}}";
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
    //TODO
    console.log("test");
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


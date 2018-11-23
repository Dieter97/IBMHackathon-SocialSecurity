
document.onload = function() {

    //First load the patient data
    loadPatientData();

};

var patient;

function loadPatientData() {
    $.ajax({
        type: "GET",
        url: "/api/patient/1",
        dataType: "text",
        success: function(patientDATA){
            patient = JSON.parse(patientDATA);
            //Set patient data on page
            document.getElementById("patient-name").innerText = patient.patient_info.first_name + " " + patient.patient_info.first_name;
            document.getElementById("patient-birth").innerText = patient.patient_info.birthdate;
            document.getElementById("patient-gender").innerText = patient.patient_info.sex;
            document.getElementById("patient-profession").innerText = patient.patient_info.job;

            //Set keywords

        },
        error: function(e){
            alert('Connection to backend failed! Error:' + e);
        }
    });
}

function loadKeyValue(key) {

}


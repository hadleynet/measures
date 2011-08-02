function () {
  var patient = this;
  var measure = patient.measures["0027"];
  if (measure==null)
    measure={};

  <%= init_js_frameworks %>

  var year = 365*24*60*60;
  var effective_date = <%= effective_date %>;
  var measurement_period_start = effective_date - 1*year;
  /* 
     AND: “Patient characteristic: birth date” (age) >= 17 years to capture all patients who 
           will reach the age of 18 years and older during the “measurement period”;
  */
  var latest_birthdate = measurement_period_start - 17*year;
  var earliest_encounter = effective_date - 2*year;
  var earliest_tobacco_user = effective_date - 1*year;
  
  var population = function() {
    return (patient.birthdate<=latest_birthdate);
  }
  
  var denominator = function() {
    return inRange(measure.encounter_outpatient_encounter, earliest_encounter, effective_date);
  }
  
  var numerator = function() {
    encounter = inRange(measure.tobacco_use_cessation_counseling_encounter, earliest_tobacco_user, effective_date);
    communication = inRange(measure.tobacco_use_cessation_counseling_communication_to_patient, earliest_tobacco_user, effective_date);
    return encounter || communication;
  }
  
  var exclusion = function() {
    return false;
  }
  
  map(patient, population, denominator, numerator, exclusion);
};
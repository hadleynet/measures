function () {
  var patient = this;
  var measure = patient.measures["0070"];
  if (measure==null)
    measure={};

  var day = 24*60*60;
  var year = 365*day;
  var effective_date = <%= effective_date %>;
  var latest_birthdate = effective_date - 23*year;
  var latest_birthdate = effective_date - 15*year;
  var earliest_encounter = effective_date - 1*year;
 
  var population = function() {
     
    return true ;
  }
  
  var denominator = function() {

    return true;
  }
  
  var numerator = function() {
  
    return true;
  }
  
  var exclusion = function() {


     return false

  }
  
  map(patient, population, denominator, numerator, exclusion);
};